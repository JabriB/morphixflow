import * as de from './site'

/**
 * Locales the site is published in.
 *
 * `de` is the source language and the default: it is the language the business
 * actually operates in, and the one the legal pages are written in.
 */
export const LOCALES = ['de', 'en', 'ar'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'de'

/** Locales that read right to left. Drives `dir` and the logical-property CSS. */
export const RTL_LOCALES: readonly Locale[] = ['ar']

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale)
}

/** Language names in their own language, for the switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  ar: 'العربية',
}

/** BCP 47 tags for `lang`, `hreflang` and Open Graph. */
export const LOCALE_TAGS: Record<Locale, string> = {
  de: 'de-DE',
  en: 'en',
  ar: 'ar',
}

/**
 * Strips the literal types `as const` produces.
 *
 * The German content is written `as const`, so its inferred type is
 * `readonly ['Mehr Kunden.', 'Mehr Umsatz.']` rather than `string[]`. Deriving
 * the dictionary shape from it directly would demand every other language
 * repeat the German words verbatim. Widening keeps the *structure* as the
 * contract while leaving the words free, so adding a field in German turns
 * into a type error in English and Arabic instead of a silent gap.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Widen<T[K]> }
          : T

/**
 * Every translatable export, as one object shape.
 *
 * Deliberately excludes `site`, `legal` and the legal helper functions: an
 * address, a phone number and a VAT id do not change with the reading language,
 * and duplicating them per locale is how they drift apart.
 */
export interface Dictionary {
  meta: Widen<typeof de.site.meta>
  ui: Widen<typeof de.ui>
  navLinks: Widen<typeof de.navLinks>
  navCta: Widen<typeof de.navCta>
  whatsappWidget: Widen<typeof de.whatsappWidget>
  hero: Widen<typeof de.hero>
  toolchain: Widen<typeof de.toolchain>
  figures: Widen<typeof de.figures>
  servicesIntro: Widen<typeof de.servicesIntro>
  /* Written out rather than widened: `slug` and `id` are keys, not copy. If
     Widen reached them it would flatten ServiceSlug to plain string, and the
     Results filter and the calculator's Record lookup would both stop
     type-checking against the actual set of services. */
  services: readonly {
    readonly slug: de.ServiceSlug
    readonly name: string
    readonly body: string
    readonly tags: readonly string[]
  }[]
  showcaseIntro: Widen<typeof de.showcaseIntro>
  showcaseDevices: readonly {
    readonly id: de.DeviceId
    readonly label: string
    readonly frameWidth: number
    readonly frameHeight: number
  }[]
  performanceComparison: Widen<typeof de.performanceComparison>
  processIntro: Widen<typeof de.processIntro>
  processSteps: Widen<typeof de.processSteps>
  processNote: Widen<typeof de.processNote>
  resultsIntro: Widen<typeof de.resultsIntro>
  projects: readonly {
    readonly name: string
    readonly category: string
    readonly result: string
    readonly slug?: de.ServiceSlug
  }[]
  reviewsIntro: Widen<typeof de.reviewsIntro>
  reviews: Widen<typeof de.reviews>
  calculatorIntro: Widen<typeof de.calculatorIntro>
  calculatorDisclaimer: string
  calculatorContent: Record<de.ServiceSlug, Widen<typeof de.calculatorContent['web']>>
  pricingIntro: Widen<typeof de.pricingIntro>
  packages: Widen<typeof de.packages>
  builderIntro: Widen<typeof de.builderIntro>
  builderBase: Widen<typeof de.builderBase>
  builderAddons: Widen<typeof de.builderAddons>
  builderMaintenance: number
  builderNote: string
  builderCta: string
  builderWaTemplate: string
  statement: Widen<typeof de.statement>
  faqIntro: Widen<typeof de.faqIntro>
  faqs: Widen<typeof de.faqs>
  contact: Widen<typeof de.contact>
  footer: Widen<typeof de.footer>
}

/** Every locale, resolvable by tag. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? deDictionary
}

/** German, assembled from the source file rather than duplicated. */
export const deDictionary: Dictionary = {
  meta: de.site.meta,
  ui: de.ui,
  navLinks: de.navLinks,
  navCta: de.navCta,
  whatsappWidget: de.whatsappWidget,
  hero: de.hero,
  toolchain: de.toolchain,
  figures: de.figures,
  servicesIntro: de.servicesIntro,
  services: de.services,
  showcaseIntro: de.showcaseIntro,
  showcaseDevices: de.showcaseDevices,
  performanceComparison: de.performanceComparison,
  processIntro: de.processIntro,
  processSteps: de.processSteps,
  processNote: de.processNote,
  resultsIntro: de.resultsIntro,
  projects: de.projects,
  reviewsIntro: de.reviewsIntro,
  reviews: de.reviews,
  calculatorIntro: de.calculatorIntro,
  calculatorDisclaimer: de.calculatorDisclaimer,
  calculatorContent: de.calculatorContent,
  pricingIntro: de.pricingIntro,
  packages: de.packages,
  builderIntro: de.builderIntro,
  builderBase: de.builderBase,
  builderAddons: de.builderAddons,
  builderMaintenance: de.builderMaintenance,
  builderNote: de.builderNote,
  builderCta: de.builderCta,
  builderWaTemplate: de.builderWaTemplate,
  statement: de.statement,
  faqIntro: de.faqIntro,
  faqs: de.faqs,
  contact: de.contact,
  footer: de.footer,
}

import { en } from './locales/en'
import { ar } from './locales/ar'

export const dictionaries: Record<Locale, Dictionary> = {
  de: deDictionary,
  en,
  ar,
}
