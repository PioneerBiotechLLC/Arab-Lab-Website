// Arabic page pieces: the closing call to action and the pre-approval review banner.
import { ButtonLink, ContactTiles } from '@/components/site'
import { arChrome, arCta } from '@/lib/ar'
import { arabicApproved } from '@/lib/i18n'

export function ArClosingCta({ overlap = true }: { overlap?: boolean }) {
  return <section className={`relative z-10 pb-20 lg:pb-28 ${overlap ? '-mt-24 lg:-mt-32' : 'bg-paper pt-20 lg:pt-28'}`}>
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="grid gap-10 rounded-3xl bg-white p-8 shadow-float md:grid-cols-[1.2fr_1fr] md:items-center md:p-14">
        <div><h2 className="font-heading text-3xl font-bold text-ink md:text-5xl">{arCta.title}</h2><p className="mt-5 max-w-md text-base leading-8 text-muted-foreground">{arCta.body}</p><div className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/ar/contact">{arCta.primary}</ButtonLink><ButtonLink href="/solutions" variant="secondary">{arCta.secondary}</ButtonLink></div></div>
        <ContactTiles flat />
      </div>
    </div>
  </section>
}

/** Shown on every /ar page until a native speaker approves the Arabic copy. */
export function ReviewBanner() {
  if (arabicApproved()) return null
  return <div className="border-b border-danger-border/40 bg-[#FEF3F2] px-5 py-3 text-center text-sm text-danger">{arChrome.review}</div>
}
