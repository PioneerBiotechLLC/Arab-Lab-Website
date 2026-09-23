// schema.org JSON-LD builders. Every value is plain text: review markers are stripped and inline markdown removed,
// so structured data never carries editorial notes. Only content visible on the page is marked up.
import type { BlogPosting, BreadcrumbList, FAQPage, LocalBusiness, Organization, PostalAddress, WebSite, WithContext } from 'schema-dts'
import { absoluteUrl, officeList, site, type Office } from './site'

export const plain = (s: string) => s.replace(/\s*\{\{VERIFY:[^}]*\}\}/g, '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()

export type Crumb = { name: string; href: string }

export function breadcrumbList(items: Crumb[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: plain(item.name), item: absoluteUrl(item.href) })),
  }
}

export function faqPage(faq: { q: string; a: string }[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })),
  }
}

export const organizationId = absoluteUrl('/#organization')
const sameAs = [site.socials.linkedin, site.socials.facebook]
const alternateName = [...site.alternateNames, ...(site.arabicName.verified ? [site.arabicName.value] : [])]

export function postalAddress(office: Office): PostalAddress {
  return {
    '@type': 'PostalAddress',
    streetAddress: office.street,
    addressLocality: office.locality,
    ...(office.region ? { addressRegion: office.region } : {}),
    ...(office.postalCode ? { postalCode: office.postalCode } : {}),
    addressCountry: office.countryCode,
  }
}

/** Distinguishes the company from the ARABLAB / ARABLAB LIVE trade exhibition, which owns plain "arab lab" queries. */
export const disambiguation = `${site.legalName} is a laboratory and pharmaceutical solutions supplier headquartered in Ras Al Khaimah, UAE, with offices in Riyadh and Cairo. It is a company, not the ARABLAB trade exhibition.`

export function organization(): WithContext<Organization> {
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
    description: 'Laboratory, pharmaceutical QC and bioprocess solutions for life science, diagnostics and food and beverage customers in the UAE, Saudi Arabia and Egypt.',
    disambiguatingDescription: disambiguation,
    email: site.email,
    telephone: site.phoneDisplay,
    address: postalAddress(hq),
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', telephone: site.phoneDisplay, email: site.email, areaServed: ['AE', 'SA', 'EG'] },
    location: officeList.map((o) => ({ '@type': 'Place', name: `${site.shortName} ${o.name}`, address: postalAddress(o) })),
    areaServed: ['United Arab Emirates', 'Saudi Arabia', 'Egypt'].map((name) => ({ '@type': 'Country', name })),
    sameAs,
  }
}

export function website(): WithContext<WebSite> {
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

export function localBusiness(office: Office): WithContext<LocalBusiness> {
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

export function blogPosting(post: { title: string; description: string; date: string; updated: string; author: string; lang: string; tags: string[]; category: string; url: string; image: string; words: number }): WithContext<BlogPosting> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: plain(post.title),
    description: plain(post.description),
    datePublished: post.date,
    dateModified: post.updated,
    author: { '@type': 'Organization', name: post.author, url: absoluteUrl('/about') },
    publisher: { '@id': organizationId },
    image: absoluteUrl(post.image),
    mainEntityOfPage: absoluteUrl(post.url),
    url: absoluteUrl(post.url),
    inLanguage: post.lang,
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.words,
  }
}
