// Solutions hub and solution pages, shared by /solutions and /ar/solutions.
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Spotlight } from '@/components/motion'
import { BrandChips, BrandTile, ButtonLink, CardLink, ClosingCta, DarkBand, NumberedCard, PageSection, PageShell, SectionIntro } from '@/components/site'
import { FaqList, Prose, Rich } from '@/components/content'
import { RelatedPosts } from '@/components/related-posts'
import { localizedMetadata } from '@/lib/seo'
import { localePath, type Locale } from '@/lib/i18n'
import { localeData } from '@/lib/content/locale'
import { brandNames, type Brand } from '@/lib/site-data'
import { icon } from '@/lib/icons'
import { ui } from '@/lib/ui'

export const solutionsMetadata = (locale: Locale): Metadata => localizedMetadata(locale, '/solutions', localeData(locale).pageSeo('/solutions'))

export function SolutionsPage({ locale }: { locale: Locale }) {
  const d = localeData(locale)
  const t = d.pages.solutions
  const href = (path: string) => localePath(locale, path)
  return <PageShell breadcrumbs={[{ name: ui[locale].home, href: href('/') }, { name: t.crumb, href: href('/solutions') }]} title={t.title} intro={t.intro}
    actions={<><ButtonLink href={href('/contact')}>{t.primary}</ButtonLink><ButtonLink href={href('/brands')} variant="secondary">{t.secondary}</ButtonLink></>}>
    <PageSection>
      <SectionIntro title={t.countTitle} />
      <Spotlight className="grid gap-4 md:grid-cols-2">{d.solutions.map((item, index) => <NumberedCard key={item.id} id={item.id} index={index + 1} icon={icon(item.id)} eyebrow={brandNames(item.brands)} title={item.title} body={item.body}><BrandChips slugs={item.brands} /><Link href={href(`/solutions/${item.slug}`)} className="group relative mt-6 inline-flex items-center gap-2 py-2 font-mono text-xs text-orange">{t.guide} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></NumberedCard>)}</Spotlight>
    </PageSection>
    <PageSection className="bg-paper">
      <SectionIntro title={t.servicesTitle} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{d.programs.map((program, index) => <NumberedCard key={program.id} id={program.id} index={index + 1} icon={icon(program.id)} title={program.title} body={program.body} href={href(`/services/${program.slug}`)} />)}</Spotlight>
    </PageSection>
    <DarkBand overlap title={`“${d.company.mission}”`} />
    <ClosingCta />
  </PageShell>
}

export function solutionMetadata(locale: Locale, slug: string): Metadata {
  const content = localeData(locale).solutionContent.find((s) => s.slug === slug)
  return content ? localizedMetadata(locale, `/solutions/${slug}`, content.seo) : {}
}

export function SolutionPage({ locale, slug }: { locale: Locale; slug: string }) {
  const d = localeData(locale)
  const t = d.pages.solutions
  const href = (path: string) => localePath(locale, path)
  const content = d.solutionContent.find((s) => s.slug === slug)
  if (!content) notFound()
  const solution = d.solutions.find((s) => s.id === content.id)!
  const partners = solution.brands.map((b) => d.brands.find((brand) => brand.slug === b)).filter((b): b is Brand => !!b)
  const others = d.solutions.filter((s) => s.id !== content.id)
  const services = content.services.map((s) => d.serviceContent.find((c) => c.slug === s)).filter((s) => !!s)

  return <PageShell breadcrumbs={[{ name: ui[locale].home, href: href('/') }, { name: t.crumb, href: href('/solutions') }, { name: solution.title, href: href(`/solutions/${slug}`) }]}
    title={content.h1} intro={content.intro}
    actions={<><ButtonLink href={href('/contact')}>{t.quote}</ButtonLink><ButtonLink href={href(partners.length === 1 ? `/brands/${partners[0].slug}` : '/brands')} variant="secondary">{partners.length === 1 ? t.aboutPartner(partners[0].name) : t.partnerBrands}</ButtonLink></>}>
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div><SectionIntro title={content.problem.title} /><Prose paragraphs={content.problem.paragraphs} /></div>
        <aside className="grid gap-4">
          <div className="rounded-3xl border border-border bg-paper p-8 shadow-card">
            <h3 className="font-heading text-xl font-bold text-ink">{t.whoFor}</h3>
            <ul className="mt-5 grid gap-3">{content.industries.map((industry) => <li key={industry} className="flex gap-3 leading-6 text-ink"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />{industry}</li>)}</ul>
          </div>
          {services.length > 0 && <div className="rounded-3xl border border-border bg-paper p-8 shadow-card">
            <h3 className="font-heading text-xl font-bold text-ink">{t.serviceLines}</h3>
            <ul className="mt-4 grid gap-1">{services.map((service) => <li key={service.slug}><Link href={href(`/services/${service.slug}`)} className="group flex items-center justify-between gap-4 py-2 font-heading font-semibold text-ink hover:text-orange">{service.h1}<ArrowUpRight className="size-4 shrink-0 text-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></li>)}</ul>
          </div>}
        </aside>
      </div>
    </PageSection>
    <PageSection className="bg-paper">
      <SectionIntro title={content.approach.title} />
      <Prose paragraphs={content.approach.paragraphs} />
      <div className="mt-14 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">{content.approach.points.map((p) => <div key={p.name} className="border-t border-line pt-6"><h3 className="font-heading text-lg font-bold text-ink">{p.name}</h3><p className="mt-2 leading-7 text-muted-foreground"><Rich text={p.detail} /></p></div>)}</div>
    </PageSection>
    <PageSection>
      <SectionIntro title={t.partnersTitle} intro={content.partnersIntro} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{partners.map((brand) => <BrandTile key={brand.slug} brand={brand} detailed />)}</Spotlight>
    </PageSection>
    <PageSection className="bg-paper">
      <SectionIntro title={t.faqTitle} />
      <FaqList faq={content.faq} />
      <div className="mt-10 flex flex-wrap gap-4"><ButtonLink href={href('/contact')}>{t.quote}</ButtonLink><ButtonLink href={href('/contact')} variant="secondary">{t.askSpecialist}</ButtonLink></div>
    </PageSection>
    <RelatedPosts solution={slug} locale={locale} />
    <PageSection>
      <SectionIntro title={t.relatedTitle} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{others.map((item) => <CardLink key={item.id} icon={icon(item.id)} eyebrow={brandNames(item.brands)} title={item.title} body={item.body} href={href(`/solutions/${item.slug}`)} />)}</Spotlight>
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}
