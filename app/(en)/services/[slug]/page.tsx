import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Spotlight } from '@/components/motion'
import { ButtonLink, CardLink, ClosingCta, NumberedCard, PageSection, PageShell, SectionIntro } from '@/components/site'
import { FaqList, Prose } from '@/components/content'
import { pageMetadata } from '@/lib/seo'
import { seoProps } from '@/lib/seo-pages'
import { serviceContent, serviceContentBySlug } from '@/lib/content/services'
import { brandNames, departments, programs, solutionBySlug } from '@/lib/site-data'
import { icon } from '@/lib/icons'

export const dynamicParams = false
export function generateStaticParams() { return serviceContent.map((s) => ({ slug: s.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const content = serviceContentBySlug(slug)
  return content ? pageMetadata({ path: `/services/${slug}`, ...seoProps(content.seo) }) : {}
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = serviceContentBySlug(slug)
  if (!content) notFound()
  const program = programs.find((p) => p.id === content.id)!
  const related = content.solutions.map(solutionBySlug).filter((s) => !!s)
  const teams = departments.filter((d) => content.departments.includes(d.name))
  const otherServices = serviceContent.filter((s) => s.slug !== slug)

  return <PageShell breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/services' }, { name: program.title, href: `/services/${slug}` }]}
    title={content.h1} intro={content.intro}
    actions={<><ButtonLink href="/contact">Talk to a specialist</ButtonLink><ButtonLink href="/services" variant="secondary">All services</ButtonLink></>}>
    {content.sections.map((section, i) => <PageSection key={section.title} className={i % 2 ? 'bg-paper' : ''}>
      <SectionIntro title={section.title} />
      <Prose paragraphs={section.paragraphs} />
    </PageSection>)}
    {related.length > 0 && <PageSection className={content.sections.length % 2 ? 'bg-paper' : ''}>
      <SectionIntro title="Solutions in this service line" />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{related.map((item) => <CardLink key={item.id} icon={icon(item.id)} eyebrow={brandNames(item.brands)} title={item.title} body={item.body} href={`/solutions/${item.slug}`} />)}</Spotlight>
    </PageSection>}
    <PageSection className={(content.sections.length + (related.length ? 1 : 0)) % 2 ? 'bg-paper' : ''}>
      <SectionIntro title="The teams behind it" intro="Each request is routed to the Arab Lab department that owns it." />
      <Spotlight className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{teams.map((team, index) => <NumberedCard key={team.name} index={index + 1} icon={icon(team.name)} title={team.name} body={team.people.map(([, role]) => role).join(' · ')} />)}</Spotlight>
    </PageSection>
    <PageSection className={(content.sections.length + (related.length ? 1 : 0)) % 2 ? '' : 'bg-paper'}>
      <SectionIntro title="Frequently asked questions" />
      <FaqList faq={content.faq} />
    </PageSection>
    <PageSection>
      <SectionIntro title="Other service lines" />
      <Spotlight className="grid gap-4 md:grid-cols-3">{otherServices.map((s, index) => <NumberedCard key={s.slug} index={index + 1} icon={icon(s.id)} title={s.h1} body={s.intro} href={`/services/${s.slug}`} />)}</Spotlight>
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}
