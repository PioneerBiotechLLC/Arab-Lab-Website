// Renders a post body. MDX is compiled at build time on the server with GitHub-flavoured markdown and heading ids.
// Before compiling, {{VERIFY: …}} markers become <Verify /> elements and pharmacopoeia chapter numbers such as
// "USP <71>" are escaped, since MDX would otherwise read them as JSX tags.
import Link from 'next/link'
import * as runtime from 'react/jsx-runtime'
import { evaluate } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

function Verify({ note }: { note: string }) {
  return <mark className="verify" title="Needs confirmation before publishing">Verify: {note}</mark>
}

function A({ href = '', children }: { href?: string; children?: React.ReactNode }) {
  return /^(https?:|mailto:|tel:)/.test(href) ? <a href={href} target="_blank" rel="noreferrer">{children}</a> : <Link href={href}>{children}</Link>
}

function Table({ children }: { children?: React.ReactNode }) {
  return <div className="table-wrap"><table>{children}</table></div>
}

export function preprocess(source: string) {
  // Escape chapter numbers in the prose, then turn markers into components; marker notes keep their text verbatim.
  return source.split(/(\{\{VERIFY:[^}]*\}\})/g).map((part) => {
    const marker = part.match(/^\{\{VERIFY:\s*([^}]*)\}\}$/)
    return marker ? `<Verify note={${JSON.stringify(marker[1].trim())}} />` : part.replace(/<(\d[\d.]*)>/g, '&lt;$1&gt;')
  }).join('')
}

export async function MdxBody({ source }: { source: string }) {
  const { default: Content } = await evaluate(preprocess(source), { ...runtime, remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] })
  return <Content components={{ a: A, table: Table, Verify }} />
}
