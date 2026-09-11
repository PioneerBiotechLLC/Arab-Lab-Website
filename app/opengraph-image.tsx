import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { company, markets } from '@/lib/site-data'

// Generated at build from the site's own tokens and copy — no PNG to keep in sync.
export const alt = 'Arab Lab Scientific Equipment — a trusted partner for Life Science industries'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Loaded once per process; awaited inside the handler so the module needs no top-level await.
const fontFiles = Promise.all([readFile(join(process.cwd(), 'assets/fonts/Poppins-Bold.ttf')), readFile(join(process.cwd(), 'assets/fonts/IBMPlexMono-Medium.ttf'))])

// Tokens mirrored from globals.css (Satori cannot read CSS variables).
const ink = '#0F2438', paper = '#F6F8FA', muted = '#4A5D72', orange = '#AD5A06', brand = '#E68A1F', line = '#7B8DA1'

export default async function Image() {
  const [poppinsBold, plexMedium] = await fontFiles
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: paper, color: ink, fontFamily: 'Poppins' }}>
      {/* Wordmark + connector line: origin node, dotted run, end node — the site's structural motif. */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>ARAB&nbsp;<span style={{ color: orange }}>LAB</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: brand }} />
          {Array.from({ length: 22 }, (_, i) => <div key={i} style={{ width: 3, height: 3, borderRadius: 999, background: i < 15 ? brand : line, opacity: i < 15 ? 1 : 0.45 }} />)}
          <div style={{ width: 12, height: 12, borderRadius: 999, border: `2px solid ${brand}`, background: paper }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 980 }}>
        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 22, color: orange }}>Life Science · Diagnostics · Food &amp; Beverage</div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 74, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2 }}>
          <span>Your lab is smart?</span>
          <span style={{ display: 'flex' }}>We’ll make it&nbsp;<span style={{ color: orange }}>smarter!</span></span>
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 20, lineHeight: 1.5, color: muted, maxWidth: 900 }}>{company.positioning}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'IBM Plex Mono', fontSize: 20, color: muted }}>
        <span>arablab-scientific.com</span>
        <span>{markets.join(' · ')}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Poppins', data: poppinsBold, style: 'normal', weight: 700 },
        { name: 'IBM Plex Mono', data: plexMedium, style: 'normal', weight: 500 },
      ],
    },
  )
}
