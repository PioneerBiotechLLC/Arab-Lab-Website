import { CardLink, PageSection, PageShell, SectionIntro } from '@/components/site'
const solutions = [
 ['pharma','Pharma & Biotech','Bioprocessing, cell culture, molecular biology and QC workflows for regulated environments.'],
 ['food','Food & Beverage','Rapid microbial testing, analytical enzymes and quality systems for production laboratories.'],
 ['project','Arab Lab Project','Turnkey laboratory planning, equipment selection, installation and handover for new facilities.'],
 ['consultant','Pharmaceutical Consultant','Regulatory and turnkey consulting that connects technical requirements to practical execution.'],
]
export default function SolutionsPage() { return <PageShell eyebrow="Solutions" title="Equipment and expertise around the workflow." intro="Our portfolio is organized around the jobs your laboratory must complete, not a catalogue of disconnected instruments."><PageSection><div className="grid gap-5 md:grid-cols-2">{solutions.map(([id,title,body]) => <div id={id} key={id}><CardLink eyebrow="Capability" title={title} body={body} href="/contact" /></div>)}</div></PageSection><PageSection className="bg-navy-1"><SectionIntro eyebrow="A practical approach" title="Start with the application." intro="Tell us what the lab needs to measure, make or release. We will map the requirement to an appropriate technology, supply path and support plan." /></PageSection></PageShell> }
