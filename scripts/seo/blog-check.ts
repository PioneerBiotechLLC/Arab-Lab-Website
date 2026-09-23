// Checks every blog post against the brief: word count 1,200–1,800 (body + FAQ), target keyword terms in the title,
// the first 100 words and at least one H2, a FAQ, at least two links to solution or brand pages, seoTitle ≤ 49 chars,
// description ≤ 155 chars.
// Keyword matching requires every significant term of the keyword, so natural phrasing ("… in the UAE") passes.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

const STOP = new Set(['for', 'in', 'the', 'a', 'of', 'and', 'to'])
const terms = (kw: string) => kw.toLowerCase().split(/[\s-]+/).filter((t) => t && !STOP.has(t))
const has = (text: string, kw: string) => { const t = text.toLowerCase(); return terms(kw).every((w) => t.includes(w)) }
let failed = 0
for (const lang of ['en', 'ar']) {
  const dir = join(import.meta.dirname, '../../content/blog', lang)
  let files: string[] = []
  try { files = readdirSync(dir).filter((f) => f.endsWith('.mdx')) } catch { continue }
  for (const f of files) {
    const { data, content } = matter(readFileSync(join(dir, f), 'utf8'))
    const clean = content.replace(/\{\{VERIFY:[^}]*\}\}/g, '')
    const faq = (data.faq ?? []) as { q: string; a: string }[]
    const words = clean.split(/\s+/).filter(Boolean).length + faq.reduce((n, x) => n + `${x.q} ${x.a}`.split(/\s+/).length, 0)
    const first100 = clean.replace(/[*_]/g, '').split(/\s+/).slice(0, 100).join(' ')
    const h2 = [...content.matchAll(/^## (.+)$/gm)].map((m) => m[1])
    const links = (content.match(/\]\(\/(ar\/)?(solutions|brands)\//g) ?? []).length
    const markers = (content.match(/\{\{VERIFY/g) ?? []).length
    const kw = String(data.targetKeyword)
    const checks = { words: lang === 'ar' ? words >= 900 : words >= 1200 && words <= 1800, title: has(data.title, kw), first100: has(first100, kw), h2: h2.some((h) => has(h, kw)), faq: faq.length >= 3, links: links >= 2, seoTitle: !data.seoTitle || String(data.seoTitle).length <= 49, description: String(data.description).length <= 155 }
    const bad = Object.entries(checks).filter(([, ok]) => !ok).map(([k]) => k)
    if (bad.length) failed++
    console.log(`${lang}/${f.replace('.mdx', '')}`.padEnd(44), String(words).padStart(5), 'words ·', `${faq.length} FAQ ·`, `${links} links ·`, `${markers} markers ·`, data.status, bad.length ? `✗ ${bad.join(', ')}` : '✓')
  }
}
process.exitCode = failed ? 1 : 0
