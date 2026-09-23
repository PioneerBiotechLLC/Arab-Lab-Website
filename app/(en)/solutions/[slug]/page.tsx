import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Spotlight } from '@/components/motion'
import { BrandTile, ButtonLink, CardLink, ClosingCta, PageSection, PageShell, SectionIntro } from '@/components/site'
import { FaqList, Prose, Rich } from '@/components/content'
import { RelatedPosts } from '@/components/related-posts'
import { pageMetadata } from '@/lib/seo'
import { seoProps } from '@/lib/seo-pages'
import { solutionContent, solutionContentBySlug } from '@/lib/content/solutions'
import { serviceContentBySlug } from '@/lib/content/services'
import { brandBySlug, brandNames, solutions, type Brand } from '@/lib/site-data'
import { icon } from '@/lib/icons'

export const dynamicParams = false
export function generateStaticParams() { return solutionContent.map((s) => ({ slug: s.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const content = solutionContentBySlug(slug)
  return content ? pageMetadata({ path: `/solutions/${slug}`, ...seoProps(content.seo) }) : {}
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = solutionContentBySlug(slug)
  if (!content) notFound()
  const solution = solutions.find((s) => s.id === content.id)!
  const partners = solution.brands.map(brandBySlug).filter((b): b is Brand => !!b)
  const others = solutions.filter((s) => s.id !== content.id)
  const services = content.services.map(serviceContentBySlug).filter((s) => !!s)

  return <PageShell breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Solutions', href: '/solutions' }, { name: solution.title, href: `/solutions/${slug}` }]}
    title={content.h1} intro={content.intro}
    actions={<><ButtonLink href="/contact">Request a quote</ButtonLink><ButtonLink href={partners.length === 1 ? `/brands/${partners[0].slug}` : '/brands'} variant="secondary">{partners.length === 1 ? `About ${partners[0].name}` : 'Partner brands'}</ButtonLink></>}>
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div><SectionIntro title={content.problem.title} /><Prose paragraphs={content.problem.paragraphs} /></div>
        <aside className="grid gap-4">
          <div className="rounded-3xl border border-border bg-paper p-8 shadow-card">
            <h3 className="font-heading text-xl font-bold text-ink">Who it’s for</h3>
            <ul className="mt-5 grid gap-3">{content.industries.map((industry) => <li key={industry} className="flex gap-3 leading-6 text-ink"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />{industry}</li>)}</ul>
          </div>
          {services.length > 0 && <div className="rounded-3xl border border-border bg-paper p-8 shadow-card">
            <h3 className="font-heading text-xl font-bold text-ink">Service lines</h3>
            <ul className="mt-4 grid gap-1">{services.map((service) => <li key={service.slug}><Link href={`/services/${service.slug}`} className="group flex items-center justify-between gap-4 py-2 font-heading font-semibold text-ink hover:text-orange">{service.h1}<ArrowUpRight className="size-4 shrink-0 text-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></li>)}</ul>
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
      <SectionIntro title="Partner technology" intro={content.partnersIntro} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{partners.map((brand) => <BrandTile key={brand.slug} brand={brand} detailed />)}</Spotlight>
    </PageSection>
    <PageSection className="bg-paper">
      <SectionIntro title="Frequently asked questions" />
      <FaqList faq={content.faq} />
      <div className="mt-10 flex flex-wrap gap-4"><ButtonLink href="/contact">Request a quote</ButtonLink><ButtonLink href="/contact" variant="secondary">Ask a specialist</ButtonLink></div>
    </PageSection>
    <RelatedPosts solution={slug} />
    <PageSection>
      <SectionIntro title="Related solutions" />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{others.map((item) => <CardLink key={item.id} icon={icon(item.id)} eyebrow={brandNames(item.brands)} title={item.title} body={item.body} href={`/solutions/${item.slug}`} />)}</Spotlight>
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}
