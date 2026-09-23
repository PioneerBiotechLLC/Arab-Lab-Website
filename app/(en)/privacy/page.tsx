import { LegalPage, legalMetadata } from '@/components/legal'

export const metadata = legalMetadata('en', 'privacy')

export default function Page() { return <LegalPage slug="privacy" locale='en' /> }
