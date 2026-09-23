// Brand page copy beyond the partner-deck profile in lib/site-data.ts. Sources: the partner decks already on the site,
// plus product categories that are publicly part of each manufacturer's portfolio. Portfolio lines describe the
// manufacturer's range, not Arab Lab's stock; availability is confirmed per request. No distributor-status claims.

export type Faq = { q: string; a: string }
export type BrandContent = {
  intro: string
  categories: { name: string; detail: string }[]
  applications: string
  industries: string[]
  faq: Faq[]
}

export const brandContent: Record<string, BrandContent> = {
  eppendorf: {
    intro: 'Arab Lab supplies Eppendorf laboratory equipment and consumables to laboratories in the UAE, Saudi Arabia and Egypt. Eppendorf designs its range around complete laboratory workflows, so pipetting, sample preparation, cell handling and bioprocessing tools are built to work together from the first experiment to production scale.',
    categories: [
      { name: 'Liquid handling', detail: 'Manual and electronic single- and multichannel pipettes, dispensers and automated liquid-handling systems for routine and high-throughput work.' },
      { name: 'Sample preparation', detail: 'Centrifuges, mixers and thermal mixers, and PCR thermocyclers for molecular biology workflows.' },
      { name: 'Consumables', detail: 'Tubes, pipette tips, plates and cell culture vessels matched to Eppendorf instruments.' },
      { name: 'Cell handling and storage', detail: 'CO₂ incubators, shakers and ultra-low temperature freezers for cell culture and sample storage.' },
      { name: 'Bioprocess systems', detail: 'Scalable bioreactor hardware and control software for R&D, process development, pilot and production.' },
    ],
    applications: 'Eppendorf equipment is used across cell biology, molecular biology and microbiology, and supports next-generation sequencing, stem cell research, genome editing and bioprocess development for biologics, biosimilars and vaccines.',
    industries: ['Pharmaceutical and biopharmaceutical R&D and QC', 'Biotechnology and cell & gene therapy', 'Academic and research institutes', 'Clinical and hospital research laboratories', 'Food and environmental microbiology'],
    faq: [
      { q: 'Which Eppendorf products can I source through Arab Lab?', a: 'Eppendorf’s portfolio covers liquid handling, sample preparation, consumables, cell handling and bioprocess systems. Tell us the application or catalogue number and we will confirm availability and lead time for your country.' },
      { q: 'Which laboratories is Eppendorf equipment suited to?', a: 'Cell biology, molecular biology and microbiology laboratories, including work in next-generation sequencing, stem cells, genome editing and bioprocess development from R&D to production.' },
      { q: 'Do you supply Eppendorf in Saudi Arabia and Egypt?', a: 'Arab Lab serves customers in the UAE, Saudi Arabia and Egypt from offices in Ras Al Khaimah, Riyadh and Cairo. Each request is routed to the office that covers your country.' },
      { q: 'Can Eppendorf instruments be covered by a service contract?', a: 'Eppendorf offers maintenance and service contracts at custom frequencies. Contact Arab Lab’s Service department to discuss the options for your instruments.' },
    ],
  },
  parker: {
    intro: 'Arab Lab supplies Parker bioprocess filtration and single-use systems to pharmaceutical and biopharmaceutical manufacturers in the UAE, Saudi Arabia and Egypt. Parker’s range follows the process stream, from the first clarification step through to the sterile filter at the point of fill.',
    categories: [
      { name: 'Clarification and prefiltration', detail: 'Depth and prefilters that protect downstream membranes and extend their service life.' },
      { name: 'Bioburden reduction', detail: 'Filters that lower microbial load in process fluids before critical steps.' },
      { name: 'Sterile and mycoplasma-retentive filtration', detail: 'Sterilising-grade liquid filters, with filtration stages that extend to mycoplasma removal.' },
      { name: 'Gas filtration and housings', detail: 'Sterile gas and vent filters, and the housings that hold process filter cartridges.' },
      { name: 'Automated single-use systems', detail: 'Scalable single-use bioprocessing systems incorporating SciLog technology, configurable as manual, semi-automated or fully automated.' },
    ],
    applications: 'Parker filtration is applied to liquid and gas streams across upstream and downstream bioprocessing: clarification of harvests, bioburden control, sterile filtration of buffers, media and final product, and mycoplasma removal. Its single-use systems bring automation to upstream and downstream unit operations without fixed stainless-steel pipework.',
    industries: ['Biopharmaceutical manufacturing', 'Sterile pharmaceutical production', 'Vaccines and biologics', 'Process development and pilot plants'],
    faq: [
      { q: 'Which filtration steps does Parker cover?', a: 'The full sequence for liquids and gases: clarification, bioburden reduction, sterile filtration and mycoplasma removal, with the housings to match.' },
      { q: 'What is SciLog technology?', a: 'SciLog is Parker technology incorporated into its scalable, automated single-use bioprocessing systems for upstream and downstream applications.' },
      { q: 'Can Parker single-use systems be automated?', a: 'Yes. They can be configured as manual, semi-automated or fully automated systems, so the level of automation matches the process and the batch size.' },
      { q: 'What should I include in a filtration quote request?', a: 'The process step, the fluid or gas being filtered, the volume or flow rate and any required retention rating. Arab Lab will route the request to the specialist who handles bioprocess filtration.' },
    ],
  },
  lonza: {
    intro: 'Arab Lab supplies Lonza endotoxin and pyrogen testing, bioprocessing media and QC software to pharmaceutical, biotech and medical device manufacturers in the UAE, Saudi Arabia and Egypt. Lonza’s testing range covers every point where endotoxin must be controlled, from incoming raw materials to released product.',
    categories: [
      { name: 'Endotoxin testing', detail: 'Assays, reagents and accessories for raw materials, in-process samples and manufactured product.' },
      { name: 'Pyrogen testing', detail: 'Solutions for pyrogen control that meet regulatory requirements for injectable drugs and implantable medical devices.' },
      { name: 'Bioprocessing media', detail: 'Media for protein production and for cell and gene therapy applications.' },
      { name: 'MODA® QC software', detail: 'Paperless QC microbiology and electronic batch records covering environmental monitoring, utility testing and product testing.' },
    ],
    applications: 'Lonza endotoxin testing is used wherever parenteral products and implantable devices must be shown to be free of pyrogenic contamination: raw-material acceptance, water and in-process control, and final product release. MODA® replaces paper records in QC microbiology with on-demand reporting and trending across the workflow.',
    industries: ['Pharmaceutical and biopharmaceutical manufacturing', 'Medical device manufacturing', 'Cell and gene therapy', 'QC microbiology laboratories'],
    faq: [
      { q: 'What does Lonza’s endotoxin testing cover?', a: 'Raw materials, in-process samples and manufactured product, meeting regulatory requirements for injectable drugs and implantable medical devices.' },
      { q: 'What is MODA®?', a: 'MODA® is Lonza’s paperless QC microbiology and electronic batch record software. It covers environmental monitoring, utility testing and product testing, with on-demand reporting and trending.' },
      { q: 'Does Lonza supply media for bioprocessing?', a: 'Yes. Lonza bioprocessing media are used for protein production and for cell and gene therapy applications.' },
      { q: 'How do I get a quote for Lonza products?', a: 'Send a request through the contact page with the product or test you need and your preferred office. Arab Lab will confirm availability and pricing for your country.' },
    ],
  },
  promicol: {
    intro: 'Arab Lab supplies Promicol rapid sterility testing to pharmaceutical, biotech and cell therapy manufacturers in the UAE, Saudi Arabia and Egypt. Promicol’s patented products measure microbial load by ATP bioluminescence, so a result that conventionally takes two weeks can be available in about two days.',
    categories: [
      { name: 'PRENOVA® platform', detail: 'The rapid sterility testing platform built around Promicol’s readers and reagents.' },
      { name: 'Promilite M1 and M4 readers', detail: 'The instruments at the core of the PRENOVA® platform.' },
      { name: 'PRENOVA® TCT3 assay', detail: 'An assay that differentiates human from microbial ATP, for T-cell therapy release in 2–3 days.' },
      { name: 'NOVILITE luminometer', detail: 'A reader engineered for the kinetic sensitivity the TCT3 assay requires.' },
      { name: 'ATP reagents', detail: 'Reagents that isolate microbial ATP specifically, so the light signal reflects microbial contamination.' },
    ],
    applications: 'Promicol methods are used where release time matters: sterile products with short shelf lives, cell therapies that cannot wait for a 14-day result, and QC laboratories that want earlier detection of contamination. The light output, measured in Relative Light Units, confirms sterility.',
    industries: ['Sterile pharmaceutical manufacturing', 'Biopharmaceuticals', 'Cell and gene therapy, including CAR-T', 'QC microbiology laboratories'],
    faq: [
      { q: 'How does Promicol’s rapid sterility test work?', a: 'Reagents isolate microbial ATP and a luminometer measures the light produced, in Relative Light Units. The light output confirms whether the sample is sterile.' },
      { q: 'How much faster is it than the conventional sterility test?', a: 'The Promilite M1 and M4 readers on the PRENOVA® platform cut turnaround from the conventional 14 days to approximately 2 days. Like any alternative microbiological method, it is validated for each product before it is used for release.' },
      { q: 'Can it be used for cell therapies?', a: 'Yes. The PRENOVA® TCT3 assay differentiates human from microbial ATP, shortening sterility-test release to 2–3 days for T-cell therapies.' },
      { q: 'How do I start an evaluation?', a: 'Contact Arab Lab with your product type and current sterility-testing method, and the Life Science team will discuss the next step.' },
    ],
  },
  pmm: {
    intro: 'Arab Lab supplies PMM pharmaceutical culture media to sterile-drug manufacturers and QC microbiology laboratories in the UAE, Saudi Arabia and Egypt. PMM concentrates on one thing: nutrient media made to the requirements of the pharmaceutical industry.',
    categories: [
      { name: 'Environmental monitoring media', detail: 'Media for settle-plate, contact-plate and active air-sampling programmes in cleanrooms.' },
      { name: 'Sterility testing media', detail: 'Media for the sterility testing of sterile drug products.' },
      { name: 'Pharmaceutical-grade production', detail: 'Manufactured in Leimen, near Heidelberg, Germany, in a facility built for the needs of sterile-drug manufacturers.' },
    ],
    applications: 'PMM media support the microbiological control of aseptic manufacturing: routine environmental monitoring of air, surfaces and personnel in classified areas, and the sterility testing that precedes product release.',
    industries: ['Sterile pharmaceutical manufacturing', 'Biopharmaceuticals', 'Aseptic filling operations', 'QC microbiology laboratories'],
    faq: [
      { q: 'What culture media does PMM make?', a: 'PMM produces microbiology media for the pharmaceutical industry, with a core offering for environmental monitoring and sterility testing.' },
      { q: 'Where are PMM media manufactured?', a: 'In Leimen, near Heidelberg, Germany. The production facility was built and equipped to the requirements of pharmaceutical customers manufacturing sterile drugs.' },
      { q: 'Who is behind PMM?', a: 'Pharmamedia Dr. Müller GmbH was founded in 2013 by Dr. Rolf Müller, who had previously founded and directed heipha Dr. Müller GmbH from 1973 for over 30 years.' },
      { q: 'How do I order PMM media?', a: 'Send a request with the media types and quantities you need, and your preferred office. Arab Lab will confirm availability and delivery for your country.' },
    ],
  },
  'cpc-biotech': {
    intro: 'Arab Lab supplies CPC Biotech analytical enzymes and ready-to-use microbiological media to quality control laboratories in the UAE, Saudi Arabia and Egypt. CPC Biotech develops its enzymes in-house, from gene cloning to final formulation.',
    categories: [
      { name: 'β-Lactamase enzymes', detail: 'Including β-Lactamase CTZ and Lactamator, used to inactivate β-lactam antibiotics in microbiological testing.' },
      { name: 'Enzymes for analytical assays', detail: 'β-Galactosidase, Glucose-6-Phosphate Dehydrogenase, Pyruvate Kinase and L-Lactate Dehydrogenase, among others.' },
      { name: 'Ready-to-use microbiological media', detail: 'Media with enzymes already added, from the business unit acquired from Neomed s.r.l. in 2018.' },
    ],
    applications: 'CPC Biotech enzymes serve quality control in three fields: pharmaceutical microbiology, clinical chemistry and food and beverage testing. Media supplied with enzymes already added remove a preparation step from the laboratory.',
    industries: ['Pharmaceutical QC laboratories', 'Clinical chemistry', 'Food and beverage quality control'],
    faq: [
      { q: 'What are β-lactamase enzymes used for in QC?', a: 'β-lactamases inactivate β-lactam antibiotics, so microorganisms can be recovered from samples that contain them. CPC Biotech’s range includes β-Lactamase CTZ and Lactamator.' },
      { q: 'Where are CPC Biotech products developed?', a: 'In Italy. CPC Biotech was founded in 2006 and develops its products in-house from gene cloning through final formulation, with some covered by trademark licence.' },
      { q: 'Does CPC Biotech supply ready-to-use media?', a: 'Yes. Since acquiring Neomed s.r.l.’s business unit in 2018, it offers ready-to-use microbiological media, including media with enzymes already added.' },
      { q: 'How do I request a quote?', a: 'Send the enzyme or medium you need and the quantity through the contact page. Arab Lab will confirm availability for your country.' },
    ],
  },
  tailin: {
    intro: 'Arab Lab supplies Tailin aseptic isolators, decontamination systems and sterility test equipment to pharmaceutical and biotech manufacturers in the UAE, Saudi Arabia and Egypt. Tailin manufactures most of its critical equipment in-house and supports customers with validation teams.',
    categories: [
      { name: 'Aseptic isolators', detail: 'Isolators for aseptic work, with glove leak testers to keep glove ports in specification.' },
      { name: 'VHPS decontamination systems', detail: 'Hydrogen peroxide vapour systems for decontaminating aseptic environments.' },
      { name: 'Closed sterility test system', detail: 'A sterility test pump and testing canisters, designed to minimise false positive and false negative results.' },
      { name: 'Consumables', detail: 'Sterility testing canisters and related consumables for the Tailin system.' },
      { name: 'Validation support', detail: 'Experienced teams that build regulatory qualification strategies for faster approvals.' },
    ],
    applications: 'Tailin equipment is used to create and maintain aseptic conditions and to run sterility tests within them: isolator-based sterility testing, decontamination cycles between batches, and glove integrity checks.',
    industries: ['Biopharmaceutical manufacturing', 'Cell and gene therapy', 'Biosafety level 3 (P3) laboratories', 'Manned-space programmes'],
    faq: [
      { q: 'What is a closed sterility test system?', a: 'A test pump combined with sealed testing canisters, so the sample is filtered and incubated without being exposed to the environment. Tailin designs its system to minimise false positive and false negative results.' },
      { q: 'What does VHPS decontamination do?', a: 'It decontaminates aseptic environments, such as isolators, with hydrogen peroxide vapour between uses.' },
      { q: 'Which sectors use Tailin equipment?', a: 'Biopharmaceutical manufacturing, cell and gene therapy, P3 laboratories and manned-space programmes.' },
      { q: 'Does Tailin help with validation?', a: 'Yes. Tailin has experienced validation teams that build regulatory qualification strategies for fast approvals.' },
    ],
  },
}
