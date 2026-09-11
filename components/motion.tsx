'use client'

import { useEffect, useRef, useState } from 'react'

// Counts a numeric stat up when it scrolls into view. Non-numeric values and reduced-motion users get the final value immediately.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const target = Number(value)
    const el = ref.current
    if (!el || !Number.isFinite(target) || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const from = target > 100 ? target - 40 : 0 // a year should tick, not climb from zero
    setDisplay(String(from))
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const duration = 1400
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - p, 4)
        setDisplay(String(Math.round(from + (target - from) * eased)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  return <span ref={ref} className="tabular-nums">{display}</span>
}

// Tracks the pointer 1:1 over any [data-spot] descendant by writing its local coordinates to CSS variables.
// The visual (a radial glow) is pure CSS, so there is no lag between the finger and the light.
export function Spotlight({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const card = (event.target as HTMLElement).closest<HTMLElement>('[data-spot]')
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    card.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }
  return <div className={className} onPointerMove={onPointerMove}>{children}</div>
}
