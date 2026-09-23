import { BlogIndexPage, blogIndexMetadata } from '@/components/pages/blog'

export function generateMetadata() { return blogIndexMetadata('en') }

export default function Page() { return <BlogIndexPage locale='en' /> }
