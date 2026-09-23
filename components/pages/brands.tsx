// Brand hub and brand pages, shared by /brands and /ar/brands.
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Spotlight } from '@/components/motion'
import { AccentTile, BrandMark, BrandTile, ButtonLink, ClosingCta, DarkBand, GlassTile, NumberedCard, PageSection, PageShell, SectionIntro } from '@/components/site'
import { FaqList, Prose, Rich } from '@/components/content'
import { RelatedPosts } from '@/components/related-posts'
import { localizedMetadata } from '@/lib/seo'
import { localePath, type Locale } from '@/lib/i18n'
import { localeData } from '@/lib/content/locale'
import { brandNames, offices } from '@/lib/site-data'
import { icon } from '@/lib/icons'
import { ui } from '@/lib/ui'

export const brandsMetadata = (locale: Locale): Metadata => localizedMetadata(locale, '/brands', localeData(locale).pageSeo('/brands'))

export function BrandsPage({ locale }: { locale: Locale }) {
  const d = localeData(locale)
  const t = d.pages.brands
  const href = (path: string) => localePath(locale, path)
  return <PageShell breadcrumbs={[{ name: ui[locale].home, href: href('/') }, { name: t.crumb, href: href('/brands') }]} title={t.title} intro={t.intro}
    actions={<><ButtonLink href={href('/contact')}>{t.primary}</ButtonLink><ButtonLink href={href('/solutions')} variant="secondary">{t.secondary}</ButtonLink></>}>
    <PageSection>
      <SectionIntro title={t.countTitle(d.brands.length)} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{d.brands.map((brand) => <BrandTile key={brand.slug} brand={brand} detailed />)}<AccentTile href={href('/contact')} label={t.accent} tall /></Spotlight>
    </PageSection>
    <DarkBand overlap title={t.matchedTitle}>
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{d.solutions.map((item) => <GlassTile key={item.id} href={href(`/solutions/${item.slug}`)} icon={icon(item.id, 'size-5 text-brand')} badge={brandNames(item.brands)} title={item.title} body={item.body} />)}</Spotlight>
    </DarkBand>
    <ClosingCta />
  </PageShell>
}

export function brandMetadata(locale: Locale, slug: string): Metadata {
  const d = localeData(locale)
  const brand = d.brands.find((b) => b.slug === slug)
  return brand ? localizedMetadata(locale, `/brands/${slug}`, d.brandSeo(brand)) : {}
}

export function BrandPage({ locale, slug }: { locale: Locale; slug: string }) {
  const d = localeData(locale)
  const t = d.pages.brands
  const href = (path: string) => localePath(locale, path)
  const brand = d.brands.find((b) => b.slug === slug)
  if (!brand) notFound()
  const others = d.brands.filter((item) => item.slug !== brand.slug)
  const solves = d.solutions.filter((solution) => solution.brands.includes(brand.slug))
  const content = d.brandContent[brand.slug]
  return <PageShell breadcrumbs={[{ name: ui[locale].home, href: href('/') }, { name: t.crumb, href: href('/brands') }, { name: brand.name, href: href(`/brands/${brand.slug}`) }]}
    title={<><BrandMark brand={brand} size="h-14 md:h-20" text="text-4xl md:text-6xl" /><span className="mt-5 block text-xl font-semibold tracking-normal text-muted-foreground md:text-2xl">{t.supplier}</span></>} intro={brand.summary}
    actions={<><ButtonLink href={href('/contact')}>{t.primary}</ButtonLink><ButtonLink href={href('/brands')} variant="secondary">{t.allPartners}</ButtonLink></>}>
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-start">
        <div className="max-w-xl"><Prose lead paragraphs={[content?.intro, ...brand.profile].filter((p): p is string => !!p)} /></div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-border bg-paper p-8 shadow-card"><p className="label">{t.atAGlance}</p><dl className="mt-5 grid gap-4">{brand.facts.map(([term, detail]) => <div key={term}><dt className="font-mono text-xs text-muted-foreground">{term}</dt><dd className="mt-1 font-heading text-base font-semibold text-ink">{detail}</dd></div>)}</dl></div>
          {solves.length > 0 && <div className="rounded-3xl border border-border bg-paper p-8 shadow-card"><p className="label">{t.solves}</p><div className="mt-5 flex flex-wrap gap-2">{solves.map((item) => <Link key={item.id} href={href(`/solutions/${item.slug}`)} className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-3.5 text-xs font-semibold text-ink hover:border-orange hover:text-orange">{item.title} <ArrowUpRight className="size-3" /></Link>)}</div></div>}
        </div>
      </div>
    </PageSection>
    {content && <PageSection className="bg-paper">
      <SectionIntro title={t.categoriesTitle(brand.name)} intro={t.categoriesIntro(brand.name)} />
      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">{content.categories.map((c) => <div key={c.name} className="border-t border-line pt-6"><h3 className="font-heading text-xl font-bold text-ink">{c.name}</h3><p className="mt-2 max-w-md leading-7 text-muted-foreground"><Rich text={c.detail} /></p></div>)}</div>
    </PageSection>}
    <PageSection>
      <SectionIntro title={t.bringsTitle(brand.name)} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{brand.capabilities.map((capability, index) => <NumberedCard key={capability.title} index={index + 1} title={capability.title} body={capability.body} />)}</Spotlight>
    </PageSection>
    {content && <PageSection className="bg-paper">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <SectionIntro title={t.applicationsTitle} intro={content.applications} />
          <ul className="grid gap-3 sm:grid-cols-2">{content.industries.map((industry) => <li key={industry} className="flex gap-3 leading-6 text-ink"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />{industry}</li>)}</ul>
        </div>
        <div className="grid gap-4">
          {solves.length > 0 && <div className="rounded-3xl border border-border bg-white p-8 shadow-card"><h3 className="font-heading text-xl font-bold text-ink">{t.fitsTitle(brand.name)}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{t.fitsIntro(solves.length)}</p><ul className="mt-4 grid gap-2">{solves.map((item) => <li key={item.id}><Link href={href(`/solutions/${item.slug}`)} className="group flex items-center justify-between gap-4 py-2 font-heading font-semibold text-ink hover:text-orange">{item.title}<ArrowUpRight className="size-4 shrink-0 text-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></li>)}</ul></div>}
          <div className="rounded-3xl border border-border bg-white p-8 shadow-card"><h3 className="font-heading text-xl font-bold text-ink">{t.availableTitle}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{t.availableIntro(brand.name)}</p><ul className="mt-4 grid gap-1">{offices.map((office) => <li key={office.slug}><Link href={href(`/locations/${office.slug}`)} className="flex items-center gap-3 py-2 text-sm font-medium text-ink hover:text-orange"><MapPin aria-hidden className="size-4 text-orange" />{d.officeName(office)}{locale === 'ar' ? '، ' : ', '}{d.country(office.country)}{office.headquarters ? ` · ${t.hq}` : ''}</Link></li>)}</ul></div>
        </div>
      </div>
    </PageSection>}
    {content && <PageSection>
      <SectionIntro title={t.faqTitle(brand.name)} />
      <FaqList faq={content.faq} />
      <div className="mt-10 flex flex-wrap gap-4"><ButtonLink href={href('/contact')}>{t.quote(brand.name)}</ButtonLink><ButtonLink href={href('/solutions')} variant="secondary">{t.browse}</ButtonLink></div>
    </PageSection>}
    <RelatedPosts brand={brand.slug} locale={locale} />
    <PageSection className="bg-paper">
      <SectionIntro title={t.restTitle} />
      <Spotlight className="grid grid-cols-2 gap-4 md:grid-cols-4">{others.map((other) => <BrandTile key={other.slug} brand={other} />)}<AccentTile href={href('/brands')} label={t.allBrands} /></Spotlight>
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}
