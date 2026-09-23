// Page metadata in one shape: canonical, title, description, Open Graph and Twitter, robots and hreflang.
// Relative paths resolve against metadataBase (the www host) set in app/layout.tsx.
import type { Metadata } from 'next'
import { site } from './site'

export type PageMeta = {
  path: string
  /** Topic part of the title; the root template appends " | Arab Lab". */
  title?: string
  /** Use the title as-is, without the template suffix (home page). */
  absoluteTitle?: boolean
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImageAlt?: string
  noindex?: boolean
  /** hreflang alternates, e.g. { en: '/contact', ar: '/ar/contact', 'x-default': '/contact' }. */
  languages?: Record<string, string>
  locale?: 'en_US' | 'ar_AE'
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  /** Explicit social image (used by /ar pages, which reuse the English page's card: Satori cannot shape Arabic). */
  ogImage?: { url: string; alt: string }
}

export function pageMetadata(m: PageMeta): Metadata {
  const metadata: Metadata = { alternates: { canonical: m.path, ...(m.languages ? { languages: m.languages } : {}) } }
  if (m.title) metadata.title = m.absoluteTitle ? { absolute: m.title } : m.title
  if (m.description) metadata.description = m.description
  if (m.title || m.description) {
    const fullTitle = m.ogTitle ?? (m.title && !m.absoluteTitle ? `${m.title} | ${site.shortName}` : m.title)
    const description = m.ogDescription ?? m.description
    metadata.openGraph = {
      title: fullTitle,
      description,
      url: m.path,
      siteName: site.name,
      locale: m.locale ?? 'en_US',
      type: m.type ?? 'website',
      ...(m.type === 'article' ? { publishedTime: m.publishedTime, modifiedTime: m.modifiedTime } : {}),
      ...(m.ogImage ? { images: [{ url: m.ogImage.url, alt: m.ogImage.alt, width: 1200, height: 630 }] } : {}),
    }
    metadata.twitter = { card: 'summary_large_image', title: fullTitle, description, ...(m.ogImage ? { images: [{ url: m.ogImage.url, alt: m.ogImage.alt }] } : {}) }
  }
  if (m.noindex) metadata.robots = { index: false, follow: true }
  return metadata
}
