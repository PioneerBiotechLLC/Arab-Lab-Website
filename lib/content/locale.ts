// One lookup for everything a page view needs in a given locale. English comes from lib/site-data.ts and
// lib/content/*; Arabic from lib/content/ar/*, joined to the same slugs and ids so structure lives in one place.
import type { Locale } from '../i18n'
import { brands, company, departments, leadership, markets, programs, solutions, type Brand } from '../site-data'
import { arAddresses, arCountries, arOfficeNames } from '../ar'
import type { Office } from '../site'
import { brandContent, type BrandContent } from './brands'
import { solutionContent, type SolutionContent } from './solutions'
import { serviceContent, servicesHubSeo, type ServiceContent } from './services'
import { legalDocs, type LegalDoc } from '../legal'
import { brandSeo, pageSeo, type PageSeo } from '../seo-pages'
import { enPages, type PagesCopy } from './pages'
import { arBrandText, arCompany, arDepartments, arLeadership, arPrograms, arSolutions } from './ar/site-data'
import { arBrandContent, arBrandSeo } from './ar/brands'
import { arSolutionContent } from './ar/solutions'
import { arServiceContent, arServicesHubSeo } from './ar/services'
import { arLegalDocs, arLegalSeo } from './ar/legal'
import { arPageSeo, arPages } from './ar/pages'

type Program = (typeof programs)[number]
type Solution = (typeof solutions)[number]
type Department = { key: string; name: string; roles: string[] }

export type LocaleData = {
  locale: Locale
  company: { name: string; positioning: string; mission: string; heritage: string; affiliation: string; groupFounded: string }
  programs: Program[]
  solutions: Solution[]
  brands: Brand[]
  departments: Department[]
  leadership: { name: string; role: string; note: string }
  markets: string[]
  officeName: (office: Office) => string
  officeAddress: (office: Office) => string
  country: (country: string) => string
  brandContent: Record<string, BrandContent>
  brandSeo: (brand: Brand) => PageSeo
  solutionContent: SolutionContent[]
  serviceContent: ServiceContent[]
  servicesHubSeo: PageSeo
  legalDocs: LegalDoc[]
  legalSeo: (slug: string) => { title: string; description: string; ogAlt: string }
  pageSeo: (path: '/about' | '/solutions' | '/brands') => PageSeo
  pages: PagesCopy
}

const en: LocaleData = {
  locale: 'en',
  company,
  programs,
  solutions,
  brands,
  departments: departments.map((d) => ({ key: d.name, ...d })),
  leadership,
  markets,
  officeName: (o) => o.name,
  officeAddress: (o) => o.address,
  country: (c) => c,
  brandContent,
  brandSeo,
  solutionContent,
  serviceContent,
  servicesHubSeo,
  legalDocs,
  legalSeo: (slug) => pageSeo[`/${slug}` as '/privacy'],
  pageSeo: (path) => pageSeo[path],
  pages: enPages,
}

const ar: LocaleData = {
  locale: 'ar',
  company: { ...arCompany, groupFounded: company.groupFounded },
  programs: programs.map((p) => ({ ...p, ...arPrograms[p.id] })),
  solutions: solutions.map((s) => ({ ...s, ...arSolutions[s.id] })),
  brands: brands.map((b) => ({ ...b, ...arBrandText[b.slug] })),
  departments: departments.map((d) => ({ key: d.name, ...arDepartments[d.name] })),
  leadership: arLeadership,
  markets: markets.map((m) => arCountries[m] ?? m),
  officeName: (o) => arOfficeNames[o.name] ?? o.name,
  officeAddress: (o) => arAddresses[o.slug] ?? o.address,
  country: (c) => arCountries[c] ?? c,
  brandContent: arBrandContent,
  brandSeo: (brand) => ({ ...arBrandSeo[brand.slug], ogAlt: `مورّد ${brand.name} في الإمارات والسعودية ومصر — عرب لاب`, card: brandSeo(brand).card }),
  solutionContent: arSolutionContent,
  serviceContent: arServiceContent,
  servicesHubSeo: arServicesHubSeo,
  legalDocs: arLegalDocs,
  legalSeo: (slug) => arLegalSeo[slug],
  pageSeo: (path) => arPageSeo[path],
  pages: arPages,
}

export const localeData = (locale: Locale): LocaleData => (locale === 'ar' ? ar : en)
