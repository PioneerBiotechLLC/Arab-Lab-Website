// Site-wide constants: one place for the domain, names, contact details, offices and social profiles.
// Everything that prints a URL, a name or an address reads from here (see docs/seo/SEO-CONTEXT.md).

export const site = {
  url: 'https://www.arablab-scientific.com',
  host: 'www.arablab-scientific.com',
  apexHost: 'arablab-scientific.com',
  name: 'Arab Lab Scientific Equipment',
  shortName: 'Arab Lab',
  legalName: 'Arab Lab Scientific Equipment L.L.C.',
  /** Name variants for schema.org `alternateName`. */
  alternateNames: ['Arab Lab', 'ArabLab', 'Arab Lab Scientific'],
  /** Arabic name is used in schema only once verified (SEO-CONTEXT VERIFY list). */
  arabicName: { value: 'عرب لاب', verified: true },
  email: 'info@arablab-scientific.com',
  phone: '+97175016631',
  phoneDisplay: '+971 7 501 6631',
  logo: '/logo-mark.webp',
  socials: {
    linkedin: 'https://ae.linkedin.com/company/arab-lab-scientific',
    facebook: 'https://www.facebook.com/p/ARAB-LAB-Scientific-Equipment-LLC-100068891799728/',
  },
  /** Date of the last substantive content change, used as sitemap lastModified for static pages. */
  contentUpdated: '2026-09-23',
} as const

export type Office = {
  slug: string
  name: string
  short: string
  address: string
  street: string
  locality: string
  region?: string
  postalCode?: string
  country: string
  countryCode: 'AE' | 'SA' | 'EG'
  headquarters: boolean
}

export const officeList: Office[] = [
  { slug: 'ras-al-khaimah', name: 'Ras Al Khaimah', short: 'HQ', address: '408, Julphar Tower, Al Hisn Road, Ras Al Khaimah, UAE', street: '408, Julphar Tower, Al Hisn Road', locality: 'Ras Al Khaimah', region: 'Ras Al Khaimah', country: 'UAE', countryCode: 'AE', headquarters: true },
  { slug: 'riyadh', name: 'Riyadh', short: '', address: '3808 Al Urubah Rd, Al Wurud, Riyadh 12252, Saudi Arabia', street: '3808 Al Urubah Rd, Al Wurud', locality: 'Riyadh', postalCode: '12252', country: 'Saudi Arabia', countryCode: 'SA', headquarters: false },
  { slug: 'cairo', name: 'Cairo', short: '', address: '87, Dar Masr, Al Kronfel, First Settlement, Cairo, Egypt', street: '87, Dar Masr, Al Kronfel, First Settlement', locality: 'Cairo', country: 'Egypt', countryCode: 'EG', headquarters: false },
]

export const officeBySlug = (slug: string) => officeList.find((office) => office.slug === slug)

/** Absolute URL on the canonical (www) host. */
export const absoluteUrl = (path = '/') => new URL(path, site.url).toString()
