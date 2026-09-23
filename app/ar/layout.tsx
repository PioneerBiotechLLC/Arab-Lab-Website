import { HtmlLang } from '@/components/html-lang'

// Arabic section: right-to-left, Arabic typography (see globals.css [lang='ar']). The shared header and footer switch
// to Arabic on /ar paths by themselves.
export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <div lang="ar" dir="rtl">
    <HtmlLang lang="ar" />
    {children}
  </div>
}
