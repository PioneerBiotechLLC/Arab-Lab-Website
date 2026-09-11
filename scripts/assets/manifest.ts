// Every generated visual on the site: where it goes, what size, and the prompt that makes it.
// Ids and filenames follow lib/site-data.ts (program ids, solution ids, brand slugs, office slugs).
// Logos and team portraits are deliberately absent — never generated (see the asset plan).

export type Ratio = '1:1' | '3:2' | '2:3' | '3:4' | '4:3' | '4:5' | '5:4' | '9:16' | '16:9' | '21:9'
export type ImageSize = '1K' | '2K' | '4K'
export type Style = 'house' | 'video' | null

export type Asset = {
  id: string
  kind: 'image' | 'video'
  group: string
  /** Output path relative to the repo root. Video assets write `<out>.mp4` and, when ffmpeg is present, `<out>.webm`. */
  out: string
  width: number
  height: number
  /** Budget for the published file. Images are re-encoded down in quality until they fit. */
  maxKB: number
  /** Aspect ratio requested from the model. 16:10 slots ask for 3:2 and are centre-cropped. */
  ratio: Ratio
  imageSize?: ImageSize
  style: Style
  prompt: string
  usedBy: string
  note?: string
  /** Video only: asset id whose approved still becomes the first frame. Falls back to the file already in public/. */
  firstFrame?: string
}

const solution = (id: string, title: string, prompt: string): Asset => ({
  id, kind: 'image', group: 'Solutions', out: `public/solutions/${id}.webp`, width: 1600, height: 1200, maxKB: 180, ratio: '4:3', imageSize: '2K', style: 'house', prompt,
  usedBy: `/solutions card · home bento — ${title}`,
})
const program = (id: string, title: string, prompt: string): Asset => ({
  id, kind: 'image', group: 'Programs', out: `public/programs/${id}.webp`, width: 1600, height: 1000, maxKB: 180, ratio: '3:2', imageSize: '2K', style: 'house', prompt,
  usedBy: `home program card · /solutions — ${title}`,
})
const brandHero = (slug: string, prompt: string): Asset => ({
  id: `${slug}-hero`, kind: 'image', group: 'Brands', out: `public/brands/${slug}-hero.webp`, width: 2000, height: 1125, maxKB: 240, ratio: '16:9', imageSize: '2K', style: 'house', prompt,
  usedBy: `/brands/${slug} hero ground`, note: 'Category, not product — nothing identifiable as a specific manufacturer’s design. Subject right, left half quiet.',
})
const city = (slug: string, title: string, prompt: string): Asset => ({
  id: slug, kind: 'image', group: 'Locations', out: `public/locations/${slug}.webp`, width: 1600, height: 1000, maxKB: 180, ratio: '3:2', imageSize: '2K', style: null, prompt,
  usedBy: `/locations office card — ${title}`,
})

export const manifest: Asset[] = [
  // ── Hero ────────────────────────────────────────────────────────────────
  {
    id: 'hero', kind: 'image', group: 'Hero', out: 'public/hero/hero.webp', width: 2560, height: 1440, maxKB: 350, ratio: '16:9', imageSize: '2K', style: 'house',
    usedBy: 'app/page.tsx hero (desktop)', note: 'Iterate this one until it’s right; everything else inherits its lighting. Left 40% must stay a clean pale surface — the headline sits there.',
    prompt: 'Wide shot of a modern biopharmaceutical quality-control laboratory in bright morning light. On the right: an automated liquid-handling workstation on a white bench, its clear acrylic hood open, a rack of clear tubes inside; behind it, the glass front of a stainless-steel aseptic isolator with glove ports, softly out of focus. Far right edge, a technician in a white cleanroom gown and hood, back three-quarters to camera, blurred. The left 40% of the frame is a plain pale-grey wall and the empty end of the white bench dissolving into soft light — no objects, no contrast. Single orange accent: one small indicator light on the workstation. Eye-level camera, 35mm, f/2.8, horizon level.',
  },
  {
    id: 'hero-mobile', kind: 'image', group: 'Hero', out: 'public/hero/hero-mobile.webp', width: 1080, height: 1350, maxKB: 200, ratio: '4:5', imageSize: '2K', style: 'house',
    usedBy: 'app/page.tsx hero below 1024px', note: 'Subject in the lower half; top half quiet. Mobile lays an 85% white wash over it, so calm matters more than contrast.',
    prompt: 'Same laboratory and lighting as the hero still, reframed vertical. The automated liquid-handling workstation fills the lower half of the frame, seen slightly from above; the upper half is pale wall, the top edge of the isolator glass and soft window light. One orange indicator light. 35mm, f/2.8, calm and spacious.',
  },
  {
    id: 'hero-loop', kind: 'video', group: 'Hero', out: 'public/hero/hero-loop', width: 1920, height: 1080, maxKB: 6000, ratio: '16:9', style: 'video', firstFrame: 'hero',
    usedBy: 'app/page.tsx hero <video>, poster = hero.webp, off under prefers-reduced-motion',
    prompt: 'Starting from this frame, hold the composition. Over 8 seconds the camera dollies in by about 4%. The liquid-handling arm glides one position to the right and pauses; a pipette tip lowers into a tube and rises. The technician on the far right takes one slow step, staying blurred. Light on the wall brightens almost imperceptibly, as if a cloud passed. The orange indicator light stays steady. Ends on a frame nearly identical to the start.',
  },

  // ── Solutions — by laboratory problem ───────────────────────────────────
  solution('sterility', 'Rapid Sterility & Microbial Testing', 'Inside a stainless-steel aseptic isolator, lit evenly from above: a closed sterility-test system — a compact peristaltic test pump with two clear test canisters connected by tubing — on the brushed-steel work surface. Gloved hands enter from the left through glove ports, one hand steadying a canister. Behind, the isolator’s white interior wall and a HEPA diffuser. Single orange accent: the cap of one canister. 50mm, f/4, clinical and precise.'),
  {
    id: 'sterility-feature', kind: 'image', group: 'Solutions', out: 'public/solutions/sterility-feature.webp', width: 2000, height: 1500, maxKB: 260, ratio: '4:3', imageSize: '2K', style: null,
    usedBy: 'home dark feature tile', note: 'The one deliberately low-key image on the site. Bottom third dark and empty for the text.',
    prompt: 'Low-key editorial photograph inside a dark aseptic isolator. A luminometer sample reader glows softly on a black work surface, its small orange status light the only warm point; a single clear test canister beside it catches a rim of cool light. Deep navy shadows (#0F2438), not pure black. The bottom third of the frame is empty dark surface. Very shallow depth of field, 85mm, f/2. No text, no logos, no readable displays. Photorealistic, quiet, precise.',
  },
  solution('endotoxin', 'Endotoxin Detection & Bioprocessing Media', 'A clear 96-well microplate resting on the open tray of a benchtop plate reader, wells holding a faint gradient from clear to pale yellow. Beside it, a rack of clear pipette tips and a small glass vial of reconstituted reagent. White bench, pale wall, soft side light raking across the plate. Single orange accent: the lid of the pipette-tip box. 50mm, f/2.8, focus on the nearest wells.'),
  solution('filtration', 'Process Filtration & Single-Use Systems', 'A polished stainless-steel sanitary filter housing with tri-clamp fittings standing on a white bench, next to a translucent single-use capsule filter and a coiled length of clear silicone tubing with a clamp. Behind, out of focus, a stainless mobile tote. Cool daylight, crisp highlights on the steel. Single orange accent: one tubing clamp. 50mm, f/4, product-photography clarity.'),
  solution('liquid-handling', 'Liquid Handling & Bioprocess Equipment', 'A white laboratory bench with two generic electronic multichannel pipettes resting in a charging stand, a rack of clear microtubes and a reagent reservoir. In the background, softly out of focus, a small glass benchtop bioreactor vessel with a stainless head plate and tubing. Bright, even light. Single orange accent: the tube rack. 35mm, f/2.8, focus on the pipettes.'),
  solution('culture-media', 'Culture Media', 'Neat stacks of sealed agar plates — settle plates and smaller contact plates — with pale amber media, arranged on a white surface beside a compact stainless environmental-monitoring air sampler. Gloved hand lifting one plate at the edge of frame. Soft, even light showing the media surface. Single orange accent: a thin band on one plate lid. 50mm, f/4, overhead three-quarter angle.'),
  solution('enzymes', 'Enzymatic QC Reagents', 'Small glass reagent vials of white lyophilised powder with plain silver crimp caps, lined up on a white bench beside a quartz cuvette and an analytical balance with its draft shield open. A spectrophotometer sits out of focus behind. Cool, clean light with crisp reflections on the glass. Single orange accent: the cap of one vial. 85mm, f/2.8, macro feel.'),

  // ── Programs — service lines ────────────────────────────────────────────
  program('pharma', 'Arab Lab Pharma & Biotech', 'A bright bioprocess suite: a single-use bioreactor bag seated in a stainless-steel tote, tubing manifold with clamps rising to a compact control unit, epoxy floor, white wall panels and a viewing window. Two gowned technicians in the far background, blurred, working at a bench. Single orange accent: one tubing clamp on the manifold. 35mm, f/4, eye level.'),
  program('food', 'Arab Lab Food & Beverage', 'A food and beverage quality-control laboratory: sterile sample bottles of milk and clear juice on a white bench, a compact benchtop incubator with its door ajar, a rapid microbial test reader and a stomacher bag on a stand. Clean, bright, slightly warmer daylight than the pharma scenes. Single orange accent: the cap of one sample bottle. 35mm, f/2.8.'),
  program('project', 'Arab Lab Project', 'A new laboratory during fit-out, photographed like architecture: an empty cleanroom with seamless white wall panels, coved epoxy floor, HEPA filter units in a ceiling grid, and modular white benches partly installed along one wall. Protective film still on a pass-through hatch. Rolled drawings on a bench, unreadable. Wide, calm, symmetrical. Single orange accent: one safety cone at the far end. 24mm, f/5.6, one-point perspective.'),
  program('consultant', 'Pharmaceutical Consultant', 'A quiet meeting room beside a cleanroom, seen through floor-to-ceiling glass in the background. On a pale wood table: a thick validation binder open to a blank tabbed page, a fountain pen, a laptop turned slightly away with a soft-focus screen, a glass of water. Morning light across the table. No readable text anywhere. Single orange accent: a coloured tab in the binder. 50mm, f/2, focus on the pen.'),

  // ── Brand page heroes (category scenes, never products) ─────────────────
  brandHero('eppendorf', 'Wide, quiet shot of a cell-culture bench: a generic electronic pipette in a stand, a stack of clear culture flasks and a benchtop bioreactor vessel, subject in the right half, pale wall and empty bench to the left. One orange tube rack. 35mm, f/2.8.'),
  brandHero('parker', 'Wide shot of a stainless filtration skid with sanitary clamps and clear single-use tubing assemblies, right half of frame; left half a plain white cleanroom wall. One orange tubing clamp. 35mm, f/4.'),
  brandHero('lonza', 'Wide shot of a QC microbiology bench: a plate reader with a microplate on its tray, reagent vials and a laptop turned away with a soft-focus screen, right half; left half empty white bench fading to pale wall. One orange tip-box lid. 35mm, f/2.8.'),
  brandHero('promicol', 'Wide shot inside a bright isolator: a compact luminometer reader and two clear sample tubes on brushed steel, gloved hands from a glove port at the right edge; left half of frame the plain white isolator wall. One orange tube cap. 50mm, f/4.'),
  brandHero('pmm', 'Wide shot of stacked agar plates with pale amber media beside an air sampler on a white surface, right half; left half pale wall and soft window light. One orange band on a plate lid. 50mm, f/4, overhead three-quarter angle.'),
  brandHero('cpc-biotech', 'Wide shot of an analytical bench: small crimp-capped reagent vials, a quartz cuvette and a spectrophotometer, right half; left half empty white bench. One orange vial cap. 85mm, f/2.8.'),
  brandHero('tailin', 'Wide shot of a stainless-steel aseptic isolator with four glove ports and a glass front, standing in a bright white cleanroom, right half of frame; left half plain wall and floor. One orange indicator light on the isolator panel. 24mm, f/5.6, eye level.'),

  // ── Locations — four cities, one light (own style, no lab block) ────────
  city('ras-al-khaimah', 'Ras Al Khaimah (HQ)', 'Editorial architectural photograph: modern glass high-rise towers on the coastal corniche of Ras Al Khaimah, UAE, with the pale Hajar mountains behind in soft morning haze. Calm sea in the foreground, pastel sky, low saturation, no people prominent, no text or signage legible. 35mm, f/8, level horizon, quiet and precise. Photorealistic. Avoid: postcard saturation, sunset orange sky, HDR.'),
  city('dubai', 'Dubai', 'Editorial architectural photograph of Bur Dubai along Dubai Creek in soft morning light: low traditional buildings and wind towers along the water with the modern skyline pale and distant behind, an abra boat mid-creek. Low saturation, hazy pastel sky, no legible signage. 35mm, f/8, level horizon. Photorealistic. Avoid: sunset colours, HDR, crowds.'),
  city('riyadh', 'Riyadh', 'Editorial architectural photograph of modern Riyadh, Saudi Arabia, from a wide boulevard in the Al Wurud district: clean sandstone and glass office buildings, palm-lined median, a tall landmark tower pale in the distance under a bright hazy sky. Low saturation, dusty warm light kept neutral, no legible signage, sparse traffic. 35mm, f/8. Photorealistic. Avoid: sunset, HDR, dramatic skies.'),
  city('cairo', 'Cairo', 'Editorial architectural photograph of a modern district in New Cairo’s First Settlement: pale limestone and glass mid-rise buildings along a wide, quiet street with young trees, the Muqattam hills faint on the horizon under a hazy morning sky. Low saturation, warm light kept neutral, no legible signage. 35mm, f/8, level horizon. Photorealistic. Avoid: pyramids, sunset, HDR, crowds.'),

  // ── About ───────────────────────────────────────────────────────────────
  {
    id: 'hq', kind: 'image', group: 'About', out: 'public/about/hq.webp', width: 2000, height: 1250, maxKB: 240, ratio: '3:2', imageSize: '2K', style: 'house',
    usedBy: '/about story', note: 'Fallback only — a real photograph of the Ras Al Khaimah office is better if one exists.',
    prompt: 'Interior of a bright, modern office reception for a scientific equipment company: a pale wood reception desk, a white wall with an empty rectangular panel where a logo would sit (blank), a glass partition showing a small demonstration lab with a white bench and an instrument beyond. Morning light from tall windows, calm and uncluttered. One orange accent: a single chair. 24mm, f/5.6.',
  },
]

export const byId = Object.fromEntries(manifest.map((a) => [a.id, a])) as Record<string, Asset>
