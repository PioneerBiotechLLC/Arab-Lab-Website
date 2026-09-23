// Shared renderer for per-page social cards (1200×630), in the same visual system as app/opengraph-image.tsx:
// wordmark with the connector motif, a mono kicker, the page title, a supporting line, domain and markets.
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { markets } from './site-data'
import { site } from './site'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const fontFiles = Promise.all([readFile(join(process.cwd(), 'assets/fonts/Poppins-Bold.ttf')), readFile(join(process.cwd(), 'assets/fonts/IBMPlexMono-Medium.ttf'))])
const ink = '#0F2438', paper = '#F6F8FA', muted = '#4A5D72', orange = '#AD5A06', brand = '#E68A1F', line = '#7B8DA1'

const clip = (s: string, max: number) => (s.length <= max ? s : `${s.slice(0, s.lastIndexOf(' ', max))}…`)

export async function ogCard({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  const [poppinsBold, plexMedium] = await fontFiles
  const size = title.length <= 28 ? 76 : title.length <= 48 ? 64 : 54
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: paper, color: ink, fontFamily: 'Poppins' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>ARAB&nbsp;<span style={{ color: orange }}>LAB</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: brand }} />
          {Array.from({ length: 22 }, (_, i) => <div key={i} style={{ width: 3, height: 3, borderRadius: 999, background: i < 15 ? brand : line, opacity: i < 15 ? 1 : 0.45 }} />)}
          <div style={{ width: 12, height: 12, borderRadius: 999, border: `2px solid ${brand}`, background: paper }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 1000 }}>
        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 22, color: orange }}>{kicker}</div>
        <div style={{ display: 'flex', fontSize: size, fontWeight: 700, lineHeight: 1.06, letterSpacing: -1.5 }}>{title}</div>
        {subtitle && <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 20, lineHeight: 1.5, color: muted, maxWidth: 940 }}>{clip(subtitle, 170)}</div>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'IBM Plex Mono', fontSize: 20, color: muted }}>
        <span>{site.host}</span>
        <span>{markets.join(' · ')}</span>
      </div>
    </div>,
    { ...ogSize, fonts: [{ name: 'Poppins', data: poppinsBold, style: 'normal', weight: 700 }, { name: 'IBM Plex Mono', data: plexMedium, style: 'normal', weight: 500 }] },
  )
}
