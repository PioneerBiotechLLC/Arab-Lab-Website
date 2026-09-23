'use client'
// The root layout renders <html lang="en">; /ar pages set lang="ar" on their own wrapper, header and footer.
// This corrects the document language after hydration (screen readers, browser translation) and restores it on leave.
// A server-correct <html lang> needs separate root layouts, which is the proposed next step (SEO-CONTEXT).
import { useEffect } from 'react'

export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang
    document.documentElement.lang = lang
    return () => { document.documentElement.lang = previous }
  }, [lang])
  return null
}
