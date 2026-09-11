import { Spotlight } from '@/components/motion'
import { AccentTile, BrandTile, ButtonLink, ClosingCta, DarkBand, GlassTile, PageSection, PageShell, SectionIntro } from '@/components/site'
import { brandNames, brands, solutions } from '@/lib/site-data'
import { icon } from '@/lib/icons'

export default function BrandsPage() {
  return <PageShell eyebrow="Brands" title="Seven partners. One program." intro="Each partner manufacturer addresses a specific laboratory problem — from rapid sterility testing to process filtration and culture media."
    actions={<><ButtonLink href="/contact">Discuss your application</ButtonLink><ButtonLink href="/solutions" variant="secondary">Browse by problem</ButtonLink></>}>
    <PageSection>
      <SectionIntro eyebrow="Partner manufacturers" title={`${brands.length} focused partners.`} />
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{brands.map((brand) => <BrandTile key={brand.slug} brand={brand} detailed />)}<AccentTile href="/contact" label="Discuss your application" tall /></Spotlight>
    </PageSection>
    <DarkBand overlap eyebrow="What each partner solves" title="Matched to the laboratory problem.">
      <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{solutions.map((item) => <GlassTile key={item.id} href={`/solutions#${item.id}`} icon={icon(item.id, 'size-5 text-brand')} badge={brandNames(item.brands)} title={item.title} body={item.body} />)}</Spotlight>
    </DarkBand>
    <ClosingCta />
  </PageShell>
}
