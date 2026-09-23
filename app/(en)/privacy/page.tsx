import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { pageSeo, seoProps } from '@/lib/seo-pages'
import { LegalPage } from '@/components/legal'
import { privacy } from '@/lib/legal'

export const metadata: Metadata = pageMetadata({ path: '/privacy', ...seoProps(pageSeo['/privacy']) })

export default function Page() { return <LegalPage doc={privacy} /> }
