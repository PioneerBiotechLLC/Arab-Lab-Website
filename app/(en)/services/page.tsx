import type { Metadata } from 'next'
import { Spotlight } from '@/components/motion'
import { ButtonLink, CardLink, ClosingCta, NumberedCard, PageSection, PageShell, SectionIntro } from '@/components/site'
import { pageMetadata } from '@/lib/seo'
import { seoProps } from '@/lib/seo-pages'
import { serviceContent, servicesHubSeo } from '@/lib/content/services'
import { brandNames, programs, solutions } from '@/lib/site-data'
import { icon } from '@/lib/icons'

export const metadata: Metadata = pageMetadata({ path: '/services', ...seoProps(servicesHubSeo) })

export default function ServicesPage() {
  return <PageShell breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/services' }]}
    title="Four service lines for pharma, food and new laboratories." intro="From quality control equipment to complete laboratory projects and regulatory consulting, each service line is run by the Arab Lab departments that specialise in it."
    actions={<><ButtonLink href="/contact">Talk to a specialist</ButtonLink><ButtonLink href="/solutions" variant="secondary">Browse solutions</ButtonLink></>}>
    <PageSection>
      <SectionIntro title="Our service lines" />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{programs.map((program, index) => { const content = serviceContent.find((s) => s.id === program.id); return <NumberedCard key={program.id} index={index + 1} icon={icon(program.id)} title={program.title} body={content?.intro ?? program.body} href={`/services/${program.slug}`} /> })}</Spotlight>
    </PageSection>
    <PageSection className="bg-paper">
      <SectionIntro title="The solutions behind them" intro="Six laboratory problems, each addressed by a partner manufacturer." />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{solutions.map((item) => <CardLink key={item.id} icon={icon(item.id)} eyebrow={brandNames(item.brands)} title={item.title} body={item.body} href={`/solutions/${item.slug}`} />)}</Spotlight>
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}
