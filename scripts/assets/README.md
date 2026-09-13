# Asset pipeline

Generates, reviews and publishes every visual in the asset plan from one manifest.
Ids and filenames follow `lib/site-data.ts`. Logos and staff portraits are never generated.

```
pnpm assets plan                 # prompts → design-src/generated/prompts/*.txt + flow-batch.md (no key needed)
pnpm assets gen                  # 2 candidates per image asset → design-src/generated/candidates/<id>/v<n>.png
pnpm assets gen hero-loop        # Veo clip from the hero still (paid tier)
pnpm assets sheet --open         # contact sheet: candidates shown cropped to their slot
pnpm assets approve dubai=v2 …   # pick → resize/crop → WebP under budget → public/
pnpm assets status               # what is generated, approved, published; sizes vs budget
```

Flags: `--n 3` candidates, `--model gemini-3-pro-image` (or `--pro`), `--size 4K`, `--force` to replace a file in `public/` that this pipeline did not write.

## Keys and models (checked 11 Sep 2026)

- **Google Flow has no public API.** It is the consumer app on a Google AI Pro/Ultra plan; its credits cannot be used from code. The models behind it are on the Gemini API instead.
- **Key:** create one at <https://aistudio.google.com/apikey> and put `GEMINI_API_KEY=…` in `.env.local` (git-ignored). New keys are "auth keys"; older "Standard" keys are rejected from September 2026.
- **Images:** `gemini-3.1-flash-image` (default, has a free tier with daily limits) or `gemini-3-pro-image` (paid, better at 4K). The Imagen API was retired on 17 Aug 2026, so the plan's "Imagen" stills come from these models now. Called through the Interactions API, with `generateContent` as a fallback (`ASSET_IMAGE_API=generateContent` to force it).
- **Video:** `veo-3.1-generate-preview` via `predictLongRunning`, 8 s · 16:9 · 1080p, first frame = the approved hero still. **Paid tier only** — no free Veo calls.
- 16:10 slots (programs, locations, HQ) request 3:2 and are centre-cropped, because the image models don't offer 16:10.

## Without a key

`pnpm assets plan` writes every prompt with the house style already appended. Paste them into Flow, download, and drop the results into
`design-src/generated/candidates/<id>/v1.png` — from there `sheet`, `approve` and `publish` work exactly the same, and you still get
the crop, budget and naming for free.

## Video encoding

`publish` re-encodes the Veo MP4 to H.264 and adds a VP9 `.webm` when `ffmpeg` is installed (`brew install ffmpeg`).
Without it the MP4 is copied as-is and the site uses that alone.

## After files land

Wiring is one pass over the shared components (see section 12 of the plan): `image` prop on `CardLink`/`NumberedCard`, the feature-tile
cover, a `backdrop` prop on `PageShell` for brand pages, city covers on `/locations`, and the hero `<video>` behind the still.

## Partner logos

Masters sit in `design-src/brands/` exactly as each partner supplied them; `pnpm logos` normalises them
into `public/brands/<slug>.webp`. Each output is a 200px-tall transparent canvas exactly as wide as its mark:
the mark is trimmed, scaled to a constant ink area (so a compact mark reads as strongly as a long wordmark),
capped at 170px tall and centred vertically, so one CSS height sizes all seven and each image box is only
as wide as what it shows. Widths land in `lib/brand-logos.json` for the `<Image>` attributes. On the site the
logo *is* the partner's heading; a mark that doesn't spell the name (`mark: 'symbol'` in site-data, currently
Promicol) gets the name set beside it. A mark supplied white-on-transparent is
recoloured to ink, since the site only places logos on white and pale-grey tiles; no other colour is touched.
Re-run it whenever a partner sends an updated file.
