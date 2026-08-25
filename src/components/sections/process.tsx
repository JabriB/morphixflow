'use client'

import { motion, useReducedMotion } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { processIntro, processSteps, processNote } from '@/content/site'
import { Section, SectionHeading } from '@/components/ui/section'

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * Ordinals are kept here because the sequence genuinely carries
 * information: these steps happen in this order.
 */
export function Process() {
  const reduced = useReducedMotion()

  return (
    <Section id="prozess" className="bg-raised">
      <SectionHeading sub={processIntro.subtext}>
        {processIntro.heading}
      </SectionHeading>

      <ol className="mt-16 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <motion.li
            key={step.name}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
            className="flex flex-col gap-4 bg-ground p-7 lg:p-8"
          >
            <span
              data-numeric
              className="font-display text-sm font-extrabold text-accent"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-lg font-extrabold">{step.name}</h3>
            <p className="text-sm leading-relaxed text-ink-muted">{step.body}</p>
          </motion.li>
        ))}
      </ol>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 flex items-center justify-center gap-2.5 text-sm text-ink-muted"
      >
        <WhatsappLogo size={16} weight="fill" className="text-accent" />
        {processNote.before}
        <strong className="font-bold text-ink">{processNote.emphasis}</strong>
      </motion.p>
    </Section>
  )
}
