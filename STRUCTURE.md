# Arab Lab — Site Structure

Next.js 16 (App Router, Turbopack) marketing site for Arab Lab Scientific Equipment L.L.C.

## Routes

| Path | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Homepage: hero, process steps, industries, brand grid, regional coverage, CTA |
| `/about` | `app/about/page.tsx` | Company story + department grid |
| `/solutions` | `app/solutions/page.tsx` | Four capability areas (pharma, food, project, consultant) |
| `/brands` | `app/brands/page.tsx` | Grid of all partner brands |
| `/brands/[slug]` | `app/brands/[slug]/page.tsx` | Individual brand profile (statically generated per brand) |
| `/locations` | `app/locations/page.tsx` | Office cards (RAK, Dubai, Riyadh, Cairo) |
| `/contact` | `app/contact/page.tsx` | Quote request form, service form, direct contact links |

`app/layout.tsx` is the root layout: loads fonts (Inter, Poppins, IBM Plex Mono), sets metadata/viewport, and mounts Vercel Analytics in production.

## Shared UI (`components/site.tsx`)

Every page is composed from a small set of building blocks:

- **`Logo`** — icon + wordmark, optional subtitle (`full`)
- **`SiteHeader`** — sticky nav bar with mobile menu toggle
- **`SiteFooter`** — logo blurb, offices list, nav links
- **`PageShell`** — wraps a page: header + hero band (eyebrow/title/intro) + children + footer. Used by every page except the homepage, which hand-rolls its own hero.
- **`PageSection`** — a bordered, full-width section with standard container padding (`px-5 lg:px-8 py-20 lg:py-28`)
- **`SectionIntro`** — eyebrow + heading (+ optional paragraph), used to open a `PageSection`
- **`CardLink`** — bordered link card (eyebrow, title, body, "Explore" CTA) used for industries/solutions
- **`ConnectorLine`** — horizontal (desktop) / vertical (mobile) timeline used for both the "how we work" steps and the offices summary on the homepage

`components/ui/button.tsx` is the shadcn-style `Button`, built on `@base-ui/react/button`. It translates the shadcn `asChild` convention into base-ui's `render` prop so `<Button asChild><Link .../></Button>` works.

## Data (`lib/site-data.ts`)

Static content arrays consumed by multiple pages/components:

- `brands` — name, slug, description (drives `/brands`, `/brands/[slug]`, and the homepage brand grid)
- `offices` — name, short label, address (drives `/locations` and the homepage regional-coverage timeline)
- `processNodes` — title/description steps for the homepage "how we work" timeline

## Styling

- Tailwind v4 via `app/globals.css`, theming through CSS variables (`--navy-0/1/2`, `--orange`, `--amber`, `--mist`, etc.) mapped into Tailwind's `@theme inline`.
- Dark-only design (`color-scheme: dark`), navy background with orange/amber accents.
- Fonts: `font-heading` (Poppins) for headings/buttons, default sans (Inter) for body text, `font-mono` (IBM Plex Mono) for the small uppercase "eyebrow" labels (`.label` utility class, `text-[10px] tracking-[0.16em] uppercase`).
- Layout scale used consistently across pages: container padding `px-5 lg:px-8`, section padding `py-20 lg:py-28`, card padding `p-7`, card grid gaps `gap-5`, two-column section gaps `gap-12`.

## Conventions

- Pages are server components by default; only components needing interactivity (`SiteHeader` for the mobile menu, `ContactForm` for form state) are `'use client'`.
- Route content is composed almost entirely from the shared building blocks above — new pages should reuse `PageShell` / `PageSection` / `SectionIntro` / `CardLink` rather than hand-rolling markup, to keep spacing and typography consistent.
