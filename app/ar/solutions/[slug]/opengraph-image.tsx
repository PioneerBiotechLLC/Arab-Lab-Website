// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { arSolutionContentBySlug } from '@/lib/content/ar/solutions'

export { default } from '../../../(en)/solutions/[slug]/opengraph-image'

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params
  return [{ id: 'card', alt: arSolutionContentBySlug(slug)?.seo.ogAlt ?? 'عرب لاب', size: ogSize, contentType: ogContentType }]
}
