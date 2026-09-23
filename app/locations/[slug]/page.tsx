import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Spotlight } from '@/components/motion'
import { ButtonLink, ClosingCta, GlassTile, DarkBand, NumberedCard, PageSection, PageShell, SectionIntro } from '@/components/site'
import { Prose } from '@/components/content'
import { OfficeMap } from '@/components/office-map'
import { JsonLd } from '@/components/json-ld'
import { localBusiness } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { seoProps } from '@/lib/seo-pages'
import { locationContent, locationContentBySlug } from '@/lib/content/locations'
import { serviceContentBySlug } from '@/lib/content/services'
import { officeBySlug, officeList, site } from '@/lib/site'
import { icon } from '@/lib/icons'

export const dynamicParams = false
export function generateStaticParams() { return locationContent.map((l) => ({ slug: l.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const content = locationContentBySlug(slug)
  return content ? pageMetadata({ path: `/locations/${slug}`, ...seoProps(content.seo) }) : {}
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = locationContentBySlug(slug)
  const office = officeBySlug(slug)
  if (!content || !office) notFound()
  const services = content.services.map(serviceContentBySlug).filter((s) => !!s)
  const others = officeList.filter((o) => o.slug !== slug)
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`

  return <PageShell breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Locations', href: '/locations' }, { name: office.name, href: `/locations/${slug}` }]}
    title={content.h1} intro={content.intro}
    actions={<><ButtonLink href="/contact">Contact this office</ButtonLink><ButtonLink href={directions} variant="secondary" target="_blank" rel="noreferrer">Get directions</ButtonLink></>}>
    <JsonLd data={localBusiness(office)} />
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionIntro title="Address and contact" />
          <address className="grid gap-5 not-italic">
            <p className="flex gap-4"><MapPin aria-hidden className="mt-1 size-5 shrink-0 text-orange" /><span><span className="block font-heading text-lg font-semibold text-ink">{site.legalName}</span><span className="mt-1 block leading-7 text-muted-foreground">{office.street}<br />{office.locality}{office.postalCode ? ` ${office.postalCode}` : ''}, {office.country}</span></span></p>
            <a href={`tel:${site.phone}`} className="flex items-center gap-4 text-ink hover:text-orange"><Phone aria-hidden className="size-5 shrink-0 text-orange" /><span className="font-medium">{site.phoneDisplay}</span></a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-4 text-ink hover:text-orange"><Mail aria-hidden className="size-5 shrink-0 text-orange" /><span className="font-medium">{site.email}</span></a>
          </address>
          <div className="mt-10 rounded-3xl border border-border bg-paper p-8 shadow-card">
            <h3 className="font-heading text-xl font-bold text-ink">Market served</h3>
            <p className="mt-2 leading-7 text-muted-foreground">{content.market}{office.headquarters ? ' · Arab Lab headquarters' : ''}</p>
          </div>
        </div>
        <OfficeMap name={office.name} address={office.address} />
      </div>
    </PageSection>
    <PageSection className="bg-paper">
      <SectionIntro title={`Arab Lab in ${office.locality}`} />
      <Prose paragraphs={content.paragraphs} />
    </PageSection>
    <PageSection>
      <SectionIntro title="Service lines available here" />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{services.map((s, index) => <NumberedCard key={s.slug} index={index + 1} icon={icon(s.id)} title={s.h1} body={s.intro} href={`/services/${s.slug}`} />)}</Spotlight>
    </PageSection>
    <DarkBand overlap title="Other Arab Lab offices" intro="Every request is routed to the Arab Lab department that owns it, wherever you are.">
      <Spotlight className="grid gap-4 md:grid-cols-2">{others.map((o) => <GlassTile key={o.slug} href={`/locations/${o.slug}`} icon={<MapPin className="size-5 text-brand" />} badge={o.short || undefined} title={o.name} body={o.address} />)}</Spotlight>
    </DarkBand>
    <ClosingCta />
  </PageShell>
}
