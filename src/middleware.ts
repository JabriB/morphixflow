import { NextResponse, type NextRequest } from 'next/server'
import { DEFAULT_LOCALE, LOCALES } from '@/content/dictionary'

/**
 * Sends the bare root to a locale.
 *
 * Only `/` is handled. Everything else either already carries a locale segment
 * or is a German-only route (`/impressum`, `/dashboard`) that must keep its
 * path exactly as published, since those URLs are printed on invoices and
 * linked from the footer of every language.
 *
 * A 307 rather than a 308: which locale the root points at is a routing
 * decision that may change, and a permanent redirect would be cached in
 * browsers indefinitely and be very hard to take back.
 */

/** Best match between the browser's Accept-Language and what we publish. */
function preferredLocale(header: string | null): string {
  if (!header) return DEFAULT_LOCALE

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    /* Match on the primary subtag, so de-AT and de-CH both land on de. */
    const base = tag.split('-')[0]
    const hit = LOCALES.find((locale) => locale === base)
    if (hit) return hit
  }
  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const locale = preferredLocale(request.headers.get('accept-language'))
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}`
  return NextResponse.redirect(url, 307)
}

export const config = {
  /* Exactly the root. Listing it here rather than testing inside the function
     means the middleware never runs for assets, API routes or German-only
     pages, so it costs nothing on the paths that make up most traffic. */
  matcher: '/',
}
