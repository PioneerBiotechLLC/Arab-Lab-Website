import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageSection, PageShell } from '@/components/site'
import type { Block, LegalDoc } from '@/lib/legal'
import { localizedMetadata } from '@/lib/seo'
import { localePath, type Locale } from '@/lib/i18n'
import { localeData } from '@/lib/content/locale'
import { ui } from '@/lib/ui'

// Renders **bold** and [text](href) inside a block of copy; everything else is plain text.
function inline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (!link) return part
    const external = /^https?:/.test(link[2]) || link[2].startsWith('mailto:')
    return external
      ? <a key={i} href={link[2]} className="font-medium text-orange underline decoration-orange/40 underline-offset-4 hover:decoration-orange">{link[1]}</a>
      : <Link key={i} href={link[2]} className="font-medium text-orange underline decoration-orange/40 underline-offset-4 hover:decoration-orange">{link[1]}</Link>
  })
}

function BlockView({ block }: { block: Block }) {
  if (typeof block === 'string') return <p className="text-base leading-7 text-muted-foreground">{inline(block)}</p>
  if ('list' in block) return <ul className="grid gap-3 ps-5 text-base leading-7 text-muted-foreground marker:text-orange">{block.list.map((item) => <li key={item} className="ps-1 list-disc">{inline(item)}</li>)}</ul>
  if ('note' in block) return <p className="rounded-2xl border border-border bg-paper px-5 py-4 text-sm leading-6 text-ink">{inline(block.note)}</p>
  return <div className="overflow-x-auto rounded-2xl border border-border">
    <table className="w-full min-w-[40rem] border-collapse text-start text-sm">
      <thead><tr className="bg-paper">{block.table.head.map((h) => <th key={h} scope="col" className="border-b border-border px-4 py-3 font-mono text-xs font-medium text-ink">{h}</th>)}</tr></thead>
      <tbody>{block.table.rows.map((row) => <tr key={row[0]} className="align-top">{row.map((cell, i) => <td key={i} className={`border-b border-border px-4 py-3 leading-6 last:border-b-0 ${i === 0 ? 'font-medium text-ink' : 'text-muted-foreground'}`}>{inline(cell)}</td>)}</tr>)}</tbody>
    </table>
  </div>
}

export function legalMetadata(locale: Locale, slug: string): Metadata {
  return localizedMetadata(locale, `/${slug}`, localeData(locale).legalSeo(slug))
}

// One layout for the three legal documents in either language: hero, a sticky contents list, the sections, and
// links to the other two.
export function LegalPage({ slug, locale = 'en' }: { slug: string; locale?: Locale }) {
  const docs = localeData(locale).legalDocs
  const doc = docs.find((d) => d.slug === slug)!
  const others = docs.filter((d) => d.slug !== doc.slug)
  const t = ui[locale]
  return <PageShell breadcrumbs={[{ name: t.home, href: localePath(locale, '/') }, { name: doc.title, href: localePath(locale, `/${doc.slug}`) }]} title={doc.title} intro={doc.intro}>
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20">
        <nav aria-label={t.contents} className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs text-muted-foreground">{t.lastUpdated} {doc.updated}</p>
          <ol className="mt-6 grid border-s border-border text-sm">
            {doc.sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="-ms-px block border-s border-transparent py-2 ps-4 text-muted-foreground hover:border-orange hover:text-ink">{s.title}</a></li>)}
          </ol>
        </nav>
        <article className="max-w-3xl">
          {doc.sections.map((s, i) => <section key={s.id} id={s.id} className={`scroll-mt-28 ${i ? 'mt-14 border-t border-border pt-12' : ''}`}>
            <h2 className="font-heading text-2xl font-bold tracking-[-0.01em] text-ink">{s.title}</h2>
            <div className="mt-5 grid gap-5">{s.blocks.map((b, j) => <BlockView key={j} block={b} />)}</div>
          </section>)}
        </article>
      </div>
    </PageSection>
    <PageSection className="bg-paper">
      <p className="font-mono text-xs text-muted-foreground">{t.alsoRead}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {others.map((d) => <Link key={d.slug} href={localePath(locale, `/${d.slug}`)} className="group flex items-center justify-between gap-6 rounded-2xl border border-line bg-white p-6 shadow-card hover:border-orange/60">
          <span><span className="font-heading text-lg font-bold text-ink">{d.title}</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">{d.intro}</span></span>
          <ArrowUpRight className="size-5 shrink-0 text-orange transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>)}
      </div>
    </PageSection>
  </PageShell>
}
