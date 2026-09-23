import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { pageSeo, seoProps } from '@/lib/seo-pages'
import { Spotlight } from '@/components/motion'
import { ButtonLink, ClosingCta, DarkBand, NumberedCard, OfficeTiles, PageSection, PageShell, SectionIntro } from '@/components/site'
import { brands, company, departments, leadership, markets, offices } from '@/lib/site-data'
import { icon } from '@/lib/icons'

const facts: [string, string][] = [
  [company.groupFounded, 'Group founded'],
  [String(markets.length), 'Operating markets'],
  [String(departments.length), 'Specialist departments'],
  [String(brands.length), 'Partner manufacturers'],
]

export const metadata: Metadata = pageMetadata({ path: '/about', ...seoProps(pageSeo['/about']) })

export default function AboutPage() {
  return <PageShell breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'About', href: '/about' }]} title="A trusted partner for Life Science industries." intro={company.positioning} stats={facts}
    actions={<><ButtonLink href="/contact">Talk to a specialist</ButtonLink><ButtonLink href="/brands" variant="secondary">Our partners</ButtonLink></>}>
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div><SectionIntro title="Built on a group with a track record." /><p className="max-w-xl text-lg leading-8 text-muted-foreground">{company.heritage}</p><p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">Arab Lab is based in Ras Al Khaimah and serves the biopharma and pharmaceutical industry and laboratories sector across the region. {company.affiliation}</p></div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-border bg-paper p-8 shadow-card"><p className="label">Leadership</p><p className="mt-5 font-heading text-xl font-semibold leading-8 text-ink">{leadership.name}</p><p className="mt-1 text-sm text-muted-foreground">{leadership.role} · {leadership.note}</p></div>
          <div className="rounded-3xl border border-border bg-paper p-8 shadow-card"><p className="label">Our mission</p><blockquote className="mt-5 font-heading text-xl font-semibold leading-8 text-ink">“{company.mission}”</blockquote></div>
        </div>
      </div>
    </PageSection>
    <PageSection className="bg-paper">
      <SectionIntro title="Specialists at every handoff." intro={`${departments.length} departments, each owning a precise part of the laboratory workflow.`} />
      <Spotlight className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{departments.map((department, index) => <NumberedCard key={department.name} index={index + 1} icon={icon(department.name)} eyebrow="Department" title={department.name}>
        <ul className="mt-4 grid gap-2 text-sm leading-6">{department.people.map(([name, role]) => <li key={name}><span className="block font-semibold text-ink">{name}</span><span className="block text-muted-foreground">{role}</span></li>)}</ul>
      </NumberedCard>)}</Spotlight>
    </PageSection>
    <DarkBand overlap title="Close to your laboratory." intro={`${offices.length} offices across ${markets.join(', ')}.`}><OfficeTiles /></DarkBand>
    <ClosingCta />
  </PageShell>
}
