// Related blog posts on solution and brand pages, in the page's language. Shows only posts a visitor can see
// (published, or drafts in dev), so production never links to an unpublished article.
import { PageSection, SectionIntro } from '@/components/site'
import { PostGrid } from '@/components/blog'
import { postsForBrand, postsForSolution } from '@/lib/blog'
import type { Locale } from '@/lib/i18n'
import { ui } from '@/lib/ui'

export function RelatedPosts({ solution, brand, locale = 'en' }: { solution?: string; brand?: string; locale?: Locale }) {
  const posts = (solution ? postsForSolution(solution, locale) : brand ? postsForBrand(brand, locale) : []).slice(0, 3)
  if (!posts.length) return null
  return <PageSection>
    <SectionIntro title={ui[locale].fromBlog} />
    <PostGrid posts={posts} />
  </PageSection>
}
