import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'
import { ContactTiles, DarkBand, OfficeTiles, PageSection, PageShell } from '@/components/site'
import { pageMetadata } from '@/lib/seo'
import { pageSeo, seoProps } from '@/lib/seo-pages'
import { markets, offices } from '@/lib/site-data'

// Server component so the route can carry metadata; the interactive form lives in components/contact-form.tsx.
export const metadata: Metadata = pageMetadata({ path: '/contact', ...seoProps(pageSeo['/contact']) })

export default function ContactPage() {
  return <PageShell breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Contact', href: '/contact' }]} title="A clear next step." intro="Choose the path that matches your need. We route each request to the right Arab Lab department.">
    <PageSection><div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]"><div><h2 className="font-heading text-3xl font-bold tracking-[-0.01em] text-ink">Specify the requirement.</h2><p className="mt-5 leading-7 text-muted-foreground">Share the product, quantity and office preference. We will respond with the next practical step.</p></div><ContactForm /></div></PageSection>
    <PageSection className="bg-paper"><div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]"><div><h2 className="font-heading text-3xl font-bold tracking-[-0.01em] text-ink">Keep the lab moving.</h2><p className="mt-5 leading-7 text-muted-foreground">For installation, maintenance or application support, send the issue directly to Service.</p></div><ContactForm support /></div></PageSection>
    <PageSection><div className="grid gap-12 md:grid-cols-2"><div><h2 className="font-heading text-3xl font-bold tracking-[-0.01em] text-ink">Prefer a direct line?</h2></div><ContactTiles /></div></PageSection>
    <DarkBand title="Or come and see us." intro={`${offices.length} offices across ${markets.join(', ')}.`}><OfficeTiles /></DarkBand>
  </PageShell>
}
