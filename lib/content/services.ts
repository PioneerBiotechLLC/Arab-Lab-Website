// Service-line pages (/services/[slug]). Arab Lab facts come from lib/site-data.ts (programs, departments, offices);
// sector background is stated generally and does not claim specific projects, clients or approvals.
import type { Faq } from './brands'
import type { PageSeo } from '../seo-pages'

export type ServiceContent = {
  slug: string
  /** id of the matching entry in site-data `programs`. */
  id: string
  h1: string
  intro: string
  seo: PageSeo
  sections: { title: string; paragraphs: string[] }[]
  solutions: string[]
  departments: string[]
  faq: Faq[]
}

export const servicesHubSeo: PageSeo = {
  title: 'Laboratory Services: Pharma, Food, Projects',
  description: 'Arab Lab’s four service lines: Pharma & Biotech, Food & Beverage, turnkey laboratory projects and pharmaceutical consulting, across the UAE, KSA and Egypt.',
  ogAlt: 'Arab Lab service lines: Pharma & Biotech, Food & Beverage, Project and Pharmaceutical Consultant',
  card: { kicker: 'Services', title: 'Four service lines, one partner.', subtitle: 'Pharma & Biotech · Food & Beverage · Project · Pharmaceutical Consultant' },
}

export const serviceContent: ServiceContent[] = [
  {
    slug: 'pharma-biotech',
    id: 'pharma',
    h1: 'Pharma & Biotech Laboratory Solutions',
    intro: 'Arab Lab Pharma & Biotech brings pharma and bioprocess solutions to manufacturers, R&D laboratories and QC teams in the UAE, Saudi Arabia and Egypt.',
    seo: {
      title: 'Pharma & Biotech Lab Solutions – UAE, KSA, Egypt',
      description: 'Sterility and endotoxin testing, filtration, culture media, liquid handling and bioprocess equipment for pharma and biotech labs in the UAE, KSA and Egypt.',
      ogAlt: 'Arab Lab Pharma & Biotech laboratory solutions',
      card: { kicker: 'Service line', title: 'Pharma & Biotech', subtitle: 'Pharma and bioprocess solutions for manufacturers, R&D and QC laboratories.' },
    },
    sections: [
      {
        title: 'Who it serves',
        paragraphs: [
          'Arab Lab serves biopharmaceutical and pharmaceutical manufacturers, R&D laboratories, and chemical and pathological laboratories. The Pharma & Biotech line covers the equipment and consumables these customers need to develop, make and release medicines, from the research bench to the QC laboratory and the production suite.',
        ],
      },
      {
        title: 'What it covers',
        paragraphs: [
          'Quality control microbiology is at the centre: [rapid sterility testing](/solutions/rapid-sterility-testing) and isolator-based sterility test systems, [endotoxin and pyrogen testing](/solutions/endotoxin-testing), and [culture media](/solutions/pharmaceutical-culture-media) for environmental monitoring and sterility testing.',
          'For bioprocessing, the line covers [process filtration and single-use systems](/solutions/process-filtration-single-use) from clarification to sterile filtration and mycoplasma removal, and [liquid handling and bioprocess equipment](/solutions/liquid-handling-bioprocess) that scales from R&D to production. [Enzymatic QC reagents](/solutions/enzymatic-qc-reagents) complete the picture for microbiological and analytical methods.',
        ],
      },
      {
        title: 'How Arab Lab works with you',
        paragraphs: [
          'Requests are handled by specialist departments rather than a single sales desk. The Commercial and Sales teams manage quotations; the Life Science and Analytical teams, each led by a technical manager, advise on applications; and the Service department handles installation, maintenance and application support. Offices in Ras Al Khaimah, Riyadh and Cairo keep those teams close to customers in each market.',
        ],
      },
    ],
    solutions: ['rapid-sterility-testing', 'endotoxin-testing', 'process-filtration-single-use', 'liquid-handling-bioprocess', 'pharmaceutical-culture-media', 'enzymatic-qc-reagents'],
    departments: ['Commercial', 'Sales', 'Life Science', 'Analytical', 'Service'],
    faq: [
      { q: 'Which partner brands does the Pharma & Biotech line cover?', a: 'Eppendorf, Parker, Lonza, Promicol, PMM, CPC Biotech and Tailin, each matched to a specific laboratory problem.' },
      { q: 'Do you support installation and maintenance?', a: 'Yes. Arab Lab’s Service department handles installation, maintenance and application support requests. Send service needs through the contact page.' },
      { q: 'Which countries do you cover?', a: 'The UAE, Saudi Arabia and Egypt, from offices in Ras Al Khaimah, Riyadh and Cairo.' },
      { q: 'How do I start?', a: 'Describe the application, the product or test, and your preferred office in a quote request. It is routed to the department that owns it.' },
    ],
  },
  {
    slug: 'food-beverage',
    id: 'food',
    h1: 'Food & Beverage Laboratory Solutions',
    intro: 'Arab Lab Food & Beverage provides complete solutions for the food and beverage sector: laboratory equipment, reagents and support for quality control in the UAE, Saudi Arabia and Egypt.',
    seo: {
      title: 'Food Testing Lab Equipment – UAE, KSA & Egypt',
      description: 'Food and beverage QC lab equipment and reagents from Arab Lab: liquid handling, enzymatic reagents and new-lab projects across the UAE, KSA and Egypt.',
      ogAlt: 'Arab Lab Food & Beverage laboratory solutions',
      card: { kicker: 'Service line', title: 'Food & Beverage', subtitle: 'Complete solutions for food and beverage quality control laboratories.' },
    },
    sections: [
      {
        title: 'Quality control in food and beverage',
        paragraphs: [
          'Food and beverage laboratories test raw materials, production and finished product for microbiological safety and composition. The work combines microbiology, where speed and recovery matter, with chemical and enzymatic analysis of sugars, acids and other constituents, often at high sample volumes and against tight release schedules.',
          'Arab Lab’s mission names food and beverages alongside Life Science and Diagnostics: to provide the best technologies, solutions and quality products to its customers.',
        ],
      },
      {
        title: 'What the line covers',
        paragraphs: [
          '[Enzymatic QC reagents](/solutions/enzymatic-qc-reagents) from CPC Biotech serve food and beverage quality control, alongside ready-to-use microbiological media. [Liquid handling and laboratory equipment](/solutions/liquid-handling-bioprocess) from Eppendorf covers pipetting, sample preparation and microbiology workflows.',
          'For producers building or expanding a laboratory, the [turnkey projects](/services/turnkey-projects) line delivers the facility as a single project.',
        ],
      },
      {
        title: 'Working with Arab Lab',
        paragraphs: [
          'Requests are routed to the department that owns them: Commercial and Sales for quotations, the Analytical and Life Science teams for applications, and Service for installation and maintenance. Offices in Ras Al Khaimah, Riyadh and Cairo cover the UAE, Saudi Arabia and Egypt.',
        ],
      },
    ],
    solutions: ['enzymatic-qc-reagents', 'liquid-handling-bioprocess'],
    departments: ['Commercial', 'Sales', 'Analytical', 'Service'],
    faq: [
      { q: 'What does the Food & Beverage line supply?', a: 'Laboratory equipment and reagents for food and beverage quality control, including CPC Biotech enzymatic reagents and ready-to-use media and Eppendorf liquid-handling and laboratory equipment.' },
      { q: 'Can Arab Lab help set up a new food testing laboratory?', a: 'Yes. The Arab Lab Project line delivers turnkey laboratory projects for various industries and applications. Contact us to discuss your scope.' },
      { q: 'Which countries do you serve?', a: 'The UAE, Saudi Arabia and Egypt, from offices in Ras Al Khaimah, Riyadh and Cairo.' },
    ],
  },
  {
    slug: 'turnkey-projects',
    id: 'project',
    h1: 'Turnkey Laboratory Projects',
    intro: 'Arab Lab Project delivers turnkey laboratory projects for various industries and applications across the UAE, Saudi Arabia and Egypt, with one partner accountable from requirements to handover.',
    seo: {
      title: 'Turnkey Laboratory Projects – UAE, KSA & Egypt',
      description: 'Turnkey laboratory project delivery from Arab Lab for pharma, biotech and food labs across the UAE, Saudi Arabia and Egypt, from requirements to handover.',
      ogAlt: 'Arab Lab turnkey laboratory projects',
      card: { kicker: 'Service line', title: 'Turnkey Laboratory Projects', subtitle: 'One partner accountable from requirements to handover.' },
    },
    sections: [
      {
        title: 'What a turnkey laboratory project involves',
        paragraphs: [
          'A turnkey project hands the laboratory over ready to use. Instead of coordinating equipment suppliers, installers and qualification separately, the customer works with one partner who carries the project from the first requirements to a working, documented laboratory.',
          'A typical project moves through defining user requirements, layout and equipment selection, procurement and delivery, installation, qualification of the equipment, and training, with documentation at each step so the laboratory can demonstrate compliance from the first day of use.',
        ],
      },
      {
        title: 'Why it helps',
        paragraphs: [
          'Laboratory projects fail at the interfaces: an instrument that does not fit the bench, utilities that do not match the equipment, or qualification documents that arrive late. A single accountable partner removes most of those gaps and gives the customer one schedule and one point of contact.',
          'Arab Lab brings its partner portfolio to projects, from [aseptic isolators and sterility testing](/solutions/rapid-sterility-testing) to [liquid handling and bioprocess equipment](/solutions/liquid-handling-bioprocess), [process filtration](/solutions/process-filtration-single-use) and [culture media](/solutions/pharmaceutical-culture-media).',
        ],
      },
      {
        title: 'Regulatory support',
        paragraphs: [
          'For pharmaceutical facilities, the [Pharmaceutical Consultant](/services/pharmaceutical-consultant) line combines regulatory consulting with turnkey project services, so the laboratory and its compliance are planned together.',
        ],
      },
    ],
    solutions: ['rapid-sterility-testing', 'liquid-handling-bioprocess', 'process-filtration-single-use', 'pharmaceutical-culture-media'],
    departments: ['Commercial', 'Life Science', 'Analytical', 'Service', 'Operational'],
    faq: [
      { q: 'What does turnkey mean for a laboratory?', a: 'The laboratory is delivered ready to use by one accountable partner, from requirements and equipment selection to installation, qualification and handover.' },
      { q: 'Which industries does Arab Lab Project serve?', a: 'Arab Lab delivers turnkey projects for various industries and applications, and its partner portfolio covers pharmaceutical, biotech and food and beverage laboratories.' },
      { q: 'Where do you deliver projects?', a: 'Across the UAE, Saudi Arabia and Egypt, supported by offices in Ras Al Khaimah, Riyadh and Cairo.' },
      { q: 'How do we start a project discussion?', a: 'Send a request through the contact page with the type of laboratory, its location and your timeline.' },
    ],
  },
  {
    slug: 'pharmaceutical-consultant',
    id: 'consultant',
    h1: 'Pharmaceutical Regulatory Consultant',
    intro: 'Arab Lab’s Pharmaceutical Consultant line provides regulatory consulting and turnkey project services for pharmaceutical companies in the UAE, Saudi Arabia and Egypt.',
    seo: {
      title: 'Pharma Regulatory Consultant – Saudi Arabia & UAE',
      description: 'Pharmaceutical regulatory consulting and turnkey project services from Arab Lab for companies working with regulators in Saudi Arabia, the UAE and Egypt.',
      ogAlt: 'Arab Lab pharmaceutical regulatory consultant',
      card: { kicker: 'Service line', title: 'Pharmaceutical Regulatory Consultant', subtitle: 'Regulatory consulting and turnkey project services.' },
    },
    sections: [
      {
        title: 'The regulatory landscape',
        paragraphs: [
          'Pharmaceutical products and facilities in the region are overseen by national regulators: the Saudi Food and Drug Authority (SFDA) in Saudi Arabia, the Egyptian Drug Authority (EDA) in Egypt, and the federal authority in the UAE. Each has its own registration pathways, documentation requirements and inspection practices.',
          'Companies entering or expanding in more than one of these markets face different dossiers, timelines and local requirements at the same time. Planning them together avoids duplicated work and surprises late in the process.',
        ],
      },
      {
        title: 'What the line offers',
        paragraphs: [
          'The Pharmaceutical Consultant line combines regulatory consulting with turnkey project services. For a new or upgraded facility, that means the laboratory and its compliance are planned as one project rather than two; see [turnkey laboratory projects](/services/turnkey-projects).',
          'Specific scope, from registration support to facility readiness, is agreed per engagement. Contact us with your product, target markets and timeline to discuss it.',
        ],
      },
    ],
    solutions: [],
    departments: ['Commercial', 'Operational'],
    faq: [
      { q: 'What does a pharmaceutical regulatory consultant do?', a: 'A regulatory consultant helps a company understand and meet the requirements of the regulators in its target markets, from the documentation behind a product registration to facility and quality-system readiness.' },
      { q: 'Which regulators are relevant in the region?', a: 'The Saudi Food and Drug Authority (SFDA), the Egyptian Drug Authority (EDA) and the UAE’s federal authority, each with its own pathways and requirements.' },
      { q: 'Can regulatory consulting be combined with a laboratory project?', a: 'Yes. The Pharmaceutical Consultant line combines regulatory consulting with turnkey project services, so facility and compliance are planned together.' },
      { q: 'How do we start?', a: 'Send your product, target markets and timeline through the contact page, and choose the office nearest to you.' },
    ],
  },
]

export const serviceContentBySlug = (slug: string) => serviceContent.find((s) => s.slug === slug)
