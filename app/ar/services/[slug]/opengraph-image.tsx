// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { arServiceContentBySlug } from '@/lib/content/ar/services'

export { default } from '../../../(en)/services/[slug]/opengraph-image'

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params
  return [{ id: 'card', alt: arServiceContentBySlug(slug)?.seo.ogAlt ?? 'عرب لاب', size: ogSize, contentType: ogContentType }]
}
