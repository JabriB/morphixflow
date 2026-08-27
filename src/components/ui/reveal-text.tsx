'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * Masked type reveal. Each line sits inside an `overflow-hidden` clip and
 * rises into it, so the words appear to be uncovered rather than faded in.
 * This is the page's signature type move; it is used sparingly, on the two
 * headlines that carry the argument.
 *
 * `pb-[0.12em]` on the clip reserves descender room. Without it the clip
 * shaves the tails off g, y, p and j at display sizes.
 */
export function RevealLines({
  lines,
  as: Tag = 'span',
  trigger = 'mount',
  delay = 0,
  stagger = 0.09,
  className,
  lineClassName,
}: {
  lines: readonly string[]
  as?: 'span' | 'div' | 'h1' | 'h2' | 'p'
  /** `mount` for above-the-fold type, `view` for anything further down. */
  trigger?: 'mount' | 'view'
  delay?: number
  stagger?: number
  className?: string
  lineClassName?: string
}) {
  const reduced = useReducedMotion()

  /*
   * Mount reveals run on CSS, not Motion.
   *
   * Motion renders the hidden start state on the server and only animates
   * after hydration, so an above-the-fold headline stays invisible until the
   * JS bundle has parsed and run. That put 3.9s of render delay in front of
   * LCP on throttled mobile. A CSS animation runs from the browser's first
   * paint, so the text is on screen while it moves.
   *
   * `trigger="view"` still uses Motion, because scroll triggering genuinely
   * needs an observer and those sections are below the fold anyway.
   */
  if (trigger === 'mount') {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span
            key={line}
            className={cn('block overflow-hidden pb-[0.12em]', lineClassName)}
          >
            <span
              className="reveal-rise block"
              style={{ animationDelay: `${delay + i * stagger}s` }}
            >
              {line}
            </span>
          </span>
        ))}
      </Tag>
    )
  }

  const inner: Variants = reduced
    ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
    : { hidden: { y: '110%' }, shown: { y: '0%' } }

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={line}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '-12% 0px' }}
          className={cn('block overflow-hidden pb-[0.12em]', lineClassName)}
        >
          <motion.span
            variants={inner}
            transition={{
              duration: reduced ? 0.3 : 0.85,
              delay: delay + i * stagger,
              ease: EASE,
            }}
            className="block"
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  )
}

/**
 * Word-level stagger for body-scale editorial copy. Words are the right
 * grain here: character splitting at this size reads as an effect, and it
 * shatters the text for screen readers.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  if (reduced) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay }}
        className={className}
      >
        {text}
      </motion.span>
    )
  }

  return (
    <motion.span
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ staggerChildren: 0.022, delayChildren: delay }}
      className={className}
    >
      {/*
        The phrase is exposed once as plain text and the animated copy is
        hidden, rather than labelling this span with `aria-label`.

        `aria-label` is only permitted on elements with a role that supports a
        name. A bare span has none, so labelling it is invalid ARIA: assistive
        tech may ignore it and read the shattered per-word spans instead, and
        it fails both the accessibility and agentic-browsing audits. This
        version gives screen readers and agents one clean, uninterrupted string.
      */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            variants={{
              hidden: { opacity: 0, y: '0.4em', filter: 'blur(4px)' },
              shown: { opacity: 1, y: '0em', filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-block whitespace-pre"
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </span>
    </motion.span>
  )
}
