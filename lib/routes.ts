// Every indexable route, in one list. The sitemap, the SEO audit script and hreflang all read from here,
// so a new page type is registered once. Routes that are noindex (drafts, unapproved Arabic pages) never appear.
import { site } from './site'
import { brands } from './site-data'

export type RouteEntry = {
  path: string
  lastModified: string
  changeFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority?: number
  /** hreflang alternates for this URL, including itself, e.g. { en: '/contact', ar: '/ar/contact' }. */
  languages?: Record<string, string>
}

const updated = site.contentUpdated

export function indexableRoutes(): RouteEntry[] {
  return [
    { path: '/', lastModified: updated, changeFrequency: 'monthly', priority: 1 },
    { path: '/about', lastModified: updated, changeFrequency: 'yearly', priority: 0.7 },
    { path: '/solutions', lastModified: updated, changeFrequency: 'monthly', priority: 0.9 },
    { path: '/brands', lastModified: updated, changeFrequency: 'monthly', priority: 0.9 },
    ...brands.map((brand) => ({ path: `/brands/${brand.slug}`, lastModified: updated, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { path: '/locations', lastModified: updated, changeFrequency: 'yearly', priority: 0.7 },
    { path: '/contact', lastModified: updated, changeFrequency: 'yearly', priority: 0.8 },
    { path: '/privacy', lastModified: updated, changeFrequency: 'yearly', priority: 0.2 },
    { path: '/terms', lastModified: updated, changeFrequency: 'yearly', priority: 0.2 },
    { path: '/data-collection', lastModified: updated, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
