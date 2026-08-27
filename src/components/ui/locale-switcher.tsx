'use client'

import { usePathname } from 'next/navigation'
import { Globe } from '@phosphor-icons/react'
import { LOCALES, LOCALE_LABELS, isLocale } from '@/content/dictionary'
import { useContent } from '@/content/use-content'
import { cn } from '@/lib/utils'

/**
 * Language switcher.
 *
 * Real links, not buttons that push router state. Each language is a distinct
 * URL that must be crawlable and openable in a new tab, and an anchor is what
 * search engines follow to discover the other two.
 *
 * Every language is written in its own script, never translated: someone
 * looking for Arabic scans for العربية, not for "Arabic" spelled in German.
 *
 * Plain <a>, deliberately not next/link. A locale switch changes `lang` and
 * `dir` on the document itself, and Arabic flips the whole layout to RTL, so a
 * fresh document is both safer and what the user expects. Soft navigating
 * instead re-rendered the root layout on the client, which made React try to
 * recreate the inline theme <script> in <head> and log "Encountered a script
 * tag while rendering React component" on every language change.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale } = useContent()
  const pathname = usePathname()

  /* Swap only the first segment, so a deep path survives the switch. */
  const hrefFor = (target: string) => {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length && isLocale(segments[0])) segments[0] = target
    else segments.unshift(target)
    return `/${segments.join('/')}`
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-md border border-line bg-fill-subtle p-0.5',
        className,
      )}
    >
      <Globe
        size={14}
        aria-hidden="true"
        className="ms-1.5 me-0.5 shrink-0 text-ink-subtle"
      />
      {LOCALES.map((l) => {
        const active = l === locale
        return (
          <a
            key={l}
            href={hrefFor(l)}
            hrefLang={l}
            lang={l}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'rounded-sm px-2 py-1 text-xs font-bold uppercase no-underline transition-colors duration-200',
              active
                ? 'bg-fill-strong text-ink'
                : 'text-ink-subtle hover:bg-fill-soft hover:text-ink',
            )}
          >
            {/* Uppercase tag in the bar, full name for assistive tech. */}
            <span aria-hidden="true">{l}</span>
            <span className="sr-only">{LOCALE_LABELS[l]}</span>
          </a>
        )
      })}
    </div>
  )
}
