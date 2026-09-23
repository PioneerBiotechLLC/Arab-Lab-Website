import { ogCard, ogContentType, ogSize } from '@/lib/og'
import { servicesHubSeo } from '@/lib/content/services'

export const alt = servicesHubSeo.ogAlt
export const size = ogSize
export const contentType = ogContentType

export default function Image() { return ogCard(servicesHubSeo.card) }
