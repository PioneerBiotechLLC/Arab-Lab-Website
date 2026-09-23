// Dedicated solution pages (/solutions/[slug]). Company and partner facts come from lib/site-data.ts and the partner
// decks; the technical background is standard pharmacopoeial and GMP practice, stated generally. Inline syntax:
// **bold**, [link](/path), {{VERIFY: note}}.
import type { Faq } from './brands'
import type { PageSeo } from '../seo-pages'

export type SolutionContent = {
  slug: string
  /** id of the matching entry in site-data `solutions` (anchor on /solutions, partner brands). */
  id: string
  h1: string
  intro: string
  seo: PageSeo
  problem: { title: string; paragraphs: string[] }
  approach: { title: string; paragraphs: string[]; points: { name: string; detail: string }[] }
  partnersIntro: string
  industries: string[]
  services: string[]
  faq: Faq[]
}

export const solutionContent: SolutionContent[] = [
  {
    slug: 'rapid-sterility-testing',
    id: 'sterility',
    h1: 'Rapid Sterility Testing and Microbial Detection',
    intro: 'Release sterile products in days rather than weeks, and run the sterility test in a closed, controlled system that reduces false results. Available across the UAE, Saudi Arabia and Egypt.',
    seo: {
      title: 'Rapid Sterility Testing – UAE, KSA & Egypt',
      description: 'Rapid sterility testing by ATP bioluminescence (about 2 days instead of 14) and closed isolator-based sterility test systems, from Arab Lab.',
      ogAlt: 'Rapid sterility testing solutions from Arab Lab: Promicol and Tailin',
      card: { kicker: 'Solution · Promicol · Tailin', title: 'Rapid Sterility Testing', subtitle: 'About 2 days instead of the conventional 14, in a closed system designed to minimise false results.' },
    },
    problem: {
      title: 'Why the conventional sterility test holds products back',
      paragraphs: [
        'The compendial sterility test (USP <71>, Ph. Eur. 2.6.1) incubates the sample in two culture media for 14 days before a result can be read. Every batch of a sterile product waits in quarantine for that time, which ties up inventory and delays the response when a problem does occur.',
        'For products with a short shelf life the wait is more than an inconvenience. Cell therapies, for example, may need to reach the patient before a 14-day result exists, so release has to rely on other controls while the sterility result follows later.',
        'The test also depends on how cleanly it is performed. Contamination introduced while the sample is filtered or transferred can produce a false positive, which triggers an investigation and a retest and can lead to a good batch being rejected.',
      ],
    },
    approach: {
      title: 'How rapid methods and closed systems solve it',
      paragraphs: [
        'Arab Lab addresses the problem from two sides: a faster way to detect contamination, and a more controlled way to run the test.',
        'Rapid detection uses **ATP bioluminescence**. Living microorganisms contain adenosine triphosphate (ATP); reagents isolate the microbial ATP and a luminometer measures the light produced, in Relative Light Units. On [Promicol](/brands/promicol)’s PRENOVA® platform, the Promilite M1 and M4 readers cut turnaround from the conventional 14 days to approximately 2 days. For T-cell therapies, the PRENOVA® TCT3 assay differentiates human from microbial ATP and shortens release to 2–3 days.',
        'Test control comes from a **closed sterility test system** run inside an **aseptic isolator**. [Tailin](/brands/tailin)’s test pump and testing canisters keep the sample sealed from the environment, and its isolators, VHPS decontamination systems and glove leak testers maintain the aseptic conditions around the test. The system is designed to minimise false positive and false negative results.',
        'An alternative microbiological method replaces the compendial test only after it has been validated for the product, following guidance such as USP <1223> and Ph. Eur. 5.1.6. Arab Lab’s Life Science team can discuss how an evaluation would fit your current method.',
      ],
      points: [
        { name: 'ATP bioluminescence readers', detail: 'Promilite M1 and M4 on the PRENOVA® platform, and the NOVILITE luminometer for the TCT3 assay.' },
        { name: 'Cell therapy release', detail: 'PRENOVA® TCT3 separates human from microbial ATP for T-cell therapy release in 2–3 days.' },
        { name: 'Closed sterility testing', detail: 'Test pump and sealed canisters, so the sample never meets the room environment.' },
        { name: 'Aseptic isolators', detail: 'Isolators with VHPS decontamination and glove leak testing to protect the test.' },
      ],
    },
    partnersIntro: 'Two partners cover the two halves of the problem: Promicol for speed, Tailin for control.',
    industries: ['Sterile pharmaceutical manufacturing', 'Biologics and biopharmaceuticals', 'Cell and gene therapy, including CAR-T', 'QC microbiology and contract testing laboratories'],
    services: ['pharma-biotech', 'turnkey-projects'],
    faq: [
      { q: 'How long does a conventional sterility test take?', a: 'The compendial test in USP <71> and Ph. Eur. 2.6.1 requires 14 days of incubation before the result is read.' },
      { q: 'How does ATP bioluminescence detect contamination?', a: 'Microorganisms contain ATP. Reagents isolate the microbial ATP and a luminometer measures the light it produces, in Relative Light Units, so contamination is detected without waiting for visible growth.' },
      { q: 'Do regulators accept rapid sterility tests?', a: 'Regulators accept alternative microbiological methods once they are validated against the compendial method for the product. For licensed products, changing the release test is normally handled as a change to the marketing authorisation.' },
      { q: 'Why run sterility tests in an isolator?', a: 'An isolator separates the test from the room and the operator. Combined with a closed test system, it reduces the environmental contamination that causes false positive results.' },
      { q: 'Can rapid methods be used for cell therapies?', a: 'Yes. Promicol’s PRENOVA® TCT3 assay differentiates human from microbial ATP, shortening sterility-test release to 2–3 days for T-cell therapies.' },
    ],
  },
  {
    slug: 'endotoxin-testing',
    id: 'endotoxin',
    h1: 'Endotoxin Testing and Bioprocessing Media',
    intro: 'Detect and control endotoxin in raw materials, water, in-process samples and finished product, and source bioprocessing media for protein production and cell and gene therapy. Available across the UAE, Saudi Arabia and Egypt.',
    seo: {
      title: 'Endotoxin Testing – UAE, Saudi Arabia, Egypt',
      description: 'Endotoxin and pyrogen testing for raw materials, in-process samples and finished product, plus Lonza bioprocessing media and MODA® QC software.',
      ogAlt: 'Endotoxin testing and bioprocessing media from Arab Lab and Lonza',
      card: { kicker: 'Solution · Lonza', title: 'Endotoxin Testing and Bioprocessing Media', subtitle: 'From raw materials to released product, for injectable drugs and implantable devices.' },
    },
    problem: {
      title: 'Why endotoxin has to be controlled at every step',
      paragraphs: [
        'Endotoxins are lipopolysaccharides from the outer membrane of Gram-negative bacteria. In the bloodstream they cause fever and, at higher doses, serious inflammatory reactions, so every injectable drug and implantable medical device must be shown to stay within its endotoxin limit.',
        'Endotoxin is not removed by killing bacteria. It is heat-stable, survives standard steam sterilisation and can be carried in on raw materials, water and equipment. Control therefore depends on testing at each stage: incoming materials, water for injection, in-process samples and the final product.',
        'The test itself has pitfalls. Product components can inhibit or enhance the reaction, so each product needs a validated dilution that removes interference while staying within the maximum valid dilution. Some biologic formulations also show reduced endotoxin recovery, which has to be understood before results can be trusted.',
      ],
    },
    approach: {
      title: 'Test methods and how Lonza covers them',
      paragraphs: [
        'The pharmacopoeias describe the bacterial endotoxins test (USP <85>, Ph. Eur. 2.6.14) using **Limulus amebocyte lysate (LAL)**, a reagent from horseshoe crab blood, in gel-clot, turbidimetric and chromogenic formats. **Recombinant Factor C (rFC)** reproduces the first enzyme of that cascade without animal material and is described in Ph. Eur. 2.6.32. The **monocyte activation test (MAT)**, Ph. Eur. 2.6.30, uses human immune cells and also detects pyrogens that are not endotoxins.',
        '[Lonza](/brands/lonza) offers endotoxin and pyrogen testing for raw materials, in-process samples and manufactured product, meeting regulatory requirements for injectable drugs and implantable medical devices. Its MODA® software replaces paper records in QC microbiology, covering environmental monitoring, utility testing and product testing with on-demand reporting and trending.',
        'For manufacturers growing cells, Lonza also supplies **bioprocessing media** for protein production and for cell and gene therapy applications.',
      ],
      points: [
        { name: 'Endotoxin testing', detail: 'Assays and reagents for raw materials, water, in-process samples and finished product.' },
        { name: 'Pyrogen testing', detail: 'Pyrogen control for injectable drugs and implantable medical devices.' },
        { name: 'MODA® paperless QC', detail: 'Electronic records and trending for environmental, utility and product testing.' },
        { name: 'Bioprocessing media', detail: 'Media for protein production and cell and gene therapy.' },
      ],
    },
    partnersIntro: 'Lonza covers endotoxin and pyrogen testing, the QC records around it, and the media used upstream.',
    industries: ['Pharmaceutical and biopharmaceutical manufacturing', 'Medical device manufacturing', 'Cell and gene therapy', 'Water-system and QC microbiology laboratories'],
    services: ['pharma-biotech'],
    faq: [
      { q: 'What is the difference between LAL and recombinant Factor C?', a: 'LAL is made from horseshoe crab blood and contains the whole clotting cascade. Recombinant Factor C reproduces only the first, endotoxin-specific enzyme, uses no animal material, and is not triggered by the glucans that can activate LAL.' },
      { q: 'When is the monocyte activation test used?', a: 'MAT detects both endotoxin and non-endotoxin pyrogens using human immune cells. It is used where pyrogens other than endotoxin are a concern, and as the in-vitro replacement for the rabbit pyrogen test.' },
      { q: 'Which samples need endotoxin testing?', a: 'Raw materials, water for injection, in-process samples and the finished product of injectable drugs, and implantable medical devices.' },
      { q: 'What is test interference?', a: 'Substances in the sample can inhibit or enhance the endotoxin reaction. Each product is tested for interference and diluted to a validated level that removes it, within the maximum valid dilution.' },
      { q: 'Does Arab Lab supply bioprocessing media?', a: 'Yes. Lonza bioprocessing media for protein production and for cell and gene therapy are available through Arab Lab.' },
    ],
  },
  {
    slug: 'process-filtration-single-use',
    id: 'filtration',
    h1: 'Sterile Process Filtration and Single-Use Systems',
    intro: 'Liquid and gas filtration from clarification through bioburden reduction to sterile filtration and mycoplasma removal, and automated single-use bioprocessing systems. Available across the UAE, Saudi Arabia and Egypt.',
    seo: {
      title: 'Sterile Filtration & Single-Use Bioprocessing',
      description: 'Parker bioprocess filtration from clarification to sterile filtration and mycoplasma removal, and SciLog automated single-use systems, from Arab Lab.',
      ogAlt: 'Sterile process filtration and single-use systems from Arab Lab and Parker',
      card: { kicker: 'Solution · Parker', title: 'Sterile Filtration and Single-Use Systems', subtitle: 'Clarification, bioburden reduction, sterile filtration, mycoplasma removal and automated single-use.' },
    },
    problem: {
      title: 'What process filtration has to achieve',
      paragraphs: [
        'Biologics and many sterile drugs cannot be sterilised by heat, so filtration is the step that makes them sterile. A filter train has to remove particles and cell debris, reduce microbial load, and finally deliver a sterile fluid, without losing product or slowing the process.',
        'Each stage protects the next. Clarification and prefiltration keep the expensive sterilising membrane from blocking early; bioburden reduction lowers the microbial challenge; the sterilising-grade filter at the end must be validated and integrity-tested. Mycoplasma is a separate concern: these small, wall-less organisms can pass filters rated for bacteria, so cell culture media and some process fluids need mycoplasma-retentive filtration.',
        'Stainless-steel systems add their own burden: cleaning, cleaning validation and changeover between products. Single-use assemblies remove much of that work, but have to be chosen with extractables and leachables, scale and supply in mind.',
      ],
    },
    approach: {
      title: 'A filtration train and single-use systems from one partner',
      paragraphs: [
        '[Parker](/brands/parker) provides biopharmaceutical liquid and gas filters and housings for the whole sequence: clarification, bioburden reduction, sterile filtration and mycoplasma removal. Gas and vent filters protect bioreactors, tanks and lines from airborne contamination.',
        'Sterilising filters are integrity-tested before and after use, typically by bubble point or diffusion testing. EU GMP Annex 1 also expects a pre-use, post-sterilisation integrity test unless a risk assessment justifies otherwise, so filter and assembly design should make that test practical.',
        'For single-use processing, Parker incorporates **SciLog technology** into scalable, automated single-use bioprocessing systems for upstream and downstream applications. They can be configured as manual, semi-automated or fully automated, so the level of automation matches the process and the batch size.',
      ],
      points: [
        { name: 'Clarification and prefiltration', detail: 'Depth and prefilters that protect downstream membranes.' },
        { name: 'Bioburden reduction', detail: 'Lower microbial load before critical process steps.' },
        { name: 'Sterile filtration', detail: 'Sterilising-grade liquid filters and the housings to hold them.' },
        { name: 'Mycoplasma removal', detail: 'Filtration stages that extend to mycoplasma retention.' },
        { name: 'Gas and vent filtration', detail: 'Sterile air and gas filtration for vessels and lines.' },
        { name: 'Automated single-use', detail: 'SciLog-based systems, manual to fully automated.' },
      ],
    },
    partnersIntro: 'Parker covers the filtration train and the automated single-use systems around it.',
    industries: ['Biopharmaceutical manufacturing', 'Sterile pharmaceutical production', 'Vaccines and biologics', 'Process development and pilot plants'],
    services: ['pharma-biotech', 'turnkey-projects'],
    faq: [
      { q: 'What makes a filter sterilising grade?', a: 'A sterilising-grade filter is validated to retain a defined bacterial challenge, typically Brevundimonas diminuta, and produce a sterile filtrate under the conditions of the process.' },
      { q: 'Why is mycoplasma removal a separate step?', a: 'Mycoplasma are very small and lack a cell wall, so they can pass filters rated for bacteria. Media and process fluids at risk are filtered through mycoplasma-retentive filters.' },
      { q: 'What is filter integrity testing?', a: 'A non-destructive test, such as bubble point or diffusion, that confirms a sterilising filter is intact. It is performed before and after use, and EU GMP Annex 1 expects a pre-use test after sterilisation unless justified.' },
      { q: 'When does single-use processing make sense?', a: 'It suits multi-product facilities, clinical and early commercial scale, and processes where cleaning validation and changeover time are a burden. Extractables, leachables and supply continuity are assessed as part of the choice.' },
      { q: 'Can single-use systems be automated?', a: 'Yes. Parker’s SciLog-based systems can be configured as manual, semi-automated or fully automated for upstream and downstream applications.' },
    ],
  },
  {
    slug: 'liquid-handling-bioprocess',
    id: 'liquid-handling',
    h1: 'Liquid Handling and Bioprocess Equipment',
    intro: 'Pipettes, dispensers, automated liquid handling, sample preparation, cell handling and scalable bioprocess systems for cell, molecular and microbiology laboratories. Available across the UAE, Saudi Arabia and Egypt.',
    seo: {
      title: 'Liquid Handling & Bioprocess Equipment – UAE',
      description: 'Eppendorf pipettes, automated liquid handling, centrifuges, cell handling and bioprocess systems for labs in the UAE, Saudi Arabia and Egypt. Arab Lab.',
      ogAlt: 'Liquid handling and bioprocess equipment from Arab Lab and Eppendorf',
      card: { kicker: 'Solution · Eppendorf', title: 'Liquid Handling and Bioprocess Equipment', subtitle: 'From the first pipetting step to production-scale bioprocessing.' },
    },
    problem: {
      title: 'Where accuracy and consistency are won or lost',
      paragraphs: [
        'Pipetting is the most frequent manual step in most laboratories, and small errors travel. A systematic error in a pipette shifts every result it touches; random variation between operators widens the spread of results and hides real differences.',
        'Performance depends on more than the instrument. Calibration, technique, tips that fit and seal properly, and the temperature and viscosity of the liquid all matter, and ISO 8655 sets out how piston-operated volumetric instruments are specified and tested. Repetitive pipetting also carries an ergonomic cost for the people doing it.',
        'In bioprocessing the challenge is consistency across scale: conditions established in a benchtop vessel have to carry through process development and pilot runs to production, with control software that records what happened at every stage.',
      ],
    },
    approach: {
      title: 'Workflow-built equipment from Eppendorf',
      paragraphs: [
        '[Eppendorf](/brands/eppendorf) designs instruments, consumables and accessories around complete laboratory workflows. Its liquid-handling range runs from manual and electronic pipettes to multichannel pipettes, dispensers and automated liquid-handling systems, so a laboratory can match the tool to the throughput and the risk of the task.',
        'Around liquid handling sit centrifuges, mixers and thermal mixers, PCR thermocyclers, CO₂ incubators, shakers and ultra-low temperature freezers, with tubes, tips, plates and cell culture vessels matched to the instruments.',
        'For bioprocessing, Eppendorf offers scalable hardware and software for the R&D, process development, pilot and production stages of biosimilars, biologics, vaccines and stem cell culture. Maintenance and service contracts are available at custom frequencies.',
      ],
      points: [
        { name: 'Manual and electronic pipettes', detail: 'Single- and multichannel, with dispensers for repetitive work.' },
        { name: 'Automated liquid handling', detail: 'For high-throughput and reproducibility-critical workflows.' },
        { name: 'Sample preparation', detail: 'Centrifuges, mixers, thermal mixers and PCR thermocyclers.' },
        { name: 'Cell handling and storage', detail: 'CO₂ incubators, shakers and ultra-low temperature freezers.' },
        { name: 'Bioprocess systems', detail: 'Bioreactor hardware and software from R&D to production.' },
        { name: 'Service contracts', detail: 'Maintenance at frequencies set to your needs.' },
      ],
    },
    partnersIntro: 'Eppendorf covers the bench and the bioprocess suite with one workflow-oriented range.',
    industries: ['Pharmaceutical and biopharmaceutical R&D and QC', 'Biotechnology and cell & gene therapy', 'Academic and research institutes', 'Clinical research and food microbiology laboratories'],
    services: ['pharma-biotech', 'food-beverage', 'turnkey-projects'],
    faq: [
      { q: 'How often should pipettes be calibrated?', a: 'The interval depends on how often the pipette is used, how critical the work is and your quality system. ISO 8655 defines how pipette performance is tested; many laboratories combine routine in-house checks with periodic calibration.' },
      { q: 'Should we move from manual to electronic pipettes?', a: 'Electronic pipettes reduce operator-to-operator variation and physical strain, and add programmable modes for repetitive dispensing. They are most valuable where volumes are critical or pipetting is frequent.' },
      { q: 'When is automated liquid handling worth it?', a: 'When throughput is high, when reproducibility matters more than flexibility, or when manual pipetting is a documented source of error.' },
      { q: 'Can Eppendorf bioprocess systems scale up?', a: 'Yes. Eppendorf’s bioprocess portfolio covers R&D, process development, pilot and production stages with scalable hardware and software.' },
    ],
  },
  {
    slug: 'pharmaceutical-culture-media',
    id: 'culture-media',
    h1: 'Pharmaceutical Culture Media',
    intro: 'Microbiology media for cleanroom environmental monitoring and sterility testing, made for the pharmaceutical industry in Germany. Available across the UAE, Saudi Arabia and Egypt.',
    seo: {
      title: 'Pharmaceutical Culture Media for EM & Sterility',
      description: 'PMM culture media for cleanroom environmental monitoring and sterility testing, made in Germany and supplied by Arab Lab in the UAE, KSA and Egypt.',
      ogAlt: 'Pharmaceutical culture media for environmental monitoring and sterility testing from Arab Lab and PMM',
      card: { kicker: 'Solution · PMM', title: 'Pharmaceutical Culture Media', subtitle: 'For cleanroom environmental monitoring and sterility testing.' },
    },
    problem: {
      title: 'What environmental monitoring media have to do',
      paragraphs: [
        'Aseptic manufacturing relies on an environmental monitoring programme to show that classified areas stay under control. Settle plates, contact plates, active air sampling and glove prints sample the air, surfaces and people, and EU GMP Annex 1 sets expectations for each cleanroom grade.',
        'The media carry that programme. They must recover low numbers of organisms that may be stressed by disinfectants or drying, stay usable through the exposure time, and neutralise disinfectant residues picked up from surfaces. Plates taken into the most critical areas must themselves be sterile and packaged so they can be transferred in without bringing contamination with them.',
        'Sterility testing has its own media requirements, set out in the pharmacopoeias. Every batch of media is expected to pass growth promotion testing, so its quality is as important to the result as the test itself.',
      ],
    },
    approach: {
      title: 'Media made for pharmaceutical microbiology',
      paragraphs: [
        '[PMM](/brands/pmm) — Pharmamedia Dr. Müller GmbH — focuses on culture media for the pharmaceutical industry. It was founded in 2013 by Dr. Rolf Müller, who had previously founded and directed heipha Dr. Müller GmbH from 1973 for over 30 years.',
        'PMM’s production facility in Leimen, near Heidelberg, Germany, was built and equipped to the requirements of pharmaceutical customers manufacturing sterile drugs. Its core offering is microbiology media for environmental monitoring and for sterility testing.',
        'Arab Lab supplies PMM media to manufacturers and QC laboratories across the region, alongside the rapid sterility testing and isolator equipment that often sits in the same laboratory. See [rapid sterility testing](/solutions/rapid-sterility-testing).',
      ],
      points: [
        { name: 'Settle and contact plates', detail: 'Media for passive air and surface monitoring in classified areas.' },
        { name: 'Active air sampling', detail: 'Media for volumetric air samplers.' },
        { name: 'Sterility testing media', detail: 'Media for the sterility testing of sterile drug products.' },
        { name: 'Pharmaceutical-grade production', detail: 'A facility in Germany built for sterile-drug manufacturers.' },
      ],
    },
    partnersIntro: 'PMM supplies the media for environmental monitoring and sterility testing.',
    industries: ['Sterile pharmaceutical manufacturing', 'Biopharmaceuticals', 'Aseptic filling operations', 'QC microbiology laboratories'],
    services: ['pharma-biotech'],
    faq: [
      { q: 'Which media are used for cleanroom environmental monitoring?', a: 'A general-purpose medium, typically soybean-casein digest agar with neutralisers, for settle plates, contact plates and air sampling, with additional media where the programme targets fungi.' },
      { q: 'Why do contact plates contain neutralisers?', a: 'Surfaces carry disinfectant residues that would stop organisms growing on the plate. Neutralisers inactivate those residues so contamination is recovered.' },
      { q: 'Why are some plates irradiated and multi-wrapped?', a: 'Plates taken into Grade A and B areas must be sterile on the outside as well as the inside. Irradiation and layered packaging let them be transferred into aseptic areas without introducing contamination.' },
      { q: 'What is growth promotion testing?', a: 'A check that each batch of media supports the growth of specified test organisms, so a negative result can be trusted.' },
    ],
  },
  {
    slug: 'enzymatic-qc-reagents',
    id: 'enzymes',
    h1: 'Enzymatic QC Reagents and Analytical Enzymes',
    intro: 'Analytical enzymes and ready-to-use microbiological media for quality control in pharmaceutical, clinical chemistry and food and beverage laboratories. Available across the UAE, Saudi Arabia and Egypt.',
    seo: {
      title: 'Enzymatic QC Reagents & Analytical Enzymes',
      description: 'CPC Biotech analytical enzymes, β-lactamases and ready-to-use microbiological media for pharma, clinical and food QC, from Arab Lab in the UAE, KSA, Egypt.',
      ogAlt: 'Enzymatic QC reagents and analytical enzymes from Arab Lab and CPC Biotech',
      card: { kicker: 'Solution · CPC Biotech', title: 'Enzymatic QC Reagents', subtitle: 'Analytical enzymes and ready-to-use media for pharmaceutical, clinical and food QC.' },
    },
    problem: {
      title: 'Where QC methods depend on enzymes',
      paragraphs: [
        'Many quality control methods use enzymes as reagents, and the result is only as reliable as the enzyme. In pharmaceutical microbiology, antibiotics in a sample can stop contaminants growing: β-lactamases are used to inactivate β-lactam antibiotics such as penicillins and cephalosporins so that organisms can be recovered in sterility and microbial tests.',
        'In clinical chemistry and food analysis, enzymes drive the measurement itself. Coupled enzymatic assays use dehydrogenases and kinases to convert the analyte into a signal that can be read, and enzymes such as β-galactosidase are used in the determination of sugars like lactose.',
        'For all of these, what matters is consistent activity, purity free of interfering side activities, stability in storage and use, and lot-to-lot reproducibility.',
      ],
    },
    approach: {
      title: 'Enzymes developed in-house, from gene to formulation',
      paragraphs: [
        '[CPC Biotech](/brands/cpc-biotech) is an Italian company founded in 2006 and now one of the important players in the analytical-enzymes market. It develops its products in-house from gene cloning through final formulation, with some covered by trademark licence, and holds an exclusive supply agreement with Merck-Millipore.',
        'Its range includes β-Lactamase CTZ, Amonisniper, Lactamator, β-Galactosidase, Glucose-6-Phosphate Dehydrogenase, Pyruvate Kinase and L-Lactate Dehydrogenase, serving quality control in the pharmaceutical, clinical chemistry and food and beverage fields.',
        'Since acquiring Neomed s.r.l.’s business unit in 2018, CPC Biotech also offers ready-to-use microbiological media, including media with enzymes already added, which removes a preparation step from the laboratory.',
      ],
      points: [
        { name: 'β-Lactamases', detail: 'β-Lactamase CTZ and Lactamator, for inactivating β-lactam antibiotics in microbiological testing.' },
        { name: 'Assay enzymes', detail: 'β-Galactosidase, G6PDH, Pyruvate Kinase and L-LDH, among others.' },
        { name: 'Ready-to-use media', detail: 'Microbiological media, including media with enzymes already added.' },
      ],
    },
    partnersIntro: 'CPC Biotech supplies the enzymes and the ready-to-use media.',
    industries: ['Pharmaceutical QC microbiology', 'Clinical chemistry', 'Food and beverage quality control'],
    services: ['pharma-biotech', 'food-beverage'],
    faq: [
      { q: 'Why add β-lactamase to test media?', a: 'β-lactam antibiotics in a sample can suppress the growth of contaminants. β-lactamase inactivates the antibiotic so any organisms present can grow and be detected.' },
      { q: 'Which assays use G6PDH, pyruvate kinase and lactate dehydrogenase?', a: 'They are common components of coupled enzymatic assays, in which one reaction feeds the next until a measurable signal is produced, for example in glucose determination.' },
      { q: 'What should we look for in an analytical enzyme?', a: 'Defined activity, freedom from side activities that interfere with the assay, stability, and consistent performance from one lot to the next.' },
      { q: 'Does CPC Biotech supply ready-to-use media?', a: 'Yes. Since acquiring Neomed s.r.l.’s business unit in 2018, CPC Biotech offers ready-to-use microbiological media, including media with enzymes already added.' },
    ],
  },
]

export const solutionContentBySlug = (slug: string) => solutionContent.find((s) => s.slug === slug)
