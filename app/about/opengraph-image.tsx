import { ogCard, ogContentType, ogSize } from '@/lib/og'
import { pageSeo } from '@/lib/seo-pages'

const seo = pageSeo['/about']
export const alt = seo.ogAlt
export const size = ogSize
export const contentType = ogContentType

export default function Image() { return ogCard(seo.card) }
