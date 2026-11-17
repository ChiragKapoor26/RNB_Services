import { Router, type Response } from 'express'
import rateLimit from 'express-rate-limit'
import { chatRequestSchema } from '../../../shared/chatSchema'
import { botConfigured, config } from '../config'
import { buildSystemPrompt } from '../rnbBotPrompt'
import { cleanMultiline } from '../sanitize'

export const chatRouter = Router()

const limitHandler = (_req: unknown, res: Response) => {
  res.status(429).json({ ok: false, error: 'rate_limited' })
}

// per-IP: 20 messages / minute, 150 / hour
const burst = rateLimit({ windowMs: 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false, handler: limitHandler })
const hourly = rateLimit({ windowMs: 60 * 60 * 1000, limit: 150, standardHeaders: 'draft-7', legacyHeaders: false, handler: limitHandler })

// The system prompt is built once from the shared company data
const SYSTEM_PROMPT = buildSystemPrompt()

interface DeepSeekChunk {
  choices?: { delta?: { content?: string | null }; finish_reason?: string | null }[]
}

chatRouter.post('/chat', burst, hourly, async (req, res) => {
  const parsed = chatRequestSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: 'validation_failed' })
    return
  }
  if (!botConfigured) {
    res.status(503).json({ ok: false, error: 'bot_not_configured' })
    return
  }

  // Abort the upstream request if the visitor closes the chat / navigates away
  const controller = new AbortController()
  res.on('close', () => controller.abort())

  let upstream: globalThis.Response
  try {
    upstream = await fetch(`${config.deepseek.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.deepseek.apiKey}` },
      body: JSON.stringify({
        model: config.deepseek.model,
        stream: true,
        temperature: 0.3,
        max_tokens: 600,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          // only user/assistant turns are accepted by the schema, so a visitor can never inject a "system" turn
          ...parsed.data.messages.map((m) => ({ role: m.role, content: cleanMultiline(m.content) })),
        ],
      }),
      signal: controller.signal,
    })
  } catch (err) {
    if ((err as Error).name !== 'AbortError') console.error('[chat] upstream request failed:', (err as Error).message)
    if (!res.headersSent) res.status(502).json({ ok: false, error: 'upstream_unreachable' })
    return
  }

  if (!upstream.ok || !upstream.body) {
    // status only - never echo the upstream body (could contain account details)
    console.error(`[chat] upstream responded ${upstream.status}`)
    res.status(502).json({ ok: false, error: 'upstream_error' })
    return
  }

  res.status(200).set({
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no', // tell nginx-style proxies not to buffer the stream
  })
  res.flushHeaders()

  const send = (payload: object | '[DONE]') => {
    res.write(`data: ${payload === '[DONE]' ? payload : JSON.stringify(payload)}\n\n`)
  }

  try {
    const reader = upstream.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let done = false

    while (!done) {
      const { value, done: streamDone } = await reader.read()
      if (streamDone) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const raw of lines) {
        const line = raw.trim()
        if (!line.startsWith('data:')) continue
        const payload = line.slice(5).trim()
        if (payload === '[DONE]') {
          done = true
          break
        }
        try {
          const chunk = JSON.parse(payload) as DeepSeekChunk
          const text = chunk.choices?.[0]?.delta?.content
          if (text) send({ t: text })
        } catch {
          /* ignore keep-alive / partial lines */
        }
      }
    }
    send('[DONE]')
  } catch (err) {
    if ((err as Error).name !== 'AbortError') {
      console.error('[chat] stream error:', (err as Error).message)
      send({ error: 'stream_error' })
    }
  } finally {
    res.end()
  }
})
