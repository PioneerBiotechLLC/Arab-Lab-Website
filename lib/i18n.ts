// Arabic content is gated until a native speaker has reviewed it (SEO-CONTEXT: needsNativeReview).
// While unapproved, /ar pages render but are noindex, unlinked from the English site, and absent from the sitemap
// and hreflang. Approve by setting ARABIC_APPROVED to true (or AR_APPROVED=1 in the environment for a preview).
export const ARABIC_APPROVED = false
export const arabicApproved = () => ARABIC_APPROVED || process.env.AR_APPROVED === '1'
