import { ViewTransition } from 'react'

// Directional slides for nav-bar navigation (typed by the links themselves); a soft fade-rise for everything else.
const byType = { 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'page' }

export function PageTransition({ children }: { children: React.ReactNode }) {
  return <ViewTransition enter={byType} exit={byType} default="none">{children}</ViewTransition>
}
