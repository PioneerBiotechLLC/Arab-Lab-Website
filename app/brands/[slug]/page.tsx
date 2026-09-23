import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { brandSeo, seoProps } from '@/lib/seo-pages'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Spotlight } from '@/components/motion'
import { AccentTile, BrandMark, BrandTile, ButtonLink, ClosingCta, NumberedCard, PageSection, PageShell, SectionIntro } from '@/components/site'
import { brandBySlug, brands, solutionsFor } from '@/lib/site-data'

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
  const [lead, ...rest] = brand.profile
  return <PageShell title={<BrandMark brand={brand} size="h-14 md:h-20" text="text-4xl md:text-6xl" />} intro={brand.summary}
    actions={<><ButtonLink href="/contact">Discuss your application</ButtonLink><ButtonLink href="/brands" variant="secondary">All partners</ButtonLink></>}>
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-start">
        <div><p className="max-w-xl text-lg leading-8 text-ink">{lead}</p>{rest.map((paragraph) => <p key={paragraph.slice(0, 32)} className="mt-5 max-w-xl leading-7 text-muted-foreground">{paragraph}</p>)}</div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-border bg-paper p-8 shadow-card"><p className="label">At a glance</p><dl className="mt-5 grid gap-4">{brand.facts.map(([term, detail]) => <div key={term}><dt className="font-mono text-xs text-muted-foreground">{term}</dt><dd className="mt-1 font-heading text-base font-semibold text-ink">{detail}</dd></div>)}</dl></div>
          {solves.length > 0 && <div className="rounded-3xl border border-border bg-paper p-8 shadow-card"><p className="label">Solves</p><div className="mt-5 flex flex-wrap gap-2">{solves.map((item) => <Link key={item.id} href={`/solutions#${item.id}`} className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-3.5 text-xs font-semibold text-ink hover:border-orange hover:text-orange">{item.title} <ArrowUpRight className="size-3" /></Link>)}</div></div>}
        </div>
      </div>
    </PageSection>
    <PageSection className="bg-paper">
      <SectionIntro title={`What ${brand.name} brings to the lab.`} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{brand.capabilities.map((capability, index) => <NumberedCard key={capability.title} index={index + 1} title={capability.title} body={capability.body} />)}</Spotlight>
    </PageSection>
    <PageSection>
      <SectionIntro title="The rest of the portfolio." />
      <Spotlight className="grid grid-cols-2 gap-4 md:grid-cols-4">{others.map((other) => <BrandTile key={other.slug} brand={other} />)}<AccentTile href="/brands" label="All brands" /></Spotlight>
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}
