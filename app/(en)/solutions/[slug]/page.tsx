import { SolutionPage, solutionMetadata } from '@/components/pages/solutions'
import { solutionContent } from '@/lib/content/solutions'

export const dynamicParams = false
export function generateStaticParams() { return solutionContent.map((s) => ({ slug: s.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return solutionMetadata('en', (await params).slug) }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <SolutionPage locale='en' slug={(await params).slug} /> }
