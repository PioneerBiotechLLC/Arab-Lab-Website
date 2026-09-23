import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostLayout } from '@/components/blog'
import { ArClosingCta } from '@/components/ar'
import { pageMetadata } from '@/lib/seo'
import { postBySlug, translationOf, visiblePosts } from '@/lib/blog'
import { arabicApproved } from '@/lib/i18n'

export const dynamicParams = false
export function generateStaticParams() { return visiblePosts('ar').map((p) => ({ slug: p.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = postBySlug(slug, 'ar')
  if (!post) return {}
  const en = translationOf(post)
  const indexable = post.status === 'published' && !post.needsNativeReview && arabicApproved()
  const languages = indexable && en?.status === 'published' ? { en: `/blog/${slug}`, ar: `/ar/blog/${slug}`, 'x-default': `/blog/${slug}` } : undefined
  return pageMetadata({ path: `/ar/blog/${slug}`, title: post.seoTitle ?? post.title, absoluteTitle: true, ogTitle: post.title, description: post.description, locale: 'ar_AE', type: 'article', publishedTime: post.date, modifiedTime: post.updated, languages, noindex: !indexable, ogImage: en ? { url: `/blog/${slug}/opengraph-image/card`, alt: post.title } : { url: '/blog/opengraph-image', alt: post.title } })
}

export default async function ArabicPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = postBySlug(slug, 'ar')
  if (!post) notFound()
  return <PostLayout post={post} cta={<ArClosingCta overlap={false} />} />
}
