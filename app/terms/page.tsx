import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal'
import { terms } from '@/lib/legal'

export const metadata: Metadata = { title: 'Terms and Conditions | Arab Lab', description: terms.intro, alternates: { canonical: '/terms' } }

export default function Page() { return <LegalPage doc={terms} /> }
