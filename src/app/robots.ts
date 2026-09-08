import type { MetadataRoute } from 'next'
import { legalIsComplete } from '@/content/site'
import { siteUrl } from '@/lib/site-url'

/**
 * robots.txt.
 *
 * Gated on the same check as the `robots` meta tag in the root layout, so the
 * two can never disagree. A page that says noindex in its head while robots.txt
 * invites crawlers in is a mixed signal, and the version search engines act on
 * is not always the one you expect.
 *
 * Note the deliberate ordering once indexing is on: private areas are
 * disallowed, but `/api/` is listed too. Nothing there is meant to be crawled,
 * and a crawler hammering `/api/leads` would burn the rate limit that protects
 * real enquiries.
 */
/**
 * Paths that exist but must never be indexed.
 *
 * `/_next/` is deliberately absent. Blocking it stops Googlebot fetching the
 * CSS and JS it needs to render the page, so the page gets judged on unstyled
 * markup and loses its mobile-friendly status. It is the single most common
 * self-inflicted SEO wound in a Next.js robots.txt.
 */
const PRIVATE_PATHS = [
  '/api/',
  '/dashboard',
  '/dashboard/',
  '/login',
  '/registrieren',
  '/passwort-vergessen',
]

export default function robots(): MetadataRoute.Robots {
  if (!legalIsComplete()) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      /* Named explicitly as well as covered by `*`. Both crawlers apply the
         most specific matching group and ignore the rest, so stating them
         means a later tightening of the wildcard rule cannot silently lock
         out the two engines that actually send this site traffic. */
      { userAgent: 'Googlebot', allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: 'Googlebot-Image', allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: 'Bingbot', allow: '/', disallow: PRIVATE_PATHS },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
