import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ClosingCta, PageSection, PageShell, SectionIntro } from '@/components/site'
import { PostGrid } from '@/components/blog'
import { pageMetadata } from '@/lib/seo'
import { categories, categoryBySlug } from '@/lib/blog-categories'
import { visiblePosts } from '@/lib/blog'

export const dynamicParams = false
export function generateStaticParams() { const used = new Set(visiblePosts('en').map((p) => p.category)); return categories.filter((c) => used.has(c.slug)).map((c) => ({ category: c.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const c = categoryBySlug(category)
  return c ? pageMetadata({ path: `/blog/category/${c.slug}`, title: `${c.name} Articles`, description: c.description }) : {}
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const c = categoryBySlug(category)
  const posts = visiblePosts('en').filter((p) => p.category === category)
  if (!c || !posts.length) notFound()
  return <PageShell breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: c.name, href: `/blog/category/${c.slug}` }]} title={c.name} intro={c.description}>
    <PageSection>
      <SectionIntro title={`${posts.length} ${posts.length === 1 ? 'article' : 'articles'}`} />
      <PostGrid posts={posts} />
      <p className="mt-10 text-sm text-muted-foreground"><Link href="/blog" className="font-medium text-orange hover:text-amber">All articles</Link></p>
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}
