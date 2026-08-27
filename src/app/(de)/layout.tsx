import type { Metadata, Viewport } from 'next'
import { legalIsComplete, site } from '@/content/site'
import { siteUrl } from '@/lib/site-url'
import { HtmlShell } from '@/components/html-shell'
import '../globals.css'

/**
 * Root layout for the German-only routes: Impressum, Datenschutz, the auth
 * screens and the dashboard.
 *
 * These deliberately sit outside `[locale]`. The legal pages are operative
 * German documents and translating them would create real ambiguity about
 * which version governs, so every language links to this one copy. The
 * dashboard and auth screens are internal.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.meta.title,
    template: `%s | ${site.name}`,
  },
  description: site.meta.description,
  robots: legalIsComplete()
    ? { index: true, follow: true }
    : { index: false, follow: false },
}

export const viewport: Viewport = {
  /* Dark is the default and the theme is a stored choice rather than an OS
     one, so the mobile address bar matches the ground a first-time visitor
     actually lands on. */
  themeColor: '#07080a',
  colorScheme: 'light dark',
}

export default function GermanRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HtmlShell lang="de" skipLabel="Zum Inhalt springen">
      {children}
    </HtmlShell>
  )
}
