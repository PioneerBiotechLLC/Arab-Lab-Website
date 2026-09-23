// Lists every {{VERIFY: …}} review marker in site content. Runs before `next build` (see package.json).
// Markers render as visible highlights, so the guard fails a production build (VERCEL_ENV=production) while any
// remain in published content: a merge to main cannot put unconfirmed claims or editor notes on the live site.
// Draft blog posts (status: draft) are listed but never block. Override deliberately with SEO_ALLOW_VERIFY=1.

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = join(import.meta.dirname, '../..')
const DIRS = ['app', 'components', 'lib', 'content']
const EXT = /\.(tsx?|mdx?)$/
const MARKER = /\{\{VERIFY:\s*([^}]*)\}\}/g

const walk = (dir: string): string[] => existsSync(dir) ? readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : EXT.test(p) ? [p] : [] }) : []
const isComment = (line: string) => /^\s*(\/\/|\/\*|\*|\{\/\*)/.test(line)

type Hit = { file: string; line: number; note: string; draft: boolean }
const hits: Hit[] = []
for (const file of DIRS.flatMap((d) => walk(join(ROOT, d)))) {
  const src = readFileSync(file, 'utf8')
  const draft = /\.mdx?$/.test(file) && /^---[\s\S]*?\nstatus:\s*['"]?draft/m.test(src)
  src.split('\n').forEach((line, i) => {
    if (isComment(line)) return
    for (const m of line.matchAll(MARKER)) hits.push({ file: relative(ROOT, file), line: i + 1, note: m[1].trim(), draft })
  })
}

const live = hits.filter((h) => !h.draft)
const drafts = hits.filter((h) => h.draft)
if (process.argv.includes('--list')) {
  for (const h of hits) console.log(`${h.draft ? '[draft] ' : ''}${h.file}:${h.line}  ${h.note}`)
}
console.log(`VERIFY markers: ${live.length} in published content, ${drafts.length} in draft posts${process.argv.includes('--list') ? '' : ' (pnpm seo:verify for the list)'}`)

const production = process.env.VERCEL_ENV === 'production'
if (production && live.length && process.env.SEO_ALLOW_VERIFY !== '1') {
  console.error(`\nProduction build stopped: ${live.length} {{VERIFY}} marker(s) would show on the live site.`)
  for (const h of live) console.error(`  ${h.file}:${h.line}  ${h.note}`)
  console.error('Resolve them (confirm and remove the marker, or rewrite the claim), or set SEO_ALLOW_VERIFY=1 to override.')
  process.exit(1)
}
