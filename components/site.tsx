'use client'

import { ViewTransition, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { CountUp, Spotlight } from '@/components/motion'
import { PageTransition } from '@/components/page-transition'
import { Breadcrumbs } from '@/components/content'
import type { Crumb } from '@/lib/schema'
import { delay } from '@/lib/utils'
import logoSizes from '@/lib/brand-logos.json'
import { brandBySlug, contact, markets, offices } from '@/lib/site-data'
import { arAddresses, arOfficeNames } from '@/lib/ar'
import { englishPath, isArabicPath, localePath, type Locale } from '@/lib/i18n'
import { ui } from '@/lib/ui'

/** Locale of the current page, read from its path (/ar/… is Arabic). Nav and chrome strings live in lib/ui.ts;
 * the nav lists specific destinations only — the logo is the way home, so there is no generic "Home" entry. */
export function useLocale(): Locale { return isArabicPath(usePathname()) ? 'ar' : 'en' }

const button = {
  primary: 'inline-flex items-center py-3 gap-2 rounded-full bg-orange px-6 font-heading text-sm font-semibold text-white shadow-card hover:bg-amber',
  secondary: 'inline-flex items-center py-3 gap-2 rounded-full border border-line bg-white/70 px-6 font-heading text-sm font-semibold text-ink backdrop-blur hover:border-ink',
  onDark: 'inline-flex items-center py-3 gap-2 rounded-full border border-white/20 bg-white/5 px-6 font-heading text-sm font-semibold text-white backdrop-blur hover:border-white/50 hover:bg-white/10',
}

export function ButtonLink({ href, variant = 'primary', children, ...rest }: { href: string; variant?: keyof typeof button; children: React.ReactNode; target?: string; rel?: string }) {
  return <Link href={href} className={`btn ${button[variant]}`} {...rest}>{children}<span aria-hidden className="btn-node" /></Link>
}

export function Logo({ full = false, ar = false }: { full?: boolean; ar?: boolean }) {
  return <Link href={ar ? '/ar' : '/'} transitionTypes={['nav-back']} className="group inline-flex items-center gap-3 py-0.5" aria-label={ui[ar ? 'ar' : 'en'].logoLabel}>
    <Image src="/logo-mark.webp" alt="Arab Lab Scientific Equipment logo" width={512} height={465} priority className="h-10 w-auto shrink-0" />
    <span className="flex flex-col">
      <span className="font-heading text-lg font-bold leading-none tracking-tight text-ink">ARAB <span className="text-orange">LAB</span></span>
      {full && <span lang="en" dir="ltr" className="mt-1 font-mono text-xs text-muted-foreground">Scientific equipment L.L.C.</span>}
    </span>
  </Link>
}

// Every page exists in both languages under the same path, so the switcher links to the counterpart by prefix.
// `switcher` comes from the root layout (lib/i18n.ts arabicLinksEnabled); `showBlog` once a post is published.
// Below lg the nav folds behind a menu button into a full-height panel hung from the header, so the button stays put to close it.
export function SiteHeader({ switcher = false, showBlog = false }: { switcher?: boolean; showBlog?: boolean }) {
  const pathname = usePathname()
  const ar = isArabicPath(pathname)
  const t = ui[ar ? 'ar' : 'en']
  const items = t.nav.filter(([, href]) => showBlog || !href.endsWith('/blog'))
  const currentIndex = items.findIndex(([, href]) => pathname === href || pathname.startsWith(`${href}/`))
  const counterpart = switcher ? (ar ? englishPath(pathname) : localePath('ar', pathname)) : undefined
  const contactHref = ar ? '/ar/contact' : '/contact'
  // Moving right along the nav (down the menu) is "forward": content slides left; moving back slides right.
  const direction = (index: number) => [index > currentIndex ? 'nav-forward' : 'nav-back']
  // The menu remembers the path it was opened on, so any navigation (a link, back/forward) closes it with no effect to sync.
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const open = menuPath === pathname
  const close = () => setMenuPath(null)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // While open the panel is the page: everything outside the header goes inert and stops scrolling (the gutter is kept so
  // nothing shifts), Escape hands focus back to the button, and widening past lg — where the inline nav returns — closes it.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const outside = [...document.body.children].filter((el) => el !== headerRef.current && !el.hasAttribute('inert'))
    outside.forEach((el) => el.setAttribute('inert', ''))
    Object.assign(root.style, { overflow: 'hidden', scrollbarGutter: 'stable' })
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuPath(null); toggleRef.current?.focus() } }
    const wide = matchMedia('(min-width: 64rem)')
    const onWide = () => { if (wide.matches) setMenuPath(null) }
    document.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      outside.forEach((el) => el.removeAttribute('inert'))
      Object.assign(root.style, { overflow: '', scrollbarGutter: '' })
      document.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
    }
  }, [open])

  // Translucent chrome that solidifies with scroll (::before, scroll-driven); the ::after gradient is a soft scroll edge in place of a 1px divider.
  // Named for view transitions so it stays fixed while page content slides beneath it.
  return <header ref={headerRef} data-header data-open={open || undefined} dir={ar ? 'rtl' : undefined} lang={ar ? 'ar' : undefined} style={{ viewTransitionName: 'site-header' }} className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-6 after:bg-linear-to-b after:from-white/70 after:to-transparent">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
      <Logo full ar={ar} />
      <nav aria-label="Primary" className="hidden gap-6 text-sm font-medium whitespace-nowrap lg:flex">
        {items.map(([label, href], index) => {
          const current = index === currentIndex
          return <Link key={href} href={href} transitionTypes={direction(index)} aria-current={current ? 'page' : undefined} className="relative px-1 py-3 text-muted-foreground hover:text-ink aria-[current=page]:text-ink">
            {label}
            {current && <ViewTransition name="nav-indicator" share="nav-indicator" default="none"><span aria-hidden className="absolute inset-x-0 bottom-1.5 h-0.5 rounded-full bg-orange" /></ViewTransition>}
          </Link>
        })}
      </nav>
      <div className="hidden items-center gap-5 lg:flex">
        {counterpart && <Link href={counterpart} hrefLang={ar ? 'en' : 'ar'} lang={ar ? 'en' : 'ar'} className="py-3 text-sm font-medium text-muted-foreground hover:text-ink">{t.switchTo}</Link>}
        <Link href={contactHref} transitionTypes={['nav-forward']} className="btn flex items-center gap-2 py-3 font-heading text-sm font-semibold text-orange hover:text-amber">{t.getInTouch}<span aria-hidden className="btn-node" /></Link>
      </div>
      <button ref={toggleRef} type="button" aria-expanded={open} aria-controls="site-menu" aria-label={t.menu} onClick={() => setMenuPath(open ? null : pathname)} className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-white/70 text-ink backdrop-blur hover:border-ink lg:hidden">
        <span aria-hidden className="menu-icon"><span /><span /></span>
      </button>
    </div>
    {/* Links sit on a short spine — the site's connector line — with the orange trace drawn down to the current page. */}
    <div id="site-menu" data-menu className="absolute inset-x-0 top-full h-[calc(100dvh_-_100%)] overflow-hidden border-t border-border bg-white lg:hidden">
      <span aria-hidden className="pointer-events-none absolute -end-48 -bottom-48 size-[30rem] rounded-full bg-brand/10 blur-3xl" />
      <div className="relative flex h-full flex-col overflow-y-auto overscroll-contain">
        <nav aria-label="Primary" className="px-5 pt-6">
          <ul className="menu-spine relative" style={{ '--lit': currentIndex } as React.CSSProperties}>
            {items.map(([label, href], index) => <li key={href} style={delay(index)}>
              <Link href={href} onClick={close} transitionTypes={direction(index)} aria-current={index === currentIndex ? 'page' : undefined} className="flex h-14 items-center gap-5 font-heading text-[1.75rem] font-bold tracking-[-0.01em] text-ink aria-[current=page]:text-orange">
                <span aria-hidden className="menu-dot" />{label}
              </Link>
            </li>)}
          </ul>
        </nav>
        <div className="menu-foot mt-auto px-5 pt-10 pb-[max(1.5rem,env(safe-area-inset-bottom))]" style={delay(items.length)}>
          <div className="grid divide-y divide-border border-y border-border text-sm font-medium">
            <a href={`tel:${contact.phone}`} className="flex items-center gap-3 py-3.5 text-ink hover:text-orange"><Phone className="size-4 text-orange" /><span dir="ltr">{contact.phoneDisplay}</span></a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 py-3.5 text-ink hover:text-orange"><Mail className="size-4 text-orange" /><span dir="ltr">{contact.email}</span></a>
          </div>
          <div className="mt-5 flex gap-3">
            {counterpart && <Link href={counterpart} onClick={close} hrefLang={ar ? 'en' : 'ar'} lang={ar ? 'en' : 'ar'} className={button.secondary}>{t.switchTo}</Link>}
            <Link href={contactHref} onClick={close} transitionTypes={['nav-forward']} className={`btn ${button.primary} flex-1 justify-center`}>{t.getInTouch}<span aria-hidden className="btn-node" /></Link>
          </div>
        </div>
      </div>
    </div>
  </header>
}

// `showBlog` is decided on the server (root layout): the link appears once a post is published, or in development.
export function SiteFooter({ showBlog = false }: { showBlog?: boolean }) {
  const ar = isArabicPath(usePathname())
  const t = ui[ar ? 'ar' : 'en']
  const explore = t.footer.filter(([, href]) => showBlog || !href.endsWith('/blog'))
  return <footer dir={ar ? 'rtl' : undefined} lang={ar ? 'ar' : undefined} className="border-t border-border bg-white">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
      <div><Logo full ar={ar} /><p className="mt-6 max-w-xs text-sm leading-6 text-muted-foreground">{t.footerBlurb(markets.join(', '))}</p><p className="mt-8 font-mono text-xs text-muted-foreground">{t.rights}</p></div>
      <div><p className="label mb-5">{t.offices}</p><div className="grid gap-4 text-sm leading-5 text-muted-foreground">{offices.map((office) => <p key={office.name}><Link href={`${ar ? '/ar' : ''}/locations/${office.slug}`} className="inline-block min-w-11 py-3 font-semibold text-ink hover:text-orange">{ar ? arOfficeNames[office.name] : office.name}</Link><br /><span>{ar ? arAddresses[office.slug].split('، ').slice(0, 2).join('، ') : office.address.split(', ').slice(0, 2).join(', ')}</span></p>)}</div></div>
      <div><p className="label mb-5">{t.explore}</p><div className="grid text-sm text-muted-foreground">{explore.map(([label, href]) => <Link key={href} href={href} className="py-3 hover:text-ink">{label}</Link>)}<a href={contact.website} className="py-3 hover:text-ink" target="_blank" rel="noreferrer">{contact.websiteDisplay}</a><div className="mt-5 flex flex-wrap gap-x-5 border-t border-border pt-2 text-xs">{t.legal.map(([label, href]) => <Link key={href} href={href} className="py-3 hover:text-ink">{label}</Link>)}</div></div></div>
    </div>
  </footer>
}

// Tracking tightens with size: -0.01em at 30px, -0.02em at 48px.
export function SectionIntro({ title, intro, children }: { title: string; intro?: string; children?: React.ReactNode }) {
  const body = intro ?? children
  return <div className="mb-12 max-w-2xl"><h2 className="font-heading text-3xl font-bold tracking-[-0.01em] text-ink text-balance md:text-5xl md:tracking-[-0.02em]">{title}</h2>{body && <p className="mt-5 text-base leading-7 text-muted-foreground">{body}</p>}</div>
}

export function StatStrip({ stats }: { stats: [string, string][] }) {
  return <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border/70 shadow-float backdrop-blur-xl md:grid-cols-4">
    {stats.map(([value, label]) => <div key={label} className="flex flex-col-reverse gap-3 bg-white/90 px-6 py-7"><dt className="font-mono text-xs font-medium text-ink">{label}</dt><dd className="font-heading text-4xl font-bold tracking-[-0.02em] text-ink"><CountUp value={value} /></dd></div>)}
  </dl>
}

// Inner-page hero: paper ground with a brand glow and a staggered entrance; an optional stat strip straddles its bottom edge like the homepage.
export function PageShell({ children, title, intro, actions, stats, breadcrumbs, breadcrumbLabel, banner }: { children: React.ReactNode; title: React.ReactNode; intro?: string; actions?: React.ReactNode; stats?: [string, string][]; breadcrumbs?: Crumb[]; breadcrumbLabel?: string; banner?: React.ReactNode }) {
  const locale = useLocale()
  return <PageTransition><main id="content" tabIndex={-1} className="outline-none">
    {banner}
    <section className={`relative overflow-hidden bg-paper ${stats ? '' : 'border-b border-border'}`}>
      <span aria-hidden className="pointer-events-none absolute -top-48 -right-40 size-[36rem] rounded-full bg-brand/10 blur-3xl" />
      <div className={`relative mx-auto max-w-7xl px-5 pt-20 lg:px-8 lg:pt-28 ${stats ? 'pb-36 lg:pb-40' : 'pb-20 lg:pb-28'}`}>
        {breadcrumbs && <div className="rise" style={delay(0)}><Breadcrumbs items={breadcrumbs} label={breadcrumbLabel ?? ui[locale].breadcrumb} /></div>}
        <h1 className="rise max-w-4xl font-heading text-4xl font-bold tracking-[-0.015em] text-ink text-balance md:text-6xl md:tracking-[-0.03em]" style={delay(0)}>{title}</h1>
        {intro && <p className="rise mt-6 max-w-2xl text-lg leading-8 text-muted-foreground" style={delay(1)}>{intro}</p>}
        {actions && <div className="rise mt-9 flex flex-wrap gap-4" style={delay(2)}>{actions}</div>}
      </div>
    </section>
    {stats && <div className="rise relative z-10 mx-auto -mt-16 max-w-7xl px-5 lg:-mt-20 lg:px-8" style={delay(3)}><StatStrip stats={stats} /></div>}
    {children}
  </main></PageTransition>
}

export function PageSection({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) { return <section id={id} className={`border-b border-border ${className}`}><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">{children}</div></section> }

// Heavier material for a structural region. With `overlap`, it leaves room for a ClosingCta card to sit across its bottom edge.
export function DarkBand({ title, intro, children, overlap = false, id }: { title: string; intro?: string; children?: React.ReactNode; overlap?: boolean; id?: string }) {
  return <section id={id} className={`relative overflow-hidden bg-ink text-white ${overlap ? 'pb-40 lg:pb-48' : ''}`}>
    <span aria-hidden className="pointer-events-none absolute -top-40 -left-40 size-[32rem] rounded-full bg-brand/15 blur-3xl" />
    <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="mb-12 max-w-2xl"><h2 className="font-heading text-3xl font-bold tracking-[-0.01em] text-balance md:text-5xl md:tracking-[-0.02em]">{title}</h2>{intro && <p className="mt-5 text-base leading-7 text-white/75">{intro}</p>}</div>
      {children}
    </div>
  </section>
}

const glassTile = 'block rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur'
export function GlassTile({ href, icon, badge, title, body }: { href?: string; icon?: React.ReactNode; badge?: string; title: string; body: string }) {
  const header = icon || badge
  const content = <>
    {header && <div className="flex items-center justify-between">{icon ?? <span />}{badge && <span className="rounded-full border border-brand/40 px-2 py-0.5 font-mono text-xs text-orange-on-dark">{badge}</span>}</div>}
    <p className={`${header ? 'mt-8' : ''} font-heading text-xl font-bold`}>{title}</p>
    <p className="mt-2 text-sm font-medium leading-6 text-white/80">{body}</p>
  </>
  return href ? <Link href={href} data-spot className={`${glassTile} spot-strong hover:border-white/25 hover:bg-white/10`}>{content}</Link> : <div data-spot className={`${glassTile} spot-strong`}>{content}</div>
}

export function OfficeTiles() {
  const locale = useLocale()
  const ar = locale === 'ar'
  return <Spotlight className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{offices.map((office) => <GlassTile key={office.name} href={localePath(locale, `/locations/${office.slug}`)} icon={<MapPin className="size-5 text-brand" />} badge={office.headquarters ? (ar ? ui.ar.hq : office.short) : undefined} title={ar ? arOfficeNames[office.name] : office.name} body={ar ? arAddresses[office.slug] : office.address} />)}</Spotlight>
}

// Elevated card with an oversized watermark numeral that drifts with scroll. A link when `href` is given, static otherwise; `children` render below the body.
export function NumberedCard({ index, eyebrow, title, body, href, id, icon, children }: { index: number; eyebrow?: string; title: string; body?: string; href?: string; id?: string; icon?: React.ReactNode; children?: React.ReactNode }) {
  const t = ui[useLocale()]
  const base = 'relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-7 shadow-card'
  const content = <>
    <span aria-hidden className="drift pointer-events-none absolute -top-6 -right-2 font-heading text-[7rem] leading-none font-bold tracking-[-0.06em] text-ink/[0.05]">{String(index).padStart(2, '0')}</span>
    {icon && <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-paper text-orange">{icon}</span>}
    {eyebrow && <span className="label">{eyebrow}</span>}
    <p className={`${icon ? 'mt-8' : 'mt-16'} font-heading text-xl font-bold text-ink`}>{title}</p>
    {body && <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>}
    {children}
    {href && <span className="mt-auto flex items-center gap-2 pt-6 font-mono text-xs text-orange">{t.exploreCard} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>}
  </>
  return href ? <Link id={id} href={href} data-spot className={`group ${base} border-line hover:border-orange/60`}>{content}</Link> : <div id={id} data-spot className={`${base} border-border`}>{content}</div>
}

// Pill links to the partner pages behind a solution.
export function BrandChips({ slugs }: { slugs: string[] }) {
  const locale = useLocale()
  return <div className="relative mt-5 flex flex-wrap gap-2">{slugs.map((slug) => { const brand = brandBySlug(slug); return brand && <Link key={slug} href={localePath(locale, `/brands/${slug}`)} className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-3.5 text-xs font-semibold text-ink hover:border-orange hover:text-orange">{brand.name} <ArrowUpRight className="size-3" /></Link> })}</div>
}

export function CardLink({ eyebrow, title, body, href, icon }: { eyebrow: string; title: string; body: string; href: string; icon?: React.ReactNode }) {
  const t = ui[useLocale()]
  return <Link href={href} data-spot className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card hover:border-orange/60">{icon && <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-paper text-orange">{icon}</span>}<p className="label">{eyebrow}</p><h3 className={`${icon ? 'mt-6' : 'mt-10'} font-heading text-2xl font-bold text-ink`}>{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p><span className="mt-auto flex items-center gap-2 pt-8 font-mono text-xs text-orange">{t.exploreCard} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></Link>
}

// Brand tile with a watermark initial; `detailed` adds the summary and a profile link.
// Every partner logo is normalised to the same 660×200 transparent canvas by `pnpm logos`,
// so one box sizes all seven and the marks read at a consistent optical weight.
// The logo stands in for the partner's name wherever it appears, so no heading repeats it. A wordmark
// carries the name itself; a bare symbol gets the name set beside it as a lockup. The image alt is always the
// brand name, and the visible name beside a symbol is aria-hidden so assistive tech announces it once. Logos share one 660×200 canvas (`pnpm logos`), so one height sizes them all.
export function BrandMark({ brand, size = 'h-9', text = 'text-xl' }: { brand: { name: string; slug: string; mark?: 'wordmark' | 'symbol' }; size?: string; text?: string }) {
  const symbol = brand.mark === 'symbol'
  const dims = (logoSizes as Record<string, { width: number; height: number }>)[brand.slug] ?? { width: 660, height: 200 }
  return <span className="flex items-center gap-3">
    <Image src={`/brands/${brand.slug}.webp`} alt={brand.name} {...dims} className={`${size} w-auto max-w-full shrink-0`} />
    {symbol && <span aria-hidden className={`font-heading ${text} font-bold tracking-[-0.01em] text-ink`}>{brand.name}</span>}
  </span>
}

export function BrandTile({ brand, detailed = false }: { brand: { name: string; slug: string; summary: string; mark?: 'wordmark' | 'symbol' }; detailed?: boolean }) {
  const locale = useLocale()
  return <Link href={localePath(locale, `/brands/${brand.slug}`)} data-spot className={`group relative flex overflow-hidden rounded-2xl border border-line bg-white shadow-card hover:border-orange/60 ${detailed ? 'min-h-64 flex-col justify-between p-7' : 'min-h-36 items-center p-5'}`}>
    {detailed
      ? <><h2><BrandMark brand={brand} size="h-10" /></h2><div><p className="mt-8 text-sm leading-6 text-muted-foreground">{brand.summary}</p><span className="mt-8 flex items-center gap-2 font-mono text-xs text-orange">{ui[locale].viewProfile} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></div></>
      : <BrandMark brand={brand} text="text-lg" />}
  </Link>
}

// Solid accent tile that completes a grid and carries its "see all" action.
export function AccentTile({ href, label, tall = false }: { href: string; label: string; tall?: boolean }) {
  return <Link href={href} className={`group flex flex-col justify-between rounded-2xl bg-orange text-white shadow-card hover:bg-amber ${tall ? 'min-h-64 p-7' : 'min-h-36 p-5'}`}><ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /><span className="font-heading text-lg font-bold">{label}</span></Link>
}

const contactTile = 'flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 text-ink hover:border-orange'
const contactRow = 'flex items-center gap-4 py-3 text-ink hover:text-orange'
export function ContactTiles({ flat = false }: { flat?: boolean }) {
  const tile = flat ? contactRow : contactTile
  return <div className={flat ? 'grid divide-y divide-border' : 'grid gap-3'}>
    <a href={`mailto:${contact.email}`} className={tile}><Mail className="size-5 text-orange" /><span dir="ltr" className="text-sm font-medium">{contact.email}</span></a>
    <a href={`tel:${contact.phone}`} className={tile}><Phone className="size-5 text-orange" /><span dir="ltr" className="text-sm font-medium">{contact.phoneDisplay}</span></a>
    <a href={contact.website} target="_blank" rel="noreferrer" className={tile}><Globe className="size-5 text-orange" /><span dir="ltr" className="text-sm font-medium">{contact.websiteDisplay}</span></a>
  </div>
}

// Closing card. With `overlap` it rides across the bottom edge of the DarkBand before it; otherwise it sits on its own paper section.
export function ClosingCta({ overlap = true, id }: { overlap?: boolean; id?: string }) {
  const locale = useLocale()
  const t = ui[locale].closing
  const ar = locale === 'ar'
  return <section id={id} className={`relative z-10 pb-20 lg:pb-28 ${overlap ? '-mt-24 lg:-mt-32' : 'bg-paper pt-20 lg:pt-28'}`}>
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="grid gap-10 rounded-3xl bg-white p-8 shadow-float md:grid-cols-[1.2fr_1fr] md:items-center md:p-14">
        <div><h2 className="font-heading text-3xl font-bold tracking-[-0.01em] text-ink md:text-5xl md:tracking-[-0.02em]">{t.title}</h2><p className={`mt-5 max-w-md text-base text-muted-foreground ${ar ? 'leading-8' : 'leading-7'}`}>{t.body}</p><div className="mt-8 flex flex-wrap gap-4"><ButtonLink href={localePath(locale, '/contact')}>{t.primary}</ButtonLink><ButtonLink href={localePath(locale, '/solutions')} variant="secondary">{t.secondary}</ButtonLink></div></div>
        <ContactTiles flat />
      </div>
    </div>
  </section>
}
