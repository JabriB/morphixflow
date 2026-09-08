import { legal, reviewsAreVerified, site } from '@/content/site'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  getDictionary,
  type Locale,
} from '@/content/dictionary'
import { parsePrice } from '@/lib/format'
import { siteUrl } from '@/lib/site-url'

const BASE_URL = siteUrl
const ORG_ID = `${BASE_URL}/#organization`

/** Absolute URL for the Open Graph card, reused as the organisation's image. */
const OG_IMAGE = `${BASE_URL}/og/morphixflow-${DEFAULT_LOCALE}.jpg`

/**
 * Rating markup, or nothing.
 *
 * Returns `undefined` unless `reviewsAreVerified` says the reviews in
 * `site.ts` are real. See that flag for why this is gated rather than simply
 * computed: publishing invented ratings risks a Google manual action against
 * the domain and is a per-se UWG violation in Germany.
 *
 * The value is derived from the same array the page renders, never typed in
 * by hand, so the markup and the visible reviews cannot drift apart.
 */
function ratingGraph(t: ReturnType<typeof getDictionary>) {
  if (!reviewsAreVerified || t.reviews.length === 0) return null

  const total = t.reviews.reduce((sum, r) => sum + r.rating, 0)

  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (total / t.reviews.length).toFixed(1),
      reviewCount: t.reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: t.reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.body,
    })),
  }
}

/**
 * The four packages as priced offers.
 *
 * Prices are parsed from the dictionary strings the cards actually display, so
 * a price change in `site.ts` propagates here with no second place to update.
 *
 * VIP carries no price because it is quote-only. Its Offer is emitted without
 * a `price`, rather than with `price: 0`: a missing price is "ask us", whereas
 * zero is a claim that the package is free, and Google reads it that way.
 */
function offerCatalog(t: ReturnType<typeof getDictionary>, locale: Locale) {
  return {
    '@type': 'OfferCatalog',
    name: t.pricingIntro.heading,
    itemListElement: t.packages.map((pkg) => {
      const amount = parsePrice(pkg.price.main)
      return {
        '@type': 'Offer',
        name: pkg.name,
        description: pkg.tagline,
        url: `${BASE_URL}/${locale}#pakete`,
        category: 'Digitale Dienstleistung',
        ...(amount > 0
          ? {
              price: amount,
              priceCurrency: 'EUR',
              /* The cards state "inkl. 19% MwSt.", so the markup has to say the
                 same. A price that silently excludes VAT next to a page that
                 includes it is a Merchant-side mismatch. */
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: amount,
                priceCurrency: 'EUR',
                valueAddedTaxIncluded: true,
              },
            }
          : { availability: 'https://schema.org/InStock' }),
        itemOffered: {
          '@type': 'Service',
          name: `${site.name} ${pkg.name}`,
          description: pkg.tagline,
          serviceType: pkg.name,
          provider: { '@id': ORG_ID },
        },
      }
    }),
  }
}

/**
 * JSON-LD for search engines and AI answer engines.
 *
 * Everything asserted below is drawn from the active dictionary and `legal`,
 * so the markup can never drift away from what the page actually says, in any
 * language. The address and contact details come from `legal` because they do
 * not translate.
 */
export function StructuredData({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const t = getDictionary(locale)
  const rating = ratingGraph(t)

  const graph = [
    {
      /* ProfessionalService is a subtype of LocalBusiness, so this satisfies
         both: it inherits address, telephone and rating support while stating
         the more specific category. */
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: site.name,
      legalName: legal.businessName,
      founder: { '@type': 'Person', name: legal.fullName },
      url: `${BASE_URL}/${locale}`,
      image: OG_IMAGE,
      logo: `${BASE_URL}/assets/morphixflow/morphixflow-mark-accent.png`,
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
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      areaServed: [
        { '@type': 'Country', name: 'Deutschland' },
        { '@type': 'Country', name: 'Österreich' },
        { '@type': 'Country', name: 'Schweiz' },
      ],
      knowsLanguage: [...LOCALES],
      /* Two catalogues on purpose: the disciplines sold, and the packages they
         are sold in. Collapsing them would either lose the prices or invent
         service names that appear nowhere on the page. */
      hasOfferCatalog: [
        {
          '@type': 'OfferCatalog',
          name: 'Leistungen',
          itemListElement: t.services.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.name,
              description: s.body,
              provider: { '@id': ORG_ID },
            },
          })),
        },
        offerCatalog(t, locale),
      ],
      ...(rating ?? {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: site.name,
      inLanguage: LOCALE_TAGS[locale],
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${locale}#webpage`,
      url: `${BASE_URL}/${locale}`,
      name: t.meta.title,
      description: t.meta.description,
      inLanguage: LOCALE_TAGS[locale],
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': ORG_ID },
      primaryImageOfPage: OG_IMAGE,
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
