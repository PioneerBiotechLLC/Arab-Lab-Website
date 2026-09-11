// Asset pipeline for the visual plan. Run with `pnpm assets <command>` (Node 24 runs the .ts directly).
//
//   plan                       write every prompt (style appended) to design-src/generated/prompts/ + flow-batch.md — no key needed
//   gen [ids…] [--n 2] [--model m] [--size 1K|2K|4K]
//                              generate candidate images (all images when no ids; videos only when named)
//   sheet                      build design-src/generated/contact-sheet.html to compare candidates
//   approve id=v [id=v…]       choose a candidate per asset, then publish it
//   publish [ids…] [--force]   resize/crop/encode approved candidates into public/ within budget
//   status                     what exists, what is approved, what is published, sizes vs budget
//
// Candidates are never overwritten — each run adds v<n>. public/ files are only written by publish.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync, copyFileSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { execFileSync, spawnSync } from 'node:child_process'
import sharp from 'sharp'
import { manifest, byId, type Asset } from './manifest.ts'
import { house, houseVideo } from './styles.ts'
import { apiKey, generateImage, generateVideo, loadEnv, type ImageResult } from './gemini.ts'
import { renderSheet } from './sheet.ts'

export const ROOT = resolve(import.meta.dirname, '../..')
export const GEN = join(ROOT, 'design-src/generated')
export const CANDIDATES = join(GEN, 'candidates')
const APPROVALS = join(GEN, 'approvals.json')

type Approvals = Record<string, { version: number; publishedFrom?: string; publishedAt?: string }>
const readApprovals = (): Approvals => (existsSync(APPROVALS) ? JSON.parse(readFileSync(APPROVALS, 'utf8')) : {})
const writeApprovals = (a: Approvals) => { mkdirSync(GEN, { recursive: true }); writeFileSync(APPROVALS, JSON.stringify(a, null, 2) + '\n') }

export const fullPrompt = (a: Asset) => (a.style === 'house' ? `${a.prompt}\n\n${house}` : a.style === 'video' ? `${a.prompt}\n\n${houseVideo}` : a.prompt)

export type Candidate = { version: number; file: string; meta: any }
export function candidates(id: string): Candidate[] {
  const dir = join(CANDIDATES, id)
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => /^v\d+\.(png|jpe?g|webp|mp4)$/.test(f))
    .map((f) => ({ version: Number(f.match(/^v(\d+)/)![1]), file: join(dir, f), meta: existsSync(join(dir, f.replace(/\.\w+$/, '.json'))) ? JSON.parse(readFileSync(join(dir, f.replace(/\.\w+$/, '.json')), 'utf8')) : {} }))
    .sort((a, b) => a.version - b.version)
}

const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`
const args = process.argv.slice(2)
const flag = (name: string, fallback?: string) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : fallback }
const has = (name: string) => args.includes(`--${name}`)
const positional = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--') && !['force', 'pro', 'yes', 'open'].includes(args[i - 1].slice(2))))
const command = positional[0]
const ids = positional.slice(1)

function pick(list: string[]): Asset[] {
  if (!list.length) return manifest
  return list.map((id) => { const a = byId[id]; if (!a) throw new Error(`Unknown asset id "${id}". Run: pnpm assets status`); return a })
}

// ── plan ────────────────────────────────────────────────────────────────────
function plan() {
  const dir = join(GEN, 'prompts')
  mkdirSync(dir, { recursive: true })
  const lines = ['# Arab Lab — Flow batch', '', 'Paste each block into Flow as-is. Order matters: the hero first, then everything else inherits its light.', '']
  for (const a of manifest) {
    writeFileSync(join(dir, `${a.id}.txt`), fullPrompt(a) + '\n')
    const spec = a.kind === 'video' ? `${a.width}×${a.height} · 8 s · ${a.ratio} · first frame = ${a.firstFrame}` : `${a.width}×${a.height} · ${a.ratio} · WebP ≤ ${a.maxKB} KB`
    lines.push(`## ${a.id}`, '', `- **Save as:** \`${a.out}${a.kind === 'video' ? '.mp4' : ''}\``, `- **Spec:** ${spec}`, `- **Used by:** ${a.usedBy}`, ...(a.note ? [`- **Note:** ${a.note}`] : []), '', '```', fullPrompt(a), '```', '')
  }
  writeFileSync(join(GEN, 'flow-batch.md'), lines.join('\n'))
  console.log(`Wrote ${manifest.length} prompts → design-src/generated/prompts/ and design-src/generated/flow-batch.md`)
}

// ── gen ─────────────────────────────────────────────────────────────────────
async function firstFrame(a: Asset): Promise<ImageResult | undefined> {
  if (!a.firstFrame) return
  const src = byId[a.firstFrame]
  const approved = readApprovals()[src.id]
  const cand = approved && candidates(src.id).find((c) => c.version === approved.version)
  const file = cand?.file ?? (existsSync(join(ROOT, src.out)) ? join(ROOT, src.out) : null)
  if (!file) throw new Error(`${a.id} needs a first frame: approve "${src.id}" first or place ${src.out}`)
  console.log(`  first frame ← ${file.replace(ROOT + '/', '')}`)
  // Veo wants a PNG/JPEG at a sane size; re-encode whatever we have.
  const data = await sharp(file).resize(1920, 1080, { fit: 'cover' }).png().toBuffer()
  return { data, mime: 'image/png' }
}

async function gen() {
  loadEnv(ROOT)
  if (!apiKey()) { console.error('No GEMINI_API_KEY in .env.local. `pnpm assets plan` still works without one.'); process.exit(1) }
  const list = ids.length ? pick(ids) : manifest.filter((a) => a.kind === 'image')
  const n = Number(flag('n', '2'))
  const imageModel = flag('model', process.env.ASSET_IMAGE_MODEL || (has('pro') ? 'gemini-3-pro-image' : 'gemini-3.1-flash-image'))!
  const videoModel = flag('video-model', process.env.ASSET_VIDEO_MODEL || 'veo-3.1-generate-preview')!
  const sizeOverride = flag('size') as Asset['imageSize'] | undefined
  console.log(`${list.length} asset(s) × ${n} candidate(s) · images: ${imageModel} · video: ${videoModel}\n`)
  let failures = 0
  for (const a of list) {
    const dir = join(CANDIDATES, a.id)
    mkdirSync(dir, { recursive: true })
    const existing = candidates(a.id)
    let next = (existing.at(-1)?.version ?? 0) + 1
    const count = a.kind === 'video' ? 1 : n
    for (let k = 0; k < count; k++, next++) {
      const label = `${a.id} v${next}`
      const t0 = Date.now()
      try {
        if (a.kind === 'video') {
          process.stdout.write(`${label}: starting Veo…`)
          const frame = await firstFrame(a)
          const mp4 = await generateVideo({ model: videoModel, prompt: fullPrompt(a), aspectRatio: '16:9', resolution: '1080p', durationSeconds: 8, firstFrame: frame, onPoll: (s) => process.stdout.write(`\r${label}: rendering… ${s}s`) })
          writeFileSync(join(dir, `v${next}.mp4`), mp4)
          writeFileSync(join(dir, `v${next}.json`), JSON.stringify({ model: videoModel, prompt: fullPrompt(a), at: new Date().toISOString(), ms: Date.now() - t0, firstFrame: a.firstFrame }, null, 2))
          console.log(`\r${label}: ${kb(mp4.length)} in ${Math.round((Date.now() - t0) / 1000)}s`)
        } else {
          process.stdout.write(`${label}: …`)
          const img = await generateImage({ model: imageModel, prompt: fullPrompt(a), aspectRatio: a.ratio, imageSize: sizeOverride ?? a.imageSize })
          const ext = img.mime.includes('jpeg') ? 'jpg' : img.mime.includes('webp') ? 'webp' : 'png'
          writeFileSync(join(dir, `v${next}.${ext}`), img.data)
          const m = await sharp(img.data).metadata()
          writeFileSync(join(dir, `v${next}.json`), JSON.stringify({ model: imageModel, prompt: fullPrompt(a), at: new Date().toISOString(), ms: Date.now() - t0, width: m.width, height: m.height }, null, 2))
          console.log(`\r${label}: ${m.width}×${m.height} ${kb(img.data.length)} in ${((Date.now() - t0) / 1000).toFixed(1)}s`)
        }
      } catch (e: any) {
        failures++
        console.log(`\r${label}: FAILED — ${e.message}`)
        if (/free_tier[\s\S]*limit: 0/.test(e.message)) { console.log('\nThis key’s project is on the Free tier, which has no image-generation quota. Enable billing at https://aistudio.google.com/plan (Tier 1), then re-run — existing candidates are kept.'); await sheet(); return }
        if (/quota|RESOURCE_EXHAUSTED|429/i.test(e.message)) { console.log('Rate limit hit — stopping. Re-run in a minute; existing candidates are kept.'); await sheet(); return }
      }
    }
  }
  await sheet()
  if (failures) console.log(`\n${failures} generation(s) failed.`)
}

// ── sheet ───────────────────────────────────────────────────────────────────
async function sheet() {
  mkdirSync(GEN, { recursive: true })
  const html = renderSheet(manifest.map((a) => ({ asset: a, candidates: candidates(a.id).map((c) => ({ ...c, rel: c.file.replace(GEN + '/', '') })), approved: readApprovals()[a.id]?.version, published: existsSync(join(ROOT, a.kind === 'video' ? a.out + '.mp4' : a.out)) })))
  const file = join(GEN, 'contact-sheet.html')
  writeFileSync(file, html)
  console.log(`Contact sheet → ${file.replace(ROOT + '/', '')}`)
  if (has('open')) spawnSync('open', [file])
}

// ── approve / publish ───────────────────────────────────────────────────────
async function approve() {
  const approvals = readApprovals()
  const chosen: string[] = []
  for (const pair of ids) {
    const m = pair.match(/^([\w-]+)=v?(\d+)$/)
    if (!m) throw new Error(`Expected id=version, got "${pair}"`)
    const a = byId[m[1]]
    if (!a) throw new Error(`Unknown asset id "${m[1]}"`)
    const v = Number(m[2])
    if (!candidates(a.id).some((c) => c.version === v)) throw new Error(`${a.id} has no candidate v${v}`)
    approvals[a.id] = { ...approvals[a.id], version: v }
    chosen.push(a.id)
  }
  writeApprovals(approvals)
  await publish(chosen)
}

const ffmpeg = () => { try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); return true } catch { return false } }

async function encodeImage(a: Asset, src: string): Promise<{ bytes: number; quality: number }> {
  const out = join(ROOT, a.out)
  mkdirSync(dirname(out), { recursive: true })
  const base = sharp(src).rotate().resize(a.width, a.height, { fit: 'cover', position: 'centre', kernel: 'lanczos3' })
  for (let q = 82; q >= 54; q -= 6) {
    const buf = await base.clone().webp({ quality: q, effort: 6, smartSubsample: true }).toBuffer()
    if (buf.length <= a.maxKB * 1024 || q === 54) { writeFileSync(out, buf); return { bytes: buf.length, quality: q } }
  }
  throw new Error('unreachable')
}

function encodeVideo(a: Asset, src: string): string[] {
  const outBase = join(ROOT, a.out)
  mkdirSync(dirname(outBase), { recursive: true })
  if (!ffmpeg()) {
    copyFileSync(src, outBase + '.mp4')
    return [`${a.out}.mp4 copied as-is (install ffmpeg — \`brew install ffmpeg\` — to re-encode to budget and add the VP9 .webm)`]
  }
  const scale = `scale=${a.width}:${a.height}:force_original_aspect_ratio=increase,crop=${a.width}:${a.height}`
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', src, '-an', '-vf', scale, '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', outBase + '.mp4'])
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', src, '-an', '-vf', scale, '-c:v', 'libvpx-vp9', '-crf', '33', '-b:v', '0', '-row-mt', '1', outBase + '.webm'])
  return [`${a.out}.mp4 ${kb(statSync(outBase + '.mp4').size)}`, `${a.out}.webm ${kb(statSync(outBase + '.webm').size)}`]
}

async function publish(only: string[] = ids) {
  const approvals = readApprovals()
  const list = (only.length ? pick(only) : manifest).filter((a) => approvals[a.id])
  if (!list.length) { console.log('Nothing approved yet. Build the sheet (`pnpm assets sheet --open`) and run `pnpm assets approve <id>=<v>`.'); return }
  for (const a of list) {
    const ap = approvals[a.id]
    const cand = candidates(a.id).find((c) => c.version === ap.version)
    if (!cand) { console.log(`${a.id}: approved v${ap.version} is missing from candidates — skipped`); continue }
    const target = join(ROOT, a.kind === 'video' ? a.out + '.mp4' : a.out)
    const rel = cand.file.replace(ROOT + '/', '')
    const foreign = existsSync(target) && ap.publishedFrom !== rel
    if (foreign && !has('force')) { console.log(`${a.id}: ${a.out} already exists and was not published by this pipeline — pass --force to replace it`); continue }
    if (a.kind === 'video') {
      for (const line of encodeVideo(a, cand.file)) console.log(`${a.id}: ${line}`)
    } else {
      const r = await encodeImage(a, cand.file)
      const over = r.bytes > a.maxKB * 1024
      console.log(`${a.id}: ${a.out} ${a.width}×${a.height} q${r.quality} ${kb(r.bytes)}${over ? ` — OVER budget (${a.maxKB} KB) even at q54; consider a calmer candidate` : ''}`)
    }
    approvals[a.id] = { ...ap, publishedFrom: rel, publishedAt: new Date().toISOString() }
  }
  writeApprovals(approvals)
}

// ── status ──────────────────────────────────────────────────────────────────
function status() {
  loadEnv(ROOT)
  const approvals = readApprovals()
  const rows = manifest.map((a) => {
    const c = candidates(a.id)
    const file = join(ROOT, a.kind === 'video' ? a.out + '.mp4' : a.out)
    const pub = existsSync(file) ? statSync(file).size : 0
    const ap = approvals[a.id]
    const state = pub ? (ap?.publishedFrom ? 'published' : 'present (external)') : ap ? 'approved' : c.length ? 'candidates' : 'todo'
    return { id: a.id, group: a.group, spec: `${a.width}×${a.height} ${a.ratio}`, candidates: c.length, approved: ap ? `v${ap.version}` : '', file: pub ? `${kb(pub)} / ${a.maxKB} KB${pub > a.maxKB * 1024 ? ' OVER' : ''}` : '', state }
  })
  console.table(rows)
  const todo = rows.filter((r) => r.state === 'todo').length
  console.log(`${manifest.length} assets · ${rows.filter((r) => r.state.startsWith('p')).length} in public/ · ${todo} not yet generated · key: ${apiKey() ? 'found' : 'missing (.env.local GEMINI_API_KEY)'} · ffmpeg: ${ffmpeg() ? 'found' : 'missing'}`)
}

const commands: Record<string, () => Promise<void> | void> = { plan, gen, sheet, approve, publish, status }
if (!command || !commands[command]) {
  console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(0, 12).map((l) => l.replace(/^\/\/ ?/, '')).join('\n'))
  process.exit(command ? 1 : 0)
}
commands[command]!()?.catch?.((e: Error) => { console.error(e.message); process.exit(1) })
