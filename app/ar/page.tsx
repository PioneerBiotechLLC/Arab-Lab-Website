import type { Metadata } from 'next'
import { Spotlight } from '@/components/motion'
import { PageTransition } from '@/components/page-transition'
import { AccentTile, BrandTile, ButtonLink, CardLink, DarkBand, GlassTile, NumberedCard, PageSection, SectionIntro, StatStrip } from '@/components/site'
import { ArClosingCta, ReviewBanner } from '@/components/ar'
import { MapPin } from 'lucide-react'
import { pageMetadata } from '@/lib/seo'
import { arAddresses, arHome, arOfficeNames } from '@/lib/ar'
import { arabicApproved, languagesFor } from '@/lib/i18n'
import { brandNames, brands, departments, markets, offices, programs, solutions } from '@/lib/site-data'
import { icon } from '@/lib/icons'

export function generateMetadata(): Metadata {
  return pageMetadata({ path: '/ar', title: arHome.seo.title, absoluteTitle: true, description: arHome.seo.description, locale: 'ar_AE', languages: languagesFor('/', '/ar'), noindex: !arabicApproved() })
}

const stats: [string, string][] = [
  [String(brands.length), arHome.stats[0]], [String(offices.length), arHome.stats[1]], [String(markets.length), arHome.stats[2]], [String(departments.length), arHome.stats[3]],
]

// Arabic home. Same sections and materials as the English home, mirrored for right-to-left reading. The scroll spine
// and the hero trace are left-to-right drawings, so they are not used here; the hero enters with the standard rise.
export default function ArabicHome() {
  return <PageTransition><main id="content" tabIndex={-1} className="relative outline-none">
    <ReviewBanner />
    <section className="bg-white">
      <div className="relative overflow-hidden">
        <div className="hero-parallax absolute inset-x-0 -top-[10%] -bottom-[10%]"><picture><source media="(max-width: 1023px)" srcSet="/hero/hero-mobile.webp" /><img src="/hero/hero.webp" alt="محطة آلية لمناولة السوائل في مختبر لمراقبة الجودة الدوائية، وخلفها عازل معقم" width={2560} height={1440} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full -scale-x-100 object-cover object-[70%_center]" /></picture></div>
        <div className="absolute inset-0 bg-white/85 lg:bg-transparent lg:bg-linear-to-l lg:from-white lg:via-white/85 lg:to-white/15" />
        <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-40 lg:px-8 lg:pt-32 lg:pb-52">
          <div className="max-w-2xl">
            <h1 className="rise mb-5 max-w-xl font-heading text-base font-semibold leading-7 text-ink text-balance md:text-lg" style={{ '--i': 0 } as React.CSSProperties}>{arHome.h1}</h1>
            <p className="rise font-heading text-4xl font-bold leading-[1.3] text-ink md:text-5xl lg:text-6xl" style={{ '--i': 1 } as React.CSSProperties}><span className="block">{arHome.slogan[0]}</span><span className="block">{arHome.slogan[1]} <span className="text-orange">{arHome.slogan[2]}</span></span></p>
            <p className="rise mt-7 max-w-xl text-lg leading-9 text-muted-foreground" style={{ '--i': 2 } as React.CSSProperties}>{arHome.intro}</p>
            <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ '--i': 3 } as React.CSSProperties}><ButtonLink href="/ar/contact">{arHome.primary}</ButtonLink><ButtonLink href="/ar/brands" variant="secondary">{arHome.secondary}</ButtonLink></div>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto -mt-20 max-w-7xl px-5 lg:-mt-24 lg:px-8"><StatStrip stats={stats} /></div>
    </section>

    <PageSection className="bg-paper">
      <SectionIntro title={arHome.servicesTitle} />
      <Spotlight><ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{programs.map((program, index) => <li key={program.id}><NumberedCard index={index + 1} icon={icon(program.id)} title={arHome.services[program.id].title} body={arHome.services[program.id].body} href={`/ar/services/${program.slug}`} /></li>)}</ol></Spotlight>
    </PageSection>

    <PageSection>
      <SectionIntro title={arHome.solutionsTitle} intro={arHome.solutionsIntro} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{solutions.map((item) => <CardLink key={item.id} icon={icon(item.id)} eyebrow={brandNames(item.brands)} title={arHome.solutions[item.id].title} body={arHome.solutions[item.id].body} href={`/ar/solutions/${item.slug}`} />)}</Spotlight>
    </PageSection>

    <PageSection className="bg-paper">
      <SectionIntro title={arHome.partnersTitle} intro={arHome.partnersIntro} />
      <Spotlight className="grid grid-cols-2 gap-4 md:grid-cols-4">{brands.map((brand) => <BrandTile key={brand.slug} brand={brand} />)}<AccentTile href="/ar/brands" label={arHome.allBrands} /></Spotlight>
    </PageSection>

    <DarkBand overlap title={arHome.coverageTitle} intro={arHome.coverageIntro}>
      <Spotlight className="grid gap-4 md:grid-cols-3">{offices.map((office) => <GlassTile key={office.slug} href={`/ar/locations/${office.slug}`} icon={<MapPin className="size-5 text-brand" />} badge={office.headquarters ? 'المقر الرئيسي' : undefined} title={arOfficeNames[office.name]} body={arAddresses[office.slug]} />)}</Spotlight>
    </DarkBand>
    <ArClosingCta />
  </main></PageTransition>
}
