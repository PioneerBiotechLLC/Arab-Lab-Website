// All copy on the site is sourced from the Arab Lab company profile and partner decks. Nothing here is invented.
// Domain, contact details and offices come from lib/site.ts, the single source for site-wide constants.
import { officeList, site } from './site'

export const company = {
  name: 'Arab Lab Scientific Equipment L.L.C.',
  positioning: 'Arab Lab is a trusted partner providing solutions to Life Science industries: biopharmaceutical and pharmaceutical manufacturers, R&D laboratories, and chemical and pathological labs.',
  mission: 'We are committed to provide the best technologies, solutions and quality products in the Life Science, Diagnostics, Food and beverages to our valued customers.',
  heritage: 'Arab Lab is the sister company of GEO-Science, a group established in 2001 in Abu Dhabi that worked with ADNOC — a leading national energy producer — as a catalyst for UAE growth and diversification.',
  affiliation: 'Affiliated with the UAE International Investors Council.',
  groupFounded: '2001',
}

export const contact = { email: site.email, phone: site.phone, phoneDisplay: site.phoneDisplay, website: site.url, websiteDisplay: site.host }

export const offices = officeList

// The country is the last comma-separated segment of each address.
export const countryOf = (office: { address: string }) => office.address.split(', ').at(-1) ?? ''
export const markets = [...new Set(offices.map(countryOf))]

export const leadership = { name: 'Eng. Rahma Omran Al-Shamsi', role: 'Chief Executive Officer', note: 'UAE International Investors Council' }

export const departments: { name: string; people: [string, string][] }[] = [
  { name: 'Commercial', people: [['Dr. Hamed', 'Business Development Manager']] },
  { name: 'Sales', people: [['Dr. Mahmoud', 'Sales Specialist'], ['Eng. Khaled', 'Sales Engineer']] },
  { name: 'Life Science', people: [['Dr. Zabiulla', 'Technical Manager, Life Science']] },
  { name: 'Analytical', people: [['Dr. Ahmed', 'Technical Manager, Analytical Science']] },
  { name: 'Service', people: [['Eng. Salmanul', 'Service Manager'], ['Eng. Hamras', 'Service Engineer']] },
  { name: 'Operational', people: [['Mrs. Eman', 'Operations Manager'], ['Mrs. Yasmin', 'Finance & HR'], ['Mr. Raed', 'HR & Admin Coordinator'], ['Mrs. Enjy', 'Tender & Planning'], ['Mr. Souliman', 'Logistics Coordinator']] },
]

// "Our Program" — the four service lines.
export const programs = [
  { id: 'pharma', slug: 'pharma-biotech', title: 'Arab Lab Pharma & Biotech', body: 'Pharma and bioprocess solutions for various industries and applications.' },
  { id: 'food', slug: 'food-beverage', title: 'Arab Lab Food & Beverage', body: 'Complete solutions for the F&B sector.' },
  { id: 'project', slug: 'turnkey-projects', title: 'Arab Lab Project', body: 'Turnkey project delivery for various industries and applications.' },
  { id: 'consultant', slug: 'pharmaceutical-consultant', title: 'Pharmaceutical Consultant', body: 'Regulatory consultant and turn-key project services.' },
]

export type Brand = {
  name: string
  slug: string
  summary: string
  profile: string[]
  facts: [string, string][]
  capabilities: { title: string; body: string }[]
  /** A `symbol` mark does not spell the name, so the name is shown beside it; wordmarks stand alone. */
  mark?: 'wordmark' | 'symbol'
}

export const brands: Brand[] = [
  {
    name: 'Eppendorf', slug: 'eppendorf',
    summary: 'Workflow-oriented instruments, consumables and accessories for cell biology, molecular biology and microbiology labs, with a scalable bioprocess portfolio from R&D to production.',
    profile: [
      'Eppendorf is a workflow-oriented provider of lab equipment: instruments, consumables and accessories engineered to simplify or eliminate cumbersome lab work, with flexible liquid-handling solutions and maintenance and service contracts available at custom frequencies.',
      'It serves cell biology, molecular biology and microbiology laboratories, and supports next-generation sequencing, bioprocessing R&D, stem cell work, biofuels and genome editing.',
      'Eppendorf’s bioprocess portfolio offers comprehensive, scalable hardware and software for the R&D, process development, pilot and production stages of biosimilars and biologics, vaccines and stem cell culture.',
    ],
    facts: [['Focus', 'Liquid handling · Bioprocess'], ['Laboratories', 'Cell, molecular and microbiology'], ['Service', 'Contracts at custom frequencies']],
    capabilities: [
      { title: 'Liquid handling', body: 'Flexible liquid-handling solutions that simplify or eliminate cumbersome lab work.' },
      { title: 'Consumables & accessories', body: 'Workflow-oriented consumables for cell, molecular and microbiology laboratories.' },
      { title: 'Bioprocess hardware & software', body: 'Scalable systems for R&D, process development, pilot and production stages.' },
      { title: 'Service contracts', body: 'Maintenance and service contracts available at custom frequencies.' },
    ],
  },
  {
    name: 'Parker', slug: 'parker',
    summary: 'Motion and control technologies, with biopharmaceutical filtration and automated single-use bioprocessing systems for upstream and downstream applications.',
    profile: [
      'Parker is a global leader in motion and control technologies, providing precision-engineered solutions for mobile, industrial and aerospace markets across nine core technologies: aerospace, climate control, electromechanical, filtration, fluid and gas handling, hydraulics, pneumatics, process control, and sealing and shielding.',
      'For pharmaceutical industries, Parker offers biopharmaceutical liquid and gas filters and housings — from clarification through bioburden reduction to sterile filtration and mycoplasma removal — and incorporates SciLog technology into scalable, automated single-use bioprocessing systems for upstream and downstream applications, configurable as manual, semi-automated or fully automated.',
    ],
    facts: [['Focus', 'Motion & control · Bioprocess filtration'], ['Technologies', 'Nine core technologies'], ['Automation', 'Manual, semi- or fully automated']],
    capabilities: [
      { title: 'Liquid & gas filtration', body: 'Filters and housings from clarification and bioburden reduction to sterile filtration.' },
      { title: 'Mycoplasma removal', body: 'Sterile filtration stages that extend to mycoplasma removal.' },
      { title: 'Single-use bioprocessing', body: 'SciLog-based scalable systems for upstream and downstream applications.' },
      { title: 'Configurable automation', body: 'Manual, semi-automated or fully automated configurations.' },
    ],
  },
  {
    name: 'Lonza', slug: 'lonza',
    summary: 'Endotoxin and pyrogen testing, bioprocessing media for protein production and cell & gene therapy, and MODA® paperless QC microbiology software.',
    profile: [
      'Lonza is guided by five strategic priorities — Service, Scope, Sustainability, Solutions and Speed — aimed at manufacturing and operational excellence, breadth of offering, long-term value, scientific and regulatory expertise, and accelerating the path to commercialisation.',
      'It offers comprehensive endotoxin and pyrogen testing solutions for raw materials, in-process samples and manufactured product, meeting regulatory requirements for injectable drugs and implantable medical devices.',
      'Lonza also supplies bioprocessing media for protein production and cell & gene therapy applications, and MODA® laboratory software — a paperless QC microbiology and electronic batch record system covering environmental monitoring, utility testing, product testing, and on-demand reporting and trending.',
    ],
    facts: [['Priorities', 'Service · Scope · Sustainability · Solutions · Speed'], ['Focus', 'Endotoxin testing · Media · QC software'], ['Software', 'MODA®']],
    capabilities: [
      { title: 'Endotoxin & pyrogen testing', body: 'For raw materials, in-process samples and manufactured product, to regulatory requirements.' },
      { title: 'Bioprocessing media', body: 'Media for protein production and cell & gene therapy applications.' },
      { title: 'MODA® paperless QC', body: 'QC microbiology and electronic batch records for environmental, utility and product testing.' },
      { title: 'Reporting & trending', body: 'On-demand reporting and trending across the QC workflow.' },
    ],
  },
  {
    name: 'Promicol', slug: 'promicol', mark: 'symbol',
    summary: 'Patented rapid microbial-load testing based on ATP bioluminescence, cutting sterility-test turnaround from 14 days to around 2.',
    profile: [
      'Promicol produces a large array of patented products for rapid testing of microbial load, based on the ATP bioluminescence method: reagents isolate microbial ATP specifically, and the light output — measured in Relative Light Units — confirms sterility.',
      'The Promilite M1 and M4 readers, at the core of the PRENOVA® platform, cut sterility-test turnaround from the conventional 14 days down to approximately 2 days.',
      'The PRENOVA® TCT3 assay differentiates human from microbial ATP, shortening sterility-test release time to 2–3 days for T-cell therapies — relevant given the rapid growth of CAR-T therapies in advanced cancer treatment. The NOVILITE reader is a luminometer engineered specifically for the kinetic sensitivity the TCT3 assay requires.',
    ],
    facts: [['Method', 'ATP bioluminescence'], ['Turnaround', '14 days → approximately 2 days'], ['Platform', 'PRENOVA®']],
    capabilities: [
      { title: 'Promilite M1 & M4 readers', body: 'The core of the PRENOVA® platform for rapid sterility testing.' },
      { title: 'PRENOVA® TCT3 assay', body: 'Differentiates human from microbial ATP for T-cell therapy release in 2–3 days.' },
      { title: 'NOVILITE luminometer', body: 'Engineered for the kinetic sensitivity the TCT3 assay requires.' },
      { title: 'Rapid sterility release', body: 'Approximately 2 days instead of the conventional 14.' },
    ],
  },
  {
    name: 'PMM', slug: 'pmm',
    summary: 'Pharmaceutical culture media for environmental monitoring and sterility testing, manufactured in Leimen near Heidelberg, Germany.',
    profile: [
      'Pharmamedia Dr. Müller GmbH was founded on 16 January 2013 by Dr. Rolf Müller, who had previously founded and directed heipha Dr. Müller GmbH from 1973 for over 30 years before starting fresh with PMM.',
      'PMM focuses on producing high-quality culture media for the pharmaceutical industry, with a competent, experienced team developing and manufacturing nutrient media.',
      'The production facility in Leimen, near Heidelberg, Germany, was built and equipped to the requirements of pharmaceutical customers manufacturing sterile drugs. Its core offering is microbiology media for environmental monitoring and sterility testing.',
    ],
    facts: [['Founded', '2013 · Dr. Rolf Müller'], ['Production', 'Leimen, near Heidelberg, Germany'], ['Focus', 'Pharmaceutical culture media']],
    capabilities: [
      { title: 'Environmental monitoring media', body: 'Microbiology media for environmental monitoring programmes.' },
      { title: 'Sterility testing media', body: 'Media for sterility testing of sterile drug manufacture.' },
      { title: 'Pharmaceutical-grade production', body: 'A facility built and equipped to the requirements of sterile-drug manufacturers.' },
      { title: 'Experienced media development', body: 'A team developing and manufacturing nutrient media, led by decades of experience.' },
    ],
  },
  {
    name: 'CPC Biotech', slug: 'cpc-biotech',
    summary: 'Italian producer of analytical enzymes and ready-to-use microbiological soils for pharmaceutical, clinical chemistry and food & beverage quality control.',
    profile: [
      'CPC Biotech is an Italian SME founded in 2006, now one of the most important global players in the analytical-enzymes market. Products are developed in-house from gene cloning through final formulation, with some covered by trademark licence, and the company holds an exclusive supply agreement with Merck-Millipore.',
      'In 2018, CPC Biotech acquired Neomed s.r.l.’s business unit for ready-to-use microbiological soils, consolidating its position by offering both enzymes and soils with enzymes already added.',
      'The product range includes β-Lactamase CTZ, Amonisniper, Lactamator, β-Galactosidase, Glucose-6-Phosphate Dehydrogenase, Pyruvate Kinase and L-Lactate Dehydrogenase, serving quality control in the pharmaceutical, clinical chemistry and food & beverage fields.',
    ],
    facts: [['Founded', '2006 · Italy'], ['Partnership', 'Exclusive supply agreement with Merck-Millipore'], ['Acquisition', 'Neomed s.r.l. soils unit, 2018']],
    capabilities: [
      { title: 'Analytical enzymes', body: 'Developed in-house from gene cloning through final formulation.' },
      { title: 'Ready-to-use microbiological soils', body: 'Soils with enzymes already added, from the Neomed business unit.' },
      { title: 'Product range', body: 'β-Lactamase CTZ, Amonisniper, Lactamator, β-Galactosidase, G6PDH, Pyruvate Kinase, L-LDH.' },
      { title: 'Quality control fields', body: 'Pharmaceutical, clinical chemistry and food & beverage.' },
    ],
  },
  {
    name: 'Tailin', slug: 'tailin',
    summary: 'Aseptic isolators, VHPS decontamination systems, sterility test pumps and consumables from a manufacturer holding more than 300 patents.',
    profile: [
      'Founded in 2002, Tailin is a leading life-science company built on technological innovation and strong manufacturing capability. It manufactures most critical equipment in-house — aseptic isolators, VHPS decontamination systems, glove leak testers, sterility test pumps and consumables.',
      'Tailin holds more than 300 Chinese patents and has drafted national and industry standards. It employs nearly 1,000 people, over 200 of them (20%) in R&D, with experienced validation teams that build regulatory qualification strategies for fast approvals.',
      'It serves the biopharmaceutical, cell & gene therapy, P3 laboratory and manned-space sectors. Its complete sterility test system — test pump plus testing canisters — is a closed system designed to minimise false positive and false negative results and improve the sterility-testing workflow.',
    ],
    facts: [['Founded', '2002'], ['Patents', 'More than 300 Chinese patents'], ['People', 'Nearly 1,000 · 20% in R&D']],
    capabilities: [
      { title: 'Aseptic isolators', body: 'Manufactured in-house alongside glove leak testers and consumables.' },
      { title: 'VHPS decontamination', body: 'Decontamination systems for aseptic environments.' },
      { title: 'Closed sterility test system', body: 'Test pump plus canisters, designed to minimise false positives and negatives.' },
      { title: 'Validation support', body: 'Experienced teams building regulatory qualification strategies for fast approvals.' },
    ],
  },
]

export const brandBySlug = (slug: string) => brands.find((brand) => brand.slug === slug)

// Solutions are organised by the laboratory problem to solve, not by manufacturer. Each links through to the partners that address it.
export const solutions = [
  { id: 'sterility', slug: 'rapid-sterility-testing', title: 'Rapid Sterility & Microbial Testing', body: 'Cut sterility-test turnaround from the conventional 14 days to around 2, and test in a closed system designed to minimise false positive and false negative results.', brands: ['promicol', 'tailin'] },
  { id: 'endotoxin', slug: 'endotoxin-testing', title: 'Endotoxin Detection & Bioprocessing Media', body: 'Endotoxin and pyrogen testing for raw materials, in-process samples and manufactured product, plus media for protein production and cell & gene therapy.', brands: ['lonza'] },
  { id: 'filtration', slug: 'process-filtration-single-use', title: 'Process Filtration & Single-Use Systems', body: 'Liquid and gas filtration from clarification through bioburden reduction to sterile filtration and mycoplasma removal, and automated single-use bioprocessing.', brands: ['parker'] },
  { id: 'liquid-handling', slug: 'liquid-handling-bioprocess', title: 'Liquid Handling & Bioprocess Equipment', body: 'Instruments, consumables and accessories for cell, molecular and microbiology labs, with bioprocess hardware and software from R&D to production.', brands: ['eppendorf'] },
  { id: 'culture-media', slug: 'pharmaceutical-culture-media', title: 'Culture Media', body: 'Pharmaceutical-grade microbiology media for environmental monitoring and sterility testing.', brands: ['pmm'] },
  { id: 'enzymes', slug: 'enzymatic-qc-reagents', title: 'Enzymatic QC Reagents', body: 'Analytical enzymes and ready-to-use microbiological soils for pharmaceutical, clinical chemistry and food & beverage quality control.', brands: ['cpc-biotech'] },
]

export const brandNames = (slugs: string[]) => slugs.map((slug) => brandBySlug(slug)?.name ?? slug).join(' · ')
export const solutionsFor = (slug: string) => solutions.filter((solution) => solution.brands.includes(slug))
export const solutionBySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)
export const programBySlug = (slug: string) => programs.find((program) => program.slug === slug)
