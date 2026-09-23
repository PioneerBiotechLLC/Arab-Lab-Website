// Arabic pages reuse the English card (Satori cannot shape Arabic script); the alt text is Arabic.
import { ogContentType, ogSize } from '@/lib/og'
import { arLocations } from '@/lib/ar'

export { default } from '../../../(en)/locations/[slug]/opengraph-image'

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params
  return [{ id: 'card', alt: arLocations.offices[slug]?.h1 ?? 'عرب لاب', size: ogSize, contentType: ogContentType }]
}
