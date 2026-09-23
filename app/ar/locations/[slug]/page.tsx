import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Spotlight } from '@/components/motion'
import { ButtonLink, DarkBand, GlassTile, NumberedCard, PageSection, PageShell, SectionIntro } from '@/components/site'
import { Prose } from '@/components/content'
import { OfficeMap } from '@/components/office-map'
import { ArClosingCta, ReviewBanner } from '@/components/ar'
import { pageMetadata } from '@/lib/seo'
import { arAddresses, arChrome, arCountries, arHome, arLocations, arOfficeNames } from '@/lib/ar'
import { arabicApproved, languagesFor } from '@/lib/i18n'
import { officeBySlug, officeList, site } from '@/lib/site'
import { programs } from '@/lib/site-data'
import { icon } from '@/lib/icons'

export const dynamicParams = false
export function generateStaticParams() { return officeList.map((o) => ({ slug: o.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const copy = arLocations.offices[slug]
  if (!copy) return {}
  return pageMetadata({ path: `/ar/locations/${slug}`, title: copy.seo.title, absoluteTitle: true, description: copy.seo.description, locale: 'ar_AE', languages: languagesFor(`/locations/${slug}`, `/ar/locations/${slug}`), noindex: !arabicApproved(), ogImage: { url: `/locations/${slug}/opengraph-image/card`, alt: copy.h1 } })
}

export default async function ArabicOffice({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const office = officeBySlug(slug)
  const copy = arLocations.offices[slug]
  if (!office || !copy) notFound()
  const others = officeList.filter((o) => o.slug !== slug)
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`
  return <PageShell banner={<ReviewBanner />} breadcrumbLabel="مسار التنقل" breadcrumbs={[{ name: arChrome.home, href: '/ar' }, { name: 'المواقع', href: '/ar/locations' }, { name: arOfficeNames[office.name], href: `/ar/locations/${slug}` }]}
    title={copy.h1} intro={copy.intro}
    actions={<><ButtonLink href="/ar/contact">{arLocations.contactOffice}</ButtonLink><ButtonLink href={directions} variant="secondary" target="_blank" rel="noreferrer">{arLocations.directions}</ButtonLink></>}>
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionIntro title={arLocations.addressTitle} />
          <address className="grid gap-5 not-italic">
            <p className="flex gap-4"><MapPin aria-hidden className="mt-1 size-5 shrink-0 text-orange" /><span><span className="block font-heading text-lg font-semibold text-ink">عرب لاب للمعدات العلمية ذ.م.م</span><span className="mt-1 block leading-8 text-muted-foreground">{arAddresses[slug]}</span><span lang="en" dir="ltr" className="mt-1 block text-end text-sm leading-6 text-muted-foreground">{office.address}</span></span></p>
            <a href={`tel:${site.phone}`} className="flex items-center gap-4 text-ink hover:text-orange"><Phone aria-hidden className="size-5 shrink-0 text-orange" /><span dir="ltr" className="font-medium">{site.phoneDisplay}</span></a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-4 text-ink hover:text-orange"><Mail aria-hidden className="size-5 shrink-0 text-orange" /><span dir="ltr" className="font-medium">{site.email}</span></a>
          </address>
          <div className="mt-10 rounded-3xl border border-border bg-paper p-8 shadow-card">
            <h3 className="font-heading text-xl font-bold text-ink">{arLocations.marketTitle}</h3>
            <p className="mt-2 leading-7 text-muted-foreground">{arCountries[office.country] ?? office.country}{office.headquarters ? ` · ${arLocations.hq}` : ''}</p>
          </div>
        </div>
        <OfficeMap name={office.name} address={office.address} labels={{ ...arLocations.map, title: `خريطة مكتب عرب لاب في ${arOfficeNames[office.name]}` }} />
      </div>
    </PageSection>
    <PageSection className="bg-paper">
      <SectionIntro title={`عرب لاب في ${arOfficeNames[office.name]}`} />
      <Prose paragraphs={copy.paragraphs} />
    </PageSection>
    <PageSection>
      <SectionIntro title={arLocations.servicesTitle} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{programs.map((p, index) => <NumberedCard key={p.id} index={index + 1} icon={icon(p.id)} title={arHome.services[p.id].title} body={arHome.services[p.id].body} href={`/services/${p.slug}`} />)}</Spotlight>
    </PageSection>
    <DarkBand overlap title={arLocations.othersTitle} intro={arLocations.othersIntro}>
      <Spotlight className="grid gap-4 md:grid-cols-2">{others.map((o) => <GlassTile key={o.slug} href={`/ar/locations/${o.slug}`} icon={<MapPin className="size-5 text-brand" />} badge={o.headquarters ? arLocations.hq : undefined} title={arOfficeNames[o.name]} body={arAddresses[o.slug]} />)}</Spotlight>
    </DarkBand>
    <ArClosingCta />
  </PageShell>
}
