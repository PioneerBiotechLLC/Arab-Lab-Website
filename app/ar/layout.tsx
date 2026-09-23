import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Poppins } from 'next/font/google'
import { SiteFooter, SiteHeader } from '@/components/site'
import { JsonLd } from '@/components/json-ld'
import { organization } from '@/lib/schema'
import { isDev, publishedPosts } from '@/lib/blog'
import { arabicLinksEnabled } from '@/lib/i18n'
import { site } from '@/lib/site'
import { arHome } from '@/lib/ar'
import '../globals.css'

// Arabic is the text face here, so it is preloaded; the Latin faces stay available for brand and product names.
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], weight: ['400', '500', '600', '700'], variable: '--font-plex-arabic' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', preload: false })
const poppins = Poppins({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-poppins', preload: false })
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-plex', preload: false })

const gsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION
const bing = process.env.NEXT_PUBLIC_BING_VERIFICATION

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: arHome.seo.title, template: '%s | عرب لاب' },
  description: arHome.seo.description,
  applicationName: site.name,
  ...(gsc || bing ? { verification: { ...(gsc ? { google: gsc } : {}), ...(bing ? { other: { 'msvalidate.01': bing } } : {}) } } : {}),
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#FFFFFF', userScalable: true }

// Arabic root layout: the whole document is right-to-left with Arabic typography (globals.css [lang='ar']).
// Moving between the English and Arabic sites is a full page load, since each has its own root layout.
export default function ArabicRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const showBlog = publishedPosts('ar').length > 0 || isDev
  return <html lang="ar" dir="rtl" className={`${plexArabic.variable} ${inter.variable} ${poppins.variable} ${plex.variable}`}><body className="antialiased"><a href="#content" className="skip-link">انتقل إلى المحتوى</a><SiteHeader switcher={arabicLinksEnabled()} showBlog={showBlog} />{children}<SiteFooter showBlog={showBlog} /><JsonLd data={organization()} /><Analytics /></body></html>
}
