import { z } from 'zod'
import { COUNTRY_CODES, SERVICE_SLUGS } from './constants'

/**
 * Enquiry form schema - imported by BOTH the React form (client-side validation)
 * and the Express route (authoritative server-side validation).
 */
export const enquiryServiceValues = [...SERVICE_SLUGS, 'general'] as const

export const enquirySchema = z.object({
  name: z.string({ error: 'Please enter your name' }).trim().min(2, 'Please enter your name').max(100, 'Name is too long'),
  email: z.email({ error: 'Please enter a valid email address' }).max(200, 'Email is too long'),
  phone: z
    .string({ error: 'Please enter a phone / WhatsApp number' })
    .trim()
    .min(7, 'Please enter a phone / WhatsApp number')
    .max(30, 'Phone number is too long')
    .regex(/^\+?[\d\s().-]{7,}$/, 'Use digits only, e.g. +233 20 000 0000'),
  country: z.enum(COUNTRY_CODES, { error: 'Please choose Ghana or Canada' }),
  service: z.enum(enquiryServiceValues, { error: 'Please choose a service' }),
  /** Optional: the specific card the visitor clicked "Enquire" on. */
  item: z.string().trim().max(120).optional(),
  message: z
    .string({ error: 'Please tell us a little more (at least 10 characters)' })
    .trim()
    .min(10, 'Please tell us a little more (at least 10 characters)')
    .max(2000, 'Message is too long (2000 characters max)'),
  consent: z.literal(true, {
    error: 'Please agree so we can contact you about this enquiry',
  }),
  /** Honeypot - real visitors never see or fill this. Bots do. */
  website: z.string().max(300).optional(),
})

export type EnquiryInput = z.infer<typeof enquirySchema>

/** Shape of the JSON returned by POST /api/enquiry */
export interface EnquiryResponse {
  ok: boolean
  error?: string
  /** Field-level messages when validation fails */
  fields?: Record<string, string>
}
