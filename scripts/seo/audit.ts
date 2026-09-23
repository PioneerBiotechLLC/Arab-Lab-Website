// SEO audit of the production build. Run after `pnpm build`:  pnpm seo:audit  [--md docs/seo/AUDIT.md]
// Reads every prerendered page in .next/server/app and checks title/description length, one H1, canonical on www,
// og:image on www, robots, hreflang, JSON-LD validity (required fields per type) and leftover {{VERIFY}} markers.
// Also cross-checks the sitemap: every URL must be a built, indexable page whose canonical is itself.

import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import { keywordFor } from './keywords.ts'

const ROOT = join(import.meta.dirname, '../..')
const APP = join(ROOT, '.next/server/app')
const WWW = 'https://www.arablab-scientific.com'
if (!existsSync(APP)) { console.error('No build found. Run `pnpm build` first.'); process.exit(1) }

const walk = (dir: string): string[] => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [] })
const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ')
const text = (html: string) => decode(html.replace(/<img[^>]*alt="([^"]*)"[^>]*>/g, ' $1 ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
const attr = (tag: string, name: string) => decode(tag.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? '')

type Row = { path: string; title: string; description: string; h1: string; h1Count: number; canonical: string; robots: string; ogImage: string; hreflang: string[]; schema: string[]; words: number; issues: string[] }

function schemaIssues(node: any, where: string[]): string[] {
  const out: string[] = []
  const t = [node['@type']].flat().join(',')
  const need = (cond: unknown, msg: string) => { if (!cond) out.push(`${t}: ${msg}`) }
  if (/Organization/.test(t) && !/LocalBusiness/.test(t)) { need(node.name, 'name'); need(node.url, 'url'); need(node.logo, 'logo') }
  if (t === 'WebSite') { need(node.name, 'name'); need(node.url, 'url') }
  if (/LocalBusiness|ProfessionalService|Store/.test(t)) { need(node.name, 'name'); need(node.address?.streetAddress, 'address.streetAddress'); need(node.address?.addressCountry, 'address.addressCountry') }
  if (t === 'BreadcrumbList') { const items = node.itemListElement ?? []; need(items.length >= 2, '≥2 items'); items.forEach((it: any, i: number) => { need(it.position === i + 1, `item ${i + 1} position`); need(it.name, `item ${i + 1} name`); if (i < items.length - 1) need(it.item, `item ${i + 1} item url`) }) }
  if (t === 'FAQPage') { const q = node.mainEntity ?? []; need(q.length > 0, 'mainEntity'); q.forEach((it: any, i: number) => { need(it['@type'] === 'Question' && it.name, `Q${i + 1} name`); need(it.acceptedAnswer?.text, `Q${i + 1} acceptedAnswer.text`) }) }
  if (/BlogPosting|Article/.test(t)) { need(node.headline, 'headline'); need(node.datePublished, 'datePublished'); need(node.author?.name ?? node.author?.[0]?.name, 'author.name'); need(node.image, 'image') }
  if (JSON.stringify(node).includes('{{VERIFY')) out.push(`${t}: contains {{VERIFY}} marker`)
  where.push(t)
  return out
}

const rows: Row[] = []
for (const file of walk(APP)) {
  const rel = relative(APP, file).replace(/\\/g, '/')
  if (/^_|\/_/.test(rel)) continue
  const path = rel === 'index.html' ? '/' : '/' + rel.replace(/\/index\.html$|\.html$/, '')
  const html = readFileSync(file, 'utf8')
  const head = html.slice(0, html.indexOf('</head>'))
  const body = html.slice(html.indexOf('<body'))
  const meta = (key: string) => { const tag = head.match(new RegExp(`<meta[^>]*(?:name|property)="${key}"[^>]*>`))?.[0]; return tag ? attr(tag, 'content') : '' }
  const title = decode(head.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '')
  const description = meta('description')
  const canonical = attr(head.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0] ?? '', 'href')
  const hreflang = [...head.matchAll(/<link[^>]*rel="alternate"[^>]*hrefLang="([^"]+)"[^>]*>/gi)].map((m) => m[1])
  const h1s = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]))
  const schema: string[] = []
  const issues: string[] = []
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const data = JSON.parse(m[1]); for (const node of data['@graph'] ?? [data]) issues.push(...schemaIssues(node, schema)) } catch (e) { issues.push('JSON-LD does not parse') }
  }
  // Heading order: no level may be skipped on the way down (h2 → h4 is a skip; h4 → h2 is fine).
  const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]))
  levels.forEach((lv, i) => { if (i && lv > levels[i - 1] + 1) issues.push(`heading skip h${levels[i - 1]}→h${lv}`) })
  const main = body.match(/<main[\s\S]*?<\/main>/)?.[0] ?? ''
  const words = text(main.replace(/<script[\s\S]*?<\/script>/g, '')).split(/\s+/).filter(Boolean).length
  const robots = meta('robots')
  const ogImage = meta('og:image')
  if (!title) issues.push('no title')
  else if (title.length > 60) issues.push(`title ${title.length} chars`)
  if (!description) issues.push('no description')
  else if (description.length > 155) issues.push(`description ${description.length} chars`)
  if (h1s.length !== 1) issues.push(`${h1s.length} H1`)
  if (!canonical) issues.push('no canonical')
  else if (!canonical.startsWith(WWW)) issues.push('canonical not www')
  if (ogImage && !ogImage.startsWith(WWW)) issues.push('og:image not www')
  if (!ogImage) issues.push('no og:image')
  const visible = text(body.replace(/<script[\s\S]*?<\/script>/g, ''))
  const markers = (visible.match(/\{\{VERIFY|Verify:/g) ?? []).length
  if (markers) issues.push(`${markers} VERIFY marker(s) visible`)
  rows.push({ path, title, description, h1: h1s.join(' ‖ '), h1Count: h1s.length, canonical, robots, ogImage, hreflang, schema: [...new Set(schema)], words, issues: [...new Set(issues)] })
}
rows.sort((a, b) => a.path.localeCompare(b.path))

// Sitemap cross-check
const sitemapFile = join(APP, 'sitemap.xml.body')
const sitemapIssues: string[] = []
if (existsSync(sitemapFile)) {
  const xml = readFileSync(sitemapFile, 'utf8')
  for (const loc of [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])) {
    const path = loc.replace(WWW, '') || '/'
    const row = rows.find((r) => r.path === path)
    if (!row) { sitemapIssues.push(`${path}: in sitemap but not a built page`); continue }
    if (/noindex/.test(row.robots)) sitemapIssues.push(`${path}: in sitemap but noindex`)
    if (row.canonical !== loc && row.canonical !== loc.replace(/\/$/, '')) sitemapIssues.push(`${path}: canonical ${row.canonical} ≠ sitemap ${loc}`)
  }
  for (const r of rows) if (!/noindex/.test(r.robots) && !xml.includes(`<loc>${WWW}${r.path === '/' ? '/' : r.path}</loc>`)) sitemapIssues.push(`${r.path}: indexable but missing from sitemap`)
}

const esc = (s: string) => s.replace(/\|/g, '\\|')
const lines = [
  `# SEO audit — ${new Date().toISOString().slice(0, 10)}`, '',
  `${rows.length} pages · ${rows.filter((r) => r.issues.length).length} with issues · sitemap issues: ${sitemapIssues.length}`, '',
  '| Page | Target keyword | Title (chars) | Description (chars) | H1 | Words | Schema | Robots | Issues |', '|---|---|---|---|---|---|---|---|---|',
  ...rows.map((r) => `| ${r.path} | ${esc(keywordFor[r.path] ?? '—')} | ${esc(r.title)} (${r.title.length}) | ${esc(r.description)} (${r.description.length}) | ${esc(r.h1)} | ${r.words} | ${r.schema.join(', ') || '—'} | ${r.robots || 'index'}${r.hreflang.length ? ` · hreflang ${r.hreflang.join('/')}` : ''} | ${r.issues.join('; ') || 'ok'} |`),
  '', '## Sitemap', '', ...(sitemapIssues.length ? sitemapIssues.map((s) => `- ${s}`) : ['- ok: every sitemap URL is a built, indexable page with a matching canonical, and every indexable page is listed']),
]
const mdIndex = process.argv.indexOf('--md')
if (mdIndex > 0) { writeFileSync(join(ROOT, process.argv[mdIndex + 1]), lines.join('\n') + '\n'); console.log(`Wrote ${process.argv[mdIndex + 1]}`) }
else console.log(lines.join('\n'))
const failing = rows.filter((r) => r.issues.some((i) => !/VERIFY marker/.test(i) && !(/noindex/.test(r.robots))))
process.exitCode = 0
console.error(`\n${rows.length} pages audited · ${failing.length} indexable page(s) with non-VERIFY issues · ${sitemapIssues.length} sitemap issue(s)`)
