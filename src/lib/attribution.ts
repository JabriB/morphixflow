/**
 * First-party campaign attribution.
 *
 * Answers the one question paid traffic makes expensive to get wrong: which ad
 * produced this enquiry. The campaign parameters are read from the landing URL
 * once, kept in a first-party cookie for the length of the visit's decision
 * window, and attached to the lead when the form is finally submitted.
 *
 * Deliberately first party and self-contained:
 *  - nothing is sent to Meta, Google or anyone else, so no CSP origin has to be
 *    opened and no data leaves the EU on this path
 *  - no account, tag manager or SDK is involved, so there is nothing to break
 *    and nothing extra to load
 *
 * It still requires consent. §25 Abs. 1 TDDDG is about storing information on
 * the visitor's device, regardless of who ends up reading it, and remembering
 * an ad click to measure marketing is not "unbedingt erforderlich" for showing
 * the page. So this only ever runs after the marketing category is granted.
 */

export const ATTRIBUTION_COOKIE = 'mf_attr'

/**
 * 30 days. Long enough to cover the gap between clicking an ad and actually
 * enquiring, which for a considered purchase is rarely the same session, and
 * short enough that it is not a long-term profile.
 */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30

/** Kept deliberately small: campaign identifiers, not a behavioural profile. */
export interface Attribution {
  /** utm_source, or the click id's platform when only that is present. */
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  /** Google Ads click id. */
  gclid?: string
  /** Meta click id. */
  fbclid?: string
  /** TikTok click id. */
  ttclid?: string
  /** Referring host only, never the full referring URL. */
  referrer?: string
  /** Landing path, so the entry point is visible without storing every page. */
  landing?: string
  /** Unix ms of first touch. */
  ts?: number
}

/* Only the string-valued fields. Typing this as `keyof Attribution` would
   include `ts: number`, and the assignment below would not narrow. */
type StringField = Exclude<keyof Attribution, 'ts'>

const PARAM_MAP: Record<string, StringField> = {
  utm_source: 'source',
  utm_medium: 'medium',
  utm_campaign: 'campaign',
  utm_term: 'term',
  utm_content: 'content',
  gclid: 'gclid',
  fbclid: 'fbclid',
  ttclid: 'ttclid',
}

/** Trimmed and length-capped, so a crafted URL cannot bloat the cookie. */
function clean(value: string | null): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim().slice(0, 120)
  return trimmed || undefined
}

export function readAttribution(): Attribution | null {
  if (typeof document === 'undefined') return null
  const hit = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${ATTRIBUTION_COOKIE}=`))
  if (!hit) return null
  try {
    return JSON.parse(decodeURIComponent(hit.slice(ATTRIBUTION_COOKIE.length + 1)))
  } catch {
    return null
  }
}

/**
 * Records the current landing URL as the attribution, unless one is already
 * stored.
 *
 * First touch wins on purpose. If a visitor arrives from a TikTok ad, leaves,
 * and returns later through a Google search for the brand, the TikTok ad is
 * what actually created the demand; overwriting it would quietly credit every
 * conversion to branded search and make the real campaigns look worthless.
 */
export function captureAttribution(): Attribution | null {
  if (typeof document === 'undefined') return null
  if (readAttribution()) return readAttribution()

  const params = new URLSearchParams(location.search)
  const attribution: Attribution = {}

  for (const [param, key] of Object.entries(PARAM_MAP)) {
    const value = clean(params.get(param))
    if (value) attribution[key] = value
  }

  /* A click id with no utm_source still identifies the platform, so the source
     is inferred rather than left blank. */
  if (!attribution.source) {
    if (attribution.gclid) attribution.source = 'google'
    else if (attribution.fbclid) attribution.source = 'meta'
    else if (attribution.ttclid) attribution.source = 'tiktok'
  }

  if (document.referrer) {
    try {
      const host = new URL(document.referrer).hostname
      /* Own-domain referrers are internal navigation, not a source. */
      if (host && host !== location.hostname) attribution.referrer = host
    } catch {
      // A malformed referrer is simply not recorded.
    }
  }

  /* Nothing identifiable about where they came from means nothing worth
     storing. Writing an empty record would set a cookie for no purpose. */
  if (Object.keys(attribution).length === 0) return null

  attribution.landing = location.pathname.slice(0, 120)
  attribution.ts = Date.now()

  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie =
    `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(attribution))}` +
    `; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`

  return attribution
}

/** Expires the record. Called when marketing consent is withdrawn. */
export function clearAttribution(): void {
  if (typeof document === 'undefined') return
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${ATTRIBUTION_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax${secure}`
}

/** Flattened one-line summary, for the note attached to a HubSpot contact. */
export function describeAttribution(a: Attribution): string {
  const parts: string[] = []
  if (a.source) parts.push(`Quelle: ${a.source}`)
  if (a.medium) parts.push(`Medium: ${a.medium}`)
  if (a.campaign) parts.push(`Kampagne: ${a.campaign}`)
  if (a.content) parts.push(`Anzeige: ${a.content}`)
  if (a.term) parts.push(`Keyword: ${a.term}`)
  if (a.referrer) parts.push(`Verweis: ${a.referrer}`)
  if (a.landing) parts.push(`Einstieg: ${a.landing}`)
  return parts.join(' · ')
}
