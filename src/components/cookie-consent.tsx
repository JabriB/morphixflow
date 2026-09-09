'use client'

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  OPTIONAL_CATEGORIES,
  activeCategories,
  activeServices,
  consentIsRequired,
  type OptionalCategory,
} from '@/content/consent-services'
import { useContent } from '@/content/use-content'
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_COOKIE,
  allowsAll,
  allowsNone,
  parseConsent,
  writeConsent,
} from '@/lib/consent'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const EASE = [0.23, 1, 0.32, 1] as const

/** Reopen request, dispatched by the footer control. */
const OPEN_EVENT = 'mf:consent-open'

/**
 * The consent cookie as an external store.
 *
 * Same pattern as the theme toggle: a cookie is mutable state owned by the
 * document, not by React, so it is subscribed to rather than copied into state
 * inside an effect. The snapshot is the raw cookie string, which compares by
 * value, so an unchanged cookie cannot cause a re-render loop.
 */
const consentStore = {
  subscribe(onChange: () => void) {
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
      window.removeEventListener('storage', onChange)
    }
  },
  getSnapshot(): string {
    const hit = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${CONSENT_COOKIE}=`))
    return hit ? hit.slice(CONSENT_COOKIE.length + 1) : ''
  },
  /* The server cannot read the visitor's cookie, so it always renders the
     undecided state and the client corrects it on hydration. */
  getServerSnapshot(): string {
    return ''
  },
}

function useStoredConsent() {
  const raw = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getSnapshot,
    consentStore.getServerSnapshot,
  )
  return useMemo(() => parseConsent(raw), [raw])
}

/**
 * A single category row with its switch.
 *
 * `necessary` renders as a locked, permanently-on control rather than being
 * hidden. A visitor is entitled to see what runs regardless of their choice,
 * and a switch that silently cannot be moved is less honest than one that
 * says so.
 */
function CategoryRow({
  name,
  body,
  checked,
  onChange,
  locked,
  lockedLabel,
  services,
  providedByLabel,
}: {
  name: string
  body: string
  checked: boolean
  onChange?: (next: boolean) => void
  locked?: boolean
  lockedLabel?: string
  services?: { id: string; name: string; provider: string; privacyUrl: string }[]
  providedByLabel?: string
}) {
  return (
    <div className="border-t border-line py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-ink">{name}</h3>
          <p className="measure mt-1 text-xs text-ink-muted">{body}</p>

          {services && services.length > 0 && (
            <ul className="mt-2.5 flex flex-col gap-1">
              {services.map((s) => (
                <li key={s.id} className="text-2xs text-ink-subtle">
                  <a
                    href={s.privacyUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-ink-muted underline underline-offset-2 transition-colors duration-200 hover:text-ink"
                  >
                    {s.name}
                  </a>
                  {' · '}
                  {providedByLabel}: {s.provider}
                </li>
              ))}
            </ul>
          )}
        </div>

        {locked ? (
          <span className="shrink-0 rounded-md border border-line bg-fill-subtle px-2.5 py-1 text-2xs font-bold text-ink-subtle">
            {lockedLabel}
          </span>
        ) : (
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={name}
            onClick={() => onChange?.(!checked)}
            /* Negative margin plus padding gives a 44px hit area without
               growing the row it sits in. */
            className="-m-2 shrink-0 p-2"
          >
            <span
              className={cn(
                'flex h-6 w-11 items-center rounded-full border p-[3px] transition-colors duration-200',
                checked ? 'border-accent bg-accent' : 'border-line-strong bg-fill-soft',
              )}
            >
              <span
                className={cn(
                  'h-[18px] w-[18px] rounded-full transition-transform duration-200 ease-[var(--ease-out-expo)]',
                  checked
                    ? 'translate-x-[20px] bg-accent-ink'
                    : 'translate-x-0 bg-ink-subtle',
                )}
              />
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Consent banner.
 *
 * Renders nothing at all unless a service in `consent-services.ts` is actually
 * configured. See that file for why an unconditional banner is the wrong
 * behaviour on a site that sets no cookies.
 */
export function CookieConsent() {
  const { t, rtl } = useContent()
  const reduced = useReducedMotion()
  const c = t.cookieConsent

  /* Pure module data, identical on server and client, so it needs no effect
     and creates no hydration mismatch. */
  const required = consentIsRequired()
  const live = activeCategories()

  const stored = useStoredConsent()

  /* null = follow the cookie. Set explicitly when the visitor opens or closes
     the dialog by hand, so no effect ever has to push state. */
  const [override, setOverride] = useState<'open' | 'closed' | null>(null)
  const [detailed, setDetailed] = useState(false)
  const [draft, setDraft] = useState<Record<OptionalCategory, boolean>>(allowsNone)

  const open = override === 'open' || (override === null && stored === null)

  useEffect(() => {
    if (!required) return
    const reopen = () => {
      setDraft(
        stored
          ? { statistics: stored.statistics, marketing: stored.marketing }
          : allowsNone(),
      )
      setDetailed(true)
      setOverride('open')
    }
    window.addEventListener(OPEN_EVENT, reopen)
    return () => window.removeEventListener(OPEN_EVENT, reopen)
  }, [required, stored])

  /* Escape closes only once a decision exists. Dismissing an undecided banner
     must not be treated as consent, because silence is not consent. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stored) setOverride('closed')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, stored])

  const decide = useCallback((next: Record<OptionalCategory, boolean>) => {
    writeConsent(next)
    setOverride('closed')
    setDetailed(false)

    /* Anything already executed cannot be unloaded, so a narrowing of consent
       is only real after a fresh document. */
    const loaded = document.querySelector('script[data-consent]')
    if (loaded && Object.values(next).some((v) => !v)) location.reload()
  }, [])

  if (!required) return null

  const serviceList = (category: OptionalCategory) =>
    activeServices()
      .filter((s) => s.category === category)
      .map((s) => ({
        id: s.id,
        name: s.name,
        provider: s.provider,
        privacyUrl: s.privacyUrl,
      }))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-heading"
          dir={rtl ? 'rtl' : 'ltr'}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: reduced ? 0.2 : 0.45, ease: EASE }}
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-2xl rounded-xl border border-line-strong bg-card p-5 shadow-lg sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <h2 id="consent-heading" className="text-base font-extrabold text-ink">
            {c.heading}
          </h2>
          <p className="measure mt-2 text-sm text-ink-muted">
            {c.body}{' '}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages --
                /datenschutz lives under the German-only root layout, so
                next/link cannot soft-navigate to it and would only add a
                prefetch of a page most visitors never open. The footer links
                it the same way. */}
            <a
              href="/datenschutz"
              className="text-ink underline underline-offset-2 transition-colors duration-200 hover:text-accent"
            >
              {c.privacyLink}
            </a>
          </p>

          {/* overflow-x-hidden as well as -y-auto below: `overflow-y-auto`
              alone computes overflow-x to auto too, which put a stray
              horizontal scrollbar under the service list. */}
          {detailed && (
            <div className="mt-4 max-h-[45vh] overflow-y-auto overflow-x-hidden">
              <CategoryRow
                name={c.categories.necessary.name}
                body={c.categories.necessary.body}
                checked
                locked
                lockedLabel={c.categories.necessary.always}
              />
              {OPTIONAL_CATEGORIES.filter((cat) => live.includes(cat)).map((cat) => (
                <CategoryRow
                  key={cat}
                  name={c.categories[cat].name}
                  body={c.categories[cat].body}
                  checked={draft[cat]}
                  onChange={(next) => setDraft((prev) => ({ ...prev, [cat]: next }))}
                  services={serviceList(cat)}
                  providedByLabel={c.providedBy}
                />
              ))}
            </div>
          )}

          {/*
            Accept and reject are the same size, the same variant, on the same
            row. Equal prominence is the point: making "accept" the only
            visually inviting option is the pattern German supervisory
            authorities treat as invalid consent. Do not "improve" this by
            promoting one of them to the primary button.
          */}
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => decide(allowsNone())}
            >
              {c.rejectAll}
            </Button>
            {detailed && (
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => decide(draft)}
              >
                {c.save}
              </Button>
            )}
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => decide(allowsAll())}
            >
              {c.acceptAll}
            </Button>
          </div>

          {!detailed && (
            <button
              type="button"
              onClick={() => {
                setDraft(
                  stored
                    ? { statistics: stored.statistics, marketing: stored.marketing }
                    : allowsNone(),
                )
                setDetailed(true)
              }}
              className="mt-3 text-xs text-ink-subtle underline underline-offset-2 transition-colors duration-200 hover:text-ink"
            >
              {c.settings}
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Footer control that reopens the dialog.
 *
 * Art. 7 Abs. 3 DSGVO: withdrawal must be as easy as consent. A permanent
 * control in the footer satisfies that; a paragraph in the privacy policy
 * telling people to clear their browser storage does not.
 *
 * Renders nothing while no consent-requiring service is configured, so the
 * footer of a tracking-free site does not advertise settings that do nothing.
 */
export function CookieSettingsLink({ className }: { className?: string }) {
  const { t } = useContent()
  if (!consentIsRequired()) return null

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={cn(
        'text-xs text-ink-subtle no-underline transition-colors duration-200 hover:text-ink',
        className,
      )}
    >
      {t.cookieConsent.footerLabel}
    </button>
  )
}
