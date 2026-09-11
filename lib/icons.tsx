import { CircleDot, ClipboardCheck, Dna, Filter, FlaskConical, FlaskRound, Handshake, LayoutDashboard, LayoutGrid, Microscope, Package, Pipette, TestTube, TrendingUp, Wheat, Wrench, type LucideIcon } from 'lucide-react'

// Content icons keyed by the ids in site-data (programs, solutions) and department names. All from Lucide, so they match the UI chrome.
export const icons: Record<string, LucideIcon> = {
  // programs
  pharma: FlaskConical, food: Wheat, project: LayoutDashboard, consultant: ClipboardCheck,
  // solutions
  sterility: TestTube, endotoxin: LayoutGrid, filtration: Filter, 'liquid-handling': Pipette, 'culture-media': CircleDot, enzymes: FlaskRound,
  // departments
  Commercial: Handshake, Sales: TrendingUp, 'Life Science': Dna, Analytical: Microscope, Service: Wrench, Operational: Package,
}

export function icon(key: string, className = 'size-5') {
  const Icon = icons[key]
  return Icon ? <Icon className={className} aria-hidden /> : null
}
