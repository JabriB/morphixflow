/**
 * The site's absolute base URL.
 *
 * One definition, used by `metadataBase`, the JSON-LD graph, robots.txt and
 * the sitemap. These must agree: a sitemap advertising one origin while
 * canonicals declare another is a self-inflicted duplicate-content problem.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL, set by hand once a custom domain is live.
 *  2. The Vercel project's stable production domain. Deliberately not
 *     VERCEL_URL: that is unique per deployment, so preview builds would each
 *     claim to be canonical and compete with production in search.
 *  3. localhost for development.
 */
export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
