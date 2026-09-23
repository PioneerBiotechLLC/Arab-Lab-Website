import { BrandPage, brandMetadata } from '@/components/pages/brands'
import { brands } from '@/lib/site-data'

export function generateStaticParams() { return brands.map((brand) => ({ slug: brand.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return brandMetadata('en', (await params).slug) }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <BrandPage locale='en' slug={(await params).slug} /> }
