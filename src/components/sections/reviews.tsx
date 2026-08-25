'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Star } from '@phosphor-icons/react'
import { reviews, reviewsIntro, site } from '@/content/site'
import { Section, SectionHeading } from '@/components/ui/section'
import { ButtonLink } from '@/components/ui/button'

const EASE = [0.23, 1, 0.32, 1] as const
const waHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`

const average = (
  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
).toFixed(1)

function GoogleMark({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.5 7l6.9 5.4c4.1-3.8 6.6-9.4 6.6-15.7z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8.1 41.1 15.5 46 24 46z" />
      <path fill="#FBBC05" d="M11.5 28.4c-.5-1.4-.8-2.9-.8-4.4s.3-3 .7-4.4l-7.1-5.5C2.8 17 2 20.4 2 24s.8 7 2.3 9.9l7.2-5.5z" />
      <path fill="#EA4335" d="M24 10.5c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4.3 29.9 2 24 2 15.5 2 8.1 6.9 4.3 14.1l7.1 5.5c1.9-5.3 6.8-9.1 12.6-9.1z" />
    </svg>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <div role="img" className="flex gap-0.5" aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={13}
          weight="fill"
          className={i < rating ? 'text-notice' : 'text-ink-faint'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

/**
 * Quotes as editorial text blocks on a hairline grid. No card chrome:
 * the testimonial is the content, the container was never the point.
 */
export function Reviews() {
  const reduced = useReducedMotion()

  return (
    <Section id="stimmen" className="bg-raised">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading sub={reviewsIntro.subtext}>
          {reviewsIntro.heading}
        </SectionHeading>

        <div className="flex items-center gap-3 rounded-lg border border-line px-4 py-3">
          <GoogleMark size={18} />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span data-numeric className="text-sm font-extrabold text-ink">
                {average}
              </span>
              <Stars rating={5} />
            </div>
            <span className="text-2xs text-ink-subtle">
              {reviews.length} Bewertungen
            </span>
          </div>
        </div>
      </div>

      <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <motion.li
            key={review.name}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: EASE }}
            className="flex flex-col gap-4 bg-raised p-7"
          >
            <Stars rating={review.rating} />
            <blockquote className="flex-1 text-sm leading-relaxed text-ink-muted">
              {review.body}
            </blockquote>
            <footer className="flex items-center justify-between gap-3 border-t border-line pt-4">
              <div>
                <p className="text-sm font-bold text-ink">{review.name}</p>
                <p className="text-2xs text-ink-subtle">{review.when}</p>
              </div>
              <GoogleMark size={15} />
            </footer>
          </motion.li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
        <p className="text-base text-ink-muted">{reviewsIntro.ctaLine}</p>
        <ButtonLink href={waHref} target="_blank" rel="noopener noreferrer">
          {reviewsIntro.ctaLabel}
        </ButtonLink>
      </div>
    </Section>
  )
}
