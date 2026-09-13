import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal'
import { dataCollection } from '@/lib/legal'

export const metadata: Metadata = { title: 'Data Collection | Arab Lab', description: dataCollection.intro }

export default function Page() { return <LegalPage doc={dataCollection} /> }
