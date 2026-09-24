// Interface strings shared by the header, footer, cards and page chrome, per locale. Page copy lives with each page's
// content (lib/content and lib/content/ar); Arabic chrome text comes from lib/ar.ts.
import type { Locale } from './i18n'
import { arChrome, arCta } from './ar'

type Ui = {
  nav: [string, string][]
  /** Footer list: the nav plus Services, which has no top-level nav slot. */
  footer: [string, string][]
  legal: [string, string][]
  home: string
  breadcrumb: string
  getInTouch: string
  logoLabel: string
  /** Accessible name of the mobile menu button; aria-expanded carries its state. */
  menu: string
  footerBlurb: (markets: string) => string
  rights: string
  offices: string
  explore: string
  exploreCard: string
  viewProfile: string
  hq: string
  switchTo: string
  closing: { title: string; body: string; primary: string; secondary: string }
  contents: string
  lastUpdated: string
  alsoRead: string
  fromBlog: string
}

export const ui: Record<Locale, Ui> = {
  en: {
    nav: [['About', '/about'], ['Solutions', '/solutions'], ['Brands', '/brands'], ['Blog', '/blog'], ['Locations', '/locations'], ['Contact', '/contact']],
    footer: [['About', '/about'], ['Solutions', '/solutions'], ['Services', '/services'], ['Brands', '/brands'], ['Blog', '/blog'], ['Locations', '/locations'], ['Contact', '/contact']],
    legal: [['Privacy Policy', '/privacy'], ['Terms', '/terms'], ['Data Collection', '/data-collection']],
    home: 'Home',
    breadcrumb: 'Breadcrumb',
    getInTouch: 'Get In Touch',
    logoLabel: 'Arab Lab home',
    menu: 'Menu',
    footerBlurb: (markets) => `A trusted partner for Life Science industries across ${markets}.`,
    rights: '© 2026 Arab Lab Scientific Equipment L.L.C.',
    offices: 'Offices',
    explore: 'Explore',
    exploreCard: 'Explore',
    viewProfile: 'View profile',
    hq: 'HQ',
    switchTo: 'العربية',
    closing: { title: 'Talk to a specialist.', body: 'Tell us what the lab needs to measure, make or release. We route every request to the right Arab Lab department.', primary: 'Start a conversation', secondary: 'Browse solutions' },
    contents: 'Contents',
    lastUpdated: 'Last updated',
    alsoRead: 'Also read',
    fromBlog: 'From the blog',
  },
  ar: {
    nav: [['عن الشركة', '/ar/about'], ['الحلول', '/ar/solutions'], ['العلامات التجارية', '/ar/brands'], ['المدونة', '/ar/blog'], ['المواقع', '/ar/locations'], ['تواصل معنا', '/ar/contact']],
    footer: [['عن الشركة', '/ar/about'], ['الحلول', '/ar/solutions'], ['الخدمات', '/ar/services'], ['العلامات التجارية', '/ar/brands'], ['المدونة', '/ar/blog'], ['المواقع', '/ar/locations'], ['تواصل معنا', '/ar/contact']],
    legal: [['سياسة الخصوصية', '/ar/privacy'], ['الشروط والأحكام', '/ar/terms'], ['جمع البيانات', '/ar/data-collection']],
    home: arChrome.home,
    breadcrumb: 'مسار التنقل',
    getInTouch: arChrome.getInTouch,
    logoLabel: arChrome.logoLabel,
    menu: 'القائمة',
    footerBlurb: () => arChrome.footerBlurb,
    rights: arChrome.rights,
    offices: arChrome.offices,
    explore: arChrome.explore,
    exploreCard: 'اعرف المزيد',
    viewProfile: 'عرض الملف',
    hq: 'المقر الرئيسي',
    switchTo: 'English',
    closing: arCta,
    contents: 'المحتويات',
    lastUpdated: 'آخر تحديث',
    alsoRead: 'اقرأ أيضاً',
    fromBlog: 'من المدونة',
  },
}
