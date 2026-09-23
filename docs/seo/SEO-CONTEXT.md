# SEO context — Arab Lab website

Read this file first in any SEO session. It is the source of truth; keep it short and factual.

## Site facts

| Fact | Value |
|---|---|
| Legal name | Arab Lab Scientific Equipment L.L.C. |
| Brand | Arab Lab |
| Alternate names | ArabLab, Arab Lab Scientific, عرب لاب `{{VERIFY: official Arabic name}}` |
| Canonical domain | https://www.arablab-scientific.com (www) |
| Email / phone | info@arablab-scientific.com · +971 7 208 1908 |
| HQ | 408, Julphar Tower, Al Hisn Road, Ras Al Khaimah, UAE |
| Riyadh | 3808 Al Urubah Rd, Al Wurud, Riyadh 12252, Saudi Arabia |
| Cairo | 87, Dar Masr, Al Kronfel, First Settlement, Cairo, Egypt |
| Service lines | Pharma & Biotech · Food & Beverage · Project (turnkey) · Pharmaceutical Consultant (regulatory + turnkey) |
| Partner brands | Eppendorf, Parker, Lonza, Promicol, PMM, CPC Biotech, Tailin |
| Social | LinkedIn ae.linkedin.com/company/arab-lab-scientific · Facebook facebook.com/p/ARAB-LAB-Scientific-Equipment-LLC-100068891799728/ |
| Disambiguation | Plain "arab lab" in Google means the ARABLAB LIVE trade show. Always say "Arab Lab Scientific Equipment" in titles, H1s and schema. |

## Codebase map (for future sessions)

- Next.js 16.3 App Router, React 19.2, Tailwind v4 tokens in `app/globals.css`, pnpm. `next.config.mjs` has `typescript.ignoreBuildErrors: true`, so run `pnpm exec tsc --noEmit` separately.
- No ESLint is installed; `pnpm lint` is not configured.
- Content data: `lib/site-data.ts` (company, offices, brands, solutions, programs). Site constants: `lib/site.ts` (from Phase 1).
- Shared UI: `components/site.tsx` (client). Every inner page uses `PageShell`.
- Legal pages: `lib/legal.ts` + `components/legal.tsx`.
- Contact form posts to `app/api/contact/route.ts` (Resend + spam guard in `lib/contact-guard.ts`).

## Plan

| Phase | Scope |
|---|---|
| 0 | Discovery, this file |
| 1 | `lib/site.ts`, www everywhere, canonicals, apex→www 301, sitemap, robots, GSC tag, image alt audit |
| 2 | Unique title/description/OG per route (`generateMetadata` for dynamic routes) |
| 3 | Keyword H1 on home, one H1 per page, expanded brand pages with FAQ, breadcrumbs, internal links |
| 4 | `/solutions/[slug]` ×6, `/services/[slug]` ×4 (+ `/services` hub); `/solutions` stays as hub with anchors |
| 5 | `/locations/[slug]` ×3; `/locations` stays as hub |
| 6 | JSON-LD: Organization, WebSite, LocalBusiness, BreadcrumbList, FAQPage, BlogPosting |
| 7 | MDX blog (en + ar), RSS, 10 EN drafts, 4 AR drafts, blog calendar |
| 8 | `/ar` for home, blog, contact, locations; off-site checklist |

## Keyword map

| Page | Primary keyword | Secondary keywords |
|---|---|---|
| `/` | Arab Lab Scientific Equipment | Arab Lab UAE, Arab Lab RAK, laboratory equipment supplier UAE, scientific equipment Saudi Arabia, lab equipment Egypt |
| `/about` | Arab Lab Scientific Equipment company | Arab Lab Ras Al Khaimah, life science solutions UAE, GEO-Science group |
| `/solutions` | laboratory solutions UAE | pharmaceutical QC solutions, microbiology testing Middle East |
| `/solutions/rapid-sterility-testing` | rapid sterility testing | rapid sterility testing UAE, ATP bioluminescence sterility test, sterility test isolator |
| `/solutions/endotoxin-testing` | endotoxin testing | endotoxin testing Saudi Arabia, LAL test, recombinant Factor C, bioprocessing media |
| `/solutions/process-filtration-single-use` | sterile filtration pharmaceutical | single-use bioprocessing, mycoplasma removal filter, bioprocess filtration UAE |
| `/solutions/liquid-handling-bioprocess` | liquid handling equipment UAE | Eppendorf pipettes UAE, bioreactors, bioprocess equipment Middle East |
| `/solutions/pharmaceutical-culture-media` | pharmaceutical culture media | environmental monitoring media, settle plates, contact plates, sterility test media |
| `/solutions/enzymatic-qc-reagents` | enzymatic QC reagents | analytical enzymes, β-lactamase, food QC enzymes |
| `/services` | laboratory services UAE | lab solutions Saudi Arabia, lab solutions Egypt |
| `/services/pharma-biotech` | pharma and biotech lab solutions UAE | bioprocess equipment UAE, pharmaceutical QC equipment |
| `/services/food-beverage` | food testing lab equipment UAE | food QC laboratory, beverage testing equipment |
| `/services/turnkey-projects` | turnkey laboratory project UAE | lab design and fit-out, cleanroom lab setup |
| `/services/pharmaceutical-consultant` | pharmaceutical regulatory consultant Saudi Arabia | pharmaceutical consultant UAE, product registration Egypt |
| `/brands` | laboratory brands supplier UAE | life science brands Middle East |
| `/brands/[slug]` | [Brand] supplier UAE | [Brand] Saudi Arabia, [Brand] Egypt, [Brand] distributor Middle East |
| `/locations` | Arab Lab offices | Arab Lab UAE, Arab Lab Saudi Arabia, Arab Lab Egypt |
| `/locations/ras-al-khaimah` | Arab Lab Ras Al Khaimah | Arab Lab RAK, lab equipment supplier Ras Al Khaimah |
| `/locations/riyadh` | Arab Lab Riyadh | lab equipment supplier Riyadh, scientific equipment Saudi Arabia |
| `/locations/cairo` | Arab Lab Cairo | lab equipment supplier Egypt, scientific equipment Cairo |
| `/contact` | contact Arab Lab | lab equipment quote UAE, laboratory service request |
| `/blog` | laboratory insights | pharma QC articles, microbiology testing guides |
| `/ar` | عرب لاب | أجهزة مختبرات الإمارات، معدات مختبرات السعودية، أجهزة مختبرات مصر |
| `/ar/contact` | تواصل مع عرب لاب | عرض سعر أجهزة مختبرات |
| `/ar/locations` (+3) | مكاتب عرب لاب | عرب لاب رأس الخيمة، عرب لاب الرياض، عرب لاب القاهرة |
| `/ar/blog` | مقالات المختبرات | اختبار العقم السريع، اختبار الإندوتوكسين |

Blog post keywords are listed in each post's frontmatter (`targetKeyword`).

## Decisions

1. `pnpm build` is used where the brief says `npm run build`; the repo is a pnpm project.
2. Titles are capped at 60 characters even where the brief's example is longer (the home example is 70).
3. `lib/site.ts` is the single source for URL, names, phone, offices (structured addresses) and socials. `lib/site-data.ts` derives `contact` and `offices` from it. Phone display is now `+971 7 208 1908` for NAP consistency.
4. `metadataBase` is always the www host. Vercel serves previews with `X-Robots-Tag: noindex`, so previews never compete.
5. Canonicals are set per page through `pageMetadata()` in `lib/seo.ts`. None is set in the root layout, because children would inherit it.
6. Apex→www: Vercel already answers 308 on the apex. An app-level 301 in `next.config.mjs` is the backstop (verified locally). `http://arablab-scientific.com` currently takes two hops (http→https apex→www); fix at the host so it is one.
7. The contact form moved unchanged to `components/contact-form.tsx` so `/contact` can be a server component with metadata. It takes a `copy` prop for Arabic. Nothing was removed.
8. Alt text: logo mark now "Arab Lab Scientific Equipment logo" (its link keeps `aria-label`, so the accessible name is unchanged); brand logos always carry the brand name, and Promicol's visible name is `aria-hidden` so it is announced once; the hero photo has a descriptive alt. The hero stays a `<picture>` for art direction. `images.unoptimized` is on, so `next/image` emits one `src` and `sizes`/`srcset` do not apply; the asset pipeline pre-sizes files.
9. `lib/routes.ts` lists every indexable route; the sitemap and the audit read it. `pnpm seo:audit` (after `pnpm build`) checks titles, descriptions, H1s, canonicals, OG images, hreflang, JSON-LD and the sitemap.
10. Search copy (title, description, OG alt, card text) lives in `lib/seo-pages.ts`. The root layout sets the template `%s | Arab Lab`; home, about, locations and contact use absolute titles so the brand name leads without repeating.
11. Per-page social cards: each route segment has an `opengraph-image.tsx` (and a `twitter-image.tsx` re-export) rendered by `lib/og.tsx`, so every page has its own card and alt text. Dynamic routes use `generateImageMetadata` for per-item alt. Home keeps `app/opengraph-image.tsx`.

## VERIFY items

- Brand titles and pages say each partner is supplied across the UAE, Saudi Arabia and Egypt (the brief's own pattern). Confirm territory coverage per brand.
- CPC Biotech: the partner deck says "ready-to-use microbiological soils" (likely Italian *terreni*, i.e. culture media). Meta copy says "microbiological media"; confirm the English term.

- Official Arabic name (عرب لاب?). Kept out of schema until verified (`site.arabicName.verified`).

## Manual off-site checklist

Filled in during Phase 8. Collected so far:
- Set `NEXT_PUBLIC_GSC_VERIFICATION` (and optionally `NEXT_PUBLIC_BING_VERIFICATION`) on Vercel, then verify and submit `/sitemap.xml`.
- At Vercel/DNS, make `http://arablab-scientific.com` redirect straight to `https://www.arablab-scientific.com` in one hop.

## Changelog

- 2026-09-23 · Phase 0 · Branch `seo-overhaul` created; discovery; this file.
- 2026-09-23 · Phase 1 · `lib/site.ts`, www everywhere, canonicals, apex 301, sitemap, robots, verification tags, alt text, audit script.
- 2026-09-23 · Phase 2 · Unique titles/descriptions on all 16 routes (all within 60/155), per-page OG title/description/card/alt.
