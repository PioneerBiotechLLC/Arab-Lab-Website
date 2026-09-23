// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { arLocations } from '@/lib/ar'

export { default } from '../../(en)/locations/opengraph-image'
export const alt = arLocations.seo.ogAlt
export const size = ogSize
export const contentType = ogContentType
