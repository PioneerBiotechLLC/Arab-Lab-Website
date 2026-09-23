import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Poppins } from 'next/font/google'
import { SiteFooter, SiteHeader } from '@/components/site'
import { JsonLd } from '@/components/json-ld'
import { organization } from '@/lib/schema'
import { isDev, publishedPosts } from '@/lib/blog'
import { arabicLinksEnabled } from '@/lib/i18n'
import { site } from '@/lib/site'
import { pageSeo } from '@/lib/seo-pages'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-poppins' })
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-plex' })
// Arabic face for the "العربية" switcher label only; not preloaded, so English pages download it only if it renders.
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600', '700'], variable: '--font-plex-arabic', preload: false })

// Search engine verification tokens come from env so they never need a code change (see .env.example).
const gsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION
const bing = process.env.NEXT_PUBLIC_BING_VERIFICATION

// metadataBase is always the canonical www host, so canonicals and OG/Twitter image URLs are absolute on www everywhere.
// (Vercel serves preview deployments with X-Robots-Tag: noindex, so previews never compete with production.)
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: pageSeo['/'].title, template: `%s | ${site.shortName}` },
  description: pageSeo['/'].description,
  applicationName: site.name,
  ...(gsc || bing ? { verification: { ...(gsc ? { google: gsc } : {}), ...(bing ? { other: { 'msvalidate.01': bing } } : {}) } } : {}),
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#FFFFFF', userScalable: true }

// English root layout (the Arabic site has its own in app/ar, so each serves the right <html lang dir>).
// Header and footer live here so they persist across navigations — one fixed spatial anchor while page content transitions.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const showBlog = publishedPosts().length > 0 || isDev
  return <html lang="en" className={`${inter.variable} ${poppins.variable} ${plex.variable} ${plexArabic.variable}`}><body className="antialiased"><a href="#content" className="skip-link">Skip to content</a><SiteHeader switcher={arabicLinksEnabled()} showBlog={showBlog} />{children}<SiteFooter showBlog={showBlog} /><JsonLd data={organization()} /><Analytics /></body></html>
}
