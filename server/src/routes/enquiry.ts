import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { enquirySchema, type EnquiryResponse } from '../../../shared/enquirySchema'
import { config, emailConfigured } from '../config'
import { sendEnquiryEmails, serviceLabel } from '../mailer'
import { oneLine } from '../sanitize'

export const enquiryRouter = Router()

// 5 enquiries per IP per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({ ok: false, error: 'rate_limited' } satisfies EnquiryResponse)
  },
})

enquiryRouter.post('/enquiry', limiter, async (req, res) => {
  const body: unknown = req.body

  // Honeypot: a hidden field real visitors never fill. Pretend success, send nothing.
  if (body && typeof body === 'object' && 'website' in body) {
    const trap = (body as { website?: unknown }).website
    if (typeof trap === 'string' && trap.trim() !== '') {
      res.json({ ok: true } satisfies EnquiryResponse)
      return
    }
  }

  const parsed = enquirySchema.safeParse(body)
  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form')
      if (!fields[key]) fields[key] = issue.message
    }
    res.status(400).json({ ok: false, error: 'validation_failed', fields } satisfies EnquiryResponse)
    return
  }
  const data = parsed.data

  // Testing aid: log a redacted summary, send nothing, report success.
  if (config.dryRun) {
    console.log(
      `[enquiry:dry-run] ${serviceLabel(data.service)} | ${data.country} | message ${data.message.length} chars (not emailed)`,
    )
    res.json({ ok: true } satisfies EnquiryResponse)
    return
  }

  if (!emailConfigured) {
    res.status(503).json({ ok: false, error: 'email_not_configured' } satisfies EnquiryResponse)
    return
  }

  try {
    await sendEnquiryEmails(data)
    console.log(`[enquiry] delivered: ${oneLine(serviceLabel(data.service), 60)} (${data.country})`)
    res.json({ ok: true } satisfies EnquiryResponse)
  } catch (err) {
    // log the reason only - never the visitor's details or any credentials
    console.error('[enquiry] send failed:', (err as Error).message)
    res.status(502).json({ ok: false, error: 'send_failed' } satisfies EnquiryResponse)
  }
})
