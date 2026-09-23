// Arabic content is gated until a native speaker has reviewed it (SEO-CONTEXT: needsNativeReview). Approved 2026-09-23.
// While unapproved, /ar pages render but are noindex, unlinked from the English site, and absent from the sitemap
// and hreflang. Approve by setting ARABIC_APPROVED to true (or AR_APPROVED=1 in the environment for a preview).
import { officeList } from './site'

export const ARABIC_APPROVED = true
export const arabicApproved = () => ARABIC_APPROVED || process.env.AR_APPROVED === '1'
/** The language switcher shows once approved, and always in development so the pages can be reviewed. */
export const arabicLinksEnabled = () => arabicApproved() || process.env.NODE_ENV === 'development'

/** English path → Arabic path, for the pages that have an Arabic version (blog posts are paired by slug separately). */
export const arPaths: Record<string, string> = {
  '/': '/ar',
  '/contact': '/ar/contact',
  '/locations': '/ar/locations',
  ...Object.fromEntries(officeList.map((o) => [`/locations/${o.slug}`, `/ar/locations/${o.slug}`])),
  '/blog': '/ar/blog',
}

/** hreflang alternates for a page pair, or undefined while Arabic is unapproved. */
export function languagesFor(enPath: string, arPath: string) {
  return arabicApproved() ? { en: enPath, ar: arPath, 'x-default': enPath } : undefined
}
