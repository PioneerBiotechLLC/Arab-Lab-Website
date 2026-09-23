import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Spotlight } from '@/components/motion'
import { ButtonLink, PageSection, PageShell, SectionIntro } from '@/components/site'
import { ArClosingCta, ReviewBanner } from '@/components/ar'
import { pageMetadata } from '@/lib/seo'
import { arAddresses, arChrome, arCountries, arLocations, arOfficeNames } from '@/lib/ar'
import { arabicApproved, languagesFor } from '@/lib/i18n'
import { countryOf, markets, offices } from '@/lib/site-data'

export function generateMetadata(): Metadata {
  return pageMetadata({ path: '/ar/locations', title: arLocations.seo.title, absoluteTitle: true, description: arLocations.seo.description, locale: 'ar_AE', languages: languagesFor('/locations', '/ar/locations'), noindex: !arabicApproved() })
}

const mapsUrl = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

export default function ArabicLocations() {
  return <PageShell banner={<ReviewBanner />} breadcrumbLabel="مسار التنقل" breadcrumbs={[{ name: arChrome.home, href: '/ar' }, { name: 'المواقع', href: '/ar/locations' }]} title={arLocations.h1} intro={arLocations.intro}
    actions={<ButtonLink href="/ar/contact">{arChrome.getInTouch}</ButtonLink>}>
    {markets.map((country, index) => {
      const local = offices.filter((office) => countryOf(office) === country)
      return <PageSection key={country} className={index % 2 ? 'bg-paper' : ''}>
        <SectionIntro title={arCountries[country] ?? country} intro={arLocations.officeCount(local.length)} />
        <Spotlight className="grid gap-4 md:grid-cols-2">{local.map((office) => <article key={office.slug} data-spot className="rounded-2xl border border-border bg-white p-7 shadow-card">
          <div className="flex items-center justify-between"><MapPin className="size-5 text-orange" />{office.headquarters && <span className="rounded-full border border-orange/40 px-2 py-0.5 text-xs text-orange">{arLocations.hq}</span>}</div>
          <h3 className="mt-8 font-heading text-2xl font-bold text-ink"><Link href={`/ar/locations/${office.slug}`} className="hover:text-orange">{arOfficeNames[office.name]}</Link></h3>
          <p className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">{arAddresses[office.slug]}</p>
          <p lang="en" dir="ltr" className="mt-1 max-w-xs text-end text-xs leading-5 text-muted-foreground">{office.address}</p>
          <div className="relative mt-8 flex flex-wrap gap-3"><ButtonLink href={`/ar/locations/${office.slug}`}>{arLocations.details}</ButtonLink><ButtonLink href={mapsUrl(office.address)} variant="secondary" target="_blank" rel="noreferrer">{arLocations.directions}</ButtonLink></div>
        </article>)}</Spotlight>
      </PageSection>
    })}
    <ArClosingCta overlap={false} />
  </PageShell>
}
