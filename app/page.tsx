import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { CardLink, ConnectorLine, PageSection, SectionIntro, SiteFooter, SiteHeader } from '@/components/site'
import { brands, offices, processNodes } from '@/lib/site-data'

export default function Home() {
  return <><SiteHeader /><main>
    <section className="relative min-h-[560px] overflow-hidden border-b border-navy-2 bg-navy-0 lg:min-h-[680px]">
      <Image src="/hero-bg.jpeg" alt="" fill priority sizes="100vw" className="object-cover object-[70%_center]" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-0 via-navy-0/40 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 pt-10 pb-24 lg:px-8 lg:pt-14 lg:pb-36">
        <div className="max-w-2xl"><h1 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"><span className="block whitespace-nowrap">Your lab is smart?</span><span className="block whitespace-nowrap">We&apos;ll make it <span className="text-orange">smarter!</span></span></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-mist">Arab Lab is the trusted partner connecting global manufacturers to biopharmaceutical, R&amp;D, chemical and pathological labs across the MENA region.</p><div className="mt-9 flex flex-wrap items-center gap-8"><Link href="/contact" className="flex items-center gap-2 font-heading text-sm font-semibold text-orange hover:text-amber">Request a quote <ArrowUpRight className="size-4" /></Link><Link href="/brands" className="flex items-center gap-2 font-heading text-sm font-semibold text-mist hover:text-white">View our brands <ArrowDownRight className="size-4" /></Link></div></div>
      </div>
    </section>
    <PageSection className="bg-navy-1"><SectionIntro eyebrow="01 / How we work" title="From specification to supported uptime." /><ConnectorLine nodes={processNodes} /></PageSection>
    <PageSection><SectionIntro eyebrow="02 / Industries we serve" title="Equipment that fits the work." /><div className="grid gap-5 md:grid-cols-2"><CardLink eyebrow="Life science" title="Pharma & Biotech" body="Bioprocessing, cell culture, molecular biology and QC workflows for regulated environments." href="/solutions#pharma" /><CardLink eyebrow="Quality control" title="Food & Beverage" body="Rapid microbial testing, analytical enzymes and quality systems for production labs." href="/solutions#food" /></div></PageSection>
    <PageSection className="bg-navy-1"><SectionIntro eyebrow="03 / Our partners" title="Global technology. Local accountability." intro="We represent focused manufacturers whose products solve specific laboratory problems." /><div className="grid grid-cols-2 border-l border-t border-navy-2 md:grid-cols-4">{brands.map((brand) => <Link href={`/brands/${brand.slug}`} key={brand.slug} className="flex min-h-32 items-end border-b border-r border-navy-2 p-5 transition-colors hover:bg-navy-0"><span className="font-heading text-lg font-bold text-white">{brand.name}</span></Link>)}</div><Link href="/brands" className="mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-orange">All brands <ArrowUpRight className="size-4" /></Link></PageSection>
    <PageSection><SectionIntro eyebrow="04 / Regional coverage" title="Close to your laboratory." /><ConnectorLine nodes={offices.map((office) => ({ title: office.name + (office.short ? ` (${office.short})` : ''), description: office.address }))} /></PageSection>
    <section className="bg-navy-1"><div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div><p className="label mb-4">Ready when you are</p><h2 className="font-heading text-3xl font-bold text-white md:text-5xl">Talk to a specialist.</h2></div><Link href="/contact" className="flex w-fit items-center gap-2 font-heading text-sm font-semibold text-orange hover:text-amber">Start a conversation <ArrowUpRight className="size-4" /></Link></div></section>
  </main><SiteFooter /></>
}
