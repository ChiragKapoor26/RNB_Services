import nodemailer, { type Transporter } from 'nodemailer'
import type { EnquiryInput } from '../../shared/enquirySchema'
import { company, countryMeta } from '../../src/data/company'
import { getService } from '../../src/data/services'
import { config, emailConfigured } from './config'
import { cleanMultiline, escapeHtml, oneLine } from './sanitize'

let transporter: Transporter | null = null

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure, // true for 465, false for 587 (STARTTLS)
      auth: { user: config.smtp.user, pass: config.smtp.pass },
    })
  }
  return transporter
}

export function serviceLabel(slug: string): string {
  if (slug === 'general') return 'General enquiry'
  return getService(slug)?.title ?? slug
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:8px 16px 8px 0;color:#566074;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>` +
  `<td style="padding:8px 0;color:#0B0F1A;font-size:15px">${value}</td></tr>`

/** Sends the enquiry to the client + a short auto-confirmation to the visitor. */
export async function sendEnquiryEmails(data: EnquiryInput): Promise<void> {
  if (!emailConfigured) throw new Error('email_not_configured')
  const t = getTransporter()

  // display name used in headers: single line, no angle brackets / quotes
  const name = oneLine(data.name, 100).replace(/[<>"]/g, '').trim() || 'Visitor'
  const country = countryMeta[data.country].label
  const service = serviceLabel(data.service)
  const item = data.item ? oneLine(data.item, 120) : ''
  const message = cleanMultiline(data.message)
  const phone = oneLine(data.phone, 30)

  // 1) to the client - Reply-To is the visitor so "Reply" goes straight to them
  const html = `<!doctype html><html><body style="margin:0;background:#F7F7F5;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:24px">
    <div style="background:#fff;border-radius:16px;padding:28px;border:1px solid #E4E4DE">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#2F5FE0;font-weight:700">New website enquiry</p>
      <h1 style="margin:0 0 20px;font-size:22px;color:#0B0F1A">${escapeHtml(service)}</h1>
      <table style="border-collapse:collapse;width:100%">
        ${row('Name', escapeHtml(name))}
        ${row('Email', `<a href="mailto:${escapeHtml(data.email)}" style="color:#2F5FE0">${escapeHtml(data.email)}</a>`)}
        ${row('Phone / WhatsApp', escapeHtml(phone))}
        ${row('Country', escapeHtml(country))}
        ${item ? row('About', escapeHtml(item)) : ''}
      </table>
      <div style="margin-top:18px;padding:16px;background:#F7F7F5;border-radius:12px;font-size:15px;line-height:1.55;color:#0B0F1A;white-space:pre-wrap">${escapeHtml(message)}</div>
      <p style="margin:18px 0 0;font-size:12px;color:#566074">Sent via ${escapeHtml(company.domain)}. Hit reply to respond to the visitor directly. Consent to be contacted was given on the form.</p>
    </div>
  </div></body></html>`

  const text = [
    `New website enquiry - ${service}`,
    '',
    `Name: ${name}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${phone}`,
    `Country: ${country}`,
    item ? `About: ${item}` : '',
    '',
    message,
  ]
    .filter((l, i, a) => l !== '' || a[i - 1] !== '')
    .join('\n')

  await t.sendMail({
    from: { name: `${company.shortName} website`, address: config.smtp.from },
    to: config.clientEmail,
    replyTo: { name, address: data.email },
    subject: oneLine(`New enquiry: ${service} - ${name} (${country})`, 180),
    text,
    html,
  })

  // 2) short auto-confirmation to the visitor (best effort - never fails the request)
  try {
    await t.sendMail({
      from: { name: company.name, address: config.smtp.from },
      to: { name, address: data.email },
      subject: `We received your enquiry - ${company.shortName}`,
      text:
        `Hi ${name},\n\nThanks for contacting ${company.name}. We have received your enquiry about "${service}" ` +
        `and a member of the team will get back to you soon.\n\n` +
        `${company.feeConcept}\n\nThis is an automatic confirmation - please don't share sensitive information by email.\n\n` +
        `${company.name}\n${company.url}`,
      html:
        `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0B0F1A">` +
        `<h2 style="margin:0 0 12px;font-size:22px">Thanks, ${escapeHtml(name)}!</h2>` +
        `<p style="line-height:1.6">We have received your enquiry about <strong>${escapeHtml(service)}</strong> and a member of the team will get back to you soon.</p>` +
        `<p style="line-height:1.6;color:#566074">${escapeHtml(company.feeConcept)}</p>` +
        `<p style="font-size:12px;color:#566074">This is an automatic confirmation. Please don't share sensitive information by email.</p>` +
        `<p style="margin-top:24px"><strong>${escapeHtml(company.name)}</strong><br><a href="${escapeHtml(company.url)}" style="color:#2F5FE0">${escapeHtml(company.domain)}</a></p>` +
        `</div>`,
    })
  } catch (err) {
    console.warn('[enquiry] auto-confirmation failed:', (err as Error).message)
  }
}
