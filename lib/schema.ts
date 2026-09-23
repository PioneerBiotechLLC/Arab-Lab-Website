// schema.org JSON-LD builders. Every value is plain text: review markers are stripped and inline markdown removed,
// so structured data never carries editorial notes. Only content visible on the page is marked up.
import { absoluteUrl, officeList, site, type Office } from './site'

export const plain = (s: string) => s.replace(/\s*\{\{VERIFY:[^}]*\}\}/g, '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()

export type Crumb = { name: string; href: string }

export function breadcrumbList(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: plain(item.name), item: absoluteUrl(item.href) })),
  }
}

export function faqPage(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })),
  }
}

export const organizationId = absoluteUrl('/#organization')
const sameAs = [site.socials.linkedin, site.socials.facebook]
const alternateName = [...site.alternateNames, ...(site.arabicName.verified ? [site.arabicName.value] : [])]

export function postalAddress(office: Office) {
  return {
    '@type': 'PostalAddress',
    streetAddress: office.street,
    addressLocality: office.locality,
    ...(office.region ? { addressRegion: office.region } : {}),
    ...(office.postalCode ? { postalCode: office.postalCode } : {}),
    addressCountry: office.countryCode,
  }
}

export function organization() {
  const hq = officeList.find((o) => o.headquarters)!
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: site.name,
    legalName: site.legalName,
    alternateName,
    url: site.url,
    logo: absoluteUrl(site.logo),
    email: site.email,
    telephone: site.phoneDisplay,
    address: postalAddress(hq),
    areaServed: ['United Arab Emirates', 'Saudi Arabia', 'Egypt'].map((name) => ({ '@type': 'Country', name })),
    sameAs,
  }
}

export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: site.name,
    alternateName,
    url: site.url,
    inLanguage: 'en',
    publisher: { '@id': organizationId },
  }
}

export function localBusiness(office: Office) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': absoluteUrl(`/locations/${office.slug}#office`),
    name: `${site.name} — ${office.name}`,
    image: absoluteUrl(site.logo),
    url: absoluteUrl(`/locations/${office.slug}`),
    telephone: site.phoneDisplay,
    email: site.email,
    address: postalAddress(office),
    parentOrganization: { '@id': organizationId },
    areaServed: { '@type': 'Country', name: office.countryCode === 'AE' ? 'United Arab Emirates' : office.country },
  }
}
