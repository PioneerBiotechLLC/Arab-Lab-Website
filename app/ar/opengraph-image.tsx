// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { arHome } from '@/lib/ar'

export { default } from '../(en)/opengraph-image'
export const alt = arHome.seo.ogAlt
export const size = ogSize
export const contentType = ogContentType
