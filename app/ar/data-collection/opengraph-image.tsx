// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { arLegalSeo } from '@/lib/content/ar/legal'

export { default } from '../../(en)/data-collection/opengraph-image'
export const alt = arLegalSeo['data-collection'].ogAlt
export const size = ogSize
export const contentType = ogContentType
