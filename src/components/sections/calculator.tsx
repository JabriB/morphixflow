'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { type ServiceSlug } from '@/content/site'
import { useContent } from '@/content/use-content'
import { formatEuro } from '@/lib/format'
import { Section, SectionHeading } from '@/components/ui/section'
import { Tabs } from '@/components/ui/tabs'
import { ButtonLink } from '@/components/ui/button'
import { buildWhatsAppLink } from '@/lib/whatsapp'

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * Reads the numeric value out of a localised price string.
 *
 * The three locales write the same amount three ways ("1.234,56 €",
 * "€1,234.56", "1,234.56 €"), so a fixed rule for one misreads the
 * others: treating "," as the decimal point turns the English €1,234.56
 * into 1.23456. Instead keep the digits and both separators, then treat the
 * last separator as the decimal point unless it is followed by exactly three
 * digits, which makes it a thousands group.
 *
 * Returns 0 for prices with no digits at all ("Auf Anfrage"), which the
 * caller already handles by skipping the payback figure.
 */
function parsePrice(main: string): number {
  const digits = main.replace(/[^0-9.,]/g, '')
  const lastSeparator = Math.max(digits.lastIndexOf(','), digits.lastIndexOf('.'))
  if (lastSeparator === -1) return parseFloat(digits) || 0

  const whole = digits.slice(0, lastSeparator).replace(/[.,]/g, '')
  const tail = digits.slice(lastSeparator + 1)
  if (tail.length === 3) return parseFloat(whole + tail) || 0
  return parseFloat(`${whole}.${tail}`) || 0
}

export function Calculator() {
  const { t, locale } = useContent()
  const reduced = useReducedMotion()
  const [slug, setSlug] = useState<ServiceSlug>(t.services[0].slug)
  const config = t.calculatorContent[slug]
  const [value, setValue] = useState(config.sliderDefault)

  // Reset the slider when the solution changes. Adjusted during render
  // (React's recommended pattern), not in an effect, to avoid a stale
  // in-between render with the previous slug's value.
  const [prevSlug, setPrevSlug] = useState(slug)
  if (slug !== prevSlug) {
    setPrevSlug(slug)
    setValue(config.sliderDefault)
  }

  const duration = config.baseDurationDays + value * config.durationPerUnitDays
  const durationLow = Math.round(duration * 0.85)
  const durationHigh = Math.round(duration * 1.15)
  const monthlyValue = Math.round(value * config.valuePerUnit)
  const packagePrice = parsePrice(
    t.packages.find((p) => p.id === config.relevantPackageId)!.price.main,
  )
  const paybackMonths = monthlyValue > 0 ? Math.max(1, Math.round(packagePrice / monthlyValue)) : 0

  const message = config.waMessageTemplate
    .replace('{value}', String(value))
    .replace(
      '{duration}',
      t.ui.durationRange
        .replace('{low}', String(durationLow))
        .replace('{high}', String(durationHigh)),
    )

  return (
    <Section id="rechner">
      <SectionHeading sub={t.calculatorIntro.subtext}>{t.calculatorIntro.heading}</SectionHeading>

      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mt-12 grid gap-10 rounded-lg border border-line p-7 lg:grid-cols-2 lg:p-10"
      >
        <div className="flex flex-col gap-7">
          <Tabs
            value={slug}
            onChange={setSlug}
            items={t.services.map((s) => ({ value: s.slug, label: s.name }))}
            aria-label={t.ui.chooseSolution}
            size="sm"
          />

          <div className="flex flex-col gap-3">
            <label htmlFor="calc-slider" className="text-sm font-bold text-ink">
              {config.sliderLabel}
            </label>
            <input
              id="calc-slider"
              type="range"
              min={config.sliderMin}
              max={config.sliderMax}
              step={config.sliderStep}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line"
            />
            <div className="flex items-center justify-between text-xs text-ink-subtle">
              <span>
                {config.sliderMin} {config.sliderUnit}
              </span>
              <span data-numeric className="text-base font-extrabold text-ink">
                {value} {config.sliderUnit}
              </span>
              <span>
                {config.sliderMax} {config.sliderUnit}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-7">
          <div className="grid grid-cols-3 gap-4 border-t border-line pt-6 lg:border-t-0 lg:border-s lg:ps-10 lg:pt-0">
            <div className="flex flex-col gap-1">
              <span data-numeric className="font-display text-xl font-extrabold text-ink">
                {durationLow} {t.ui.rangeTo} {durationHigh}
              </span>
              <span className="text-2xs text-ink-subtle">{t.ui.daysEstimate}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span data-numeric className="font-display text-xl font-extrabold text-ink">
                {formatEuro(monthlyValue, locale)}
              </span>
              <span className="text-2xs text-ink-subtle">{config.valueLabel}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span data-numeric className="font-display text-xl font-extrabold text-accent">
                {paybackMonths}
              </span>
              <span className="text-2xs text-ink-subtle">{t.ui.monthsToPayback}</span>
            </div>
          </div>

          <p className="text-2xs text-ink-subtle">{config.valueNote}</p>
          <p className="text-2xs text-ink-subtle">{t.calculatorDisclaimer}</p>

          <ButtonLink href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer">
            <WhatsappLogo size={17} weight="fill" />
            {t.calculatorIntro.cta}
          </ButtonLink>
        </div>
      </motion.div>
    </Section>
  )
}
