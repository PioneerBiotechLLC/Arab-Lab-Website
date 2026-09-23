// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { postBySlug } from '@/lib/blog'

export { default } from '../../../(en)/blog/[slug]/opengraph-image'

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params
  return [{ id: 'card', alt: postBySlug(slug, 'ar')?.title ?? 'مدونة عرب لاب', size: ogSize, contentType: ogContentType }]
}
