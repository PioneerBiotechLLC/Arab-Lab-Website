import { ogCard, ogContentType, ogSize } from '@/lib/og'
import { serviceContentBySlug } from '@/lib/content/services'

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params
  return [{ id: 'card', alt: serviceContentBySlug(slug)?.seo.ogAlt ?? 'Arab Lab', size: ogSize, contentType: ogContentType }]
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = serviceContentBySlug(slug)
  return ogCard(content ? content.seo.card : { kicker: 'Arab Lab', title: 'Arab Lab Scientific Equipment' })
}
