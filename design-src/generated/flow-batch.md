# Arab Lab — Flow batch

Paste each block into Flow as-is. Order matters: the hero first, then everything else inherits its light.

## hero

- **Save as:** `public/hero/hero.webp`
- **Spec:** 2560×1440 · 16:9 · WebP ≤ 350 KB
- **Used by:** app/page.tsx hero (desktop)
- **Note:** Iterate this one until it’s right; everything else inherits its lighting. Left 40% must stay a clean pale surface — the headline sits there.

```
Wide shot of a modern biopharmaceutical quality-control laboratory in bright morning light. On the right: an automated liquid-handling workstation on a white bench, its clear acrylic hood open, a rack of clear tubes inside; behind it, the glass front of a stainless-steel aseptic isolator with glove ports, softly out of focus. Far right edge, a technician in a white cleanroom gown and hood, back three-quarters to camera, blurred. The left 40% of the frame is a plain pale-grey wall and the empty end of the white bench dissolving into soft light — no objects, no contrast. Single orange accent: one small indicator light on the workstation. Eye-level camera, 35mm, f/2.8, horizon level.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## hero-mobile

- **Save as:** `public/hero/hero-mobile.webp`
- **Spec:** 1080×1350 · 4:5 · WebP ≤ 200 KB
- **Used by:** app/page.tsx hero below 1024px
- **Note:** Subject in the lower half; top half quiet. Mobile lays an 85% white wash over it, so calm matters more than contrast.

```
Same laboratory and lighting as the hero still, reframed vertical. The automated liquid-handling workstation fills the lower half of the frame, seen slightly from above; the upper half is pale wall, the top edge of the isolator glass and soft window light. One orange indicator light. 35mm, f/2.8, calm and spacious.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## hero-loop

- **Save as:** `public/hero/hero-loop.mp4`
- **Spec:** 1920×1080 · 8 s · 16:9 · first frame = hero
- **Used by:** app/page.tsx hero <video>, poster = hero.webp, off under prefers-reduced-motion

```
Starting from this frame, hold the composition. Over 8 seconds the camera dollies in by about 4%. The liquid-handling arm glides one position to the right and pauses; a pipette tip lowers into a tube and rises. The technician on the far right takes one slow step, staying blurred. Light on the wall brightens almost imperceptibly, as if a cloud passed. The orange indicator light stays steady. Ends on a frame nearly identical to the start.

Cinematic, photoreal, 8 seconds, 16:9, 24 fps. One continuous shot, no cuts, no camera shake. Motion is slow and physical: a 3–5% dolly or a single mechanical action. Bright high-key laboratory lighting, white and pale-grey surfaces, brushed steel, one warm-orange accent object. No people facing camera, no text, no logos, no readable screens. The final frame should resemble the first so the clip loops cleanly. No music cues, no sound design needed.
```

## sterility

- **Save as:** `public/solutions/sterility.webp`
- **Spec:** 1600×1200 · 4:3 · WebP ≤ 180 KB
- **Used by:** /solutions card · home bento — Rapid Sterility & Microbial Testing

```
Inside a stainless-steel aseptic isolator, lit evenly from above: a closed sterility-test system — a compact peristaltic test pump with two clear test canisters connected by tubing — on the brushed-steel work surface. Gloved hands enter from the left through glove ports, one hand steadying a canister. Behind, the isolator’s white interior wall and a HEPA diffuser. Single orange accent: the cap of one canister. 50mm, f/4, clinical and precise.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## sterility-feature

- **Save as:** `public/solutions/sterility-feature.webp`
- **Spec:** 2000×1500 · 4:3 · WebP ≤ 260 KB
- **Used by:** home dark feature tile
- **Note:** The one deliberately low-key image on the site. Bottom third dark and empty for the text.

```
Low-key editorial photograph inside a dark aseptic isolator. A luminometer sample reader glows softly on a black work surface, its small orange status light the only warm point; a single clear test canister beside it catches a rim of cool light. Deep navy shadows (#0F2438), not pure black. The bottom third of the frame is empty dark surface. Very shallow depth of field, 85mm, f/2. No text, no logos, no readable displays. Photorealistic, quiet, precise.
```

## endotoxin

- **Save as:** `public/solutions/endotoxin.webp`
- **Spec:** 1600×1200 · 4:3 · WebP ≤ 180 KB
- **Used by:** /solutions card · home bento — Endotoxin Detection & Bioprocessing Media

```
A clear 96-well microplate resting on the open tray of a benchtop plate reader, wells holding a faint gradient from clear to pale yellow. Beside it, a rack of clear pipette tips and a small glass vial of reconstituted reagent. White bench, pale wall, soft side light raking across the plate. Single orange accent: the lid of the pipette-tip box. 50mm, f/2.8, focus on the nearest wells.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## filtration

- **Save as:** `public/solutions/filtration.webp`
- **Spec:** 1600×1200 · 4:3 · WebP ≤ 180 KB
- **Used by:** /solutions card · home bento — Process Filtration & Single-Use Systems

```
A polished stainless-steel sanitary filter housing with tri-clamp fittings standing on a white bench, next to a translucent single-use capsule filter and a coiled length of clear silicone tubing with a clamp. Behind, out of focus, a stainless mobile tote. Cool daylight, crisp highlights on the steel. Single orange accent: one tubing clamp. 50mm, f/4, product-photography clarity.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## liquid-handling

- **Save as:** `public/solutions/liquid-handling.webp`
- **Spec:** 1600×1200 · 4:3 · WebP ≤ 180 KB
- **Used by:** /solutions card · home bento — Liquid Handling & Bioprocess Equipment

```
A white laboratory bench with two generic electronic multichannel pipettes resting in a charging stand, a rack of clear microtubes and a reagent reservoir. In the background, softly out of focus, a small glass benchtop bioreactor vessel with a stainless head plate and tubing. Bright, even light. Single orange accent: the tube rack. 35mm, f/2.8, focus on the pipettes.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## culture-media

- **Save as:** `public/solutions/culture-media.webp`
- **Spec:** 1600×1200 · 4:3 · WebP ≤ 180 KB
- **Used by:** /solutions card · home bento — Culture Media

```
Neat stacks of sealed agar plates — settle plates and smaller contact plates — with pale amber media, arranged on a white surface beside a compact stainless environmental-monitoring air sampler. Gloved hand lifting one plate at the edge of frame. Soft, even light showing the media surface. Single orange accent: a thin band on one plate lid. 50mm, f/4, overhead three-quarter angle.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## enzymes

- **Save as:** `public/solutions/enzymes.webp`
- **Spec:** 1600×1200 · 4:3 · WebP ≤ 180 KB
- **Used by:** /solutions card · home bento — Enzymatic QC Reagents

```
Small glass reagent vials of white lyophilised powder with plain silver crimp caps, lined up on a white bench beside a quartz cuvette and an analytical balance with its draft shield open. A spectrophotometer sits out of focus behind. Cool, clean light with crisp reflections on the glass. Single orange accent: the cap of one vial. 85mm, f/2.8, macro feel.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## pharma

- **Save as:** `public/programs/pharma.webp`
- **Spec:** 1600×1000 · 3:2 · WebP ≤ 180 KB
- **Used by:** home program card · /solutions — Arab Lab Pharma & Biotech

```
A bright bioprocess suite: a single-use bioreactor bag seated in a stainless-steel tote, tubing manifold with clamps rising to a compact control unit, epoxy floor, white wall panels and a viewing window. Two gowned technicians in the far background, blurred, working at a bench. Single orange accent: one tubing clamp on the manifold. 35mm, f/4, eye level.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## food

- **Save as:** `public/programs/food.webp`
- **Spec:** 1600×1000 · 3:2 · WebP ≤ 180 KB
- **Used by:** home program card · /solutions — Arab Lab Food & Beverage

```
A food and beverage quality-control laboratory: sterile sample bottles of milk and clear juice on a white bench, a compact benchtop incubator with its door ajar, a rapid microbial test reader and a stomacher bag on a stand. Clean, bright, slightly warmer daylight than the pharma scenes. Single orange accent: the cap of one sample bottle. 35mm, f/2.8.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## project

- **Save as:** `public/programs/project.webp`
- **Spec:** 1600×1000 · 3:2 · WebP ≤ 180 KB
- **Used by:** home program card · /solutions — Arab Lab Project

```
A new laboratory during fit-out, photographed like architecture: an empty cleanroom with seamless white wall panels, coved epoxy floor, HEPA filter units in a ceiling grid, and modular white benches partly installed along one wall. Protective film still on a pass-through hatch. Rolled drawings on a bench, unreadable. Wide, calm, symmetrical. Single orange accent: one safety cone at the far end. 24mm, f/5.6, one-point perspective.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## consultant

- **Save as:** `public/programs/consultant.webp`
- **Spec:** 1600×1000 · 3:2 · WebP ≤ 180 KB
- **Used by:** home program card · /solutions — Pharmaceutical Consultant

```
A quiet meeting room beside a cleanroom, seen through floor-to-ceiling glass in the background. On a pale wood table: a thick validation binder open to a blank tabbed page, a fountain pen, a laptop turned slightly away with a soft-focus screen, a glass of water. Morning light across the table. No readable text anywhere. Single orange accent: a coloured tab in the binder. 50mm, f/2, focus on the pen.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## eppendorf-hero

- **Save as:** `public/brands/eppendorf-hero.webp`
- **Spec:** 2000×1125 · 16:9 · WebP ≤ 240 KB
- **Used by:** /brands/eppendorf hero ground
- **Note:** Category, not product — nothing identifiable as a specific manufacturer’s design. Subject right, left half quiet.

```
Wide, quiet shot of a cell-culture bench: a generic electronic pipette in a stand, a stack of clear culture flasks and a benchtop bioreactor vessel, subject in the right half, pale wall and empty bench to the left. One orange tube rack. 35mm, f/2.8.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## parker-hero

- **Save as:** `public/brands/parker-hero.webp`
- **Spec:** 2000×1125 · 16:9 · WebP ≤ 240 KB
- **Used by:** /brands/parker hero ground
- **Note:** Category, not product — nothing identifiable as a specific manufacturer’s design. Subject right, left half quiet.

```
Wide shot of a stainless filtration skid with sanitary clamps and clear single-use tubing assemblies, right half of frame; left half a plain white cleanroom wall. One orange tubing clamp. 35mm, f/4.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## lonza-hero

- **Save as:** `public/brands/lonza-hero.webp`
- **Spec:** 2000×1125 · 16:9 · WebP ≤ 240 KB
- **Used by:** /brands/lonza hero ground
- **Note:** Category, not product — nothing identifiable as a specific manufacturer’s design. Subject right, left half quiet.

```
Wide shot of a QC microbiology bench: a plate reader with a microplate on its tray, reagent vials and a laptop turned away with a soft-focus screen, right half; left half empty white bench fading to pale wall. One orange tip-box lid. 35mm, f/2.8.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## promicol-hero

- **Save as:** `public/brands/promicol-hero.webp`
- **Spec:** 2000×1125 · 16:9 · WebP ≤ 240 KB
- **Used by:** /brands/promicol hero ground
- **Note:** Category, not product — nothing identifiable as a specific manufacturer’s design. Subject right, left half quiet.

```
Wide shot inside a bright isolator: a compact luminometer reader and two clear sample tubes on brushed steel, gloved hands from a glove port at the right edge; left half of frame the plain white isolator wall. One orange tube cap. 50mm, f/4.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## pmm-hero

- **Save as:** `public/brands/pmm-hero.webp`
- **Spec:** 2000×1125 · 16:9 · WebP ≤ 240 KB
- **Used by:** /brands/pmm hero ground
- **Note:** Category, not product — nothing identifiable as a specific manufacturer’s design. Subject right, left half quiet.

```
Wide shot of stacked agar plates with pale amber media beside an air sampler on a white surface, right half; left half pale wall and soft window light. One orange band on a plate lid. 50mm, f/4, overhead three-quarter angle.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## cpc-biotech-hero

- **Save as:** `public/brands/cpc-biotech-hero.webp`
- **Spec:** 2000×1125 · 16:9 · WebP ≤ 240 KB
- **Used by:** /brands/cpc-biotech hero ground
- **Note:** Category, not product — nothing identifiable as a specific manufacturer’s design. Subject right, left half quiet.

```
Wide shot of an analytical bench: small crimp-capped reagent vials, a quartz cuvette and a spectrophotometer, right half; left half empty white bench. One orange vial cap. 85mm, f/2.8.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## tailin-hero

- **Save as:** `public/brands/tailin-hero.webp`
- **Spec:** 2000×1125 · 16:9 · WebP ≤ 240 KB
- **Used by:** /brands/tailin hero ground
- **Note:** Category, not product — nothing identifiable as a specific manufacturer’s design. Subject right, left half quiet.

```
Wide shot of a stainless-steel aseptic isolator with four glove ports and a glass front, standing in a bright white cleanroom, right half of frame; left half plain wall and floor. One orange indicator light on the isolator panel. 24mm, f/5.6, eye level.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```

## ras-al-khaimah

- **Save as:** `public/locations/ras-al-khaimah.webp`
- **Spec:** 1600×1000 · 3:2 · WebP ≤ 180 KB
- **Used by:** /locations office card — Ras Al Khaimah (HQ)

```
Editorial architectural photograph: modern glass high-rise towers on the coastal corniche of Ras Al Khaimah, UAE, with the pale Hajar mountains behind in soft morning haze. Calm sea in the foreground, pastel sky, low saturation, no people prominent, no text or signage legible. 35mm, f/8, level horizon, quiet and precise. Photorealistic. Avoid: postcard saturation, sunset orange sky, HDR.
```

## dubai

- **Save as:** `public/locations/dubai.webp`
- **Spec:** 1600×1000 · 3:2 · WebP ≤ 180 KB
- **Used by:** /locations office card — Dubai

```
Editorial architectural photograph of Bur Dubai along Dubai Creek in soft morning light: low traditional buildings and wind towers along the water with the modern skyline pale and distant behind, an abra boat mid-creek. Low saturation, hazy pastel sky, no legible signage. 35mm, f/8, level horizon. Photorealistic. Avoid: sunset colours, HDR, crowds.
```

## riyadh

- **Save as:** `public/locations/riyadh.webp`
- **Spec:** 1600×1000 · 3:2 · WebP ≤ 180 KB
- **Used by:** /locations office card — Riyadh

```
Editorial architectural photograph of modern Riyadh, Saudi Arabia, from a wide boulevard in the Al Wurud district: clean sandstone and glass office buildings, palm-lined median, a tall landmark tower pale in the distance under a bright hazy sky. Low saturation, dusty warm light kept neutral, no legible signage, sparse traffic. 35mm, f/8. Photorealistic. Avoid: sunset, HDR, dramatic skies.
```

## cairo

- **Save as:** `public/locations/cairo.webp`
- **Spec:** 1600×1000 · 3:2 · WebP ≤ 180 KB
- **Used by:** /locations office card — Cairo

```
Editorial architectural photograph of a modern district in New Cairo’s First Settlement: pale limestone and glass mid-rise buildings along a wide, quiet street with young trees, the Muqattam hills faint on the horizon under a hazy morning sky. Low saturation, warm light kept neutral, no legible signage. 35mm, f/8, level horizon. Photorealistic. Avoid: pyramids, sunset, HDR, crowds.
```

## hq

- **Save as:** `public/about/hq.webp`
- **Spec:** 2000×1250 · 3:2 · WebP ≤ 240 KB
- **Used by:** /about story
- **Note:** Fallback only — a real photograph of the Ras Al Khaimah office is better if one exists.

```
Interior of a bright, modern office reception for a scientific equipment company: a pale wood reception desk, a white wall with an empty rectangular panel where a logo would sit (blank), a glass partition showing a small demonstration lab with a white bench and an instrument beyond. Morning light from tall windows, calm and uncluttered. One orange accent: a single chair. 24mm, f/5.6.

Editorial laboratory photography for a life-science equipment company. High-key, bright and clean: white and pale-grey surfaces, brushed stainless steel, clear glass, pale blue-grey shadows. Deep navy (#0F2438) appears only in small details — instrument housings, a gown's trim. Exactly one restrained warm-orange accent object in frame (a cap, an indicator light, a clamp) — never more. Shallow depth of field, 35mm or 50mm lens, soft daylight from a side window plus even overhead panels. Unbranded, generic equipment. No visible text, no logos, no readable screens, no watermarks. Photorealistic, calm, uncluttered, editorial.

Avoid: neon, purple or teal sci-fi glow, dark moody lighting, lens flare, crowded benches, cartoon or illustration styles, people looking at camera.
```
