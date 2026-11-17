import { useCallback, useEffect, useRef, useState } from 'react'
import { chatCopy } from '@/data/chat'
import { CHAT_MAX_CHARS } from '@shared/constants'

export interface UiMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
  /** assistant message that failed - shows a retry button */
  error?: boolean
}

let nextId = 1

/**
 * Chat state + streaming client for POST /api/chat.
 * History lives in memory only (nothing is persisted to storage).
 * The server streams Server-Sent Events: `data: {"t":"<text chunk>"}` ... `data: [DONE]`.
 */
export function useChat() {
  const [messages, setMessages] = useState<UiMessage[]>([])
  const [pending, setPending] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const messagesRef = useRef<UiMessage[]>([])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  // cancel any in-flight stream when the widget unmounts
  useEffect(() => () => abortRef.current?.abort(), [])

  const stream = useCallback(async (history: UiMessage[], assistantId: number) => {
    const controller = new AbortController()
    abortRef.current = controller
    setPending(true)

    const patch = (fn: (m: UiMessage) => UiMessage) =>
      setMessages((ms) => ms.map((m) => (m.id === assistantId ? fn(m) : m)))
    // accumulate the streamed text locally - React state lags behind fast streams
    let answer = ''
    const fail = (text: string) => {
      answer = answer ? `${answer}\n\n${text}` : text
      patch((m) => ({ ...m, content: answer, error: true }))
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
        body: JSON.stringify({
          messages: history
            .filter((m) => !m.error && m.content.trim())
            .slice(-12)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        if (res.status === 429) fail(chatCopy.errors.rateLimited)
        else if (res.status === 503) fail(chatCopy.errors.unavailable)
        else fail(chatCopy.errors.generic)
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let finished = false

      while (!finished) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const events = buffer.split('\n\n')
        buffer = events.pop() ?? ''
        for (const evt of events) {
          const line = evt.split('\n').find((l) => l.startsWith('data:'))
          if (!line) continue
          const payload = line.slice(5).trim()
          if (payload === '[DONE]') {
            finished = true
            break
          }
          try {
            const json = JSON.parse(payload) as { t?: string; error?: string }
            if (json.error) {
              fail(chatCopy.errors.generic)
              finished = true
              break
            }
            if (json.t) {
              answer += json.t
              const snapshot = answer
              patch((m) => ({ ...m, content: snapshot }))
            }
          } catch {
            /* ignore a malformed chunk */
          }
        }
      }

      // an empty answer is treated as a failure so the user can retry
      if (!answer.trim()) fail(chatCopy.errors.generic)
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      fail(chatCopy.errors.network)
    } finally {
      setPending(false)
      if (abortRef.current === controller) abortRef.current = null
    }
  }, [])

  const send = useCallback(
    (text: string) => {
      const content = text.trim().slice(0, CHAT_MAX_CHARS)
      if (!content || pending) return
      const userMsg: UiMessage = { id: nextId++, role: 'user', content }
      const botMsg: UiMessage = { id: nextId++, role: 'assistant', content: '' }
      const history = [...messagesRef.current, userMsg]
      setMessages([...history, botMsg])
      void stream(history, botMsg.id)
    },
    [pending, stream],
  )

  /** Retry the last user message after a failed reply. */
  const retry = useCallback(() => {
    if (pending) return
    const current = messagesRef.current
    const last = current[current.length - 1]
    if (!last || last.role !== 'assistant' || !last.error) return
    const history = current.slice(0, -1)
    const botMsg: UiMessage = { id: nextId++, role: 'assistant', content: '' }
    setMessages([...history, botMsg])
    void stream(history, botMsg.id)
  }, [pending, stream])

  return { messages, pending, send, retry }
}
