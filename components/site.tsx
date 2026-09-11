'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const navItems = [
  ['Home', '/'], ['About', '/about'], ['Solutions', '/solutions'], ['Brands', '/brands'], ['Locations', '/locations'], ['Contact', '/contact'],
]

export function Logo({ full = false }: { full?: boolean }) {
  return <Link href="/" className="group inline-flex items-center gap-3" aria-label="Arab Lab home">
    <Image src="/logo-mark.png" alt="" width={1219} height={1107} priority className="h-10 w-auto shrink-0" />
    <span className="flex flex-col">
      <span className="font-heading text-lg font-bold leading-none tracking-tight text-white">ARAB <span className="text-orange">LAB</span></span>
      {full && <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mist">Scientific equipment L.L.C.</span>}
    </span>
  </Link>
}

export function SiteHeader() {
  return <header className="sticky top-0 z-50 border-b border-navy-2/70 bg-navy-0/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
      <Logo full />
      <Link href="/contact" className="flex items-center gap-2 font-heading text-sm font-semibold text-orange transition-colors hover:text-amber">Get In Touch <ArrowUpRight className="size-4" /></Link>
    </div>
  </header>
}

export function SiteFooter() {
  return <footer className="border-t border-navy-2 bg-navy-0">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
      <div><Logo full /><p className="mt-6 max-w-xs text-sm leading-6 text-mist">Technical equipment and lifecycle support for laboratories across the Gulf and North Africa.</p><p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-mist/70">© 2026 Arab Lab Scientific Equipment L.L.C.</p></div>
      <div><p className="label mb-5">Offices</p><div className="grid gap-4 text-sm leading-5 text-mist"><p><strong className="text-white">Ras Al Khaimah</strong><br />408, Julphar Tower, Al Hisn Road</p><p><strong className="text-white">Dubai</strong><br />Aud Metha, Bur Dubai</p><p><strong className="text-white">Riyadh</strong><br />3808 Al Urubah Rd, Al Wurud</p><p><strong className="text-white">Cairo</strong><br />87, Dar Masr, Al Kronfel</p></div></div>
      <div><p className="label mb-5">Explore</p><div className="grid gap-3 text-sm text-mist">{navItems.map(([label, href]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}<span className="mt-5 border-t border-navy-2 pt-4 text-xs">Privacy Policy · Terms</span></div></div>
    </div>
  </footer>
}

export function ConnectorLine({ nodes }: { nodes: { title: string; description: string }[] }) {
  return <div className="grid gap-7 md:grid-cols-4 md:gap-0">{nodes.map((node, index) => <div key={node.title} className="relative flex gap-4 md:block md:pr-8">
    <div className="relative flex shrink-0 flex-col items-center md:block"><span className="relative z-10 block size-3 rounded-full bg-orange ring-4 ring-orange/10" /><span className="absolute left-1.5 top-3 h-full border-l border-dashed border-orange/50 md:hidden" /></div>
    <div className="-mt-1 md:mt-5"><p className="font-heading text-base font-bold text-white">{node.title}</p><p className="mt-2 max-w-[190px] text-sm leading-6 text-mist">{node.description}</p></div>
    {index < nodes.length - 1 && <span className="absolute left-3 top-1.5 hidden w-full border-t border-dashed border-orange/50 md:block" />}
  </div>)}</div>
}

export function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="mb-12 max-w-2xl"><p className="label mb-4">{eyebrow}</p><h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">{title}</h2>{children && <p className="mt-5 text-base leading-7 text-mist">{children}</p>}</div>
}

export function PageShell({ children, eyebrow, title, intro }: { children: React.ReactNode; eyebrow: string; title: string; intro?: string }) {
  return <><SiteHeader /><main><section className="border-b border-navy-2 bg-navy-0"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><p className="label mb-5">{eyebrow}</p><h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight text-white text-balance md:text-6xl">{title}</h1>{intro && <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">{intro}</p>}</div></section>{children}</main><SiteFooter /></>
}

export function CardLink({ eyebrow, title, body, href }: { eyebrow: string; title: string; body: string; href: string }) {
  return <Link href={href} className="group block border border-navy-2 bg-navy-1 p-7 transition-colors hover:border-orange/70"><p className="label">{eyebrow}</p><h3 className="mt-10 font-heading text-2xl font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-mist">{body}</p><span className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-orange">Explore <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></Link>
}

export function PageSection({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <section className={`border-b border-navy-2 ${className}`}><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">{children}</div></section> }
