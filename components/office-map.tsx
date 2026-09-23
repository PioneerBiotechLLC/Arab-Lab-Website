'use client'
// Click-to-load Google Map. Nothing is requested from Google until the visitor chooses "Show map", which keeps
// the privacy policy accurate (no third-party requests or cookies by default) and keeps the page fast.
import { useState } from 'react'
import { MapPin } from 'lucide-react'

export function OfficeMap({ name, address, labels = { show: 'Show map', note: 'Loads a map from Google Maps.', open: 'Open in Google Maps', title: `Map of Arab Lab ${name}` } }: { name: string; address: string; labels?: { show: string; note: string; open: string; title: string } }) {
  const [loaded, setLoaded] = useState(false)
  const q = encodeURIComponent(address)
  return <div className="overflow-hidden rounded-3xl border border-border bg-paper shadow-card">
    <div className="relative aspect-[16/10] w-full">
      {loaded
        ? <iframe title={labels.title} src={`https://maps.google.com/maps?q=${q}&z=15&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
        : <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(rgb(123_141_161/0.35)_1px,transparent_1px)] [background-size:16px_16px] p-6 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-white shadow-card"><MapPin aria-hidden className="size-5 text-orange" /></span>
            <p className="max-w-xs text-sm leading-6 text-ink">{address}</p>
            <button type="button" onClick={() => setLoaded(true)} className="rounded-full border border-line bg-white px-5 py-3 font-heading text-sm font-semibold text-ink hover:border-ink">{labels.show}</button>
            <p className="text-xs text-muted-foreground">{labels.note}</p>
          </div>}
    </div>
    <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noreferrer" className="block border-t border-border px-6 py-4 text-sm font-medium text-orange hover:text-amber">{labels.open}</a>
  </div>
}
