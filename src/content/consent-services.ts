/**
 * Services that require consent before they may run.
 *
 * Deliberately not part of the translated dictionary: a pixel id and a
 * provider's privacy URL are the same in every language, and duplicating them
 * per locale is how they drift apart.
 *
 * ── The rule this file encodes ─────────────────────────────────────────────
 * §25 Abs. 1 TDDDG requires consent before *storing or reading* anything on a
 * visitor's device, unless it is strictly necessary for a service the visitor
 * explicitly asked for. It is about the storage access, not about the word
 * "cookie", so localStorage and pixels are caught by exactly the same rule.
 *
 * A service is only offered to the visitor once it is actually configured.
 * With every id below still blank, `activeServices()` returns nothing and the
 * banner does not render at all, because there is genuinely nothing to consent
 * to. That is the correct behaviour, not a bug: a consent banner on a site that
 * sets no cookies asks visitors to decide something that does not exist, costs
 * conversions, and contradicts the Datenschutzerklärung, which currently states
 * "kein Tracking und keine Pixel".
 *
 * To switch tracking on: paste the id, update the Datenschutzerklärung to name
 * the service, and redeploy. The banner, the CSP entries and the script loading
 * all follow automatically from this one edit.
 */

export type ConsentCategory = 'necessary' | 'statistics' | 'marketing'

/** Categories a visitor can actually decide about. `necessary` is not one. */
export const OPTIONAL_CATEGORIES = ['statistics', 'marketing'] as const
export type OptionalCategory = (typeof OPTIONAL_CATEGORIES)[number]

export interface ConsentService {
  /** Stable key. Also used as the toggle's element id. */
  id: string
  category: OptionalCategory
  /** Shown in the details list, so the visitor can name what they allowed. */
  name: string
  provider: string
  privacyUrl: string
  /**
   * The account id. Blank means "not configured", which means the service is
   * not offered and nothing about it reaches the browser.
   *
   * Not required for a `firstParty` service, which has no external account.
   */
  accountId: string
  /**
   * Runs entirely on this domain: no third party receives anything, no CSP
   * origin is opened. Still consent-gated, because §25 TDDDG is about writing
   * to the visitor's device, not about who reads it afterwards.
   */
  firstParty?: boolean
  /** Script origin, folded into script-src only while the service is active. */
  scriptSrc?: string
  /** Origins the service beacons to, folded into connect-src the same way. */
  connectSrc?: string[]
  /** Origins it loads tracking images from, folded into img-src. */
  imgSrc?: string[]
}

/**
 * The catalogue. Each entry is wired and inert until `accountId` is filled.
 *
 * These three are here because MorphixFlow sells Meta, Google and TikTok
 * campaigns, so measuring its own funnel with the same tools is the likely
 * next step. Nothing else is pre-registered: an entry that nobody plans to
 * use is a legal liability with no upside.
 */
export const consentServices: ConsentService[] = [
  {
    id: 'attribution',
    category: 'marketing',
    name: 'Kampagnen-Zuordnung',
    provider: 'MorphixFlow (eigene Verarbeitung, keine Weitergabe)',
    privacyUrl: '/datenschutz',
    accountId: '',
    firstParty: true,
  },
  {
    id: 'google-ads',
    category: 'marketing',
    name: 'Google Ads Conversion Tracking',
    provider: 'Google Ireland Limited',
    privacyUrl: 'https://policies.google.com/privacy',
    /* TODO(owner): AW-XXXXXXXXXX from Google Ads → Tools → Conversions. */
    accountId: '',
    scriptSrc: 'https://www.googletagmanager.com',
    connectSrc: ['https://www.google-analytics.com', 'https://www.googletagmanager.com'],
    imgSrc: ['https://www.google.com', 'https://www.google.de'],
  },
  {
    id: 'meta-pixel',
    category: 'marketing',
    name: 'Meta Pixel',
    provider: 'Meta Platforms Ireland Limited',
    privacyUrl: 'https://www.facebook.com/privacy/policy',
    /* TODO(owner): numeric pixel id from Meta Events Manager. */
    accountId: '',
    scriptSrc: 'https://connect.facebook.net',
    connectSrc: ['https://www.facebook.com'],
    imgSrc: ['https://www.facebook.com'],
  },
  {
    id: 'tiktok-pixel',
    category: 'marketing',
    name: 'TikTok Pixel',
    provider: 'TikTok Technology Limited',
    privacyUrl: 'https://www.tiktok.com/legal/privacy-policy-eea',
    /* TODO(owner): pixel id from TikTok Events Manager. */
    accountId: '',
    scriptSrc: 'https://analytics.tiktok.com',
    connectSrc: ['https://analytics.tiktok.com'],
  },
]

/**
 * Only services that can actually do something.
 *
 * A third-party service counts once its account id is filled in. A first-party
 * one has no account to configure, so it counts as soon as it is registered.
 */
export function activeServices(): ConsentService[] {
  return consentServices.filter((s) => s.firstParty || s.accountId.trim() !== '')
}

/** Categories that have at least one configured service behind them. */
export function activeCategories(): OptionalCategory[] {
  const live = new Set(activeServices().map((s) => s.category))
  return OPTIONAL_CATEGORIES.filter((c) => live.has(c))
}

/** True when there is something real to ask about. Gates the whole banner. */
export function consentIsRequired(): boolean {
  return activeServices().length > 0
}

/**
 * Extra CSP origins needed by the configured services.
 *
 * Returned as a directive fragment so `next.config.ts` can widen the policy by
 * exactly what is in use and not one origin more. With nothing configured this
 * returns empty arrays and the strict `'self'` policy stands untouched.
 */
export function consentCspSources(): {
  scriptSrc: string[]
  connectSrc: string[]
  imgSrc: string[]
} {
  const live = activeServices()
  const uniq = (xs: (string | undefined)[]) =>
    [...new Set(xs.filter((x): x is string => Boolean(x)))]

  return {
    scriptSrc: uniq(live.map((s) => s.scriptSrc)),
    connectSrc: uniq(live.flatMap((s) => s.connectSrc ?? [])),
    imgSrc: uniq(live.flatMap((s) => s.imgSrc ?? [])),
  }
}
