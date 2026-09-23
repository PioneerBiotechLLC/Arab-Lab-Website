import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ClosingCta } from '@/components/site'
import { PostLayout } from '@/components/blog'
import { pageMetadata } from '@/lib/seo'
import { postBySlug, translationOf, visiblePosts } from '@/lib/blog'
import { arabicApproved } from '@/lib/i18n'

export const dynamicParams = false
// Production builds only published posts; `pnpm dev` also serves drafts.
export function generateStaticParams() { return visiblePosts('en').map((p) => ({ slug: p.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) return {}
  const ar = translationOf(post)
  const languages = ar && ar.status === 'published' && arabicApproved() ? { en: `/blog/${slug}`, ar: `/ar/blog/${slug}`, 'x-default': `/blog/${slug}` } : undefined
  return pageMetadata({ path: `/blog/${slug}`, title: post.seoTitle ?? post.title, ogTitle: post.title, description: post.description, type: 'article', publishedTime: post.date, modifiedTime: post.updated, languages, noindex: post.status !== 'published' })
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) notFound()
  return <PostLayout post={post} cta={<ClosingCta overlap={false} />} />
}
