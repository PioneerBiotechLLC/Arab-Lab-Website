// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { localeData } from '@/lib/content/locale'

export { default } from '../../../(en)/brands/[slug]/opengraph-image'

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params
  return [{ id: 'card', alt: (() => { const b = localeData('ar').brands.find((x) => x.slug === slug); return b ? localeData('ar').brandSeo(b).ogAlt : 'عرب لاب' })(), size: ogSize, contentType: ogContentType }]
}
