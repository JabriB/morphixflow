import type { Metadata, Viewport } from 'next'
import { cabinet, satoshi } from './fonts'
import { site } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://morphixflow.io'),
  title: {
    default: site.meta.title,
    template: `%s | ${site.name}`,
  },
  description: site.meta.description,
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    title: site.meta.title,
    description: site.meta.ogDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.meta.title,
    description: site.meta.ogDescription,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#08080a',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${cabinet.variable} ${satoshi.variable}`}>
      <body>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-accent-ink"
        >
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  )
}
