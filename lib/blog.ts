// Blog content loader. Posts are MDX files in content/blog/{en,ar}/ with YAML frontmatter.
// Only `status: published` posts are listed, put in the sitemap and RSS, or built in production.
// In development (`pnpm dev`) drafts are visible too, marked as drafts, so they can be reviewed at their URL.
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import GithubSlugger from 'github-slugger'
import { categoryBySlug } from './blog-categories'

export type Lang = 'en' | 'ar'
export type Faq = { q: string; a: string }
export type PostMeta = {
  title: string
  /** Optional shorter title for the <title> tag (the template adds " | Arab Lab"; keep it within 49 characters). */
  seoTitle?: string
  description: string
  slug: string
  date: string
  updated: string
  author: string
  category: string
  tags: string[]
  targetKeyword: string
  relatedSolutions: string[]
  relatedBrands: string[]
  status: 'draft' | 'published'
  needsNativeReview: boolean
  faq: Faq[]
}
export type Post = PostMeta & { lang: Lang; body: string; words: number; readingMinutes: number; toc: { id: string; text: string }[] }

const ROOT = join(process.cwd(), 'content/blog')
export const isDev = process.env.NODE_ENV === 'development'

function fail(file: string, msg: string): never { throw new Error(`Blog post ${file}: ${msg}`) }

function load(lang: Lang, file: string): Post {
  const raw = readFileSync(join(ROOT, lang, file), 'utf8')
  const { data, content } = matter(raw)
  const need = ['title', 'description', 'slug', 'date', 'author', 'category', 'targetKeyword', 'status'] as const
  for (const key of need) if (!data[key]) fail(file, `missing frontmatter "${key}"`)
  if (!['draft', 'published'].includes(data.status)) fail(file, 'status must be draft or published')
  if (!categoryBySlug(data.category)) fail(file, `unknown category "${data.category}"`)
  const asDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v))
  const slugger = new GithubSlugger()
  // Table of contents from level-2 headings; ids match rehype-slug, which uses the same slugger.
  const toc = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => { const text = m[1].replace(/\{\{VERIFY:[^}]*\}\}/g, '').replace(/[*_`]/g, '').trim(); return { id: slugger.slug(text), text } })
  const plainText = content.replace(/\{\{VERIFY:[^}]*\}\}/g, '').replace(/[#>*_`|[\]()-]/g, ' ')
  const faq: Faq[] = Array.isArray(data.faq) ? data.faq.map((f: { q: string; a: string }) => ({ q: String(f.q), a: String(f.a) })) : []
  const words = plainText.split(/\s+/).filter(Boolean).length + faq.reduce((n, f) => n + `${f.q} ${f.a}`.split(/\s+/).length, 0)
  return {
    title: data.title, seoTitle: data.seoTitle, description: data.description, slug: data.slug, date: asDate(data.date), updated: asDate(data.updated ?? data.date),
    author: data.author, category: data.category, tags: data.tags ?? [], targetKeyword: data.targetKeyword,
    relatedSolutions: data.relatedSolutions ?? [], relatedBrands: data.relatedBrands ?? [], status: data.status,
    needsNativeReview: Boolean(data.needsNativeReview), faq, lang, body: content, words,
    readingMinutes: Math.max(1, Math.round(words / (lang === 'ar' ? 180 : 200))), toc,
  }
}

const cache = new Map<Lang, Post[]>()
export function allPosts(lang: Lang = 'en'): Post[] {
  if (!cache.has(lang) || isDev) {
    const dir = join(ROOT, lang)
    const posts = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => load(lang, f)) : []
    posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
    cache.set(lang, posts)
  }
  return cache.get(lang)!
}

/** Posts a visitor can see: published ones, plus drafts while developing locally. */
export const visiblePosts = (lang: Lang = 'en') => allPosts(lang).filter((p) => p.status === 'published' || isDev)
export const publishedPosts = (lang: Lang = 'en') => allPosts(lang).filter((p) => p.status === 'published')
export const postBySlug = (slug: string, lang: Lang = 'en') => visiblePosts(lang).find((p) => p.slug === slug)
/** The same article in the other language, if it is visible. Posts are paired by slug. */
export const translationOf = (post: Post) => visiblePosts(post.lang === 'en' ? 'ar' : 'en').find((p) => p.slug === post.slug)

export function relatedPosts(post: Post, limit = 3) {
  return visiblePosts(post.lang)
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: (p.category === post.category ? 3 : 0) + p.tags.filter((t) => post.tags.includes(t)).length + p.relatedSolutions.filter((s) => post.relatedSolutions.includes(s)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p)
}

export const postsForSolution = (slug: string, lang: Lang = 'en') => visiblePosts(lang).filter((p) => p.relatedSolutions.includes(slug))
export const postsForBrand = (slug: string, lang: Lang = 'en') => visiblePosts(lang).filter((p) => p.relatedBrands.includes(slug))
