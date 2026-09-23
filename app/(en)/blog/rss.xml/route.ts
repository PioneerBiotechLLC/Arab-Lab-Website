import { publishedPosts } from '@/lib/blog'
import { absoluteUrl, site } from '@/lib/site'
import { categoryBySlug } from '@/lib/blog-categories'

export const dynamic = 'force-static'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// RSS 2.0 feed of published English posts only.
export function GET() {
  const posts = publishedPosts('en')
  const items = posts.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${absoluteUrl(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${p.slug}`)}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
      <category>${esc(categoryBySlug(p.category)?.name ?? p.category)}</category>
    </item>`).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${site.name} — Laboratory insights`)}</title>
    <link>${absoluteUrl('/blog')}</link>
    <atom:link href="${absoluteUrl('/blog/rss.xml')}" rel="self" type="application/rss+xml" />
    <description>Technical articles for laboratory, QC and production teams in the UAE, Saudi Arabia and Egypt.</description>
    <language>en</language>
${posts[0] ? `    <lastBuildDate>${new Date(`${posts[0].updated}T00:00:00Z`).toUTCString()}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
