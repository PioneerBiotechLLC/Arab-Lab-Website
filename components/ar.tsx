// Arabic page pieces. The closing call to action is the shared ClosingCta, which reads the locale from the path;
// ReviewBanner shows only while Arabic is switched off (lib/i18n.ts).
import { ClosingCta } from '@/components/site'
import { arChrome } from '@/lib/ar'
import { arabicApproved } from '@/lib/i18n'

export function ArClosingCta({ overlap = true }: { overlap?: boolean }) {
  return <ClosingCta overlap={overlap} />
}

/** Shown on every /ar page while Arabic is switched off. */
export function ReviewBanner() {
  if (arabicApproved()) return null
  return <div className="border-b border-danger-border/40 bg-[#FEF3F2] px-5 py-3 text-center text-sm text-danger">{arChrome.review}</div>
}
