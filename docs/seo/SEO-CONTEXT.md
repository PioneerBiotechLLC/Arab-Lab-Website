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

All phases are complete on branch `seo-overhaul` (not pushed, not deployed).

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
12. Home H1 is "Scientific & Laboratory Equipment Supplier in the UAE, Saudi Arabia & Egypt", set small above the slogan; the slogan became a `<p>` with the same classes, so its size and wipe animation are unchanged.
13. Brand H1 is the logo (alt = brand name) followed by the text line "Supplier in the UAE, Saudi Arabia & Egypt", so the heading reads "[Brand] Supplier in…" without repeating the name visually.
14. Brand copy beyond the partner decks is in `lib/content/brands.ts`. Portfolio categories describe each manufacturer's public range, not Arab Lab stock; FAQs avoid distributor-status claims and invite availability checks instead.
15. Review markers: `{{VERIFY: …}}` in content renders as a visible highlight (`Rich` in `components/content.tsx`) and is stripped from JSON-LD. `pnpm build` runs `scripts/seo/verify-markers.ts` first; on Vercel production it fails while markers remain in published content (drafts excluded; override `SEO_ALLOW_VERIFY=1`). `pnpm seo:verify` lists them.
16. Breadcrumbs (visible + BreadcrumbList) come from the `breadcrumbs` prop on `PageShell`. FAQs render through `FaqList`, which emits FAQPage for exactly the questions shown. Note: Google shows FAQ rich results only for a few authoritative sites since 2023, so FAQPage mainly helps other engines and AI answers.
17. Solution pages (`/solutions/[slug]`, 665–870 words) and service pages (`/services/[slug]`, 500–670 words) render from `lib/content/solutions.ts` and `lib/content/services.ts`. A small `/services` hub was added so service breadcrumbs have a parent. `solutions` and `programs` in site-data gained a `slug`; their `id` stays as the `/solutions#…` anchor and asset name.
18. `/solutions` keeps every section and anchor; each card gained a "Read the full guide" link. Home, `/brands` and brand pages now link to the dedicated solution and service pages instead of anchors. The footer lists Services.
19. Service copy states Arab Lab facts only (departments, offices, the four service lines as worded on the site). Turnkey and consulting scope is described generally and "agreed per engagement", with no claims about past projects or approvals.
20. Office pages (`/locations/[slug]`, 370–395 words) render from `lib/content/locations.ts`; each carries market-specific copy (HQ heritage, SFDA, EDA) so the three pages are not near-duplicates. `/locations` stays the hub; its cards, the footer, the office tiles and brand pages now link to the office pages.
21. Maps are click-to-load (`components/office-map.tsx`): no request reaches Google until "Show map" is pressed (verified: 0 requests before, map loads after). This keeps the privacy pages true; both now mention the map. Swap to an always-on `loading="lazy"` iframe only together with a privacy-page update.
22. Structured data (`lib/schema.ts`, typed with `schema-dts`): Organization on every page from the root layout, with `disambiguatingDescription` ("a company, not the ARABLAB trade exhibition"), `legalName`, `alternateName`, HQ address, contact point, the three offices and `sameAs`; WebSite on the home page (site-name signal); LocalBusiness on each office page; BreadcrumbList on all inner pages; FAQPage wherever a FAQ is visible; BlogPosting on posts (Phase 7). The About page gained a 4-question FAQ that answers the ARABLAB name clash. Schema text is plain: markers and inline markdown are stripped.
23. Validation: `pnpm seo:audit` parses every JSON-LD block and checks required fields per type (Organization name/url/logo, LocalBusiness address, BreadcrumbList positions and URLs, FAQPage Q&A, BlogPosting headline/date/author/image). Run Google's Rich Results Test on the live URLs after deploy.
24. Blog: MDX in `content/blog/{en,ar}/`, loaded by `lib/blog.ts` (gray-matter frontmatter, validated), rendered by `components/mdx.tsx` (`@mdx-js/mdx` with GFM tables and heading ids). Routes: `/blog`, `/blog/[slug]`, `/blog/category/[category]`, `/blog/rss.xml`; Arabic at `/ar/blog` (Phase 8). Only `status: published` posts are built in production, listed, put in the sitemap and RSS; `pnpm dev` also serves drafts with a banner. Until the first post is published, `/blog` shows an empty state, is noindex and is absent from the sitemap and footer.
25. Frontmatter additions beyond the brief: `faq` (rendered as the visible FAQ and FAQPage, so schema always matches the page) and optional `seoTitle` (≤49 chars; post titles are often longer than a 60-char title tag allows).
26. Posts were drafted with AI assistance for the technical team to review; the author is "Arab Lab Technical Team" and the author box describes the team, not a writing process. Every specific technical, numeric or regulatory claim carries a marker (72 across drafts).
27. `pnpm seo:blog` checks each post: 1,200–1,800 words (Arabic ≥900), keyword terms in title, first 100 words and an H2, FAQ ≥3, ≥2 solution/brand links, seoTitle ≤49, description ≤155. All 14 pass. Verified the published path by publishing two posts in a test build: sitemap, RSS, BlogPosting/FAQPage/BreadcrumbList and footer link all appeared; reverted to draft.
28. Arabic: see the i18n section below. Arabic posts link to English solution and brand pages, since those have no Arabic versions yet. Chapter references such as "USP <71>" are wrapped in `<bdi>` so they keep their order inside Arabic text; phone numbers, emails and English addresses are set `dir="ltr"`.

## VERIFY items

Full per-claim list with file and line: [`VERIFY.md`](VERIFY.md) (regenerate with `node scripts/seo/verify-markers.ts --md docs/seo/VERIFY.md`; `pnpm seo:verify` prints it).

**Site facts and published pages** (no markers remain on published pages; confirm these off-page facts when you can):
- `/services/pharmaceutical-consultant`: resolved at merge by leaving the neutral wording "the federal authority in the UAE" and removing the marker. To name the body (MOHAP or the Emirates Drug Establishment), confirm it first.
- Official Arabic name (عرب لاب?). Kept out of schema until verified (`site.arabicName.verified`).
- Brand titles and pages say each partner is supplied across the UAE, Saudi Arabia and Egypt (the brief's own pattern). Confirm territory coverage per brand.
- CPC Biotech: the partner deck says "ready-to-use microbiological soils" (likely Italian *terreni*, i.e. culture media). Site copy says "microbiological media"; confirm the English term.
- Office phone numbers: office pages and LocalBusiness use the main number +971 7 208 1908. Confirm whether Riyadh and Cairo have local numbers.
- Opening hours per office (Google Business Profile and LocalBusiness `openingHours`); none stated yet.
- Arabic office addresses in `lib/ar.ts` are renderings of the English addresses; confirm the official Arabic spellings.

**Draft blog posts** (76 markers; drafts never block builds): pharmacopoeia chapter wording and dates (USP <71>, <85>, <1223>, Ph. Eur. 2.6.1, 2.6.14, 2.6.30, 2.6.32, 5.1.6), numeric parameters (incubation temperatures, endotoxin limits, spike recovery, filter challenge levels, pipetting angles and depths, scaling safety factors), EU GMP Annex 1 clauses (PUPSIT, EM limits), ISO 8655 and ISO 14644 references, and every regulator role, system name and pathway in the UAE, Saudi Arabia and Egypt. The regulatory overview post alone carries 13.

## i18n: what was built and the proposed next step

**Built (smallest non-breaking approach):** `app/ar/` with a nested layout (`lang="ar" dir="rtl"`, IBM Plex Sans Arabic, not preloaded on English pages). The shared header and footer switch to Arabic labels and RTL on `/ar` paths and show an English/العربية switcher where a counterpart exists. Arabic pages: `/ar`, `/ar/contact`, `/ar/locations` (+3 offices), `/ar/blog` (+ posts). Copy lives in `lib/ar.ts`. Social cards reuse the English card for each page, because the OG renderer cannot shape Arabic script.

**Gate:** `ARABIC_APPROVED` in `lib/i18n.ts` (or `AR_APPROVED=1`). Until approved, Arabic pages are noindex, show a review banner, are absent from the sitemap, carry no hreflang, and the switcher is hidden (visible in `pnpm dev`). Verified both states: gated build has zero Arabic URLs in the sitemap and no hreflang; approved build emits reciprocal en/ar/x-default for 6 page pairs in both page heads and the sitemap, and `/ar` becomes indexable with a self-canonical.

**Known limitation:** server-rendered `<html lang>` stays `en` on `/ar` pages; a client effect corrects it after hydration, and every Arabic region carries `lang="ar"`. Google relies on hreflang, not `<html lang>`, so ranking impact is small; Bing and screen readers benefit from the server value.

**Proposed next step (needs your approval, because it moves files):** two root layouts via route groups, `app/(en)/layout.tsx` and `app/(ar)/ar/layout.tsx`, each rendering its own `<html lang dir>`. Every existing page folder moves under `app/(en)/` with no URL change. Then translate the remaining pages (about, solutions, services, brands) into `app/(ar)/ar/…`, and add their hreflang pairs to `arPaths`.

## Manual off-site checklist

1. **Search Console and Bing Webmaster Tools.** Add the site, put the tokens in `NEXT_PUBLIC_GSC_VERIFICATION` / `NEXT_PUBLIC_BING_VERIFICATION` on Vercel, redeploy, verify, then submit `https://www.arablab-scientific.com/sitemap.xml` in both.
2. **Google Business Profile** for each office (Ras Al Khaimah HQ, Riyadh, Cairo): exact name "Arab Lab Scientific Equipment", the address as on the office page, phone, hours, category (e.g. laboratory equipment supplier), website URL pointing to that office page, photos.
3. **Client reviews.** Ask satisfied customers to review each Business Profile; reply to every review.
4. **Facebook page:** set the website field to `https://www.arablab-scientific.com` (www, https) and align name, address and phone.
5. **NAP consistency** on LinkedIn, Facebook, ZoomInfo and the UAE International Investors Council listing: same legal name, HQ address, +971 7 208 1908, and the www URL.
6. **Partner backlinks.** Ask Eppendorf, Parker, Lonza, Promicol, PMM, CPC Biotech and Tailin to list Arab Lab on their distributor or "where to buy" pages, linking to the matching `/brands/[slug]` page.
7. **ARABLAB LIVE exhibitor listing** (if exhibiting): use the full name "Arab Lab Scientific Equipment" and link to the site, which helps separate the company from the event.
8. **Host redirect.** At Vercel/DNS, make `http://arablab-scientific.com` go straight to `https://www.arablab-scientific.com` in one hop (it currently takes two).
9. **Before merging:** resolve published-page markers, review drafts you want live (set `status: published`), native review of Arabic (then set `ARABIC_APPROVED = true` and `needsNativeReview: false` on approved posts), and run `pnpm build`, `pnpm seo:audit`, `pnpm seo:blog`.
10. **After deploy:** run Google's Rich Results Test on the home, an office, a brand and a published post; watch Search Console coverage for the new URLs.

## Reports

- [`AUDIT.md`](AUDIT.md): every built page with target keyword, title, description, H1, word count, schema types, robots and issues (`pnpm seo:audit --md docs/seo/AUDIT.md` after a build).
- [`VERIFY.md`](VERIFY.md): every review marker by file and line.
- [`BLOG-CALENDAR.md`](BLOG-CALENDAR.md): the next 12 posts.

## Commands

| Command | What it does |
|---|---|
| `pnpm build` | Lists VERIFY markers, then builds; fails on Vercel production if a marker is in published content |
| `pnpm seo:audit` | Audits the last build (add `--md docs/seo/AUDIT.md` to write the report) |
| `pnpm seo:blog` | Checks every post against the brief |
| `pnpm seo:verify` | Lists every review marker |
| `pnpm exec tsc --noEmit` | Type check (the build skips it) |

## Changelog

- 2026-09-23 · Phase 0 · Branch `seo-overhaul` created; discovery; this file.
- 2026-09-23 · Phase 1 · `lib/site.ts`, www everywhere, canonicals, apex 301, sitemap, robots, verification tags, alt text, audit script.
- 2026-09-23 · Phase 2 · Unique titles/descriptions on all 16 routes (all within 60/155), per-page OG title/description/card/alt.
- 2026-09-23 · Phase 3 · Keyword H1 on home; brand pages expanded to 560–670 words with categories, applications, fit, availability and FAQ; breadcrumbs on all inner pages; heading-order and word-count checks; production marker guard.
- 2026-09-23 · Phase 4 · 6 solution pages, 4 service pages, `/services` hub; internal links re-pointed; `/solutions` kept as hub with anchors.
- 2026-09-23 · Phase 5 · Office pages for Ras Al Khaimah, Riyadh, Cairo with click-to-load maps; hub and footer link to them; privacy pages mention the map.
- 2026-09-23 · Phase 6 · Organization (site-wide), WebSite (home), LocalBusiness (offices); About FAQ for the ARABLAB disambiguation; schema-dts typing.
- 2026-09-23 · Phase 7 · MDX blog with RSS and categories; 10 EN drafts (1,204–1,397 words) and 4 AR drafts; `BLOG-CALENDAR.md` with 12 more posts.
- 2026-09-23 · Phase 8 · `/ar` home, contact, locations (+3), blog behind an approval gate; RTL header/footer; reciprocal hreflang when approved; off-site checklist; AUDIT.md and VERIFY.md.
- 2026-09-23 · Merge · Removed the one on-page marker (UAE authority kept as "the federal authority in the UAE"); merged `seo-overhaul` into `main`.
