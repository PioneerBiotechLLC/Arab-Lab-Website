// RSS 2.0 feed of published posts in one language (/blog/rss.xml and /ar/blog/rss.xml).
import { publishedPosts, type Lang } from './blog'
import { absoluteUrl, site } from './site'
import { categoryBySlug } from './blog-categories'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const channel = {
  en: { title: `${site.name} — Laboratory insights`, description: 'Technical articles for laboratory, QC and production teams in the UAE, Saudi Arabia and Egypt.', base: '/blog' },
  ar: { title: 'عرب لاب للمعدات العلمية — مقالات المختبرات', description: 'مقالات تقنية لفرق المختبرات ومراقبة الجودة والإنتاج في الإمارات والسعودية ومصر.', base: '/ar/blog' },
}

export function rssFeed(lang: Lang) {
  const posts = publishedPosts(lang)
  const c = channel[lang]
  const items = posts.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${absoluteUrl(`${c.base}/${p.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`${c.base}/${p.slug}`)}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
      <category>${esc((lang === 'ar' ? categoryBySlug(p.category)?.nameAr : categoryBySlug(p.category)?.name) ?? p.category)}</category>
    </item>`).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(c.title)}</title>
    <link>${absoluteUrl(c.base)}</link>
    <atom:link href="${absoluteUrl(`${c.base}/rss.xml`)}" rel="self" type="application/rss+xml" />
    <description>${esc(c.description)}</description>
    <language>${lang}</language>
${posts[0] ? `    <lastBuildDate>${new Date(`${posts[0].updated}T00:00:00Z`).toUTCString()}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
