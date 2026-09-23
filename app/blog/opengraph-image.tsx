import { ogCard, ogContentType, ogSize } from '@/lib/og'
import { blogSeo } from '@/lib/blog-seo'

export const alt = blogSeo.ogAlt
export const size = ogSize
export const contentType = ogContentType

export default function Image() { return ogCard(blogSeo.card) }
