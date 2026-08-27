'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Check, Minus, WhatsappLogo } from '@phosphor-icons/react'
import type { Dictionary } from '@/content/dictionary'
import { useContent } from '@/content/use-content'
import { formatEuro } from '@/lib/format'
import { Section, SectionHeading } from '@/components/ui/section'
import { ButtonLink } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { buildWhatsAppLink } from '@/lib/whatsapp'

const EASE = [0.23, 1, 0.32, 1] as const
const waHref = buildWhatsAppLink()

function Price({ pkg }: { pkg: Dictionary['packages'][number] }) {
  const price = pkg.price
  return (
    <div className="min-h-24 border-b border-line pb-6">
      <div className="flex items-baseline gap-2">
        <span
          data-numeric
          className={cn(
            'whitespace-nowrap font-display font-extrabold tracking-tight text-ink',
            price.suffix ? (price.main.length > 9 ? 'text-xl' : 'text-2xl') : 'text-lg',
          )}
        >
          {price.main}
        </span>
        {price.suffix ? (
          <span className="text-xs text-ink-subtle">{price.suffix}</span>
        ) : null}
      </div>
      {price.note ? <p className="mt-1.5 text-2xs text-ink-subtle">{price.note}</p> : null}
    </div>
  )
}

function PackageBuilder() {
  const { t, locale } = useContent()
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const chosenAddons = useMemo(
    () => t.builderAddons.filter((a) => selected.has(a.id)),
    [selected, t.builderAddons],
  )
  const totalCents =
    Math.round(t.builderBase.price * 100) +
    chosenAddons.reduce((sum, a) => sum + Math.round(a.price * 100), 0)
  const total = totalCents / 100
  const itemLabels = [t.builderBase.label, ...chosenAddons.map((a) => a.label)].join(', ')
  const message = t.builderWaTemplate
    .replace('{items}', itemLabels)
    .replace('{price}', formatEuro(total, locale))

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mt-16 rounded-lg border border-line p-7 lg:p-10"
    >
      <SectionHeading sub={t.builderIntro.subtext} className="max-w-none">
        {t.builderIntro.heading}
      </SectionHeading>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              {/* h3, not h4: SectionHeading above emits an h2, and skipping a
                  level breaks the document outline screen readers and agents
                  navigate by. Size is a class, not a tag. */}
              <h3 className="text-sm font-bold text-ink">{t.builderBase.label}</h3>
              <span data-numeric className="text-sm font-bold text-ink-subtle">
                {formatEuro(t.builderBase.price, locale)}
              </span>
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {t.builderBase.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-ink-subtle" aria-hidden="true" />
                  <span className="text-xs leading-relaxed text-ink-muted">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2.5">
            {t.builderAddons.map((addon) => {
              const isSelected = selected.has(addon.id)
              return (
                <button
                  key={addon.id}
                  type="button"
                  role="checkbox"
                  aria-checked={isSelected}
                  onClick={() => toggle(addon.id)}
                  className={cn(
                    'flex items-start justify-between gap-4 rounded-md border p-4 text-start transition-colors duration-200',
                    isSelected ? 'border-accent/50 bg-accent/5' : 'border-line hover:border-line-strong',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-sm border',
                        isSelected ? 'border-accent bg-accent' : 'border-line-strong',
                      )}
                    >
                      {isSelected ? (
                        <Check size={12} weight="bold" className="text-accent-ink" />
                      ) : null}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink">{addon.label}</p>
                      <p className="text-xs text-ink-subtle">{addon.body}</p>
                    </div>
                  </div>
                  <span data-numeric className="shrink-0 text-sm font-bold text-ink">
                    +{formatEuro(addon.price, locale)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-7 border-t border-line pt-7 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
          <div>
            <span data-numeric className="font-display text-3xl font-extrabold tracking-tight text-ink">
              {formatEuro(total, locale)}
            </span>
            <span className="ms-2 text-xs text-ink-subtle">einmalig</span>
            <p className="mt-3 text-2xs text-ink-subtle">{t.builderNote}</p>
          </div>

          <ButtonLink href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer">
            <WhatsappLogo size={17} weight="fill" />
            {t.builderCta}
          </ButtonLink>
        </div>
      </div>
    </motion.div>
  )
}

export function Pricing() {
  const { t } = useContent()
  const reduced = useReducedMotion()

  return (
    <Section id="pakete">
      <SectionHeading sub={t.pricingIntro.subtext}>
        {t.pricingIntro.heading}
      </SectionHeading>

      <p className="mt-4 text-xs text-ink-subtle">{t.pricingIntro.vatNote}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {t.packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
            className={cn(
              'flex flex-col rounded-lg p-7',
              // Elevation declared once: the featured tier gets a shadow,
              // the rest get a hairline. Never both.
              pkg.featured
                ? 'bg-card shadow-lg ring-1 ring-accent/40'
                : 'border border-line bg-card/40',
            )}
          >
            <div className="min-h-7">
              {pkg.badge ? (
                <span
                  className={cn(
                    'inline-flex w-fit rounded-full px-2.5 py-1 text-2xs font-bold',
                    pkg.featured
                      ? 'bg-accent text-accent-ink'
                      : 'border border-line-strong text-ink-muted',
                  )}
                >
                  {pkg.badge}
                </span>
              ) : null}
            </div>
            <h3 className="mt-2 text-lg font-extrabold">{pkg.name}</h3>

            <p className="mb-6 mt-1.5 text-xs text-ink-subtle">{pkg.tagline}</p>

            <Price pkg={pkg} />

            <ul className="mb-8 mt-6 flex flex-1 flex-col gap-3">
              {pkg.features.map((feature) => (
                <li key={feature.label} className="flex items-start gap-2.5">
                  {feature.included ? (
                    <Check
                      size={14}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-ink"
                      aria-hidden="true"
                    />
                  ) : (
                    <Minus
                      size={14}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-ink-subtle"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={cn(
                      'text-xs leading-relaxed',
                      feature.included ? 'text-ink-muted' : 'text-ink-subtle',
                    )}
                  >
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>

            <ButtonLink
              href="#kontakt"
              variant={pkg.featured ? 'primary' : 'secondary'}
              className="w-full"
            >
              {pkg.cta}
            </ButtonLink>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <p className="text-sm text-ink-muted">{t.pricingIntro.nudge}</p>
        <ButtonLink
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="sm"
        >
          <WhatsappLogo size={15} weight="fill" />
          {t.pricingIntro.nudgeCta}
        </ButtonLink>
      </div>

      <PackageBuilder />
    </Section>
  )
}
