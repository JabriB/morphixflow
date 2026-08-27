'use client'

import Image from 'next/image'
import { ArrowDown, ShieldCheck, WhatsappLogo } from '@phosphor-icons/react'
import { useContent } from '@/content/use-content'
import { ButtonLink } from '@/components/ui/button'
import { GoogleRatingBadge } from '@/components/ui/google-rating'
import { RevealLines } from '@/components/ui/reveal-text'
import { cn } from '@/lib/utils'
import { buildWhatsAppLink } from '@/lib/whatsapp'

const waHref = buildWhatsAppLink()

export function Hero() {
  const { t, rtl } = useContent()
  /* Derived here rather than at module scope: the review set now comes from
     the active locale, so it cannot be computed once at import time. */
  const average = (
    t.reviews.reduce((sum, r) => sum + r.rating, 0) / t.reviews.length
  ).toFixed(1)


  return (
    <section id="start" className="relative isolate min-h-[92svh] overflow-hidden">
      {/* Frame */}
      <div className="reveal-frame absolute inset-0 -z-20">
        {/*
          The subject sits on the right of the frame and the dark wall on the
          left, which is why the LTR layout works: type on the left, person on
          the right, no collision.

          Under RTL the type moves to the right and lands on top of him. Shifting
          `object-position` cannot fix that: with `object-cover` it only chooses
          which slice of the photo is visible, so favouring the left crops the
          person away rather than moving him. Mirroring the frame does move him,
          to the left, leaving the emptier wall behind the Arabic text.

          Safe to mirror here because the photograph contains no legible text,
          signage or logo, only out-of-focus interface panels. `object-right`
          stays on both, since object-position is resolved before the transform,
          so the same slice is shown either way.
        */}
        <Image
          src="/media/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={cn('object-cover object-right', rtl && 'scale-x-[-1]')}
        />
      </div>

      {/* Scrim. Type sits on this, never on raw photography. */}
      <div className="scrim-b absolute inset-0 -z-10" />

      {/* Second, horizontal scrim: a dark field under the type column so the
          copy clears AA instead of fighting the photograph behind it. It has
          to travel with the text, so the gradient direction flips with dir.
          `to right` in RTL darkens the right, which is where the type now is. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to ${rtl ? 'left' : 'right'}, rgb(var(--scrim-rgb) / 0.92) 0%, rgb(var(--scrim-rgb) / 0.72) 34%, rgb(var(--scrim-rgb) / 0.15) 68%, rgb(var(--scrim-rgb) / 0) 100%)`,
        }}
      />

      {/* Vignette. Pulls the eye to the type column and hides the stock
          photograph's flat corners. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 45%, transparent 40%, rgb(var(--scrim-rgb) / 0.55) 100%)',
        }}
      />

      <div className="shell relative flex min-h-[92svh] flex-col justify-end pb-20 pt-32 sm:pb-24">
        <RevealLines
          as="h1"
          lines={t.hero.headline}
          delay={0.15}
          className="max-w-[16ch] text-4xl"
        />

        <p
          className="reveal-fade-up measure mt-6 text-lg text-ink-muted"
          style={{ animationDelay: '0.5s' }}
        >
          {t.hero.subtextLead}{' '}
          <span className="text-ink">{t.hero.subtextEmphasis}</span>
        </p>

        <div
          className="reveal-fade-up mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: '0.62s' }}
        >
          <ButtonLink
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            <WhatsappLogo size={17} weight="fill" />
            {t.hero.primaryCta}
          </ButtonLink>
          <ButtonLink href="#pakete" variant="secondary" size="lg">
            {t.hero.secondaryCta}
          </ButtonLink>
        </div>

        {/* Proof sits together as one band under the CTAs, rather than
            interrupting the type block between subtext and buttons. */}
        <div
          className="reveal-fade-up mt-7 flex flex-wrap items-center gap-x-5 gap-y-3"
          style={{ animationDelay: '0.72s' }}
        >
          <GoogleRatingBadge rating={average} count={t.reviews.length} tone="dark" />
          <p className="flex items-center gap-2 text-xs text-ink-subtle">
            <ShieldCheck size={14} weight="bold" className="text-accent" aria-hidden="true" />
            {t.hero.trustNote}
          </p>
        </div>

      </div>

      <a
        href="#leistungen"
        aria-label={t.hero.scrollLabel}
        style={{ animationDelay: '1.4s' }}
        className="reveal-fade-up absolute bottom-7 end-[max(1.25rem,5vw)] hidden h-10 w-10 place-items-center rounded-full border border-line-strong text-ink-muted transition-colors duration-200 hover:border-accent hover:text-accent sm:grid"
      >
        <ArrowDown size={15} weight="bold" />
      </a>
    </section>
  )
}
