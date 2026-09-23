import { LegalPage, legalMetadata } from '@/components/legal'

export const metadata = legalMetadata('ar', 'terms')

export default function Page() { return <LegalPage slug="terms" locale='ar' /> }
