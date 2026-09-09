'use client'

import { useEffect, useState } from 'react'
import { activeServices } from '@/content/consent-services'
import { CONSENT_CHANGE_EVENT, readConsent } from '@/lib/consent'

/**
 * Loads the configured tracking services, and only after consent.
 *
 * The whole point of the consent layer is that nothing here reaches the
 * browser before the visitor allows it, so these are injected at runtime
 * rather than rendered into the server HTML. A `<script>` in the SSR output
 * would already have executed by the time any banner could be answered, which
 * is the single most common way a consent banner ends up being decorative.
 *
 * Every injected tag carries `data-consent`, so the banner can tell whether a
 * withdrawal needs a reload to take effect. Scripts cannot be unloaded once
 * they have run; only a fresh document is a real revocation.
 */
export function ConsentScripts() {
  const [granted, setGranted] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const read = () => {
      const c = readConsent()
      setGranted({
        statistics: c?.statistics === true,
        marketing: c?.marketing === true,
      })
    }
    read()
    window.addEventListener(CONSENT_CHANGE_EVENT, read)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, read)
  }, [])

  useEffect(() => {
    const services = activeServices().filter((s) => granted[s.category])
    if (services.length === 0) return

    const injected: HTMLScriptElement[] = []

    for (const s of services) {
      /* Idempotent: a consent change re-runs this effect, and loading the same
         pixel twice would double-count every conversion. */
      if (document.querySelector(`script[data-consent="${s.id}"]`)) continue

      const el = document.createElement('script')
      el.async = true
      el.dataset.consent = s.id

      if (s.id === 'google-ads') {
        el.src = `https://www.googletagmanager.com/gtag/js?id=${s.accountId}`
        el.onload = () => {
          const w = window as unknown as { dataLayer?: unknown[] }
          w.dataLayer = w.dataLayer || []
          function gtag(...args: unknown[]) {
            w.dataLayer!.push(args)
          }
          gtag('js', new Date())
          /* Redundant with the gate above, but it also tells Google's own
             consent mode what was decided, which is what governs the tags
             fired later by conversion actions. */
          gtag('consent', 'default', {
            ad_storage: 'granted',
            analytics_storage: granted.statistics ? 'granted' : 'denied',
          })
          gtag('config', s.accountId, { anonymize_ip: true })
        }
      } else if (s.id === 'meta-pixel') {
        el.src = 'https://connect.facebook.net/en_US/fbevents.js'
        el.onload = () => {
          const w = window as unknown as { fbq?: (...a: unknown[]) => void }
          w.fbq?.('init', s.accountId)
          w.fbq?.('track', 'PageView')
        }
      } else if (s.id === 'tiktok-pixel') {
        el.src = `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${s.accountId}`
      } else {
        continue
      }

      document.head.appendChild(el)
      injected.push(el)
    }

    return () => {
      /* Only removes tags this effect added in this pass. Anything that has
         already executed stays executed; the banner reloads for revocation. */
      for (const el of injected) el.remove()
    }
  }, [granted])

  return null
}
