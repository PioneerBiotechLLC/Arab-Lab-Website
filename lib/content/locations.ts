// Office pages (/locations/[slug]). Addresses and phone come from lib/site.ts; each page adds what is specific to its
// market so the three pages are genuinely different. No opening hours or local numbers are stated (not on file yet).
import type { PageSeo } from '../seo-pages'

export type LocationContent = {
  slug: string
  h1: string
  intro: string
  seo: PageSeo
  market: string
  paragraphs: string[]
  services: string[]
}

export const locationContent: LocationContent[] = [
  {
    slug: 'ras-al-khaimah',
    h1: 'Arab Lab Ras Al Khaimah — Headquarters',
    intro: 'Arab Lab Scientific Equipment is headquartered at Julphar Tower in Ras Al Khaimah, UAE, and serves laboratories across the Emirates from here.',
    seo: {
      title: 'Arab Lab Ras Al Khaimah | Headquarters, Julphar Tower', absoluteTitle: true,
      description: 'Arab Lab Scientific Equipment headquarters: 408, Julphar Tower, Al Hisn Road, Ras Al Khaimah, UAE. Phone +971 7 208 1908. Map and directions.',
      ogAlt: 'Arab Lab Scientific Equipment headquarters in Ras Al Khaimah, UAE',
      card: { kicker: 'Headquarters · UAE', title: 'Arab Lab Ras Al Khaimah', subtitle: '408, Julphar Tower, Al Hisn Road, Ras Al Khaimah' },
    },
    market: 'United Arab Emirates',
    paragraphs: [
      'Ras Al Khaimah is Arab Lab’s home. The company is based here and serves the biopharma and pharmaceutical industry and the laboratories sector across the region, with sister offices in Riyadh and Cairo.',
      'Arab Lab is the sister company of GEO-Science, a group established in 2001 in Abu Dhabi, and is affiliated with the UAE International Investors Council.',
      'From the headquarters, customers in the UAE can reach every service line: laboratory solutions for [pharma and biotech](/services/pharma-biotech), [food and beverage](/services/food-beverage), [turnkey laboratory projects](/services/turnkey-projects) and [pharmaceutical consulting](/services/pharmaceutical-consultant).',
    ],
    services: ['pharma-biotech', 'food-beverage', 'turnkey-projects', 'pharmaceutical-consultant'],
  },
  {
    slug: 'riyadh',
    h1: 'Arab Lab Riyadh Office',
    intro: 'Arab Lab’s Riyadh office in Al Wurud serves pharmaceutical, biotech and laboratory customers across Saudi Arabia.',
    seo: {
      title: 'Arab Lab Riyadh | Lab Equipment Supplier, Saudi Arabia', absoluteTitle: true,
      description: 'Arab Lab Riyadh office: 3808 Al Urubah Rd, Al Wurud, Riyadh 12252, Saudi Arabia. Laboratory and pharma QC solutions for the Kingdom. Map and directions.',
      ogAlt: 'Arab Lab Scientific Equipment office in Riyadh, Saudi Arabia',
      card: { kicker: 'Office · Saudi Arabia', title: 'Arab Lab Riyadh', subtitle: '3808 Al Urubah Rd, Al Wurud, Riyadh 12252' },
    },
    market: 'Saudi Arabia',
    paragraphs: [
      'The Riyadh office puts Arab Lab close to customers in the Kingdom, so quotations, application questions and service requests from Saudi Arabia are handled by a team in the same market.',
      'Pharmaceutical products and facilities in Saudi Arabia are overseen by the Saudi Food and Drug Authority (SFDA). For companies working through that process, Arab Lab’s [Pharmaceutical Consultant](/services/pharmaceutical-consultant) line combines regulatory consulting with turnkey project services.',
      'The full partner portfolio is available to Saudi customers, from [rapid sterility testing](/solutions/rapid-sterility-testing) and [endotoxin testing](/solutions/endotoxin-testing) to [process filtration](/solutions/process-filtration-single-use) and [liquid handling](/solutions/liquid-handling-bioprocess).',
    ],
    services: ['pharma-biotech', 'food-beverage', 'turnkey-projects', 'pharmaceutical-consultant'],
  },
  {
    slug: 'cairo',
    h1: 'Arab Lab Cairo Office',
    intro: 'Arab Lab’s Cairo office in New Cairo’s First Settlement serves pharmaceutical, biotech and laboratory customers across Egypt.',
    seo: {
      title: 'Arab Lab Cairo | Lab Equipment Supplier, Egypt', absoluteTitle: true,
      description: 'Arab Lab Cairo office: 87, Dar Masr, Al Kronfel, First Settlement, Cairo, Egypt. Laboratory and pharma QC solutions for Egypt. Map and directions.',
      ogAlt: 'Arab Lab Scientific Equipment office in Cairo, Egypt',
      card: { kicker: 'Office · Egypt', title: 'Arab Lab Cairo', subtitle: '87, Dar Masr, Al Kronfel, First Settlement, Cairo' },
    },
    market: 'Egypt',
    paragraphs: [
      'The Cairo office serves customers in Egypt, keeping Arab Lab’s commercial, technical and service support within the same market as the laboratories it works with.',
      'In Egypt, medicines and their manufacturers are regulated by the Egyptian Drug Authority (EDA). Arab Lab’s [Pharmaceutical Consultant](/services/pharmaceutical-consultant) line provides regulatory consulting and turnkey project services for companies working with it.',
      'Egyptian customers have access to the full partner portfolio, including [pharmaceutical culture media](/solutions/pharmaceutical-culture-media), [enzymatic QC reagents](/solutions/enzymatic-qc-reagents) and [liquid handling and bioprocess equipment](/solutions/liquid-handling-bioprocess).',
    ],
    services: ['pharma-biotech', 'food-beverage', 'turnkey-projects', 'pharmaceutical-consultant'],
  },
]

export const locationContentBySlug = (slug: string) => locationContent.find((l) => l.slug === slug)
