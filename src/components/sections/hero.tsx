'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, WhatsappLogo } from '@phosphor-icons/react'
import { hero, site } from '@/content/site'
import { ButtonLink } from '@/components/ui/button'

const waHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`

const EASE = [0.23, 1, 0.32, 1] as const

export function Hero() {
  const reduced = useReducedMotion()

  /** The page's one authored moment: the frame settles, the words resolve. */
  const word = (i: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: '0.5em', filter: 'blur(6px)' },
          animate: { opacity: 1, y: '0em', filter: 'blur(0px)' },
          transition: { duration: 0.9, delay: 0.15 + i * 0.09, ease: EASE },
        }

  return (
    <section id="start" className="relative isolate min-h-[92svh] overflow-hidden">
      {/* Frame */}
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src="/media/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Scrim. Type sits on this, never on raw photography. */}
      <div className="scrim-b absolute inset-0 -z-10" />

      <div className="shell relative flex min-h-[92svh] flex-col justify-end pb-20 pt-32 sm:pb-24">
        <h1 className="max-w-[16ch] text-4xl">
          {hero.headline.map((line, i) => (
            <motion.span key={line} {...word(i)} className="block">
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="measure mt-6 text-lg text-ink-muted"
        >
          Webseiten, Automationen und Werbekampagnen aus einer Hand.{' '}
          <span className="text-ink">{hero.subtextEmphasis}</span>
        </motion.p>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
          className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        >
          <ButtonLink
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            <WhatsappLogo size={17} weight="fill" />
            {hero.primaryCta}
          </ButtonLink>
          <ButtonLink href="#pakete" variant="secondary" size="lg">
            {hero.secondaryCta}
          </ButtonLink>
        </motion.div>

        <motion.ul
          initial={reduced ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-xs font-medium text-ink-subtle"
        >
          {hero.disciplines.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </motion.ul>
      </div>

      <motion.a
        href="#leistungen"
        aria-label="Weiter zu den Leistungen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-7 right-[max(1.25rem,5vw)] hidden h-10 w-10 place-items-center rounded-full border border-line-strong text-ink-muted transition-colors duration-200 hover:border-accent hover:text-accent sm:grid"
      >
        <ArrowDown size={15} weight="bold" />
      </motion.a>
    </section>
  )
}
