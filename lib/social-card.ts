// URL of a page's generated social card, for structured data (page <meta> tags get theirs from Next directly).
// English pages live in the app/(en) route group, and Next gives metadata routes inside a group a 6-character suffix:
// the djb2 hash of the parent route pattern (next/dist/lib/metadata/get-metadata-route.js). It is reproduced here.
// Arabic routes (app/ar) are not in a group and carry no suffix.
import { localePath, type Locale } from './i18n'

const djb2 = (s: string) => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) & 0xffffffff; return h >>> 0 }

/** socialCardPath('en', '/blog/[slug]', { slug: 'x' }, 'card') → '/blog/x/opengraph-image-g58prh/card' */
export function socialCardPath(locale: Locale, pattern: string, params: Record<string, string> = {}, id?: string) {
  const path = localePath(locale, pattern.replace(/\[(\w+)\]/g, (_, key: string) => params[key]))
  const suffix = locale === 'en' ? `-${djb2(`/(en)${pattern === '/' ? '' : pattern}`).toString(36).slice(0, 6)}` : ''
  return `${path === '/' ? '' : path}/opengraph-image${suffix}${id ? `/${id}` : ''}`
}
