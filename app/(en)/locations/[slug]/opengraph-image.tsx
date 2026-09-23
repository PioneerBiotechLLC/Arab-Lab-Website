import { ogCard, ogContentType, ogSize } from '@/lib/og'
import { locationContentBySlug } from '@/lib/content/locations'

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params
  return [{ id: 'card', alt: locationContentBySlug(slug)?.seo.ogAlt ?? 'Arab Lab office', size: ogSize, contentType: ogContentType }]
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = locationContentBySlug(slug)
  return ogCard(content ? content.seo.card : { kicker: 'Office', title: 'Arab Lab' })
}
