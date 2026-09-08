import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  getDictionary,
  isLocale,
  isRtl,
  type Locale,
} from '@/content/dictionary'
import { legal, legalIsComplete, site } from '@/content/site'
import { siteUrl } from '@/lib/site-url'
import { ContentProvider } from '@/content/use-content'
import { HtmlShell } from '@/components/html-shell'
import '../globals.css'

/** Prerenders every locale at build time, so none of them costs a cold render. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

const SKIP_LABELS: Record<Locale, string> = {
  de: 'Zum Inhalt springen',
  en: 'Skip to content',
  ar: 'انتقل إلى المحتوى',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const t = getDictionary(locale)

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: `%s | ${site.name}` },
    description: t.meta.description,
    /* Ignored by Google since 2009, still read by a few smaller engines and by
       some social scrapers. Kept truthful rather than stuffed: every term here
       appears in the page's own copy, and the localities are the ones the
       Impressum actually names. */
    keywords: [...t.meta.keywords],
    authors: [{ name: legal.fullName }],
    creator: legal.fullName,
    publisher: legal.businessName,
    alternates: {
      /* Self-referencing canonical per locale. Without it every utm_source and
         fbclid a campaign appends becomes a separate URL competing with the
         original, which matters here because the site runs paid traffic. */
      canonical: `/${locale}`,
      /* hreflang is what actually lets each language rank on its own terms.
         x-default points at German, the language the business operates in. */
      languages: {
        ...Object.fromEntries(
          LOCALES.map((l) => [LOCALE_TAGS[l], `/${l}`]),
        ),
        'x-default': `/${DEFAULT_LOCALE}`,
      },
    },
    openGraph: {
      type: 'website',
      /* Absolute and locale-specific. Without og:url a scraper that reached the
         page through a redirect or a tracking parameter attributes the share to
         that URL instead of the canonical one. */
      url: `${siteUrl}/${locale}`,
      locale: LOCALE_TAGS[locale],
      /* Lets Facebook and LinkedIn offer the other two languages for the same
         share, instead of treating each locale as an unrelated page. */
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_TAGS[l]),
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.ogDescription,
      images: [
        {
          url: `/og/morphixflow-${locale}.jpg`,
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: `${site.name}. ${t.footer.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.ogDescription,
      images: [`/og/morphixflow-${locale}.jpg`],
    },
    /* Indexing stays gated on a complete Impressum. An indexed German
       commercial site without one is the most common Abmahnung trigger. */
    robots: legalIsComplete()
      ? { index: true, follow: true }
      : { index: false, follow: false },
  }
}

export const viewport: Viewport = {
  themeColor: '#07080a',
  colorScheme: 'light dark',
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale: raw } = await params
  /* An unknown segment is a 404, not a silent fallback to German. Serving the
     German page at /fr would have it indexed under a language it is not. */
  if (!isLocale(raw)) notFound()

  const locale = raw
  const rtl = isRtl(locale)

  return (
    <HtmlShell
      lang={LOCALE_TAGS[locale]}
      dir={rtl ? 'rtl' : 'ltr'}
      skipLabel={SKIP_LABELS[locale]}
    >
      <ContentProvider value={{ t: getDictionary(locale), locale, rtl }}>
        {children}
      </ContentProvider>
    </HtmlShell>
  )
}
