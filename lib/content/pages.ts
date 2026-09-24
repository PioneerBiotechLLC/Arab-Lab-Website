// Page copy for the shared page views in components/pages (about, brands, solutions, services, legal, blog
// categories). English here; Arabic in lib/content/ar/pages.ts with the same shape. Functions build sentences
// around names and counts so each language keeps its own word order.
import { company, offices } from '../site-data'

export type PagesCopy = {
  about: {
    crumb: string; title: string; facts: [string, string, string, string]; primary: string; secondary: string
    heritageTitle: string; based: string; leadership: string; mission: string
    faqTitle: string; faq: { q: string; a: string }[]; coverageTitle: string; coverageIntro: (n: number, markets: string) => string
  }
  brands: {
    crumb: string; title: string; intro: string; primary: string; secondary: string; countTitle: (n: number) => string; accent: string; matchedTitle: string
    supplier: string; allPartners: string; atAGlance: string; solves: string; categoriesTitle: (name: string) => string; categoriesIntro: (name: string) => string
    bringsTitle: (name: string) => string; applicationsTitle: string; fitsTitle: (name: string) => string; fitsIntro: (n: number) => string
    availableTitle: string; availableIntro: (name: string) => string; hq: string; faqTitle: (name: string) => string; quote: (name: string) => string
    browse: string; restTitle: string; allBrands: string
  }
  solutions: {
    crumb: string; title: string; intro: string; primary: string; secondary: string; countTitle: string; guide: string; servicesTitle: string
    quote: string; aboutPartner: (name: string) => string; partnerBrands: string; whoFor: string; serviceLines: string; partnersTitle: string
    faqTitle: string; askSpecialist: string; relatedTitle: string
  }
  services: {
    crumb: string; title: string; intro: string; primary: string; secondary: string; linesTitle: string; behindTitle: string; behindIntro: string
    allServices: string; inLineTitle: string; teamsTitle: string; teamsIntro: string; faqTitle: string; otherTitle: string
  }
  blogCategory: { crumb: string; seoTitle: (name: string) => string; count: (n: number) => string; all: string }
}

export const enPages: PagesCopy = {
  about: {
    crumb: 'About',
    title: 'A trusted partner for Life Science industries.',
    facts: ['Group founded', 'Operating markets', 'Specialist departments', 'Partner manufacturers'],
    primary: 'Talk to a specialist',
    secondary: 'Our partners',
    heritageTitle: 'Built on a group with a track record.',
    based: 'Arab Lab is based in Ras Al Khaimah and serves the biopharma and pharmaceutical industry and laboratories sector across the region.',
    leadership: 'Leadership',
    mission: 'Our mission',
    faqTitle: 'About Arab Lab: frequently asked questions',
    // Answers the branded questions people search for, including the name clash with the ARABLAB exhibition.
    faq: [
      { q: 'Is Arab Lab Scientific Equipment the same as the ARABLAB exhibition?', a: `No. ${company.name} is a company that supplies laboratory, pharmaceutical QC and bioprocess solutions, headquartered in Ras Al Khaimah. ARABLAB, also known as ARABLAB LIVE, is a trade exhibition for the laboratory industry.` },
      { q: 'Where is Arab Lab headquartered?', a: `At ${offices[0].address}, with offices in ${offices.slice(1).map((o) => o.name).join(' and ')}.` },
      { q: 'What is Arab Lab’s connection to GEO-Science?', a: 'Arab Lab is the sister company of GEO-Science, a group established in 2001 in Abu Dhabi.' },
      { q: 'Which industries does Arab Lab serve?', a: 'Biopharmaceutical and pharmaceutical manufacturers, R&D laboratories, and chemical and pathological laboratories, across Life Science, Diagnostics and Food and Beverage.' },
    ],
    coverageTitle: 'Close to your laboratory.',
    coverageIntro: (n, markets) => `${n} offices across ${markets}.`,
  },
  brands: {
    crumb: 'Brands',
    title: 'Seven partners. One program.',
    intro: 'Each partner manufacturer addresses a specific laboratory problem — from rapid sterility testing to process filtration and culture media.',
    primary: 'Discuss your application',
    secondary: 'Browse by problem',
    countTitle: (n) => `${n} focused partners.`,
    accent: 'Discuss your application',
    matchedTitle: 'Matched to the laboratory problem.',
    supplier: 'Supplier in the UAE, Saudi Arabia & Egypt',
    allPartners: 'All partners',
    atAGlance: 'At a glance',
    solves: 'Solves',
    categoriesTitle: (name) => `${name} product categories`,
    categoriesIntro: (name) => `The main areas of the ${name} portfolio. Ask us for the current range available in your country.`,
    bringsTitle: (name) => `What ${name} brings to the lab.`,
    applicationsTitle: 'Applications and industries',
    fitsTitle: (name) => `Where ${name} fits`,
    fitsIntro: (n) => `The Arab Lab ${n === 1 ? 'solution' : 'solutions'} this partner serves:`,
    availableTitle: 'Available across the UAE, Saudi Arabia and Egypt',
    availableIntro: (name) => `Requests for ${name} are handled by the Arab Lab office that covers your country.`,
    hq: 'HQ',
    faqTitle: (name) => `${name}: frequently asked questions`,
    quote: (name) => `Request a ${name} quote`,
    browse: 'Browse solutions',
    restTitle: 'The rest of the portfolio.',
    allBrands: 'All brands',
  },
  solutions: {
    crumb: 'Solutions',
    title: 'Organised by the problem, not the manufacturer.',
    intro: 'Each solution is framed around what your laboratory needs to test, make or release — and links through to the partner whose technology addresses it.',
    primary: 'Describe your application',
    secondary: 'See the partners',
    countTitle: 'Six problems, seven partners.',
    guide: 'Read the full guide',
    servicesTitle: 'Four service lines.',
    quote: 'Request a quote',
    aboutPartner: (name) => `About ${name}`,
    partnerBrands: 'Partner brands',
    whoFor: 'Who it’s for',
    serviceLines: 'Service lines',
    partnersTitle: 'Partner technology',
    faqTitle: 'Frequently asked questions',
    askSpecialist: 'Ask a specialist',
    relatedTitle: 'Related solutions',
  },
  services: {
    crumb: 'Services',
    title: 'Four service lines for pharma, food and new laboratories.',
    intro: 'From quality control equipment to complete laboratory projects and regulatory consulting, each service line is run by the Arab Lab departments that specialise in it.',
    primary: 'Talk to a specialist',
    secondary: 'Browse solutions',
    linesTitle: 'Our service lines',
    behindTitle: 'The solutions behind them',
    behindIntro: 'Six laboratory problems, each addressed by a partner manufacturer.',
    allServices: 'All services',
    inLineTitle: 'Solutions in this service line',
    teamsTitle: 'The teams behind it',
    teamsIntro: 'Each request is routed to the Arab Lab department that owns it.',
    faqTitle: 'Frequently asked questions',
    otherTitle: 'Other service lines',
  },
  blogCategory: {
    crumb: 'Blog',
    seoTitle: (name) => `${name} Articles`,
    count: (n) => `${n} ${n === 1 ? 'article' : 'articles'}`,
    all: 'All articles',
  },
}
