import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal'
import { privacy } from '@/lib/legal'

export const metadata: Metadata = { title: 'Privacy Policy | Arab Lab', description: privacy.intro, alternates: { canonical: '/privacy' } }

export default function Page() { return <LegalPage doc={privacy} /> }
