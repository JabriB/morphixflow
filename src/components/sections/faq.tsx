'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Plus } from '@phosphor-icons/react'
import { useContent } from '@/content/use-content'
import { Section } from '@/components/ui/section'
import { cn } from '@/lib/utils'
import { buildWhatsAppLink } from '@/lib/whatsapp'

const EASE = [0.23, 1, 0.32, 1] as const

function Item({
  q,
  a,
  open,
  onToggle,
  index,
}: {
  q: string
  a: string
  open: boolean
  onToggle: () => void
  index: number
}) {
  const reduced = useReducedMotion()
  const id = useId()
  const panelId = `${id}-panel`
  const buttonId = `${id}-button`

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
      className="border-b border-line"
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-start justify-between gap-6 py-6 text-start"
        >
          {/* Open question reads at full accent, closed ones recede. */}
          <span
            className={cn(
              'font-display text-lg font-extrabold tracking-tight transition-colors duration-200',
              open ? 'text-accent' : 'text-ink group-hover:text-ink-muted',
            )}
          >
            {q}
          </span>
          <span
            aria-hidden="true"
            className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-strong text-ink-muted transition-colors duration-200 group-hover:border-accent group-hover:text-accent"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.32, ease: EASE }}
              className="grid place-items-center"
            >
              <Plus size={14} weight="bold" />
            </motion.span>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="panel"
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.36, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="measure pb-7 text-base text-ink-muted">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

export function Faq() {
  const { t } = useContent()
  const reduced = useReducedMotion()
  /** One open at a time: the list stays scannable and the page never jumps. */
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  /* Built here, not at module scope: the prefilled message is translated. */
  const waHref = buildWhatsAppLink(t.ui.askQuestionMessage)

  return (
    <Section id="faq" className="border-t border-line bg-raised">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Sticky aside. Breaks the page's heading-on-top rhythm. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-3xl">{t.faqIntro.heading}</h2>
          <p className="measure mt-5 text-lg text-ink-muted">{t.faqIntro.subtext}</p>

          <motion.a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent no-underline transition-opacity duration-200 hover:opacity-80"
          >
            {t.ui.askQuestion}
            <span aria-hidden="true">→</span>
          </motion.a>
        </div>

        <div className="border-t border-line">
          {t.faqs.map((f, i) => (
            <Item
              key={f.q}
              q={f.q}
              a={f.a}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
