// About page, shared by /about and /ar/about.
import type { Metadata } from 'next'
import { Spotlight } from '@/components/motion'
import { ButtonLink, ClosingCta, DarkBand, NumberedCard, OfficeTiles, PageSection, PageShell, SectionIntro } from '@/components/site'
import { FaqList } from '@/components/content'
import { localizedMetadata } from '@/lib/seo'
import { joinList, localePath, type Locale } from '@/lib/i18n'
import { localeData } from '@/lib/content/locale'
import { offices } from '@/lib/site-data'
import { icon } from '@/lib/icons'
import { ui } from '@/lib/ui'

export const aboutMetadata = (locale: Locale): Metadata => localizedMetadata(locale, '/about', localeData(locale).pageSeo('/about'))

export function AboutPage({ locale }: { locale: Locale }) {
  const d = localeData(locale)
  const t = d.pages.about
  const href = (path: string) => localePath(locale, path)
  const facts: [string, string][] = [
    [d.company.groupFounded, t.facts[0]],
    [String(d.markets.length), t.facts[1]],
    [String(d.departments.length), t.facts[2]],
    [String(d.brands.length), t.facts[3]],
  ]
  return <PageShell breadcrumbs={[{ name: ui[locale].home, href: href('/') }, { name: t.crumb, href: href('/about') }]} title={t.title} intro={d.company.positioning} stats={facts}
    actions={<><ButtonLink href={href('/contact')}>{t.primary}</ButtonLink><ButtonLink href={href('/brands')} variant="secondary">{t.secondary}</ButtonLink></>}>
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div><SectionIntro title={t.heritageTitle} /><p className="max-w-xl text-lg leading-8 text-muted-foreground">{d.company.heritage}</p><p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{t.based} {d.company.affiliation}</p></div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-border bg-paper p-8 shadow-card"><p className="label">{t.leadership}</p><p className="mt-5 font-heading text-xl font-semibold leading-8 text-ink">{d.leadership.name}</p><p className="mt-1 text-sm text-muted-foreground">{d.leadership.role} · {d.leadership.note}</p></div>
          <div className="rounded-3xl border border-border bg-paper p-8 shadow-card"><p className="label">{t.mission}</p><blockquote className="mt-5 font-heading text-xl font-semibold leading-8 text-ink">“{d.company.mission}”</blockquote></div>
        </div>
      </div>
    </PageSection>
    <PageSection className="bg-paper">
      <SectionIntro title={t.deptTitle} intro={t.deptIntro(d.departments.length)} />
      <Spotlight className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{d.departments.map((department, index) => <NumberedCard key={department.key} index={index + 1} icon={icon(department.key)} eyebrow={t.deptEyebrow} title={department.name}>
        <ul className="mt-4 grid gap-2 text-sm leading-6">{department.people.map(([name, role]) => <li key={name}><span className="block font-semibold text-ink">{name}</span><span className="block text-muted-foreground">{role}</span></li>)}</ul>
      </NumberedCard>)}</Spotlight>
    </PageSection>
    <PageSection>
      <SectionIntro title={t.faqTitle} />
      <FaqList faq={t.faq} />
    </PageSection>
    <DarkBand overlap title={t.coverageTitle} intro={t.coverageIntro(offices.length, joinList(locale, d.markets))}><OfficeTiles /></DarkBand>
    <ClosingCta />
  </PageShell>
}
