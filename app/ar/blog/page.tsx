import type { Metadata } from 'next'
import { ButtonLink, PageSection, PageShell, SectionIntro } from '@/components/site'
import { PostGrid } from '@/components/blog'
import { ArClosingCta, ReviewBanner } from '@/components/ar'
import { pageMetadata } from '@/lib/seo'
import { arBlog, arChrome } from '@/lib/ar'
import { arabicApproved, languagesFor } from '@/lib/i18n'
import { publishedPosts, visiblePosts } from '@/lib/blog'

export function generateMetadata(): Metadata {
  const indexable = arabicApproved() && publishedPosts('ar').length > 0
  return pageMetadata({ path: '/ar/blog', title: arBlog.seo.title, absoluteTitle: true, description: arBlog.seo.description, locale: 'ar_AE', languages: indexable && publishedPosts('en').length ? languagesFor('/blog', '/ar/blog') : undefined, noindex: !indexable, ogImage: { url: '/blog/opengraph-image', alt: arBlog.seo.ogAlt } })
}

export default function ArabicBlog() {
  const posts = visiblePosts('ar')
  return <PageShell banner={<ReviewBanner />} breadcrumbLabel="مسار التنقل" breadcrumbs={[{ name: arChrome.home, href: '/ar' }, { name: arChrome.blog, href: '/ar/blog' }]} title={arBlog.h1} intro={arBlog.intro}>
    <PageSection>
      {posts.length > 0 ? <><SectionIntro title={arBlog.latest} /><PostGrid posts={posts} /></> : <div className="max-w-xl"><SectionIntro title={arBlog.emptyTitle} intro={arBlog.emptyIntro} /><ButtonLink href="/solutions">{arBlog.emptyCta}</ButtonLink></div>}
    </PageSection>
    <ArClosingCta overlap={false} />
  </PageShell>
}
