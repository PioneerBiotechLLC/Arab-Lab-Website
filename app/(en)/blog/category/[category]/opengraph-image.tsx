import { ogCard, ogContentType, ogSize } from '@/lib/og'
import { categoryBySlug } from '@/lib/blog-categories'

export async function generateImageMetadata({ params }: { params: Promise<{ category: string }> | { category: string } }) {
  const { category } = await params
  return [{ id: 'card', alt: `${categoryBySlug(category)?.name ?? 'Blog'} articles — Arab Lab`, size: ogSize, contentType: ogContentType }]
}

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const c = categoryBySlug(category)
  return ogCard({ kicker: 'Blog category', title: c?.name ?? 'Laboratory insights', subtitle: c?.description })
}
