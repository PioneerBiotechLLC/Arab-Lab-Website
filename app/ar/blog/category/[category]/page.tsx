import { BlogCategoryPage, blogCategoryMetadata, usedCategories } from '@/components/pages/blog'

export const dynamicParams = false
export function generateStaticParams() { return usedCategories('ar').map((c) => ({ category: c.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) { return blogCategoryMetadata('ar', (await params).category) }

export default async function Page({ params }: { params: Promise<{ category: string }> }) { return <BlogCategoryPage locale='ar' slug={(await params).category} /> }
