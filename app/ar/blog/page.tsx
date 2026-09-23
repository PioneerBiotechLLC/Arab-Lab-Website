import { BlogIndexPage, blogIndexMetadata } from '@/components/pages/blog'

export function generateMetadata() { return blogIndexMetadata('ar') }

export default function Page() { return <BlogIndexPage locale='ar' /> }
