import { legal, site } from '@/content/site'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  getDictionary,
  type Locale,
} from '@/content/dictionary'
import { siteUrl } from '@/lib/site-url'

const BASE_URL = siteUrl

/**
 * JSON-LD for search engines and AI answer engines.
 *
 * Deliberately omitted: `aggregateRating`. The review data in `site.ts` is
 * still placeholder copy, and publishing rating markup that is not backed by
 * genuine, verifiable reviews violates Google's structured data policy and
 * risks a manual action against the whole domain. Add it here only once the
 * reviews in `site.ts` are real and reproduced on the page.
 *
 * Everything asserted below is drawn from the active dictionary and `legal`,
 * so the markup can never drift away from what the page actually says, in any
 * language. The address and contact details come from `legal` because they do
 * not translate.
 */
export function StructuredData({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const t = getDictionary(locale)
  const graph = [
    {
      '@type': 'ProfessionalService',
      '@id': `${BASE_URL}/#organization`,
      name: site.name,
      url: `${BASE_URL}/${locale}`,
      email: site.email,
      description: t.meta.description,
      /* Drawn from `legal`, not `site.city`. The Impressum is the authoritative
         address; site.city names the market being served. Asserting a locality
         here that contradicts the Impressum is both wrong and a bad signal to
         local search. */
      address: {
        '@type': 'PostalAddress',
        streetAddress: legal.street,
        postalCode: legal.postalCode,
        addressLocality: legal.city,
        addressCountry: 'DE',
      },
      telephone: legal.phone,
      areaServed: [
        { '@type': 'Country', name: 'Deutschland' },
        { '@type': 'Country', name: 'Österreich' },
        { '@type': 'Country', name: 'Schweiz' },
      ],
      knowsLanguage: [...LOCALES],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Leistungen',
        itemListElement: t.services.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name, description: s.body },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: site.name,
      inLanguage: LOCALE_TAGS[locale],
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${BASE_URL}/${locale}#faq`,
      mainEntity: t.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <script
      type="application/ld+json"
      // Content is authored in site.ts, never user input, so there is no
      // injection surface here. JSON.stringify also escapes the payload.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  )
}
