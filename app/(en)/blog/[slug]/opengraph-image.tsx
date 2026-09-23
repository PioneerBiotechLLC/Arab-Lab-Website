import { ogCard, ogContentType, ogSize } from '@/lib/og'
import { postBySlug } from '@/lib/blog'
import { categoryBySlug } from '@/lib/blog-categories'

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params
  return [{ id: 'card', alt: postBySlug(slug)?.title ?? 'Arab Lab blog', size: ogSize, contentType: ogContentType }]
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = postBySlug(slug)
  return ogCard(post ? { kicker: `Blog · ${categoryBySlug(post.category)?.name ?? ''}`, title: post.title, subtitle: post.description } : { kicker: 'Blog', title: 'Laboratory insights' })
}
