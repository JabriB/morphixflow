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
export default function robots(): MetadataRoute.Robots {
  if (!legalIsComplete()) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard',
          '/dashboard/',
          '/login',
          '/registrieren',
          '/passwort-vergessen',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
