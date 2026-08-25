'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, Minus, WhatsappLogo } from '@phosphor-icons/react'
import { packages, pricingIntro, site, type Billing } from '@/content/site'
import { Section, SectionHeading } from '@/components/ui/section'
import { ButtonLink } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const EASE = [0.23, 1, 0.32, 1] as const
const waHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`

function Price({ pkg, billing }: { pkg: (typeof packages)[number]; billing: Billing }) {
  const reduced = useReducedMotion()
  const price = pkg.price[billing]

  return (
    <div className="min-h-24 border-b border-line pb-6">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={billing}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -5 }}
          transition={{ duration: 0.18, ease: EASE }}
        >
          <div className="flex items-baseline gap-2">
            <span
              data-numeric
              className={cn(
                'font-display font-extrabold tracking-tight text-ink',
                price.suffix ? 'text-2xl' : 'text-lg',
              )}
            >
              {price.main}
            </span>
            {price.suffix ? (
              <span className="text-xs text-ink-subtle">{price.suffix}</span>
            ) : null}
          </div>
          {price.note ? (
            <p className="mt-1.5 text-2xs text-ink-subtle">{price.note}</p>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const reduced = useReducedMotion()
  const groupId = useId()

  return (
    <Section id="pakete">
      <SectionHeading sub={pricingIntro.subtext}>
        {pricingIntro.heading}
      </SectionHeading>

      {/* Billing switch */}
      <div className="mt-10 flex flex-col items-start gap-4">
        <div
          role="radiogroup"
          aria-label="Abrechnungszeitraum wählen"
          className="inline-flex rounded-md border border-line p-1"
        >
          {(['monthly', 'onetime'] as const).map((value) => {
            const selected = billing === value
            return (
              <button
                key={value}
                role="radio"
                aria-checked={selected}
                id={`${groupId}-${value}`}
                onClick={() => setBilling(value)}
                className={cn(
                  'relative rounded-sm px-4 py-2 text-xs font-bold transition-colors duration-200',
                  selected ? 'text-accent-ink' : 'text-ink-muted hover:text-ink',
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="billing-pill"
                    transition={
                      reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                    }
                    className="absolute inset-0 -z-10 rounded-sm bg-accent"
                  />
                ) : null}
                {pricingIntro.toggle[value]}
              </button>
            )
          })}
        </div>

        <AnimatePresence initial={false}>
          {billing === 'onetime' ? (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="overflow-hidden text-xs text-ink-subtle"
            >
              {pricingIntro.onetimeNote}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {packages.map((pkg, i) => (
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
            <div className="flex min-h-7 items-start justify-between gap-3">
              <h3 className="text-lg font-extrabold">{pkg.name}</h3>
              {pkg.badge ? (
                <span
                  className={cn(
                    'shrink-0 rounded-full px-2.5 py-1 text-2xs font-bold',
                    pkg.featured
                      ? 'bg-accent text-accent-ink'
                      : 'border border-line-strong text-ink-muted',
                  )}
                >
                  {pkg.badge}
                </span>
              ) : null}
            </div>

            <p className="mb-6 mt-1.5 text-xs text-ink-subtle">{pkg.tagline}</p>

            <Price pkg={pkg} billing={billing} />

            <ul className="mb-8 mt-6 flex flex-1 flex-col gap-3">
              {pkg.features.map((feature) => (
                <li key={feature.label} className="flex items-start gap-2.5">
                  {feature.included ? (
                    <Check
                      size={14}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-accent"
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
        <p className="text-sm text-ink-muted">{pricingIntro.nudge}</p>
        <ButtonLink
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="sm"
        >
          <WhatsappLogo size={15} weight="fill" />
          {pricingIntro.nudgeCta}
        </ButtonLink>
      </div>
    </Section>
  )
}
