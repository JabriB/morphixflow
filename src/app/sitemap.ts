import type { MetadataRoute } from 'next'
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS } from '@/content/dictionary'
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
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const languages = {
    ...Object.fromEntries(LOCALES.map((l) => [LOCALE_TAGS[l], `${siteUrl}/${l}`])),
    'x-default': `${siteUrl}/${DEFAULT_LOCALE}`,
  }

  const localized: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: locale === DEFAULT_LOCALE ? 1 : 0.8,
    alternates: { languages },
  }))

  return [
    ...localized,
    {
      url: `${siteUrl}/impressum`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/datenschutz`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
