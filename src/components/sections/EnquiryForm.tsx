import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { contactCopy } from '@/data/contact'
import { countryMeta } from '@/data/company'
import { services } from '@/data/services'
import { useCountry } from '@/context/countryContext'
import { cn } from '@/lib/cn'
import { Toast, type ToastState } from '@/components/ui/Toast'
import { enquirySchema, type EnquiryInput, type EnquiryResponse } from '@shared/enquirySchema'
import { COUNTRY_CODES, SERVICE_SLUGS } from '@shared/constants'

type FormValues = {
  name: string
  email: string
  phone: string
  country: string
  service: string
  item: string
  message: string
  consent: boolean
  website: string
}
type Errors = Partial<Record<keyof FormValues, string>>

const input =
  'mt-2 block w-full rounded-2xl border bg-white px-4 py-3.5 text-[16px] text-ink placeholder:text-ink/35 transition-[border-color,box-shadow] duration-200 focus:border-royal focus:outline-none focus:ring-4 focus:ring-royal/15'

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Enquiry form. Validation uses the SAME zod schema as the server (shared/enquirySchema.ts).
 * Pre-fills service / item / country from the query string when a visitor clicks "Enquire" on a card.
 */
export function EnquiryForm() {
  const [params] = useSearchParams()
  const { country: selectedCountry } = useCountry()
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  const qService = params.get('service') ?? ''
  const qItem = params.get('item') ?? ''
  const qCountry = params.get('country') ?? ''

  const [values, setValues] = useState<FormValues>(() => ({
    name: '',
    email: '',
    phone: '',
    country: (COUNTRY_CODES as readonly string[]).includes(qCountry) ? qCountry : selectedCountry,
    service: (SERVICE_SLUGS as readonly string[]).includes(qService) ? qService : qService === 'general' ? 'general' : '',
    item: qItem.slice(0, 120),
    message: qItem ? `Hi R&B, I'd like to enquire about: ${qItem.slice(0, 120)}.\n\n` : '',
    consent: false,
    website: '',
  }))
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [toast, setToast] = useState<ToastState | null>(null)
  const f = contactCopy.form

  const showToast = (t: ToastState) => {
    window.clearTimeout(toastTimer.current)
    setToast(t)
    toastTimer.current = window.setTimeout(() => setToast(null), 7000)
  }

  const set =
    (key: keyof FormValues) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const target = e.target
      const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value
      setValues((v) => ({ ...v, [key]: value }))
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
    }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return

    const parsed = enquirySchema.safeParse({ ...values, item: values.item || undefined })
    if (!parsed.success) {
      const next: Errors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues
        if (!next[key]) next[key] = issue.message
      }
      setErrors(next)
      showToast({ kind: 'error', message: contactCopy.toast.invalid })
      const first = Object.keys(next)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data satisfies EnquiryInput),
      })
      const data = (await res.json().catch(() => ({}))) as EnquiryResponse
      if (res.ok && data.ok) {
        setStatus('success')
        showToast({ kind: 'success', message: contactCopy.toast.success })
        return
      }
      setStatus('idle')
      if (res.status === 400 && data.fields) {
        setErrors(data.fields as Errors)
        showToast({ kind: 'error', message: contactCopy.toast.invalid })
      } else if (res.status === 429) {
        showToast({ kind: 'error', message: contactCopy.toast.rateLimited })
      } else if (res.status === 503) {
        showToast({ kind: 'error', message: contactCopy.toast.unavailable })
      } else {
        showToast({ kind: 'error', message: contactCopy.toast.error })
      }
    } catch {
      setStatus('idle')
      showToast({ kind: 'error', message: contactCopy.toast.error })
    }
  }

  if (status === 'success') {
    return (
      <>
        <div role="status" className="rounded-[32px] bg-white p-10 text-center ring-1 ring-ink/[0.07] shadow-[0_30px_60px_-30px_rgba(11,15,26,0.3)]">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-soft text-forest">
            <CheckCircle2 size={34} aria-hidden="true" />
          </span>
          <h2 className="mt-6 font-display text-3xl font-semibold text-ink">{contactCopy.success.title}</h2>
          <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-muted">{contactCopy.success.text}</p>
          <button
            type="button"
            className="mt-8 rounded-full border border-ink/20 px-6 py-3 text-[15px] font-semibold text-ink hover:bg-ink hover:text-white"
            onClick={() => {
              setValues((v) => ({ ...v, message: '', item: '', consent: false }))
              setStatus('idle')
            }}
          >
            {contactCopy.success.again}
          </button>
        </div>
        <Toast toast={toast} onClose={() => setToast(null)} closeLabel={contactCopy.toast.close} />
      </>
    )
  }

  const err = (k: keyof FormValues) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${uid}-${k}-error` } : {})
  const border = (k: keyof FormValues) => (errors[k] ? 'border-red-600' : 'border-ink/15')

  return (
    <>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        aria-label="Enquiry form"
        className="space-y-5 rounded-[28px] bg-white p-5 ring-1 ring-ink/[0.07] shadow-[0_30px_60px_-30px_rgba(11,15,26,0.3)] sm:space-y-6 sm:rounded-[32px] sm:p-9"
      >
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          <Field id={`${uid}-name`} label={f.name} error={errors.name}>
            <input
              id={`${uid}-name`}
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={set('name')}
              className={cn(input, border('name'))}
              {...(errors.name ? { 'aria-invalid': true, 'aria-describedby': `${uid}-name-error` } : {})}
            />
          </Field>
          <Field id={`${uid}-email`} label={f.email} error={errors.email}>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={set('email')}
              className={cn(input, border('email'))}
              {...(errors.email ? { 'aria-invalid': true, 'aria-describedby': `${uid}-email-error` } : {})}
            />
          </Field>
        </div>

        <Field id={`${uid}-phone`} label={f.phone} error={errors.phone} hint={f.phoneHint}>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={set('phone')}
            className={cn(input, border('phone'))}
            {...(errors.phone ? { 'aria-invalid': true, 'aria-describedby': `${uid}-phone-error` } : { 'aria-describedby': `${uid}-phone-hint` })}
          />
        </Field>

        <fieldset>
          <legend className="text-sm font-semibold text-ink">{f.country}</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {COUNTRY_CODES.map((code) => {
              const checked = values.country === code
              return (
                <label
                  key={code}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3.5 text-[16px] font-semibold transition-colors',
                    checked ? 'border-royal bg-royal-soft text-royal-deep' : 'border-ink/15 text-ink hover:border-ink/40',
                    'has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-royal',
                  )}
                >
                  <span>{countryMeta[code].label}</span>
                  <span className="text-xs font-bold opacity-70">{countryMeta[code].currencySymbol}</span>
                  <input
                    type="radio"
                    name="country"
                    value={code}
                    checked={checked}
                    onChange={set('country')}
                    className="sr-only"
                  />
                </label>
              )
            })}
          </div>
          {errors.country && (
            <p role="alert" className="mt-1.5 text-sm font-medium text-red-700">
              {errors.country}
            </p>
          )}
        </fieldset>

        <Field id={`${uid}-service`} label={f.service} error={errors.service}>
          <select
            id={`${uid}-service`}
            name="service"
            value={values.service}
            onChange={set('service')}
            className={cn(input, border('service'), 'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2720%27 height=%2720%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23566074%27 stroke-width=%272.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-11')}
            {...err('service')}
          >
            <option value="" disabled>
              {f.servicePlaceholder}
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="general">{f.serviceGeneral}</option>
          </select>
        </Field>

        {values.item && (
          <p className="rounded-2xl bg-royal-soft px-4 py-3 text-sm font-medium text-royal-deep">
            {f.item}: <strong>{values.item}</strong>
          </p>
        )}

        <Field id={`${uid}-message`} label={f.message} error={errors.message}>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            maxLength={2000}
            value={values.message}
            onChange={set('message')}
            placeholder={f.messagePlaceholder}
            className={cn(input, border('message'), 'resize-y')}
            {...err('message')}
          />
          <p className="mt-1 text-right text-xs text-muted" aria-hidden="true">
            {values.message.length}/2000
          </p>
        </Field>

        {/* Honeypot: invisible to people, tempting to bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            {f.honeypotLabel}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={set('website')}
            />
          </label>
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-ink/80">
            <input
              type="checkbox"
              name="consent"
              checked={values.consent}
              onChange={set('consent')}
              className="mt-1 h-5 w-5 shrink-0 rounded border-ink/30 accent-royal"
              {...(errors.consent ? { 'aria-invalid': true, 'aria-describedby': `${uid}-consent-error` } : {})}
            />
            <span>
              {f.consent}{' '}
              <Link to="/privacy" className="font-semibold text-royal underline underline-offset-2">
                {f.privacyLink}
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p id={`${uid}-consent-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
              {errors.consent}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-royal px-8 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgba(47,95,224,0.7)] transition-[background-color,transform] duration-300 hover:bg-royal-deep active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              {f.sending}
            </>
          ) : (
            <>
              <Send size={18} aria-hidden="true" />
              {f.submit}
            </>
          )}
        </button>
      </form>
      <Toast toast={toast} onClose={() => setToast(null)} closeLabel={contactCopy.toast.close} />
    </>
  )
}
