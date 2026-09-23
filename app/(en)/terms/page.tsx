import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { pageSeo, seoProps } from '@/lib/seo-pages'
import { LegalPage } from '@/components/legal'
import { terms } from '@/lib/legal'

export const metadata: Metadata = pageMetadata({ path: '/terms', ...seoProps(pageSeo['/terms']) })

export default function Page() { return <LegalPage doc={terms} /> }
