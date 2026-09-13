'use client'

import { useEffect, useRef, useState } from 'react'

type Stop = { id: string; label: string }
type Node = Stop & { y: number; dark: boolean }

// The connector-line motif as the page's spine: one dotted trace from the hero's origin node to the last section,
// drawn by scroll position (the pen tip sits at 70% of the viewport) with each node lighting as the line reaches
// its section heading. Nodes are real links, so the spine doubles as navigation.
export function Spine({ stops }: { stops: Stop[] }) {
  const ref = useRef<HTMLElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])

  useEffect(() => {
    const root = ref.current
    const main = root?.parentElement
    if (!root || !main) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0

    const paint = () => {
      frame = 0
      const mainTop = main.getBoundingClientRect().top + scrollY
      const tip = reduce ? Infinity : scrollY + innerHeight * 0.7 - mainTop - root.offsetTop
      root.style.setProperty('--drawn', `${Math.max(0, Math.min(root.offsetHeight, tip))}px`)
      root.querySelectorAll<HTMLElement>('[data-y]').forEach((node) => node.toggleAttribute('data-lit', tip >= Number(node.dataset.y)))
    }

    const measure = () => {
      const mainTop = main.getBoundingClientRect().top + scrollY
      const origin = main.querySelector<HTMLElement>('[data-spine-origin]')
      const originRect = origin?.getBoundingClientRect()
      const y0 = originRect ? originRect.top + scrollY - mainTop + originRect.height / 2 : 0
      const found = stops.flatMap<Node>((stop) => {
        const heading = main.querySelector<HTMLElement>(`#${stop.id} h2`)
        if (!heading) return []
        const rect = heading.getBoundingClientRect()
        return [{ ...stop, y: rect.top + scrollY - mainTop + rect.height / 2 - y0, dark: !!heading.closest('section')?.classList.contains('bg-ink') }]
      })
      root.style.top = `${y0}px`
      root.style.height = `${found.length ? found[found.length - 1].y : 0}px`
      setNodes(found)
      paint()
    }

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(paint) }
    measure()
    addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(main)
    document.fonts?.ready.then(measure)
    return () => { removeEventListener('scroll', onScroll); ro.disconnect(); if (frame) cancelAnimationFrame(frame) }
  }, [stops])

  // Nodes render after measurement; light them immediately rather than waiting for the next scroll.
  useEffect(() => { dispatchEvent(new Event('scroll')) }, [nodes])

  return <nav ref={ref} className="spine" aria-label="Page sections">
    <span className="spine-track" aria-hidden />
    <span className="spine-draw" aria-hidden />
    {nodes.map((node) => <a key={node.id} href={`#${node.id}`} className="spine-node" data-y={node.y} data-dark={node.dark || undefined} style={{ top: node.y }} aria-label={node.label}>
      <span className="spine-dot" aria-hidden />
    </a>)}
  </nav>
}
