import type { MetadataRoute } from 'next'
import { DEFAULT_LOCALE } from '@/content/dictionary'
import { footer, site } from '@/content/site'

/**
 * manifest.webmanifest.
 *
 * Served by Next at /manifest.webmanifest and linked automatically, so there is
 * no manifest.json in /public to drift out of sync with it.
 *
 * `start_url` points at the German locale rather than `/`. Going through the
 * root would make every launch from a home-screen icon pay a redirect, and the
 * root's only job is to redirect to exactly this URL anyway.
 *
 * `display: browser` on purpose. This is a marketing site whose primary calls
 * to action open WhatsApp and a phone dialler; standalone mode strips the
 * browser chrome and makes returning from those handoffs feel broken.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}. ${footer.tagline}`,
    short_name: site.name,
    description: site.meta.description,
    start_url: `/${DEFAULT_LOCALE}`,
    scope: '/',
    display: 'browser',
    lang: 'de-DE',
    dir: 'ltr',
    background_color: '#07080a',
    theme_color: '#07080a',
    categories: ['business', 'productivity'],
    icons: [
      {
        src: '/assets/morphixflow/morphixflow-icon-chip.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/assets/morphixflow/morphixflow-icon-chip.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      /* Maskable needs its own entry: Android crops icons to the launcher's
         shape, and the chip already carries its own padding, so declaring the
         same asset as maskable avoids a second, differently-padded render. */
      {
        src: '/assets/morphixflow/morphixflow-icon-chip.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
