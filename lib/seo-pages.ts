// Search copy for every page in one place: title (≤60 chars with the " | Arab Lab" suffix), meta description
// (≤155 chars), social-card alt text and card text. Pages and their opengraph-image files both read from here.
import type { Brand } from './site-data'

export type PageSeo = { title: string; absoluteTitle?: boolean; description: string; ogAlt: string; card: { kicker: string; title: string; subtitle?: string } }

export const pageSeo = {
  '/': {
    title: 'Arab Lab Scientific Equipment | Lab Supplier UAE, KSA, Egypt', absoluteTitle: true,
    description: 'Arab Lab Scientific Equipment supplies lab and pharma QC solutions from Eppendorf, Lonza, Parker and more across the UAE, Saudi Arabia and Egypt.',
    ogAlt: 'Arab Lab Scientific Equipment — laboratory and pharma QC solutions across the UAE, Saudi Arabia and Egypt',
    card: { kicker: 'Life Science · Diagnostics · Food & Beverage', title: 'Your lab is smart? We’ll make it smarter!' },
  },
  '/about': {
    title: 'About Arab Lab Scientific Equipment | Ras Al Khaimah, UAE', absoluteTitle: true,
    description: 'Arab Lab Scientific Equipment, sister company of the GEO-Science group, serves pharma, biotech and lab customers from Ras Al Khaimah, Riyadh and Cairo.',
    ogAlt: 'About Arab Lab Scientific Equipment, headquartered in Ras Al Khaimah, UAE',
    card: { kicker: 'About Arab Lab', title: 'A trusted partner for Life Science industries.', subtitle: 'Headquartered in Ras Al Khaimah, with offices in Riyadh and Cairo.' },
  },
  '/solutions': {
    title: 'Laboratory Solutions in the UAE, KSA & Egypt',
    description: 'Lab solutions organised by the problem they solve: rapid sterility testing, endotoxin testing, filtration, liquid handling, culture media and enzymes.',
    ogAlt: 'Arab Lab laboratory solutions: sterility, endotoxin, filtration, liquid handling, media and enzymes',
    card: { kicker: 'Solutions', title: 'Organised by the problem, not the manufacturer.' },
  },
  '/brands': {
    title: 'Partner Brands: Eppendorf, Lonza, Parker & More',
    description: 'Seven partner manufacturers from Arab Lab across the UAE, Saudi Arabia and Egypt: Eppendorf, Parker, Lonza, Promicol, PMM, CPC Biotech and Tailin.',
    ogAlt: 'Arab Lab partner brands: Eppendorf, Parker, Lonza, Promicol, PMM, CPC Biotech and Tailin',
    card: { kicker: 'Partner brands', title: 'Seven partners. One program.', subtitle: 'Eppendorf · Parker · Lonza · Promicol · PMM · CPC Biotech · Tailin' },
  },
  '/locations': {
    title: 'Arab Lab Offices – Ras Al Khaimah, Riyadh & Cairo', absoluteTitle: true,
    description: 'Visit or contact Arab Lab Scientific Equipment in Ras Al Khaimah (HQ), Riyadh and Cairo. Addresses, phone and directions for each office.',
    ogAlt: 'Arab Lab Scientific Equipment offices in Ras Al Khaimah, Riyadh and Cairo',
    card: { kicker: 'Locations', title: 'Ras Al Khaimah · Riyadh · Cairo', subtitle: 'Headquarters in Ras Al Khaimah, UAE.' },
  },
  '/contact': {
    title: 'Contact Arab Lab Scientific Equipment | Quote & Service', absoluteTitle: true,
    description: 'Request a quote or send a service request to Arab Lab. Each enquiry goes to the right team in the UAE, Saudi Arabia or Egypt. Call +971 7 501 6631.',
    ogAlt: 'Contact Arab Lab Scientific Equipment for quotes and service requests',
    card: { kicker: 'Contact', title: 'A clear next step.', subtitle: 'Quote requests and service requests, routed to the right Arab Lab department.' },
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'How Arab Lab handles the personal information you share with us through this website, and the choices you have.',
    ogAlt: 'Arab Lab privacy policy', card: { kicker: 'Legal', title: 'Privacy Policy' },
  },
  '/terms': {
    title: 'Terms and Conditions',
    description: 'The terms on which the Arab Lab website is made available. Orders are governed by the written quotation or contract for each order.',
    ogAlt: 'Arab Lab website terms and conditions', card: { kicker: 'Legal', title: 'Terms and Conditions' },
  },
  '/data-collection': {
    title: 'Data Collection',
    description: 'Every piece of information the Arab Lab website collects, when, why and where it goes. If it is not listed here, the site does not collect it.',
    ogAlt: 'What the Arab Lab website collects and why', card: { kicker: 'Legal', title: 'Data Collection' },
  },
} satisfies Record<string, PageSeo>

const brandDescriptions: Record<string, string> = {
  eppendorf: 'Eppendorf liquid handling, consumables and bioprocess systems for cell, molecular and microbiology labs, from Arab Lab in the UAE, KSA and Egypt.',
  parker: 'Parker bioprocess filtration and SciLog single-use systems, from clarification to sterile filtration and mycoplasma removal. Arab Lab, UAE, KSA, Egypt.',
  lonza: 'Lonza endotoxin and pyrogen testing, bioprocessing media and MODA® paperless QC software, supplied by Arab Lab across the UAE, Saudi Arabia and Egypt.',
  promicol: 'Promicol rapid sterility testing by ATP bioluminescence cuts release from 14 days to about 2. Supplied by Arab Lab in the UAE, Saudi Arabia and Egypt.',
  pmm: 'PMM pharmaceutical culture media for environmental monitoring and sterility testing, made in Germany and supplied by Arab Lab in the UAE, KSA and Egypt.',
  'cpc-biotech': 'CPC Biotech analytical enzymes and ready-to-use microbiological media for pharma, clinical and food QC, from Arab Lab in the UAE, KSA and Egypt.',
  tailin: 'Tailin aseptic isolators, VHPS decontamination and closed sterility test pumps and canisters, supplied by Arab Lab in the UAE, Saudi Arabia and Egypt.',
}

export function brandSeo(brand: Brand): PageSeo {
  return {
    title: `${brand.name} Supplier in UAE, Saudi Arabia & Egypt`,
    description: brandDescriptions[brand.slug] ?? brand.summary,
    ogAlt: `${brand.name} supplier in the UAE, Saudi Arabia and Egypt — Arab Lab`,
    card: { kicker: 'Partner brand', title: `${brand.name} in the UAE, Saudi Arabia & Egypt`, subtitle: brand.summary },
  }
}

export const seoProps = ({ title, absoluteTitle, description }: PageSeo) => ({ title, absoluteTitle, description })
