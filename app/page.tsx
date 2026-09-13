import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Spotlight } from '@/components/motion'
import { PageTransition } from '@/components/page-transition'
import { Spine } from '@/components/spine'
import { AccentTile, BrandTile, ButtonLink, CardLink, ClosingCta, DarkBand, NumberedCard, OfficeTiles, PageSection, SectionIntro, StatStrip } from '@/components/site'
import { eyebrowOnDark } from '@/lib/utils'
import { icon } from '@/lib/icons'
import { brandNames, brands, company, departments, markets, offices, programs, solutions } from '@/lib/site-data'

const stats: [string, string][] = [
  [String(brands.length), 'Partner manufacturers'],
  [String(offices.length), 'Regional offices'],
  [String(markets.length), 'Operating markets'],
  [String(departments.length), 'Specialist departments'],
]
const [feature, ...problems] = solutions

// The spine's stops, in page order. Labels are for assistive tech only; the nodes themselves are unlabelled dots.
const stops = [
  { id: 'program', label: 'Our program' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'partners', label: 'Partners' },
  { id: 'coverage', label: 'Coverage' },
  { id: 'contact', label: 'Talk to us' },
]

// A sensor readout: flat, a settling transient, then steady. Drawn once on load, then it cools into the dotted motif.
const tracePath = 'M0 28 H130 L146 28 L156 8 L166 50 L176 12 L186 44 L196 18 L206 36 L218 24 L232 31 L248 27 L268 28.5 L290 28 H1000'

export default function Home() {
  return <PageTransition><main id="content" tabIndex={-1} className="relative outline-none">
    <Spine stops={stops} />

    <section className="bg-white">
      <div className="relative overflow-hidden">
        {/* Oversized wrapper so the scroll parallax never exposes an edge. */}
        <div className="hero-parallax absolute inset-x-0 -top-[10%] -bottom-[10%]"><picture><source media="(max-width: 1023px)" srcSet="/hero/hero-mobile.webp" /><img src="/hero/hero.webp" alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" /></picture></div>
        <div className="absolute inset-0 bg-white/85 lg:bg-transparent lg:bg-linear-to-r lg:from-white lg:via-white/85 lg:to-white/15" />
        <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-40 lg:px-8 lg:pt-28 lg:pb-52">
          {/* The readout. Starts at the spine's x (origin node) and runs to the content edge; the spine continues down from the origin. */}
          <div className="relative -ml-2.5 h-14 lg:-ml-[1.375rem]" aria-hidden>
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 1000 56" preserveAspectRatio="none"><path className="trace-line" pathLength={1} d={tracePath} /><path className="trace-dots" pathLength={1} d={tracePath} /></svg>
            <span data-spine-origin className="trace-origin" />
          </div>
          <div className="max-w-2xl">
            <h1 className="hero-title font-heading text-4xl font-bold leading-[1.08] tracking-[-0.015em] text-ink md:text-5xl md:tracking-[-0.02em] lg:text-6xl lg:tracking-[-0.03em]"><span className="block">Your lab is smart?</span><span className="block">We&apos;ll make it <span className="text-orange">smarter!</span></span></h1>
            <div className="hero-after">
              <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">{company.positioning}</p>
              <div className="mt-10 flex flex-wrap items-center gap-4"><ButtonLink href="/contact">Request a quote</ButtonLink><ButtonLink href="/brands" variant="secondary">View our brands</ButtonLink></div>
            </div>
          </div>
        </div>
      </div>
      {/* Glass stat strip straddling the hero edge. */}
      <div className="hero-strip relative z-10 mx-auto -mt-20 max-w-7xl px-5 lg:-mt-24 lg:px-8"><StatStrip stats={stats} /></div>
    </section>

    <PageSection id="program" className="bg-paper">
      <SectionIntro title="Four service lines, one partner." />
      <Spotlight><ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{programs.map((program, index) => <li key={program.id}><NumberedCard index={index + 1} icon={icon(program.id)} title={program.title} body={program.body} href={`/solutions#${program.id}`} /></li>)}</ol></Spotlight>
    </PageSection>

    <PageSection id="solutions">
      <SectionIntro title="Organised by the problem your lab needs to solve." intro="Each solution links through to the partner whose technology addresses it." />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Feature tile: the one dark material in the grid gives the bento a focal point; its glow follows the pointer. */}
        <Link href={`/solutions#${feature.id}`} data-spot className="spot-strong group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-8 text-white shadow-float md:col-span-2 lg:row-span-2 md:p-10">
          <span aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand/25 blur-3xl" />
          <span aria-hidden className="pointer-events-none absolute -bottom-32 -left-16 size-72 rounded-full bg-white/5 blur-3xl" />
          <div className="relative">
            {icon(feature.id, 'mb-4 size-6 text-orange-on-dark')}
            <p className={eyebrowOnDark}>{brandNames(feature.brands)}</p>
            <h3 className="mt-3 font-heading text-3xl font-bold tracking-[-0.02em] md:text-4xl">{feature.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/75">{feature.body}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold text-orange-on-dark">Explore <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
          </div>
        </Link>
        {problems.map((item, index) => <div key={item.id} className={index === problems.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}><CardLink icon={icon(item.id)} eyebrow={brandNames(item.brands)} title={item.title} body={item.body} href={`/solutions#${item.id}`} /></div>)}
      </Spotlight>
    </PageSection>

    <PageSection id="partners" className="bg-paper">
      <SectionIntro title="Global technology. Local accountability." intro="Seven partner manufacturers, each addressing a specific laboratory problem." />
      <Spotlight className="grid grid-cols-2 gap-4 md:grid-cols-4">{brands.map((brand) => <BrandTile key={brand.slug} brand={brand} />)}<AccentTile href="/brands" label="All brands" /></Spotlight>
    </PageSection>

    <DarkBand id="coverage" overlap title="Close to your laboratory." intro={`${offices.length} offices across ${markets.length} markets keep sales, technical and service teams within reach.`}><OfficeTiles /></DarkBand>
    <ClosingCta id="contact" />
  </main></PageTransition>
}
