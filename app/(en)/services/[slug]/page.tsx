import { ServicePage, serviceMetadata } from '@/components/pages/services'
import { serviceContent } from '@/lib/content/services'

export const dynamicParams = false
export function generateStaticParams() { return serviceContent.map((s) => ({ slug: s.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return serviceMetadata('en', (await params).slug) }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <ServicePage locale='en' slug={(await params).slug} /> }
