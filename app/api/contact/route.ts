import { Resend } from 'resend'
import { offices } from '@/lib/site-data'
import { issueToken, screen } from '@/lib/contact-guard'

// Quote and service requests from /contact. Validated here, then emailed through Resend.
// Env (set in .env.local and on Vercel): RESEND_API_KEY, CONTACT_TO, CONTACT_FROM (an address on a domain verified in Resend).

type Kind = 'quote' | 'service'
const required: Record<Kind, string[]> = { quote: ['name', 'company', 'email'], service: ['name', 'company', 'email', 'issue'] }
const labels: Record<string, string> = { name: 'Name', company: 'Company', email: 'Email', product: 'Brand or product', quantity: 'Quantity', office: 'Preferred office', issue: 'Issue or service need' }
const order = ['name', 'company', 'email', 'product', 'quantity', 'office', 'issue']
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)

// The form fetches a token when it mounts and sends it back with the submission (see lib/contact-guard.ts).
export async function GET() {
  return Response.json({ token: issueToken() }, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try { body = await request.json() } catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const kind = typeof body.kind === 'string' && body.kind in required ? (body.kind as Kind) : null
  if (!kind) return Response.json({ error: 'Unknown request kind' }, { status: 400 })

  // Only known fields, trimmed and length-capped, so the email carries exactly what the form offers.
  const fields: Record<string, string> = {}
  for (const key of order) if (typeof body[key] === 'string') fields[key] = (body[key] as string).trim().slice(0, key === 'issue' ? 4000 : 200)

  const missing = required[kind].filter((key) => !fields[key])
  if (missing.length) return Response.json({ error: `Missing: ${missing.map((k) => labels[k]).join(', ')}` }, { status: 422 })
  if (!emailOk(fields.email)) return Response.json({ error: 'Email address looks invalid' }, { status: 422 })
  if (fields.office && !offices.some((o) => o.name === fields.office)) delete fields.office

  // Spam screen. A rejected submission gets the same reply as a real one, so a bot cannot tune against it.
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const verdict = screen(body, fields, ip)
  if (!verdict.ok) {
    console.info('[contact] dropped', verdict.reason, { ip, company: fields.company })
    return Response.json({ ok: true })
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    console.error('[contact] delivery not configured: set RESEND_API_KEY, CONTACT_TO and CONTACT_FROM')
    return Response.json({ error: 'Delivery is not configured' }, { status: 503 })
  }

  const title = kind === 'quote' ? 'Quote request' : 'Service request'
  const subject = `${title} — ${fields.company} (${fields.name})`
  const rows = order.filter((k) => fields[k]).map((k) => [labels[k], fields[k]] as const)
  const text = [`${title} from the website`, '', ...rows.map(([l, v]) => `${l}: ${v}`)].join('\n')
  const html = `<div style="font:15px/1.6 -apple-system,Segoe UI,sans-serif;color:#0F2438"><h2 style="margin:0 0 16px;font-size:18px">${title} from the website</h2><table style="border-collapse:collapse">${rows.map(([l, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#4A5D72;vertical-align:top;white-space:nowrap">${l}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`).join('')}</table></div>`

  const resend = new Resend(RESEND_API_KEY)
  const { data, error } = await resend.emails.send({
    from: CONTACT_FROM,
    to: CONTACT_TO.split(',').map((s) => s.trim()),
    replyTo: fields.email,
    subject,
    text,
    html,
    tags: [{ name: 'kind', value: kind }],
  })
  if (error) {
    console.error('[contact] resend error', error)
    return Response.json({ error: 'Could not send the request' }, { status: 502 })
  }
  return Response.json({ ok: true, id: data?.id })
}
