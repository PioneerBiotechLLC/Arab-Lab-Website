import { Spotlight } from '@/components/motion'
import { BrandChips, ButtonLink, ClosingCta, DarkBand, NumberedCard, PageSection, PageShell, SectionIntro } from '@/components/site'
import { brandNames, company, programs, solutions } from '@/lib/site-data'
import { icon } from '@/lib/icons'

export default function SolutionsPage() {
  return <PageShell eyebrow="Solutions" title="Organised by the problem, not the manufacturer." intro="Each solution is framed around what your laboratory needs to test, make or release — and links through to the partner whose technology addresses it."
    actions={<><ButtonLink href="/contact">Describe your application</ButtonLink><ButtonLink href="/brands" variant="secondary">See the partners</ButtonLink></>}>
    <PageSection>
      <SectionIntro eyebrow="By laboratory problem" title="Six problems, seven partners." />
      <Spotlight className="grid gap-4 md:grid-cols-2">{solutions.map((item, index) => <NumberedCard key={item.id} id={item.id} index={index + 1} icon={icon(item.id)} eyebrow={brandNames(item.brands)} title={item.title} body={item.body}><BrandChips slugs={item.brands} /></NumberedCard>)}</Spotlight>
    </PageSection>
    <PageSection className="bg-paper">
      <SectionIntro eyebrow="Our program" title="Four service lines." />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{programs.map((program, index) => <NumberedCard key={program.id} id={program.id} index={index + 1} icon={icon(program.id)} eyebrow={program.eyebrow} title={program.title} body={program.body} href="/contact" />)}</Spotlight>
    </PageSection>
    <DarkBand overlap eyebrow="Our mission" title={`“${company.mission}”`} />
    <ClosingCta />
  </PageShell>
}
