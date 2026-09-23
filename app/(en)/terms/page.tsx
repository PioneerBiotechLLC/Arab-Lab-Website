import { LegalPage, legalMetadata } from '@/components/legal'

export const metadata = legalMetadata('en', 'terms')

export default function Page() { return <LegalPage slug="terms" locale='en' /> }
