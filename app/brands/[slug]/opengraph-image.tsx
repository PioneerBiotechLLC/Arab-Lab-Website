import { ogCard, ogContentType, ogSize } from '@/lib/og'
import { brandSeo } from '@/lib/seo-pages'
import { brandBySlug } from '@/lib/site-data'

// One card per brand, with its own alt text.
export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params
  const brand = brandBySlug(slug)
  return [{ id: 'card', alt: brand ? brandSeo(brand).ogAlt : 'Arab Lab partner brand', size: ogSize, contentType: ogContentType }]
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = brandBySlug(slug)
  return ogCard(brand ? brandSeo(brand).card : { kicker: 'Partner brand', title: 'Arab Lab' })
}
