// Normalises partner logos into one optically balanced set.
//
//   pnpm logos
//
// Masters live in design-src/brands/ exactly as each partner supplied them. This writes
// public/brands/<slug>.webp: a 200px-tall transparent canvas as wide as the mark itself, the mark
// trimmed, scaled to a constant ink area (so a compact mark reads as large as a long wordmark),
// capped in height and centred vertically. One CSS height then sizes all seven, and each image's
// box is exactly as wide as what it shows. Widths are written to lib/brand-logos.json so the
// <Image> attributes match and nothing shifts on load.
//
// A mark supplied white-on-transparent (Parker) is recoloured to ink, since the site only ever
// places logos on white and pale-grey tiles. Nothing else is recoloured — partner colour is theirs.

import { existsSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve, extname } from 'node:path'
import sharp from 'sharp'

const ROOT = resolve(import.meta.dirname, '../..')
const SRC = join(ROOT, 'design-src/brands')
const OUT = join(ROOT, 'public/brands')

export const HEIGHT = 200
const MAX_WIDTH = 660
const TARGET_AREA = 70_000 // ink area every mark is scaled to
const MAX_HEIGHT = 170 // keeps a square mark from towering over the wordmarks
const INK = { r: 15, g: 36, b: 56 } // --ink #0F2438

/** Master filenames as partners sent them, keyed by brand slug in site-data. */
const masters: Record<string, string> = {
  eppendorf: 'Eppendorf-Logo.svg.webp',
  parker: 'parker-logo.png',
  lonza: 'Lonza_Logo.svg.webp',
  promicol: 'Promicol-logo.png',
  pmm: 'PMM-logo.png',
  'cpc-biotech': 'CPC Biotech-logo.png',
  tailin: 'Tailin.svg',
}

/** Mean luminance of the pixels a mark actually paints — a white mark would vanish on a white tile. */
async function inkLuminance(buf: Buffer) {
  const { data } = await sharp(buf).ensureAlpha().resize(200, 200, { fit: 'inside' }).raw().toBuffer({ resolveWithObject: true })
  let n = 0, sum = 0
  for (let i = 0; i < data.length; i += 4) if (data[i + 3] > 128) { n++; sum += data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114 }
  return n ? sum / n : 0
}

export async function buildLogos() {
  mkdirSync(OUT, { recursive: true })
  const rows: Record<string, string>[] = []
  const sizes: Record<string, { width: number; height: number }> = {}
  for (const [slug, file] of Object.entries(masters)) {
    const src = join(SRC, file)
    if (!existsSync(src)) { console.log(`${slug}: no master at design-src/brands/${file} — skipped`); continue }
    // SVG rasterises at a high density so the trimmed mark still has pixels to spare at 660px.
    const density = extname(file).toLowerCase() === '.svg' ? 1200 : 72
    const trimmed = await sharp(src, { density }).ensureAlpha().trim({ threshold: 1 }).png().toBuffer()
    const meta = await sharp(trimmed).metadata()
    const ratio = meta.width! / meta.height!

    let height = Math.round(Math.sqrt(TARGET_AREA / ratio))
    let width = Math.round(height * ratio)
    if (height > MAX_HEIGHT) { height = MAX_HEIGHT; width = Math.round(height * ratio) }
    if (width > MAX_WIDTH) { width = MAX_WIDTH; height = Math.round(width / ratio) }

    const lum = await inkLuminance(trimmed)
    const light = lum > 200
    let mark = sharp(trimmed).resize(width, height, { fit: 'inside' })
    if (light) {
      // Keep the alpha channel, replace every colour channel with ink.
      const alpha = await mark.clone().extractChannel('alpha').toBuffer()
      mark = sharp({ create: { width, height, channels: 3, background: INK } }).joinChannel(await sharp(alpha).resize(width, height, { fit: 'inside' }).toBuffer())
    }

    await sharp({ create: { width, height: HEIGHT, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: await mark.png().toBuffer(), left: 0, top: Math.round((HEIGHT - height) / 2) }])
      .webp({ quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(join(OUT, `${slug}.webp`))

    sizes[slug] = { width, height: HEIGHT }
    rows.push({ slug, master: file, source: `${meta.width}×${meta.height}`, placed: `${width}×${height}`, ink: light ? 'recoloured to ink' : `as supplied (lum ${Math.round(lum)})` })
  }
  writeFileSync(join(ROOT, 'lib/brand-logos.json'), JSON.stringify(sizes, null, 2) + '\n')
  console.table(rows)
  const stray = readdirSync(SRC).filter((f) => !Object.values(masters).includes(f) && !f.startsWith('.'))
  if (stray.length) console.log(`Masters not mapped to a slug: ${stray.join(', ')}`)
}

buildLogos().catch((e: Error) => { console.error(e.message); process.exit(1) })
