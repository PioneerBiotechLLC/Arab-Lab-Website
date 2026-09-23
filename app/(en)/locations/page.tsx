import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { languagesFor } from '@/lib/i18n'
import { pageSeo, seoProps } from '@/lib/seo-pages'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Spotlight } from '@/components/motion'
import { ButtonLink, ClosingCta, DarkBand, GlassTile, PageSection, PageShell, SectionIntro } from '@/components/site'
import { countryOf, departments, markets, offices } from '@/lib/site-data'
import { icon } from '@/lib/icons'

const mapsUrl = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

export const metadata: Metadata = pageMetadata({ path: '/locations', ...seoProps(pageSeo['/locations']), languages: languagesFor('/locations', '/ar/locations') })

export default function LocationsPage() {
  return <PageShell breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Locations', href: '/locations' }]} title="Regional presence, local response." intro={`${offices.length} offices keep Arab Lab close to laboratory teams across ${markets.join(', ')}. Headquarters: Ras Al Khaimah, UAE.`}
    actions={<><ButtonLink href="/contact">Contact the nearest office</ButtonLink><ButtonLink href="/about" variant="secondary">About Arab Lab</ButtonLink></>}>
    {markets.map((country, index) => {
      const local = offices.filter((office) => countryOf(office) === country)
      return <PageSection key={country} className={index % 2 ? 'bg-paper' : ''}>
        <SectionIntro title={country} intro={`${local.length} ${local.length === 1 ? 'office' : 'offices'}`} />
        <Spotlight className="grid gap-4 md:grid-cols-2">{local.map((office) => <article key={office.name} data-spot className="rounded-2xl border border-border bg-white p-7 shadow-card">
          <div className="flex items-center justify-between"><MapPin className="size-5 text-orange" />{office.short && <span className="rounded-full border border-orange/40 px-2 py-0.5 font-mono text-xs text-orange">{office.short}</span>}</div>
          <h3 className="mt-8 font-heading text-2xl font-bold text-ink"><Link href={`/locations/${office.slug}`} className="hover:text-orange">{office.name}</Link></h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{office.address}</p>
          <div className="relative mt-8 flex flex-wrap gap-3"><ButtonLink href={`/locations/${office.slug}`}>Office details</ButtonLink><ButtonLink href={mapsUrl(office.address)} variant="secondary" target="_blank" rel="noreferrer">Get directions</ButtonLink></div>
        </article>)}</Spotlight>
      </PageSection>
    })}
    <DarkBand overlap title="The right department, wherever you are." intro="Every request is routed to the Arab Lab department that owns it.">
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{departments.map((department) => <GlassTile key={department.name} icon={icon(department.name, 'size-5 text-brand')} title={department.name} body={department.people.map(([, role]) => role).join(' · ')} />)}</Spotlight>
    </DarkBand>
    <ClosingCta />
  </PageShell>
}
