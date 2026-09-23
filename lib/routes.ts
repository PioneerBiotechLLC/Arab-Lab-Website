// Every indexable route, in one list. The sitemap, the SEO audit script and hreflang all read from here,
// so a new page type is registered once. Routes that are noindex (drafts, unapproved Arabic pages) never appear.
import { site } from './site'
import { brands, programs, solutions } from './site-data'
import { officeList } from './site'
import { publishedPosts } from './blog'

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
    ...solutions.map((s) => ({ path: `/solutions/${s.slug}`, lastModified: updated, changeFrequency: 'monthly' as const, priority: 0.9 })),
    { path: '/services', lastModified: updated, changeFrequency: 'monthly', priority: 0.8 },
    ...programs.map((p) => ({ path: `/services/${p.slug}`, lastModified: updated, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { path: '/brands', lastModified: updated, changeFrequency: 'monthly', priority: 0.9 },
    ...brands.map((brand) => ({ path: `/brands/${brand.slug}`, lastModified: updated, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { path: '/locations', lastModified: updated, changeFrequency: 'yearly', priority: 0.7 },
    ...officeList.map((o) => ({ path: `/locations/${o.slug}`, lastModified: updated, changeFrequency: 'yearly' as const, priority: 0.8 })),
    { path: '/contact', lastModified: updated, changeFrequency: 'yearly', priority: 0.8 },
    ...blogRoutes(),
    { path: '/privacy', lastModified: updated, changeFrequency: 'yearly', priority: 0.2 },
    { path: '/terms', lastModified: updated, changeFrequency: 'yearly', priority: 0.2 },
    { path: '/data-collection', lastModified: updated, changeFrequency: 'yearly', priority: 0.2 },
  ]
}

/** Blog index, published posts and categories that have published posts. Nothing is listed until a post is published. */
function blogRoutes(): RouteEntry[] {
  const posts = publishedPosts('en')
  if (!posts.length) return []
  const categories = [...new Set(posts.map((p) => p.category))]
  return [
    { path: '/blog', lastModified: posts[0].updated, changeFrequency: 'weekly', priority: 0.7 },
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastModified: p.updated, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...categories.map((c) => ({ path: `/blog/category/${c}`, lastModified: posts[0].updated, changeFrequency: 'weekly' as const, priority: 0.4 })),
  ]
}
