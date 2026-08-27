'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useContent } from '@/content/use-content'
import { RevealLines, RevealWords } from '@/components/ui/reveal-text'

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * The page's one editorial pause. Every other section presents a list;
 * this one makes an argument, at display scale, with nothing else on the
 * screen competing for attention. Deliberately does not use `Section`:
 * the wider measure and the centred rule are the point of the break.
 */
export function Statement() {
  const { t } = useContent()
  const reduced = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden border-y border-line bg-raised py-28 sm:py-40">
      {/* A single low, wide accent wash anchoring the type. Sits under
          everything and never touches a readable edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-80 opacity-[0.07] blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 100%, var(--color-accent), transparent 70%)',
        }}
      />

      <div className="shell">
        <blockquote className="mx-auto max-w-4xl text-center">
          <RevealLines
            as="div"
            trigger="view"
            lines={[t.statement.lead]}
            className="font-display text-2xl font-extrabold leading-[1.1] tracking-tight text-ink-subtle sm:text-3xl"
          />
          <RevealLines
            as="div"
            trigger="view"
            delay={0.14}
            lines={[t.statement.emphasis]}
            className="mt-2 font-display text-2xl font-extrabold leading-[1.1] tracking-tight text-accent sm:text-3xl"
          />

          <motion.div
            initial={reduced ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="mx-auto mt-10 h-px w-24 origin-center bg-line-strong"
          />

          <p className="mx-auto mt-10 max-w-2xl text-base text-ink-muted sm:text-lg">
            <RevealWords text={t.statement.body} delay={0.1} />
          </p>

          <motion.footer
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="mt-9 text-xs font-medium uppercase tracking-[0.08em] text-ink-subtle"
          >
            <cite className="not-italic">{t.statement.signature}</cite>
          </motion.footer>
        </blockquote>
      </div>
    </section>
  )
}
