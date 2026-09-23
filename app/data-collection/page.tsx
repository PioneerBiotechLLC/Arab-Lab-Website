import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { pageSeo, seoProps } from '@/lib/seo-pages'
import { LegalPage } from '@/components/legal'
import { dataCollection } from '@/lib/legal'

export const metadata: Metadata = pageMetadata({ path: '/data-collection', ...seoProps(pageSeo['/data-collection']) })

export default function Page() { return <LegalPage doc={dataCollection} /> }
