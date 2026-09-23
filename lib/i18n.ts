// Two locales: English at the root and Arabic under /ar, with the same path below the prefix (/about ↔ /ar/about).
// Arabic was approved by the client on 2026-09-23. Each locale has its own root layout (app/(en) and app/ar), so the
// server HTML carries the right <html lang dir>. ARABIC_APPROVED stays as a switch: set it to false to take every
// Arabic page out of search (noindex, no sitemap entries, no hreflang) without removing anything.

export type Locale = 'en' | 'ar'

export const ARABIC_APPROVED = true
export const arabicApproved = () => ARABIC_APPROVED || process.env.AR_APPROVED === '1'
/** The language switcher shows once approved, and always in development so the pages can be reviewed. */
export const arabicLinksEnabled = () => arabicApproved() || process.env.NODE_ENV === 'development'

export const isArabicPath = (path: string) => path === '/ar' || path.startsWith('/ar/')
/** The English path behind any path: '/ar/about' → '/about', '/ar' → '/'. */
export const englishPath = (path: string) => (isArabicPath(path) ? path.slice(3) || '/' : path)
/** The same page in the given locale: localePath('ar', '/about') → '/ar/about'. Accepts English or Arabic paths. */
export function localePath(locale: Locale, path: string) {
  const en = englishPath(path)
  return locale === 'ar' ? (en === '/' ? '/ar' : `/ar${en}`) : en
}

/** hreflang alternates for a page pair, or undefined while Arabic is switched off. */
export function languagesFor(enPath: string, arPath = localePath('ar', enPath)) {
  return arabicApproved() ? { en: enPath, ar: arPath, 'x-default': enPath } : undefined
}

/** Locale-specific Open Graph values. */
export const ogLocale = (locale: Locale) => (locale === 'ar' ? 'ar_AE' : 'en_US') as 'ar_AE' | 'en_US'

/** A list in running text: "A, B, C" in English (the site's existing style), "أ وب وج" in Arabic. */
export const joinList = (locale: Locale, items: string[]) => items.join(locale === 'ar' ? ' و' : ', ')
