import type { MetadataRoute } from 'next'
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS } from '@/content/dictionary'
import { footer } from '@/content/site'
import { siteUrl } from '@/lib/site-url'

/**
 * sitemap.xml.
 *
 * Each locale is listed as its own entry carrying the full `alternates.languages`
 * set. Google treats hreflang as reciprocal: a page that names its translations
 * without those translations naming it back is ignored, so every entry has to
 * advertise the whole group, itself included.
 *
 * The German-only legal pages appear once, unlocalised, because there is one
 * copy of each and every language links to it.
 *
 * The dashboard and auth screens are deliberately absent: listing a page in a
 * sitemap is a request to index it, and doing that while robots.txt disallows
 * the same path wastes crawl budget at best and indexes a login page at worst.
 */
/**
 * German-only routes, listed once each.
 *
 * Driven off `footer.legal` so adding a legal page to the footer adds it to the
 * sitemap automatically, instead of leaving a page that is linked but never
 * submitted. Low priority on purpose: these must be indexable to satisfy §5
 * DDG, but they should never outrank the pages that sell anything.
 */
function germanOnlyRoutes(lastModified: Date): MetadataRoute.Sitemap {
  return footer.legal.map((entry) => ({
    url: `${siteUrl}${entry.href}`,
    lastModified,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const languages = {
    ...Object.fromEntries(LOCALES.map((l) => [LOCALE_TAGS[l], `${siteUrl}/${l}`])),
    'x-default': `${siteUrl}/${DEFAULT_LOCALE}`,
  }

  /* The marketing site is one page per locale. Packages, process and contact
     are sections of it, addressed by fragment (#pakete, #kontakt), and a
     fragment is not a separate URL: search engines drop everything after the
     hash when they canonicalise, so listing them would submit the same URL
     several times and split nothing but crawl budget. */
  const localized: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: locale === DEFAULT_LOCALE ? 1 : 0.8,
    alternates: { languages },
  }))

  return [...localized, ...germanOnlyRoutes(lastModified)]
}
