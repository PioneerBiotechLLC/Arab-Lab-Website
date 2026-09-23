import { ogCard, ogContentType, ogSize } from '@/lib/og'
import { solutionContentBySlug } from '@/lib/content/solutions'

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params
  return [{ id: 'card', alt: solutionContentBySlug(slug)?.seo.ogAlt ?? 'Arab Lab', size: ogSize, contentType: ogContentType }]
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = solutionContentBySlug(slug)
  return ogCard(content ? content.seo.card : { kicker: 'Arab Lab', title: 'Arab Lab Scientific Equipment' })
}
