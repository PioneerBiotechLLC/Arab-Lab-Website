const required: Record<string, string[]> = { quote: ['name', 'company'], service: ['name', 'company', 'issue'] }

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try { body = await request.json() } catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const kind = typeof body.kind === 'string' && body.kind in required ? body.kind : null
  if (!kind) return Response.json({ error: 'Unknown request kind' }, { status: 400 })

  const missing = required[kind].filter((key) => typeof body[key] !== 'string' || !(body[key] as string).trim())
  if (missing.length) return Response.json({ error: `Missing: ${missing.join(', ')}` }, { status: 422 })

  // Delivery is not wired yet — no email/CRM provider is configured for this project.
  // Submissions are logged server-side so they are visible in deployment logs until one is added here.
  console.info('[contact]', kind, body)
  return Response.json({ ok: true })
}
