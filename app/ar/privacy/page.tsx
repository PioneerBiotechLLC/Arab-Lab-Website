import { LegalPage, legalMetadata } from '@/components/legal'

export const metadata = legalMetadata('ar', 'privacy')

export default function Page() { return <LegalPage slug="privacy" locale='ar' /> }
