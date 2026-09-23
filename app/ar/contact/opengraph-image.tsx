// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { arContact } from '@/lib/ar'

export { default } from '../../(en)/contact/opengraph-image'
export const alt = arContact.seo.ogAlt
export const size = ogSize
export const contentType = ogContentType
