import type { Locale } from '@/content/dictionary'

/**
 * Per-locale money formatting.
 *
 * Deliberately not `Intl.NumberFormat`'s `style: 'currency'`. That decides
 * symbol placement itself, and its choice for Arabic depends on the ICU data
 * the runtime happens to ship, which would make the computed builder total
 * disagree with the hand-written price strings in the dictionaries. Splitting
 * the number from the symbol keeps both under our control, so `1.486,31 €` in
 * German and `€1,486.31` in English are guaranteed to match everywhere they
 * appear.
 *
 * Arabic uses Western digits and English grouping on purpose: prices here are
 * read against euro invoices and ad dashboards that all use Western digits, and
 * the Arabic dictionary writes them the same way.
 */
const MONEY: Record<Locale, { numberLocale: string; symbolFirst: boolean }> = {
  de: { numberLocale: 'de-DE', symbolFirst: false },
  en: { numberLocale: 'en-GB', symbolFirst: true },
  ar: { numberLocale: 'en-GB', symbolFirst: false },
}

/**
 * Formats a euro amount for display.
 *
 * Rounds to whole cents first: the builder sums floats like 593.81 + 416.5,
 * which can land on 1010.3099999999999, and formatting that directly would
 * occasionally show a stray cent.
 */
export function formatEuro(amount: number, locale: Locale): string {
  const { numberLocale, symbolFirst } = MONEY[locale] ?? MONEY.de
  const cents = Math.round(amount * 100)
  const value = (cents / 100).toLocaleString(numberLocale, {
    /* Whole euro amounts print without cents, so a builder total of 599
       reads "599 €" exactly like the package card it is meant to match.
       A sum that lands on a fraction still shows both digits. */
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
  return symbolFirst ? `€${value}` : `${value} €`
}

/** Whole numbers (no decimals), grouped for the locale. */
export function formatNumber(value: number, locale: Locale): string {
  const { numberLocale } = MONEY[locale] ?? MONEY.de
  return Math.round(value).toLocaleString(numberLocale)
}
