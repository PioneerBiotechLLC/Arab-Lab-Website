import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'
import { Spotlight } from '@/components/motion'
import { ContactForm } from '@/components/contact-form'
import { ContactTiles, DarkBand, GlassTile, PageSection, PageShell } from '@/components/site'
import { ReviewBanner } from '@/components/ar'
import { pageMetadata } from '@/lib/seo'
import { arAddresses, arChrome, arContact, arOfficeNames } from '@/lib/ar'
import { arabicApproved, languagesFor } from '@/lib/i18n'
import { offices } from '@/lib/site-data'

export function generateMetadata(): Metadata {
  return pageMetadata({ path: '/ar/contact', title: arContact.seo.title, absoluteTitle: true, description: arContact.seo.description, locale: 'ar_AE', languages: languagesFor('/contact', '/ar/contact'), noindex: !arabicApproved(), ogImage: { url: '/contact/opengraph-image', alt: arContact.seo.ogAlt } })
}

const h2 = 'font-heading text-3xl font-bold text-ink'
export default function ArabicContact() {
  return <PageShell banner={<ReviewBanner />} breadcrumbLabel="مسار التنقل" breadcrumbs={[{ name: arChrome.home, href: '/ar' }, { name: arChrome.getInTouch, href: '/ar/contact' }]} title={arContact.h1} intro={arContact.intro}>
    <PageSection><div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]"><div><h2 className={h2}>{arContact.quoteTitle}</h2><p className="mt-5 leading-8 text-muted-foreground">{arContact.quoteBody}</p></div><ContactForm locale="ar" /></div></PageSection>
    <PageSection className="bg-paper"><div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]"><div><h2 className={h2}>{arContact.serviceTitle}</h2><p className="mt-5 leading-8 text-muted-foreground">{arContact.serviceBody}</p></div><ContactForm support locale="ar" /></div></PageSection>
    <PageSection><div className="grid gap-12 md:grid-cols-2"><div><h2 className={h2}>{arContact.directTitle}</h2></div><ContactTiles /></div></PageSection>
    <DarkBand title={arContact.officesTitle} intro={arContact.officesIntro}>
      <Spotlight className="grid gap-4 md:grid-cols-3">{offices.map((office) => <GlassTile key={office.slug} href={`/ar/locations/${office.slug}`} icon={<MapPin className="size-5 text-brand" />} badge={office.headquarters ? 'المقر الرئيسي' : undefined} title={arOfficeNames[office.name]} body={arAddresses[office.slug]} />)}</Spotlight>
    </DarkBand>
  </PageShell>
}
