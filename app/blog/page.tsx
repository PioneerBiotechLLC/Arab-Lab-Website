import type { Metadata } from 'next'
import Link from 'next/link'
import { ButtonLink, ClosingCta, PageSection, PageShell, SectionIntro } from '@/components/site'
import { PostGrid } from '@/components/blog'
import { pageMetadata } from '@/lib/seo'
import { seoProps } from '@/lib/seo-pages'
import { blogSeo } from '@/lib/blog-seo'
import { categories } from '@/lib/blog-categories'
import { visiblePosts, publishedPosts } from '@/lib/blog'

// Until the first post is published the index stays out of search results (noindex) and out of the sitemap.
export function generateMetadata(): Metadata {
  return { ...pageMetadata({ path: '/blog', ...seoProps(blogSeo), noindex: publishedPosts().length === 0 }), alternates: { canonical: '/blog', types: { 'application/rss+xml': '/blog/rss.xml' } } }
}

export default function BlogIndex() {
  const posts = visiblePosts()
  const used = new Set(posts.map((p) => p.category))
  return <PageShell breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }]}
    title="Laboratory insights" intro="Technical articles on sterility and endotoxin testing, filtration, culture media, liquid handling and laboratory projects, written for QC and production teams in the UAE, Saudi Arabia and Egypt."
    actions={<><ButtonLink href="/contact">Ask a specialist</ButtonLink><ButtonLink href="/blog/rss.xml" variant="secondary">RSS feed</ButtonLink></>}>
    <PageSection>
      {posts.length > 0 ? <>
        <nav aria-label="Categories" className="mb-10 flex flex-wrap gap-2">{categories.filter((c) => used.has(c.slug)).map((c) => <Link key={c.slug} href={`/blog/category/${c.slug}`} className="rounded-full border border-line bg-white px-4 py-3 text-sm font-medium text-ink hover:border-orange hover:text-orange">{c.name}</Link>)}</nav>
        <SectionIntro title="Latest articles" />
        <PostGrid posts={posts} />
      </> : <div className="max-w-xl"><SectionIntro title="Articles are on the way." intro="The first technical articles are being reviewed by our life science and analytical teams. In the meantime, the solution pages cover each laboratory problem in depth." /><ButtonLink href="/solutions">Browse solutions</ButtonLink></div>}
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}
