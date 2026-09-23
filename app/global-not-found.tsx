import type { Metadata } from 'next'
import Link from 'next/link'
import { IBM_Plex_Sans_Arabic, Poppins } from 'next/font/google'
import './globals.css'

// Unmatched URLs on either site. English and Arabic have separate root layouts, so this page carries its own
// document, fonts and styles, and speaks both languages.
const poppins = Poppins({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-poppins' })
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '600'], variable: '--font-plex-arabic' })

export const metadata: Metadata = { title: 'Page not found | Arab Lab', description: 'The page you are looking for does not exist.', robots: { index: false, follow: true } }

export default function GlobalNotFound() {
  return <html lang="en" className={`${poppins.variable} ${plexArabic.variable}`}><body className="antialiased">
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-12 px-5 py-20">
      <p className="font-heading text-lg font-bold text-ink">ARAB <span className="text-orange">LAB</span></p>
      <div className="grid gap-10 md:grid-cols-2">
        <section>
          <h1 className="font-heading text-4xl font-bold text-ink">Page not found.</h1>
          <p className="mt-4 leading-7 text-muted-foreground">The page may have moved. Start again from the home page.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-orange px-6 py-3 font-heading text-sm font-semibold text-white hover:bg-amber">Arab Lab home</Link>
        </section>
        <section lang="ar" dir="rtl">
          <p className="font-heading text-4xl font-bold text-ink">الصفحة غير موجودة.</p>
          <p className="mt-4 leading-8 text-muted-foreground">ربما نُقلت الصفحة. ابدأ من جديد من الصفحة الرئيسية.</p>
          <Link href="/ar" className="mt-6 inline-flex rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white hover:bg-amber">الصفحة الرئيسية لعرب لاب</Link>
        </section>
      </div>
    </main>
  </body></html>
}
