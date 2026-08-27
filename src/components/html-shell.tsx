import { Toaster } from 'sonner'
import { cabinet, satoshi } from '@/app/fonts'
import { ThemeScript } from '@/components/theme-script'

/**
 * The document shell, shared by both root layouts.
 *
 * The app has two roots on purpose. The marketing site lives under `[locale]`
 * and needs `lang` and `dir` to follow the URL; the legal, auth and dashboard
 * routes are German only and must not carry a locale segment. Next.js allows
 * exactly one `<html>` per tree, so the alternative to two roots was reading
 * `headers()` in a single root layout, which would opt every page out of static
 * rendering for the sake of one attribute.
 *
 * Everything that must appear once per document lives here, so the two roots
 * cannot drift apart.
 */
export function HtmlShell({
  lang,
  dir = 'ltr',
  skipLabel,
  children,
}: {
  lang: string
  dir?: 'ltr' | 'rtl'
  /** Skip-link text, in the document's own language. */
  skipLabel: string
  children: React.ReactNode
}) {
  return (
    <html
      lang={lang}
      dir={dir}
      className={`${cabinet.variable} ${satoshi.variable}`}
      /* Tells Next this smooth scrolling is deliberate, so it suppresses it
         during route transitions instead of warning about it. Without it every
         client navigation animates the jump to the top of the new page. */
      data-scroll-behavior="smooth"
      /* The theme script writes data-theme before React hydrates, so the
         server markup and the DOM legitimately differ on this element. */
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router
          renders a real <head>; next/head is the Pages Router API and does not
          apply here. The theme script must sit in <head> to run before paint. */}
      <head>
        <ThemeScript />
      </head>
      <body>
        {/* start-* rather than left-*, so the skip link lands on the correct
            side once dir flips to rtl. */}
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:start-5 focus:top-5 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-accent-ink"
        >
          {skipLabel}
        </a>
        {children}
        <div className="grain" aria-hidden="true" />
        <Toaster
          /* Follows the document theme instead of pinning to dark. */
          theme="system"
          position="top-right"
          offset={{ top: '84px' }}
          toastOptions={{
            classNames: {
              toast: '!rounded-lg !border !border-line-strong !bg-card !text-ink !shadow-lg',
              title: '!text-ink',
              description: '!text-ink-muted',
              actionButton: '!bg-accent !text-accent-ink',
              cancelButton: '!bg-fill-soft !text-ink-muted',
              error: '!border-negative/40',
              success: '!border-positive/40',
              closeButton: '!bg-card !border-line-strong !text-ink-muted',
            },
          }}
        />
      </body>
    </html>
  )
}
