// Legal pages. Every statement here describes what the site actually does today (see app/api/contact/route.ts,
// app/layout.tsx and the absence of any cookie or storage code) and uses only company facts from site-data.
// Points marked "confirm" in the summary to the client are commercial/legal choices, not facts about the code.

import { company, contact, offices } from './site-data'

export type Block =
  | string
  | { list: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string }

export type LegalSection = { id: string; title: string; blocks: Block[] }
export type LegalDoc = { slug: string; title: string; intro: string; updated: string; sections: LegalSection[] }

const updated = '21 September 2026'
const hq = offices[0]
const email = `[${contact.email}](mailto:${contact.email})`
const postal = `${company.name}, ${hq.address}`

export const privacy: LegalDoc = {
  slug: 'privacy',
  title: 'Privacy Policy',
  intro: 'How Arab Lab handles the personal information you share with us through this website, and the choices you have.',
  updated,
  sections: [
    { id: 'who', title: 'Who we are', blocks: [
      `${company.name} ("Arab Lab", "we") operates this website. Our head office is at ${hq.address}. For anything in this policy, write to ${email}.`,
      'This policy covers the website only. Information you exchange with us by email, by phone or in person during a commercial relationship is handled under the contract or quotation that governs that relationship.',
    ] },
    { id: 'what', title: 'What we collect', blocks: [
      'Most of this site can be read without giving us anything. We collect personal information in three situations:',
      { list: [
        '**When you send a quote request.** Your name, company and work email address, the brand or product you are asking about, a quantity, and the office you would prefer to deal with.',
        '**When you send a service request.** Your name, company and work email address, and your description of the issue or service need. Please do not include personal information about other people in that description.',
        '**When you contact us directly.** If you email or call using the details on the site, we receive whatever you choose to send, along with your email address or phone number.',
      ] },
      'We do not ask for payment details, identity documents or account passwords anywhere on this site, and there is no user registration.',
    ] },
    { id: 'automatic', title: 'What is collected automatically', blocks: [
      'The website is hosted on Vercel. Like any web host, Vercel records standard server logs when a page is requested, which include your IP address, browser type and the page requested. These logs are used for security and to keep the service running.',
      'The site uses Vercel Web Analytics to understand which pages are read. It records aggregated page views and referrers and does not use cookies. Visits are counted with a short-lived hash, not a persistent identifier, and we cannot use it to identify an individual visitor.',
      'Fonts and all other assets are served from our own deployment, so viewing the site does not send requests to third-party font or advertising networks.',
    ] },
    { id: 'cookies', title: 'Cookies and local storage', blocks: [
      'This website does not set cookies of its own and does not store anything in your browser\'s local storage. There is no cookie banner because there is nothing to consent to.',
      'Your browser may tell us about preferences such as reduced motion or high contrast, which we use to adjust the presentation of the page in the moment. These preferences are not recorded.',
    ] },
    { id: 'why', title: 'Why we use it', blocks: [
      { list: [
        'To answer your enquiry and prepare a quotation or a service response, which is the reason you gave us the information.',
        'To route your request to the right Arab Lab office and department.',
        'To keep a record of enquiries and the follow-up they received, as part of ordinary business records.',
        'To keep the website secure and to understand, in aggregate, how it is used.',
      ] },
      'We do not use your information for automated decision-making, profiling, or advertising, and we do not sell it.',
    ] },
    { id: 'sharing', title: 'Who sees it', blocks: [
      { list: [
        '**Arab Lab staff** in the office and department that handle your request.',
        '**Our hosting and infrastructure provider**, Vercel, which processes data on our behalf to run the website.',
        '**Our email delivery provider**, Resend, which carries each form submission from the website to our inbox as an email and keeps a delivery log on our behalf.',
        '**A partner manufacturer**, only where your enquiry requires their input on a specific product and only the details needed for that purpose. We will tell you when this applies.',
        '**Authorities or advisers**, where the law requires it or where it is needed to establish or defend a legal claim.',
      ] },
      'Arab Lab operates from the United Arab Emirates, Saudi Arabia and Egypt. Your enquiry may be handled in whichever of these offices is best placed to respond, and our hosting provider may process data outside the country you are in. Where personal data crosses borders we rely on the safeguards available under the applicable data protection law.',
    ] },
    { id: 'retention', title: 'How long we keep it', blocks: [
      'We keep enquiry details for as long as we need them to respond to you and follow up, and afterwards for the period required by our business and record-keeping obligations. Server logs and analytics are kept for the retention period applied by our hosting provider and are not extended by us.',
      'You can ask us to delete your enquiry earlier, and we will do so unless we are required to keep it.',
    ] },
    { id: 'rights', title: 'Your rights', blocks: [
      'Depending on where you are, data protection law gives you rights over your personal information. In the countries where Arab Lab operates these include the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021), the Saudi Personal Data Protection Law and Egypt\'s Personal Data Protection Law (Law No. 151 of 2020). In broad terms you can:',
      { list: [
        'Ask what personal information we hold about you and receive a copy.',
        'Ask us to correct information that is inaccurate or incomplete.',
        'Ask us to delete information, or to stop using it, where we no longer have a valid reason to keep it.',
        'Object to a particular use of your information.',
        'Complain to the data protection authority in your country if you believe we have handled your information unlawfully.',
      ] },
      `To exercise any of these, email ${email}. We may need to confirm your identity before acting on a request, and we will respond within the time the applicable law allows.`,
    ] },
    { id: 'security', title: 'Security', blocks: [
      'The site is served over HTTPS. Form submissions are validated on our servers, delivered to us by email through Resend, and are visible only to Arab Lab staff and those two providers. No method of transmission or storage is perfectly secure, so please avoid sending sensitive information through the website; a phone call is better for anything confidential.',
    ] },
    { id: 'children', title: 'Children', blocks: [
      'This website is aimed at laboratories, manufacturers and their staff. It is not directed at children and we do not knowingly collect information from anyone under 18.',
    ] },
    { id: 'changes', title: 'Changes to this policy', blocks: [
      `We will update this page when our practices change and revise the date at the top. This version was published on ${updated}.`,
      { note: `Questions about privacy: ${email}, or by post to ${postal}.` },
    ] },
  ],
}

export const terms: LegalDoc = {
  slug: 'terms',
  title: 'Terms and Conditions',
  intro: 'The terms on which this website is made available. Commercial dealings with Arab Lab are governed by the written quotation or contract for each order.',
  updated,
  sections: [
    { id: 'scope', title: 'What these terms cover', blocks: [
      `These terms apply to your use of this website, operated by ${company.name}. By using the site you accept them. If you do not, please do not use the site.`,
      'They do not govern the purchase of equipment, consumables or services. Those are covered by the quotation, purchase order and any supply or service agreement agreed in writing between you and Arab Lab, which take precedence over anything on this website.',
    ] },
    { id: 'information', title: 'Information on the site', blocks: [
      'The website describes Arab Lab\'s service lines, the partner manufacturers it represents and the kinds of laboratory problems their products address. It is general information to help you decide whether to contact us. It is not technical advice for a specific application, a regulatory opinion, or a specification you should rely on for validation, procurement or compliance decisions.',
      'Product availability, specifications and the territories in which Arab Lab represents a given manufacturer can change. Confirm current details with us before relying on them. Where the site and a manufacturer\'s own documentation differ, the manufacturer\'s documentation applies.',
      'We take care to keep the site accurate, but we do not promise that it is complete, current or free of errors.',
    ] },
    { id: 'enquiries', title: 'Quote and service requests', blocks: [
      'Sending a quote request or a service request through the site is an enquiry, not an order. It does not create a contract, reserve stock or commit either party to anything. A binding agreement arises only when Arab Lab issues a written quotation and you accept it, or when a purchase order is accepted in writing.',
      'Please give accurate contact details so that we can respond, and do not submit information you are not entitled to share.',
    ] },
    { id: 'ip', title: 'Intellectual property', blocks: [
      `The text, layout, graphics and code of this website belong to ${company.name} or are used with permission. You may view and print pages for your own reference and share links to them. You may not copy, republish or reuse the content commercially without our written permission.`,
      'Eppendorf, Parker, Lonza, Promicol, PMM, CPC Biotech, Tailin and the other product and company names that appear on the site are trademarks of their respective owners. They appear here to identify the manufacturers Arab Lab represents and do not imply that those owners endorse this website. Nothing on the site grants any right to use them.',
    ] },
    { id: 'acceptable', title: 'Acceptable use', blocks: [
      { list: [
        'Do not use the contact forms to send unsolicited marketing, abusive content or material that infringes anyone\'s rights.',
        'Do not attempt to probe, disrupt or gain unauthorised access to the site or its infrastructure, or to submit automated traffic to it.',
        'Do not misrepresent who you are or who you act for when contacting us.',
      ] },
    ] },
    { id: 'links', title: 'Links to other sites', blocks: [
      'The site links to the websites of partner manufacturers and other third parties. Those sites are independent of Arab Lab; we do not control their content or their handling of your data, and a link is not an endorsement. Their own terms and privacy policies apply when you visit them.',
    ] },
    { id: 'liability', title: 'Liability', blocks: [
      'The website is provided as it stands. To the extent the law allows, Arab Lab excludes all warranties about the site and will not be liable for any loss arising from your use of it or your reliance on its content, including loss of business, data or profit, or for the site being unavailable.',
      'Nothing in these terms limits liability that cannot be limited by law, and nothing here affects the terms, warranties and remedies set out in a written supply or service agreement with Arab Lab.',
    ] },
    { id: 'privacy', title: 'Privacy', blocks: [
      'How we handle personal information submitted through the site is explained in our [Privacy Policy](/privacy), and the [Data Collection](/data-collection) page lists exactly what is gathered and why. Both form part of these terms.',
    ] },
    { id: 'changes', title: 'Changes and contact', blocks: [
      'We may revise these terms at any time by updating this page. Continued use of the site after a change means you accept the revised terms.',
      `These terms are governed by the laws of the United Arab Emirates, and the courts of the Emirate of Ras Al Khaimah have jurisdiction over any dispute about the website itself. Disputes about an order or service are dealt with under the agreement for that order.`,
      { note: `Questions about these terms: ${email}, or by post to ${postal}.` },
    ] },
  ],
}

export const dataCollection: LegalDoc = {
  slug: 'data-collection',
  title: 'Data Collection',
  intro: 'A plain register of every piece of information this website gathers, when it is gathered, why, and where it goes. If it is not on this page, the site does not collect it.',
  updated,
  sections: [
    { id: 'you-provide', title: 'Information you type in', blocks: [
      'Collected only when you choose to send a form. Both forms are on the [Contact](/contact) page.',
      { table: { head: ['Field', 'Form', 'Required', 'Why we ask'], rows: [
        ['Name', 'Quote · Service', 'Yes', 'To address our reply to you'],
        ['Company', 'Quote · Service', 'Yes', 'To identify the organisation and any existing account'],
        ['Work email', 'Quote · Service', 'Yes', 'So we can reply; it becomes the reply-to address of the notification we receive'],
        ['Brand or product', 'Quote', 'No', 'To route the request to the right product specialist'],
        ['Quantity', 'Quote', 'No', 'To prepare an accurate quotation'],
        ['Preferred office', 'Quote', 'No', 'To hand the request to the office you would rather deal with'],
        ['Issue or service need', 'Service', 'Yes', 'To brief the Service department before they contact you'],
      ] } },
      'Neither form asks for a phone number. Anything else you write in a free-text field is sent with the request.',
    ] },
    { id: 'automatic', title: 'Information collected automatically', blocks: [
      { table: { head: ['Data', 'Collected by', 'Purpose', 'Identifies you?'], rows: [
        ['IP address, browser, requested page, time', 'Vercel server logs', 'Security and keeping the site running', 'Potentially, in the raw log'],
        ['Page views, referrer, country, device type', 'Vercel Web Analytics', 'Aggregate understanding of which pages are read', 'No — counted with a short-lived hash, no cookie'],
        ['Reduced-motion and contrast preferences', 'Your browser, read by the page', 'Adjusting animation and contrast while you view the page', 'No — not sent to us or stored'],
      ] } },
    ] },
    { id: 'not-collected', title: 'What the site does not do', blocks: [
      { list: [
        'It sets **no cookies** and writes nothing to local storage, so there is no cookie banner.',
        'It has **no accounts**, logins or newsletters.',
        'It loads **no third-party fonts, advertising or social-media scripts**; fonts are served from our own deployment.',
        'It does **not** process payments or ask for financial or identity information.',
        'It does **not** build profiles, retarget or sell data.',
      ] },
    ] },
    { id: 'where', title: 'Where the information goes', blocks: [
      { table: { head: ['Information', 'Stored by', 'Seen by', 'Kept for'], rows: [
        ['Quote and service requests', 'Delivered by email through Resend to an Arab Lab mailbox', 'The Arab Lab office and department handling the request', 'While the enquiry is open and for the period our business records require'],
        ['Email delivery log for each request', 'Resend', 'Arab Lab administrators', 'Resend\'s standard log retention'],
        ['Server logs', 'Vercel', 'Vercel and Arab Lab administrators, when investigating an issue', 'Vercel\'s standard log retention'],
        ['Analytics', 'Vercel', 'Arab Lab, in aggregate only', 'Vercel\'s standard analytics retention'],
      ] } },
      'Requests may be handled by whichever Arab Lab office is best placed to respond, in the UAE, Saudi Arabia or Egypt. Where a specific product question needs a partner manufacturer\'s input, we pass on only the details needed for that answer.',
    ] },
    { id: 'control', title: 'Your control', blocks: [
      `You can ask to see, correct or delete anything you have sent us by writing to ${email}. The [Privacy Policy](/privacy) explains your rights in full and how we respond to requests.`,
      { note: `This page is kept in step with the website\'s code. If a form field or a service is added, it will appear here. Last reviewed ${updated}.` },
    ] },
  ],
}

export const legalDocs = [privacy, terms, dataCollection]
