import type { MetadataRoute } from 'next'
import { indexableRoutes } from '@/lib/routes'
import { absoluteUrl } from '@/lib/site'

// Built from lib/routes.ts. hreflang alternates are emitted only for routes that have a published translation.
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...(route.languages ? { alternates: { languages: Object.fromEntries(Object.entries(route.languages).map(([lang, path]) => [lang, absoluteUrl(path)])) } } : {}),
  }))
}
