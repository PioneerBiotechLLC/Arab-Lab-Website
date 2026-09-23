'use client'
// Quote and service request form, shared by /contact and /ar/contact. Moved here unchanged from app/contact/page.tsx
// so the page can be a server component with its own metadata; `locale` picks the English or Arabic copy.
// (The copy contains functions, so it is chosen here in the client module rather than passed from a server page.)
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { offices } from '@/lib/site-data'
import { arContactCopy } from '@/lib/ar'

type FieldName = 'name' | 'company' | 'email' | 'product' | 'quantity' | 'office' | 'issue'
type FieldDef = { name: FieldName; required?: boolean; as?: 'textarea' | 'select'; type?: 'email'; options?: string[]; wide?: boolean }

export type ContactCopy = {
  labels: Record<FieldName, string>
  required: (label: string) => string
  invalidEmail: string
  submit: { quote: string; service: string; sending: string }
  error: string
  received: { title: string; body: (support: boolean) => string }
  privacy: { lead: string; link: string; href: string; tail: string }
  honeypot: string
  /** Display name for an office option; the submitted value is always the English office name the API expects. */
  officeLabel?: (name: string) => string
}

export const englishContactCopy: ContactCopy = {
  labels: { name: 'Name', company: 'Company', email: 'Work email', product: 'Brand or product', quantity: 'Quantity', office: 'Preferred office', issue: 'Issue or service need' },
  required: (label) => `${label} is required.`,
  invalidEmail: 'Enter a valid email address.',
  submit: { quote: 'Submit request', service: 'Contact Service', sending: 'Sending…' },
  error: 'We couldn’t send that. Check your connection and try again.',
  received: { title: 'Request received.', body: (support) => `Our ${support ? 'Service' : 'Commercial'} department will review your details and follow up shortly.` },
  privacy: { lead: 'We use what you send only to answer this request. See the ', link: 'Privacy Policy', href: '/privacy', tail: '.' },
  honeypot: 'Website',
}

const quoteFields: FieldDef[] = [
  { name: 'name', required: true },
  { name: 'company', required: true },
  { name: 'email', required: true, type: 'email', wide: true },
  { name: 'product' },
  { name: 'quantity' },
  { name: 'office', as: 'select', options: offices.map((office) => office.name), wide: true },
]
const supportFields: FieldDef[] = [
  { name: 'name', required: true },
  { name: 'company', required: true },
  { name: 'email', required: true, type: 'email', wide: true },
  { name: 'issue', required: true, as: 'textarea', wide: true },
]

const fieldClass = 'rounded-lg border border-line bg-white px-3 py-3 text-ink outline-none focus:border-orange aria-[invalid=true]:border-danger-border'

export function ContactForm({ support = false, locale = 'en' }: { support?: boolean; locale?: 'en' | 'ar' }) {
  const copy: ContactCopy = locale === 'ar' ? arContactCopy : englishContactCopy
  const kind = support ? 'service' : 'quote'
  const fields = support ? supportFields : quoteFields
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(fields.map((f) => [f.name, f.options?.[0] ?? ''])))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [token, setToken] = useState('')
  const [website, setWebsite] = useState('') // honeypot — stays empty for people
  // Anti-spam token, issued when the form appears; the server rejects submissions without one or sent within seconds of it.
  useEffect(() => { fetch('/api/contact', { cache: 'no-store' }).then((r) => r.json()).then((d) => setToken(d.token)).catch(() => {}) }, [])

  function validate(field: FieldDef, value: string) {
    if (field.required && !value.trim()) return copy.required(copy.labels[field.name])
    if (field.type === 'email' && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return copy.invalidEmail
    return ''
  }
  function check(field: FieldDef, value: string) { setErrors((prev) => ({ ...prev, [field.name]: validate(field, value) })) }
  function update(field: FieldDef, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const value = event.target.value
    setValues((prev) => ({ ...prev, [field.name]: value }))
    if (errors[field.name] !== undefined) check(field, value) // inline: once a field has been touched, it re-validates as you type
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = Object.fromEntries(fields.map((f) => [f.name, validate(f, values[f.name])]))
    setErrors(next)
    const firstInvalid = fields.find((f) => next[f.name])
    if (firstInvalid) { (event.currentTarget.elements.namedItem(firstInvalid.name) as HTMLElement | null)?.focus(); return }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, ...values, token, website }) })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch { setStatus('error') }
  }

  if (status === 'sent') return <div role="status" className="rounded-3xl border border-orange/60 bg-white p-8 shadow-card"><Check className="text-orange" /><h3 className="mt-5 font-heading text-2xl font-bold text-ink">{copy.received.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.received.body(support)}</p></div>

  return <form onSubmit={submit} noValidate className="grid gap-5 rounded-3xl border border-line bg-white p-6 shadow-card md:grid-cols-2 md:p-8">
    <div aria-hidden className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"><label>{copy.honeypot}<input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label></div>
    {fields.map((field) => {
      const error = errors[field.name]
      const errorId = `${kind}-${field.name}-error`
      const shared = { name: field.name, value: values[field.name], required: field.required, 'aria-invalid': !!error, 'aria-describedby': error ? errorId : undefined, className: fieldClass, onBlur: () => check(field, values[field.name]), onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(field, e) }
      const control = field.as === 'textarea' ? <textarea rows={4} {...shared} /> : field.as === 'select' ? <select {...shared}>{field.options?.map((o) => <option key={o} value={o}>{copy.officeLabel ? copy.officeLabel(o) : o}</option>)}</select> : <input type={field.type ?? 'text'} dir={field.type === 'email' ? 'ltr' : undefined} autoComplete={field.type === 'email' ? 'email' : undefined} inputMode={field.type === 'email' ? 'email' : undefined} {...shared} />
      return <label key={field.name} className={`grid gap-2 text-sm text-muted-foreground ${field.wide ? 'md:col-span-2' : ''}`}>{copy.labels[field.name]}{control}{error && <span id={errorId} className="text-xs text-danger">{error}</span>}</label>
    })}
    <div className="flex flex-wrap items-center gap-4 md:col-span-2">
      <button type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'} className="inline-flex items-center py-3 gap-2 rounded-full bg-orange px-6 font-heading text-sm font-semibold text-white shadow-card hover:bg-amber disabled:pointer-events-none disabled:opacity-60">{status === 'sending' ? copy.submit.sending : support ? copy.submit.service : copy.submit.quote}</button>
      {status === 'error' && <p role="alert" className="text-sm text-danger">{copy.error}</p>}
    </div>
    <p className="text-xs leading-5 text-muted-foreground md:col-span-2">{copy.privacy.lead}<Link href={copy.privacy.href} className="text-orange underline decoration-orange/40 underline-offset-4 hover:decoration-orange">{copy.privacy.link}</Link>{copy.privacy.tail}</p>
  </form>
}
