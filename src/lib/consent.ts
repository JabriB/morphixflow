import {
  OPTIONAL_CATEGORIES,
  type OptionalCategory,
} from '@/content/consent-services'

/**
 * Consent storage.
 *
 * A first-party cookie rather than localStorage, for three reasons: the record
 * has to survive being read by the server if consent ever gates something
 * rendered there, it expires on its own, and it is the artefact a supervisory
 * authority expects to see when asking how consent was captured. Storing the
 * consent record itself needs no consent, since it exists only to honour the
 * visitor's choice.
 */
export const CONSENT_COOKIE = 'mf_consent'

/**
 * Bump to invalidate every stored choice and ask again.
 *
 * Required whenever the *purposes* change, for example when a new service is
 * added to a category a visitor already accepted. Consent covers what was
 * disclosed at the time it was given, so silently reusing it for a new
 * recipient is not consent at all.
 */
export const CONSENT_VERSION = 1

/**
 * Six months. Long enough not to nag, short enough that a stored decision
 * still reflects a real intention. Nothing in the TDDDG fixes a number; the
 * DSK's guidance treats a re-prompt roughly this often as reasonable.
 */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 182

export interface ConsentState {
  /** Consent version this decision was made under. */
  v: number
  /** Unix ms. The "when" half of the audit record. */
  ts: number
  statistics: boolean
  marketing: boolean
}

export const DENY_ALL: ConsentState = {
  v: CONSENT_VERSION,
  ts: 0,
  statistics: false,
  marketing: false,
}

/** Fired on every change so open tabs and the footer control stay in sync. */
export const CONSENT_CHANGE_EVENT = 'mf:consent'

function serialise(state: ConsentState): string {
  return encodeURIComponent(JSON.stringify(state))
}

/**
 * Parses a raw cookie value into a decision, or null when there is none.
 *
 * Exported because the banner subscribes to the cookie string itself through
 * `useSyncExternalStore`, and needs to turn that snapshot into state without
 * touching `document` a second time.
 */
export function parseConsent(raw: string): ConsentState | null {
  if (!raw) return null
  return deserialise(raw)
}

function deserialise(raw: string): ConsentState | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<ConsentState>
    /* A record written under an older version is not a decision about the
       current purposes, so it is treated as absent and the banner returns. */
    if (parsed.v !== CONSENT_VERSION) return null
    return {
      v: CONSENT_VERSION,
      ts: typeof parsed.ts === 'number' ? parsed.ts : 0,
      statistics: parsed.statistics === true,
      marketing: parsed.marketing === true,
    }
  } catch {
    return null
  }
}

/** The stored decision, or null when the visitor has not decided yet. */
export function readConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null
  const hit = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`))
  return hit ? parseConsent(hit.slice(CONSENT_COOKIE.length + 1)) : null
}

export function writeConsent(choice: Record<OptionalCategory, boolean>): void {
  const state: ConsentState = {
    v: CONSENT_VERSION,
    ts: Date.now(),
    statistics: choice.statistics,
    marketing: choice.marketing,
  }

  /* `Secure` is omitted on localhost, where the dev server is plain http and
     the browser would silently drop the cookie. */
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie =
    `${CONSENT_COOKIE}=${serialise(state)}` +
    `; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`

  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

/**
 * Withdraws consent by expiring the record.
 *
 * Art. 7 Abs. 3 DSGVO requires withdrawal to be as easy as giving consent, so
 * this is reachable from a permanent footer control, not buried in a policy
 * page. Scripts already loaded in this tab cannot be unloaded, so the page is
 * reloaded by the caller to guarantee they are actually gone.
 */
export function clearConsent(): void {
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax${secure}`
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

export function allowsAll(): Record<OptionalCategory, boolean> {
  return Object.fromEntries(OPTIONAL_CATEGORIES.map((c) => [c, true])) as Record<
    OptionalCategory,
    boolean
  >
}

export function allowsNone(): Record<OptionalCategory, boolean> {
  return Object.fromEntries(OPTIONAL_CATEGORIES.map((c) => [c, false])) as Record<
    OptionalCategory,
    boolean
  >
}
