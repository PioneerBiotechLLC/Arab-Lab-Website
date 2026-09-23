// Related blog posts on solution and brand pages. Shows only posts a visitor can see (published, or drafts in dev),
// so production never links to an unpublished article.
import { PageSection, SectionIntro } from '@/components/site'
import { PostGrid } from '@/components/blog'
import { postsForBrand, postsForSolution } from '@/lib/blog'

export function RelatedPosts({ solution, brand }: { solution?: string; brand?: string }) {
  const posts = (solution ? postsForSolution(solution) : brand ? postsForBrand(brand) : []).slice(0, 3)
  if (!posts.length) return null
  return <PageSection>
    <SectionIntro title="From the blog" />
    <PostGrid posts={posts} />
  </PageSection>
}
