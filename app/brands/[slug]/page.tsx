import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { brandSeo, seoProps } from '@/lib/seo-pages'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Spotlight } from '@/components/motion'
import { AccentTile, BrandMark, BrandTile, ButtonLink, ClosingCta, NumberedCard, PageSection, PageShell, SectionIntro } from '@/components/site'
import { brandBySlug, brands, offices, solutionsFor } from '@/lib/site-data'
import { brandContent } from '@/lib/content/brands'
import { FaqList, Prose, Rich } from '@/components/content'
import { MapPin } from 'lucide-react'

export function generateStaticParams() { return brands.map((brand) => ({ slug: brand.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const brand = brandBySlug(slug)
  return brand ? pageMetadata({ path: `/brands/${slug}`, ...seoProps(brandSeo(brand)) }) : {}
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = brandBySlug(slug)
  if (!brand) notFound()
  const others = brands.filter((item) => item.slug !== brand.slug)
  const solves = solutionsFor(brand.slug)
  const content = brandContent[brand.slug]
  return <PageShell breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Brands', href: '/brands' }, { name: brand.name, href: `/brands/${brand.slug}` }]}
    title={<><BrandMark brand={brand} size="h-14 md:h-20" text="text-4xl md:text-6xl" /><span className="mt-5 block text-xl font-semibold tracking-normal text-muted-foreground md:text-2xl">Supplier in the UAE, Saudi Arabia &amp; Egypt</span></>} intro={brand.summary}
    actions={<><ButtonLink href="/contact">Discuss your application</ButtonLink><ButtonLink href="/brands" variant="secondary">All partners</ButtonLink></>}>
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-start">
        <div className="max-w-xl"><Prose lead paragraphs={[content?.intro, ...brand.profile].filter((p): p is string => !!p)} /></div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-border bg-paper p-8 shadow-card"><p className="label">At a glance</p><dl className="mt-5 grid gap-4">{brand.facts.map(([term, detail]) => <div key={term}><dt className="font-mono text-xs text-muted-foreground">{term}</dt><dd className="mt-1 font-heading text-base font-semibold text-ink">{detail}</dd></div>)}</dl></div>
          {solves.length > 0 && <div className="rounded-3xl border border-border bg-paper p-8 shadow-card"><p className="label">Solves</p><div className="mt-5 flex flex-wrap gap-2">{solves.map((item) => <Link key={item.id} href={`/solutions/${item.slug}`} className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-3.5 text-xs font-semibold text-ink hover:border-orange hover:text-orange">{item.title} <ArrowUpRight className="size-3" /></Link>)}</div></div>}
        </div>
      </div>
    </PageSection>
    {content && <PageSection className="bg-paper">
      <SectionIntro title={`${brand.name} product categories`} intro={`The main areas of the ${brand.name} portfolio. Ask us for the current range available in your country.`} />
      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">{content.categories.map((c) => <div key={c.name} className="border-t border-line pt-6"><h3 className="font-heading text-xl font-bold text-ink">{c.name}</h3><p className="mt-2 max-w-md leading-7 text-muted-foreground"><Rich text={c.detail} /></p></div>)}</div>
    </PageSection>}
    <PageSection>
      <SectionIntro title={`What ${brand.name} brings to the lab.`} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{brand.capabilities.map((capability, index) => <NumberedCard key={capability.title} index={index + 1} title={capability.title} body={capability.body} />)}</Spotlight>
    </PageSection>
    {content && <PageSection className="bg-paper">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <SectionIntro title="Applications and industries" intro={content.applications} />
          <ul className="grid gap-3 sm:grid-cols-2">{content.industries.map((industry) => <li key={industry} className="flex gap-3 leading-6 text-ink"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />{industry}</li>)}</ul>
        </div>
        <div className="grid gap-4">
          {solves.length > 0 && <div className="rounded-3xl border border-border bg-white p-8 shadow-card"><h3 className="font-heading text-xl font-bold text-ink">Where {brand.name} fits</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The Arab Lab {solves.length === 1 ? 'solution' : 'solutions'} this partner serves:</p><ul className="mt-4 grid gap-2">{solves.map((item) => <li key={item.id}><Link href={`/solutions/${item.slug}`} className="group flex items-center justify-between gap-4 py-2 font-heading font-semibold text-ink hover:text-orange">{item.title}<ArrowUpRight className="size-4 shrink-0 text-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></li>)}</ul></div>}
          <div className="rounded-3xl border border-border bg-white p-8 shadow-card"><h3 className="font-heading text-xl font-bold text-ink">Available across the UAE, Saudi Arabia and Egypt</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Requests for {brand.name} are handled by the Arab Lab office that covers your country.</p><ul className="mt-4 grid gap-1">{offices.map((office) => <li key={office.slug}><Link href={`/locations/${office.slug}`} className="flex items-center gap-3 py-2 text-sm font-medium text-ink hover:text-orange"><MapPin aria-hidden className="size-4 text-orange" />{office.name}, {office.country}{office.headquarters ? ' · HQ' : ''}</Link></li>)}</ul></div>
        </div>
      </div>
    </PageSection>}
    {content && <PageSection>
      <SectionIntro title={`${brand.name}: frequently asked questions`} />
      <FaqList faq={content.faq} />
      <div className="mt-10 flex flex-wrap gap-4"><ButtonLink href="/contact">Request a {brand.name} quote</ButtonLink><ButtonLink href="/solutions" variant="secondary">Browse solutions</ButtonLink></div>
    </PageSection>}
    <PageSection className="bg-paper">
      <SectionIntro title="The rest of the portfolio." />
      <Spotlight className="grid grid-cols-2 gap-4 md:grid-cols-4">{others.map((other) => <BrandTile key={other.slug} brand={other} />)}<AccentTile href="/brands" label="All brands" /></Spotlight>
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}
