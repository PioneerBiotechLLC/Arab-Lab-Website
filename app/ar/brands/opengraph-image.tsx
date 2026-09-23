// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { arPageSeo } from '@/lib/content/ar/pages'

export { default } from '../../(en)/brands/opengraph-image'
export const alt = arPageSeo['/brands'].ogAlt
export const size = ogSize
export const contentType = ogContentType
