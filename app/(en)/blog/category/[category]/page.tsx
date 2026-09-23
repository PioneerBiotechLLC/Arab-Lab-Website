import { BlogCategoryPage, blogCategoryMetadata, usedCategories } from '@/components/pages/blog'

export const dynamicParams = false
export function generateStaticParams() { return usedCategories('en').map((c) => ({ category: c.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) { return blogCategoryMetadata('en', (await params).category) }

export default async function Page({ params }: { params: Promise<{ category: string }> }) { return <BlogCategoryPage locale='en' slug={(await params).category} /> }
