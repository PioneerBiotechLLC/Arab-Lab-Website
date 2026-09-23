// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { categoryBySlug } from '@/lib/blog-categories'

export { default } from '../../../../(en)/blog/category/[category]/opengraph-image'

export async function generateImageMetadata({ params }: { params: Promise<{ category: string }> | { category: string } }) {
  const { category } = await params
  return [{ id: 'card', alt: `${categoryBySlug(category)?.nameAr ?? 'المدونة'} — عرب لاب`, size: ogSize, contentType: ogContentType }]
}
