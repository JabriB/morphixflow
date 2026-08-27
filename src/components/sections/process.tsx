'use client'

import { motion, useReducedMotion } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { useContent } from '@/content/use-content'
import { Section, SectionHeading } from '@/components/ui/section'

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * A 14 day launch timeline. The connector fills once, on entry, rather
 * than scrubbing with scroll position: robust regardless of how tall
 * the section renders across breakpoints.
 */
export function Process() {
  const { t } = useContent()
  const reduced = useReducedMotion()

  return (
    <Section id="prozess" className="bg-raised">
      <SectionHeading sub={t.processIntro.subtext}>
        {t.processIntro.heading}
      </SectionHeading>

      <ol className="relative mt-20 flex flex-col gap-10 lg:mt-24 lg:flex-row lg:gap-0">
        {/* Connector: a static hairline track, plus an accent fill that animates in once. */}
        <div
          aria-hidden="true"
          className="absolute start-4 top-0 -z-10 h-full w-px bg-line lg:start-0 lg:top-4 lg:h-px lg:w-full"
        />
        <motion.div
          aria-hidden="true"
          initial={{ scale: reduced ? 1 : 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="absolute start-4 top-0 -z-10 h-full w-px origin-top bg-accent/60 lg:start-0 lg:top-4 lg:h-px lg:w-full lg:origin-left"
        />

        {t.processSteps.map((step, i) => (
          <motion.li
            key={step.name}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
            className="flex flex-1 gap-5 lg:flex-col lg:gap-6 lg:pe-8 lg:last:pe-0"
          >
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-accent bg-ground text-2xs font-extrabold text-accent"
            >
              {i + 1}
            </span>
            <div className="flex flex-col gap-2 pt-0.5">
              <span
                data-numeric
                className="font-display text-xs font-extrabold uppercase tracking-[0.1em] text-accent"
              >
                {step.day}
              </span>
              <h3 className="text-lg font-extrabold">{step.name}</h3>
              <p className="max-w-[32ch] text-sm leading-relaxed text-ink-muted">
                {step.body}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16 flex items-center justify-center gap-2.5 text-sm text-ink-muted"
      >
        <WhatsappLogo size={16} weight="fill" className="text-accent" />
        {t.processNote.before}
        <strong className="font-bold text-ink">{t.processNote.emphasis}</strong>
      </motion.p>
    </Section>
  )
}
