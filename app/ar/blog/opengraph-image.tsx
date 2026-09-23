// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { arBlog } from '@/lib/ar'

export { default } from '../../(en)/blog/opengraph-image'
export const alt = arBlog.seo.ogAlt
export const size = ogSize
export const contentType = ogContentType
