// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { arServicesHubSeo } from '@/lib/content/ar/services'

export { default } from '../../(en)/services/opengraph-image'
export const alt = arServicesHubSeo.ogAlt
export const size = ogSize
export const contentType = ogContentType
