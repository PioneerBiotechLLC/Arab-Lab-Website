// Spam defences for the contact API, in layers that cost a human nothing:
//  1. a signed token issued when the form mounts (bots that POST directly never have one)
//  2. a minimum time between mount and submit (form fillers submit within a second)
//  3. a honeypot field humans never see
//  4. a gibberish check on the free-text fields (random-case strings like "wsReFoRNtnAlOnDZQukZwQXh")
//  5. a small per-IP rate limit
// Rejections answer {ok:true} so the bot learns nothing; the drop is logged server-side.

import { createHmac, timingSafeEqual } from 'node:crypto'

const secret = () => process.env.CONTACT_FORM_SECRET || createHmac('sha256', 'contact-form').update(process.env.RESEND_API_KEY ?? 'dev').digest('hex')
const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest('base64url')

export const MIN_SECONDS = 4
export const MAX_SECONDS = 60 * 60 * 3

export function issueToken(now = Date.now()) {
  const payload = String(now)
  return `${payload}.${sign(payload)}`
}

/** Returns the age of a valid token in seconds, or null if it is missing, forged or out of window. */
export function tokenAge(token: unknown, now = Date.now()): number | null {
  if (typeof token !== 'string') return null
  const [payload, sig] = token.split('.')
  if (!payload || !sig || !/^\d+$/.test(payload)) return null
  const expected = sign(payload)
  if (expected.length !== sig.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null
  const age = (now - Number(payload)) / 1000
  return age >= 0 && age <= MAX_SECONDS ? age : null
}

/** Three signals of machine-generated text, each tuned so ordinary names, companies and product codes stay clear:
 *  - CamelCase boundaries: lower→upper switches. GlaxoSmithKline 2, McDonald 1, wsReFoRNtnAlOnDZQukZwQXh 7.
 *  - Mixed case at random: 40–90% capitals in a word of 10+ letters. Acronyms (100%) and BioNTech (8 letters) stay clear.
 *  - Unpronounceable: five consonants in a row, y counted as a vowel. Rcbjpytuq, Topnnlk. */
function suspicious(word: string) {
  const letters = word.replace(/[^a-z]/gi, '')
  if (letters.length < 7) return false
  const switches = (letters.match(/[a-z][A-Z]/g) ?? []).length
  const upper = (letters.match(/[A-Z]/g) ?? []).length / letters.length
  const consonantRun = /[bcdfghjklmnpqrstvwxz]{5,}/i.test(letters.replace(/ngth|tsch|rsch|tzsch/gi, "")) // strengths, Deutsch, Hirsch, Nietzsche
  return switches >= 4 || (letters.length >= 10 && upper >= 0.4 && upper <= 0.9) || consonantRun
}

/** True when a value looks machine-generated. Used per field; the caller requires two fields to agree. */
export function looksGenerated(value: string) {
  return value.trim().split(/\s+/).some(suspicious)
}

/** Fixed window per IP, per serverless instance — enough to blunt a burst, not a substitute for the token. */
const hits = new Map<string, { count: number; reset: number }>()
export function rateLimited(ip: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || entry.reset < now) { hits.set(ip, { count: 1, reset: now + windowMs }); return false }
  entry.count++
  return entry.count > limit
}

export type Verdict = { ok: true } | { ok: false; reason: string }

export function screen(body: Record<string, unknown>, fields: Record<string, string>, ip: string): Verdict {
  if (typeof body.website === 'string' && body.website.trim()) return { ok: false, reason: 'honeypot' }
  const age = tokenAge(body.token)
  if (age === null) return { ok: false, reason: 'token' }
  if (age < MIN_SECONDS) return { ok: false, reason: `too fast (${age.toFixed(1)}s)` }
  const generated = ['name', 'company', 'product', 'quantity', 'issue'].filter((k) => fields[k] && looksGenerated(fields[k]))
  if (generated.length >= 2) return { ok: false, reason: `gibberish in ${generated.join(', ')}` }
  if (rateLimited(ip)) return { ok: false, reason: 'rate limit' }
  return { ok: true }
}
