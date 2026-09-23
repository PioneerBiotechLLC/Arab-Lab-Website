// Every indexable route, in one list. The sitemap, the SEO audit script and hreflang all read from here,
// so a new page type is registered once. Routes that are noindex (drafts, unapproved Arabic pages) never appear.
import { site } from './site'
import { brands, programs, solutions } from './site-data'
import { officeList } from './site'
import { publishedPosts } from './blog'
import { arabicApproved, localePath } from './i18n'

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
  return withArabic([
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
  ])
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

/** Once Arabic is approved: add each Arabic counterpart and the en/ar/x-default alternates on both sides. Every page
 * has an Arabic version at /ar + path; blog posts and categories only where an Arabic post is published. */
function withArabic(routes: RouteEntry[]): RouteEntry[] {
  if (!arabicApproved()) return routes
  const arPosts = publishedPosts('ar').filter((p) => !p.needsNativeReview)
  const arSlugs = new Set(arPosts.map((p) => p.slug))
  const arCategories = new Set(arPosts.map((p) => p.category))
  const hasArabic = (path: string) => {
    if (path === '/blog') return arPosts.length > 0
    if (path.startsWith('/blog/category/')) return arCategories.has(path.slice('/blog/category/'.length))
    if (path.startsWith('/blog/')) return arSlugs.has(path.slice('/blog/'.length))
    return true
  }
  const out: RouteEntry[] = []
  for (const route of routes) {
    if (!hasArabic(route.path)) { out.push(route); continue }
    const ar = localePath('ar', route.path)
    const languages = { en: route.path, ar, 'x-default': route.path }
    out.push({ ...route, languages }, { ...route, path: ar, languages })
  }
  return out
}
