// Services hub and service-line pages, shared by /services and /ar/services.
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Spotlight } from '@/components/motion'
import { ButtonLink, CardLink, ClosingCta, NumberedCard, PageSection, PageShell, SectionIntro } from '@/components/site'
import { FaqList, Prose } from '@/components/content'
import { localizedMetadata } from '@/lib/seo'
import { localePath, type Locale } from '@/lib/i18n'
import { localeData } from '@/lib/content/locale'
import { brandNames } from '@/lib/site-data'
import { icon } from '@/lib/icons'
import { ui } from '@/lib/ui'

export const servicesMetadata = (locale: Locale): Metadata => localizedMetadata(locale, '/services', localeData(locale).servicesHubSeo, '/services/opengraph-image')

export function ServicesPage({ locale }: { locale: Locale }) {
  const d = localeData(locale)
  const t = d.pages.services
  const href = (path: string) => localePath(locale, path)
  return <PageShell breadcrumbs={[{ name: ui[locale].home, href: href('/') }, { name: t.crumb, href: href('/services') }]}
    title={t.title} intro={t.intro}
    actions={<><ButtonLink href={href('/contact')}>{t.primary}</ButtonLink><ButtonLink href={href('/solutions')} variant="secondary">{t.secondary}</ButtonLink></>}>
    <PageSection>
      <SectionIntro title={t.linesTitle} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{d.programs.map((program, index) => { const content = d.serviceContent.find((s) => s.id === program.id); return <NumberedCard key={program.id} index={index + 1} icon={icon(program.id)} title={program.title} body={content?.intro ?? program.body} href={href(`/services/${program.slug}`)} /> })}</Spotlight>
    </PageSection>
    <PageSection className="bg-paper">
      <SectionIntro title={t.behindTitle} intro={t.behindIntro} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{d.solutions.map((item) => <CardLink key={item.id} icon={icon(item.id)} eyebrow={brandNames(item.brands)} title={item.title} body={item.body} href={href(`/solutions/${item.slug}`)} />)}</Spotlight>
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}

export function serviceMetadata(locale: Locale, slug: string): Metadata {
  const content = localeData(locale).serviceContent.find((s) => s.slug === slug)
  return content ? localizedMetadata(locale, `/services/${slug}`, content.seo, `/services/${slug}/opengraph-image/card`) : {}
}

export function ServicePage({ locale, slug }: { locale: Locale; slug: string }) {
  const d = localeData(locale)
  const t = d.pages.services
  const href = (path: string) => localePath(locale, path)
  const content = d.serviceContent.find((s) => s.slug === slug)
  if (!content) notFound()
  const program = d.programs.find((p) => p.id === content.id)!
  const related = content.solutions.map((s) => d.solutions.find((item) => item.slug === s)).filter((s) => !!s)
  const teams = d.departments.filter((dep) => content.departments.includes(dep.key))
  const otherServices = d.serviceContent.filter((s) => s.slug !== slug)

  return <PageShell breadcrumbs={[{ name: ui[locale].home, href: href('/') }, { name: t.crumb, href: href('/services') }, { name: program.title, href: href(`/services/${slug}`) }]}
    title={content.h1} intro={content.intro}
    actions={<><ButtonLink href={href('/contact')}>{t.primary}</ButtonLink><ButtonLink href={href('/services')} variant="secondary">{t.allServices}</ButtonLink></>}>
    {content.sections.map((section, i) => <PageSection key={section.title} className={i % 2 ? 'bg-paper' : ''}>
      <SectionIntro title={section.title} />
      <Prose paragraphs={section.paragraphs} />
    </PageSection>)}
    {related.length > 0 && <PageSection className={content.sections.length % 2 ? 'bg-paper' : ''}>
      <SectionIntro title={t.inLineTitle} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{related.map((item) => <CardLink key={item.id} icon={icon(item.id)} eyebrow={brandNames(item.brands)} title={item.title} body={item.body} href={href(`/solutions/${item.slug}`)} />)}</Spotlight>
    </PageSection>}
    <PageSection className={(content.sections.length + (related.length ? 1 : 0)) % 2 ? 'bg-paper' : ''}>
      <SectionIntro title={t.teamsTitle} intro={t.teamsIntro} />
      <Spotlight className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{teams.map((team, index) => <NumberedCard key={team.key} index={index + 1} icon={icon(team.key)} title={team.name} body={team.people.map(([, role]) => role).join(' · ')} />)}</Spotlight>
    </PageSection>
    <PageSection className={(content.sections.length + (related.length ? 1 : 0)) % 2 ? '' : 'bg-paper'}>
      <SectionIntro title={t.faqTitle} />
      <FaqList faq={content.faq} />
    </PageSection>
    <PageSection>
      <SectionIntro title={t.otherTitle} />
      <Spotlight className="grid gap-4 md:grid-cols-3">{otherServices.map((s, index) => <NumberedCard key={s.slug} index={index + 1} icon={icon(s.id)} title={s.h1} body={s.intro} href={href(`/services/${s.slug}`)} />)}</Spotlight>
    </PageSection>
    <ClosingCta overlap={false} />
  </PageShell>
}
