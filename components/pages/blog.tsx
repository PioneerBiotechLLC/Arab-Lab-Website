// Blog index (every published article, filterable by category) and category pages, shared by /blog and /ar/blog.
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ButtonLink, ClosingCta, PageSection, PageShell, SectionIntro } from '@/components/site'
import { PostGrid, blogBase } from '@/components/blog'
import { localizedMetadata } from '@/lib/seo'
import { blogSeo } from '@/lib/blog-seo'
import { categories, categoryBySlug } from '@/lib/blog-categories'
import { publishedPosts, visiblePosts } from '@/lib/blog'
import { languagesFor, localePath, type Locale } from '@/lib/i18n'
import { localeData } from '@/lib/content/locale'
import { arBlog } from '@/lib/ar'
import { ui } from '@/lib/ui'

const copy = {
  en: {
    seo: blogSeo,
    title: 'Laboratory insights',
    intro: 'Technical articles on sterility and endotoxin testing, filtration, culture media, liquid handling and laboratory projects, written for QC and production teams in the UAE, Saudi Arabia and Egypt.',
    ask: 'Ask a specialist',
    rss: 'RSS feed',
    categories: 'Categories',
    all: 'All articles',
    count: (n: number) => `${n} ${n === 1 ? 'article' : 'articles'}, newest first.`,
    emptyTitle: 'Articles are on the way.',
    emptyIntro: 'The first technical articles are being reviewed by our life science and analytical teams. In the meantime, the solution pages cover each laboratory problem in depth.',
    emptyCta: 'Browse solutions',
  },
  ar: {
    seo: { title: arBlog.seo.title, absoluteTitle: true, description: arBlog.seo.description, ogAlt: arBlog.seo.ogAlt },
    title: arBlog.h1,
    intro: arBlog.intro,
    ask: 'اسأل أحد المختصين',
    rss: 'خلاصة RSS',
    categories: 'التصنيفات',
    all: 'جميع المقالات',
    count: (n: number) => `${localeData('ar').pages.blogCategory.count(n)}، الأحدث أولاً.`,
    emptyTitle: arBlog.emptyTitle,
    emptyIntro: arBlog.emptyIntro,
    emptyCta: arBlog.emptyCta,
  },
}

const other = (locale: Locale): Locale => (locale === 'ar' ? 'en' : 'ar')

// Until the first post is published the index stays out of search results (noindex) and out of the sitemap.
export function blogIndexMetadata(locale: Locale): Metadata {
  const posts = publishedPosts(locale)
  const languages = posts.length && publishedPosts(other(locale)).length ? languagesFor('/blog') : undefined
  const m = localizedMetadata(locale, '/blog', copy[locale].seo, '/blog/opengraph-image', { noindex: posts.length === 0, languages })
  return { ...m, alternates: { ...m.alternates, types: { 'application/rss+xml': `${blogBase(locale)}/rss.xml` } } }
}

export function BlogIndexPage({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const base = blogBase(locale)
  const posts = visiblePosts(locale)
  const used = new Set(posts.map((p) => p.category))
  return <PageShell breadcrumbs={[{ name: ui[locale].home, href: localePath(locale, '/') }, { name: localeData(locale).pages.blogCategory.crumb, href: base }]}
    title={t.title} intro={t.intro}
    actions={<><ButtonLink href={localePath(locale, '/contact')}>{t.ask}</ButtonLink><ButtonLink href={`${base}/rss.xml`} variant="secondary">{t.rss}</ButtonLink></>}>
    <PageSection>
      {posts.length > 0 ? <>
        <nav aria-label={t.categories} className="mb-10 flex flex-wrap gap-2">{categories.filter((c) => used.has(c.slug)).map((c) => <Link key={c.slug} href={`${base}/category/${c.slug}`} className="rounded-full border border-line bg-white px-4 py-3 text-sm font-medium text-ink hover:border-orange hover:text-orange">{locale === 'ar' ? c.nameAr : c.name}</Link>)}</nav>
        <SectionIntro title={t.all} intro={t.count(posts.length)} />
        <PostGrid posts={posts} />
      </> : <div className="max-w-xl"><SectionIntro title={t.emptyTitle} intro={t.emptyIntro} /><ButtonLink href={localePath(locale, '/solutions')}>{t.emptyCta}</ButtonLink></div>}
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}

/** Categories that have at least one visible post in this language. */
export const usedCategories = (locale: Locale) => { const used = new Set(visiblePosts(locale).map((p) => p.category)); return categories.filter((c) => used.has(c.slug)) }

export function blogCategoryMetadata(locale: Locale, slug: string): Metadata {
  const c = categoryBySlug(slug)
  if (!c) return {}
  const ar = locale === 'ar'
  const name = ar ? c.nameAr : c.name
  const hasOther = publishedPosts(other(locale)).some((p) => p.category === slug)
  return localizedMetadata(locale, `/blog/category/${slug}`, { title: localeData(locale).pages.blogCategory.seoTitle(name), description: ar ? c.descriptionAr : c.description, ogAlt: `${name} — ${ar ? 'عرب لاب' : 'Arab Lab'}` }, `/blog/category/${slug}/opengraph-image/card`, hasOther ? {} : { languages: undefined })
}

export function BlogCategoryPage({ locale, slug }: { locale: Locale; slug: string }) {
  const c = categoryBySlug(slug)
  const posts = visiblePosts(locale).filter((p) => p.category === slug)
  if (!c || !posts.length) notFound()
  const t = localeData(locale).pages.blogCategory
  const base = blogBase(locale)
  const name = locale === 'ar' ? c.nameAr : c.name
  return <PageShell breadcrumbs={[{ name: ui[locale].home, href: localePath(locale, '/') }, { name: t.crumb, href: base }, { name, href: `${base}/category/${c.slug}` }]} title={name} intro={locale === 'ar' ? c.descriptionAr : c.description}>
    <PageSection>
      <SectionIntro title={t.count(posts.length)} />
      <PostGrid posts={posts} />
      <p className="mt-10 text-sm text-muted-foreground"><Link href={base} className="font-medium text-orange hover:text-amber">{t.all}</Link></p>
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}
