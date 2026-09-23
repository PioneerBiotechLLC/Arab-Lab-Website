import { LegalPage, legalMetadata } from '@/components/legal'

export const metadata = legalMetadata('ar', 'data-collection')

export default function Page() { return <LegalPage slug="data-collection" locale='ar' /> }
