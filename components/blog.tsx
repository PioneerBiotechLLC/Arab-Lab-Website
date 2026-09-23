// Blog building blocks shared by the English and Arabic blogs: post cards, the article layout, and related content.
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Spotlight } from '@/components/motion'
import { BrandTile, CardLink, PageSection, PageShell, SectionIntro } from '@/components/site'
import { FaqList } from '@/components/content'
import { JsonLd } from '@/components/json-ld'
import { MdxBody } from '@/components/mdx'
import { blogPosting } from '@/lib/schema'
import { categoryBySlug } from '@/lib/blog-categories'
import { relatedPosts, translationOf, type Lang, type Post } from '@/lib/blog'
import { brandNames, type Brand } from '@/lib/site-data'
import { localeData } from '@/lib/content/locale'
import { localePath } from '@/lib/i18n'
import { icon } from '@/lib/icons'

export const blogLabels = {
  en: { home: 'Home', blog: 'Blog', minRead: 'min read', updated: 'Updated', published: 'Published', contents: 'Contents', faq: 'Frequently asked questions', related: 'Related articles', solutions: 'Related solutions and partners', draft: 'Draft — visible only in development. Not listed, not in the sitemap or RSS.', review: 'Arabic text awaiting native review.', read: 'Read article', translation: 'اقرأ بالعربية', authorRole: 'The life science and analytical teams at Arab Lab Scientific Equipment, supporting laboratories across the UAE, Saudi Arabia and Egypt.', contact: 'Talk to a specialist', contactBody: 'Questions about your own application? Send them to the team that owns it.' },
  ar: { home: 'الرئيسية', blog: 'المدونة', minRead: 'دقائق للقراءة', updated: 'آخر تحديث', published: 'تاريخ النشر', contents: 'المحتويات', faq: 'الأسئلة الشائعة', related: 'مقالات ذات صلة', solutions: 'حلول وشركاء ذوو صلة', draft: 'مسودة — تظهر في بيئة التطوير فقط، ولا تُدرج في الفهرس أو خريطة الموقع أو RSS.', review: 'النص العربي بانتظار مراجعة لغوية من متحدث أصلي.', read: 'اقرأ المقال', translation: 'Read in English', authorRole: 'فريقا علوم الحياة والعلوم التحليلية في عرب لاب للمعدات العلمية، اللذان يدعمان المختبرات في الإمارات والسعودية ومصر.', contact: 'تحدث إلى أحد المختصين', contactBody: 'لديك سؤال حول تطبيق محدد في مختبرك؟ أرسله إلى الفريق المختص.' },
} as const

export const blogBase = (lang: Lang) => (lang === 'ar' ? '/ar/blog' : '/blog')
const homeHref = (lang: Lang) => (lang === 'ar' ? '/ar' : '/')
const contactHref = (lang: Lang) => (lang === 'ar' ? '/ar/contact' : '/contact')
const formatDate = (iso: string, lang: Lang) => new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === 'ar' ? 'ar-AE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export function PostCard({ post }: { post: Post }) {
  const t = blogLabels[post.lang]
  const category = categoryBySlug(post.category)
  return <Link href={`${blogBase(post.lang)}/${post.slug}`} data-spot className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card hover:border-orange/60">
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
      <span className="text-orange">{post.lang === 'ar' ? category?.nameAr : category?.name}</span>
      <span aria-hidden>·</span><span>{post.readingMinutes} {t.minRead}</span>
      {post.status === 'draft' && <span className="rounded-full border border-danger-border px-2 text-danger">Draft</span>}
    </div>
    <h3 className="mt-4 font-heading text-xl font-bold leading-7 text-ink text-balance">{post.title}</h3>
    <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.description}</p>
    <span className="mt-auto flex items-center gap-2 pt-6 font-mono text-xs text-orange">{t.read} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100" /></span>
  </Link>
}

export function PostGrid({ posts }: { posts: Post[] }) {
  return <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={`${p.lang}-${p.slug}`} post={p} />)}</Spotlight>
}

/** Article layout: hero, contents and meta sidebar, body, FAQ, author box, related solutions/brands/posts, schema. */
export async function PostLayout({ post, cta }: { post: Post; cta: React.ReactNode }) {
  const lang = post.lang
  const t = blogLabels[lang]
  const category = categoryBySlug(post.category)
  const categoryName = category && (lang === 'ar' ? category.nameAr : category.name)
  const categoryHref = category && `${blogBase(lang)}/category/${category.slug}`
  const d = localeData(lang)
  const solutions = post.relatedSolutions.map((slug) => d.solutions.find((s) => s.slug === slug)).filter((s) => !!s)
  const brands = post.relatedBrands.map((slug) => d.brands.find((b) => b.slug === slug)).filter((b): b is Brand => !!b)
  const related = relatedPosts(post)
  const translation = translationOf(post)
  const url = `${blogBase(lang)}/${post.slug}`
  const toc = post.faq.length ? [...post.toc, { id: 'faq', text: t.faq }] : post.toc

  return <PageShell breadcrumbs={[{ name: t.home, href: homeHref(lang) }, { name: t.blog, href: blogBase(lang) }, ...(category ? [{ name: categoryName!, href: categoryHref! }] : []), { name: post.title, href: url }]}
    title={<span className="block text-3xl leading-tight md:text-5xl">{post.title}</span>} intro={post.description}>
    {(post.status === 'draft' || post.needsNativeReview) && <div className="border-b border-danger-border/40 bg-[#FEF3F2] px-5 py-3 text-center text-sm text-danger">{post.status === 'draft' ? t.draft : ''} {post.needsNativeReview ? t.review : ''}</div>}
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <dl className="grid gap-3 text-sm">
            <div><dt className="font-mono text-xs text-muted-foreground">{t.published}</dt><dd className="mt-0.5 text-ink"><time dateTime={post.date}>{formatDate(post.date, lang)}</time></dd></div>
            {post.updated !== post.date && <div><dt className="font-mono text-xs text-muted-foreground">{t.updated}</dt><dd className="mt-0.5 text-ink"><time dateTime={post.updated}>{formatDate(post.updated, lang)}</time></dd></div>}
            <div className="flex items-center gap-2 text-ink"><Clock aria-hidden className="size-4 text-orange" />{post.readingMinutes} {t.minRead}</div>
            {category && <div><Link href={categoryHref!} className="font-medium text-orange hover:text-amber">{categoryName}</Link></div>}
            {translation && <div><Link href={`${blogBase(translation.lang)}/${translation.slug}`} hrefLang={translation.lang} className="font-medium text-orange hover:text-amber">{t.translation}</Link></div>}
          </dl>
          {toc.length > 1 && <nav aria-label={t.contents} className="mt-8 hidden lg:block">
            <p className="font-mono text-xs text-muted-foreground">{t.contents}</p>
            <ol className="mt-3 grid border-s border-border text-sm">{toc.map((item) => <li key={item.id}><a href={`#${item.id}`} className="-ms-px block border-s border-transparent py-1.5 ps-4 leading-5 text-muted-foreground hover:border-orange hover:text-ink">{item.text}</a></li>)}</ol>
          </nav>}
        </aside>
        <article className="min-w-0 max-w-3xl">
          <div className="post-body" dir={lang === 'ar' ? 'rtl' : undefined}><MdxBody source={post.body} /></div>
          {post.faq.length > 0 && <section id="faq" className="mt-16 scroll-mt-28">
            <h2 className="mb-6 font-heading text-[1.75rem] font-bold leading-tight text-ink">{t.faq}</h2>
            <FaqList faq={post.faq} />
          </section>}
          <div className="mt-14 flex gap-5 rounded-3xl border border-border bg-paper p-7">
            <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white font-heading text-lg font-bold text-orange shadow-card">AL</span>
            <div><p className="font-heading text-lg font-semibold text-ink">{post.author}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{t.authorRole}</p></div>
          </div>
        </article>
      </div>
    </PageSection>
    {(solutions.length > 0 || brands.length > 0) && <PageSection className="bg-paper">
      <SectionIntro title={t.solutions} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((item) => <CardLink key={item.id} icon={icon(item.id)} eyebrow={brandNames(item.brands)} title={item.title} body={item.body} href={localePath(lang, `/solutions/${item.slug}`)} />)}
        {brands.map((brand) => <BrandTile key={brand.slug} brand={brand} detailed />)}
      </Spotlight>
    </PageSection>}
    {related.length > 0 && <PageSection>
      <SectionIntro title={t.related} />
      <PostGrid posts={related} />
    </PageSection>}
    {cta}
    {/* Arabic posts reuse the English post's card (Satori cannot shape Arabic script). */}
    <JsonLd data={blogPosting({ ...post, category: categoryName ?? post.category, url, image: lang === 'ar' ? (translation ? `/blog/${post.slug}/opengraph-image/card` : '/blog/opengraph-image') : `${url}/opengraph-image/card` })} />
  </PageShell>
}
