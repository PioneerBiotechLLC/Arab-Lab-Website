import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Mono, Poppins } from 'next/font/google'
import { SiteFooter, SiteHeader } from '@/components/site'
import { company } from '@/lib/site-data'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-poppins' })
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-plex' })

export const metadata: Metadata = { title: 'Arab Lab | Scientific Equipment', description: company.positioning, generator: 'v0.app' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#FFFFFF', userScalable: true }

// Header and footer live here so they persist across navigations — one fixed spatial anchor while page content transitions.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${poppins.variable} ${plex.variable}`}><body className="antialiased"><a href="#content" className="skip-link">Skip to content</a><SiteHeader />{children}<SiteFooter />{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
