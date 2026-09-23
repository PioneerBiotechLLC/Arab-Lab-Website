// Content building blocks shared by brand, solution, service, location and blog pages. No hooks, so they render
// in server and client components alike.
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbList, faqPage, type Crumb } from '@/lib/schema'

const linkClass = 'font-medium text-orange underline decoration-orange/40 underline-offset-4 hover:decoration-orange'

/** Inline text with **bold**, [links](/path) and {{VERIFY: note}} review markers, which render as a visible highlight. */
export function Rich({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\{\{VERIFY:[^}]*\}\})/g).filter(Boolean).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
    const verify = part.match(/^\{\{VERIFY:\s*([^}]*)\}\}$/)
    if (verify) return <mark key={i} className="verify" title="Needs confirmation before publishing">Verify: {verify[1].trim()}</mark>
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (!link) return part
    return /^(https?:|mailto:|tel:)/.test(link[2]) ? <a key={i} href={link[2]} className={linkClass}>{link[1]}</a> : <Link key={i} href={link[2]} className={linkClass}>{link[1]}</Link>
  })}</>
}

/** Visible breadcrumb trail plus its BreadcrumbList structured data. The last item is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return <>
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return <li key={item.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden className="size-3.5 text-line rtl:rotate-180" />}
            {last ? <span aria-current="page" className="text-ink">{item.name}</span> : <Link href={item.href} className="py-1 hover:text-ink">{item.name}</Link>}
          </li>
        })}
      </ol>
    </nav>
    <JsonLd data={breadcrumbList(items)} />
  </>
}

/** Visible FAQ with matching FAQPage structured data (only questions shown here are marked up). */
export function FaqList({ faq, headingLevel = 3 }: { faq: { q: string; a: string }[]; headingLevel?: 3 | 4 }) {
  const H = headingLevel === 3 ? 'h3' : 'h4'
  return <>
    <div className="divide-y divide-border border-y border-border">
      {faq.map(({ q, a }) => <div key={q} className="grid gap-3 py-7 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12">
        <H className="font-heading text-lg font-semibold leading-7 text-ink">{q}</H>
        <p className="leading-7 text-muted-foreground"><Rich text={a} /></p>
      </div>)}
    </div>
    <JsonLd data={faqPage(faq)} />
  </>
}

/** Paragraphs of rich text. */
export function Prose({ paragraphs, lead = false }: { paragraphs: string[]; lead?: boolean }) {
  return <div className="grid max-w-2xl gap-5">{paragraphs.map((p, i) => <p key={i} className={lead && i === 0 ? 'text-lg leading-8 text-ink' : 'leading-7 text-muted-foreground'}><Rich text={p} /></p>)}</div>
}
