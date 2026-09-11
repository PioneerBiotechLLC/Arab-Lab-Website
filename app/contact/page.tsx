'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Check } from 'lucide-react'
import { ContactTiles, DarkBand, OfficeTiles, PageSection, PageShell } from '@/components/site'
import { markets, offices } from '@/lib/site-data'

type FieldDef = { name: string; label: string; required?: boolean; as?: 'textarea' | 'select'; options?: string[]; wide?: boolean }

const quoteFields: FieldDef[] = [
  { name: 'name', label: 'Name', required: true },
  { name: 'company', label: 'Company', required: true },
  { name: 'product', label: 'Brand or product' },
  { name: 'quantity', label: 'Quantity' },
  { name: 'office', label: 'Preferred office', as: 'select', options: offices.map((office) => office.name), wide: true },
]
const supportFields: FieldDef[] = [
  { name: 'name', label: 'Name', required: true },
  { name: 'company', label: 'Company', required: true },
  { name: 'issue', label: 'Issue or service need', required: true, as: 'textarea', wide: true },
]

const fieldClass = 'rounded-lg border border-line bg-white px-3 py-3 text-ink outline-none focus:border-orange aria-[invalid=true]:border-danger-border'

function validate(field: FieldDef, value: string) { return field.required && !value.trim() ? `${field.label} is required.` : '' }

function ContactForm({ support = false }: { support?: boolean }) {
  const kind = support ? 'service' : 'quote'
  const fields = support ? supportFields : quoteFields
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(fields.map((f) => [f.name, f.options?.[0] ?? ''])))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

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
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, ...values }) })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch { setStatus('error') }
  }

  if (status === 'sent') return <div role="status" className="rounded-3xl border border-orange/60 bg-white p-8 shadow-card"><Check className="text-orange" /><h3 className="mt-5 font-heading text-2xl font-bold text-ink">Request received.</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Our {support ? 'Service' : 'Commercial'} department will review your details and follow up shortly.</p></div>

  return <form onSubmit={submit} noValidate className="grid gap-5 rounded-3xl border border-line bg-white p-6 shadow-card md:grid-cols-2 md:p-8">
    {fields.map((field) => {
      const error = errors[field.name]
      const errorId = `${kind}-${field.name}-error`
      const shared = { name: field.name, value: values[field.name], required: field.required, 'aria-invalid': !!error, 'aria-describedby': error ? errorId : undefined, className: fieldClass, onBlur: () => check(field, values[field.name]), onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(field, e) }
      const control = field.as === 'textarea' ? <textarea rows={4} {...shared} /> : field.as === 'select' ? <select {...shared}>{field.options?.map((o) => <option key={o}>{o}</option>)}</select> : <input {...shared} />
      return <label key={field.name} className={`grid gap-2 text-sm text-muted-foreground ${field.wide ? 'md:col-span-2' : ''}`}>{field.label}{control}{error && <span id={errorId} className="text-xs text-danger">{error}</span>}</label>
    })}
    <div className="flex flex-wrap items-center gap-4 md:col-span-2">
      <button type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'} className="inline-flex items-center py-3 gap-2 rounded-full bg-orange px-6 font-heading text-sm font-semibold text-white shadow-card hover:bg-amber disabled:pointer-events-none disabled:opacity-60">{status === 'sending' ? 'Sending…' : support ? 'Contact Service' : 'Submit request'}</button>
      {status === 'error' && <p role="alert" className="text-sm text-danger">We couldn&apos;t send that. Check your connection and try again.</p>}
    </div>
  </form>
}

export default function ContactPage() {
  return <PageShell eyebrow="Contact" title="A clear next step." intro="Choose the path that matches your need. We route each request to the right Arab Lab department.">
    <PageSection><div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]"><div><p className="label mb-4">01 / Request a quote</p><h2 className="font-heading text-3xl font-bold tracking-[-0.01em] text-ink">Specify the requirement.</h2><p className="mt-5 leading-7 text-muted-foreground">Share the product, quantity and office preference. We will respond with the next practical step.</p></div><ContactForm /></div></PageSection>
    <PageSection className="bg-paper"><div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]"><div><p className="label mb-4">02 / Service & support</p><h2 className="font-heading text-3xl font-bold tracking-[-0.01em] text-ink">Keep the lab moving.</h2><p className="mt-5 leading-7 text-muted-foreground">For installation, maintenance or application support, send the issue directly to Service.</p></div><ContactForm support /></div></PageSection>
    <PageSection><div className="grid gap-12 md:grid-cols-2"><div><p className="label mb-4">03 / Direct contact</p><h2 className="font-heading text-3xl font-bold tracking-[-0.01em] text-ink">Prefer a direct line?</h2></div><ContactTiles /></div></PageSection>
    <DarkBand eyebrow="04 / Visit an office" title="Or come and see us." intro={`${offices.length} offices across ${markets.join(', ')}.`}><OfficeTiles /></DarkBand>
  </PageShell>
}
