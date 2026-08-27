'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useContent } from '@/content/use-content'
import { Section, SectionHeading } from '@/components/ui/section'
import { ButtonLink } from '@/components/ui/button'
import { GoogleMark, GoogleRatingBadge, Stars } from '@/components/ui/google-rating'
import { buildWhatsAppLink } from '@/lib/whatsapp'

const EASE = [0.23, 1, 0.32, 1] as const
const waHref = buildWhatsAppLink()

/**
 * Quotes as editorial text blocks on a hairline grid. No card chrome:
 * the testimonial is the content, the container was never the point.
 */
export function Reviews() {
  const { t } = useContent()
  const reduced = useReducedMotion()

  /* Derived here rather than at module scope: the review set now comes from
     the active locale, so it cannot be computed once at import time. */
  const average = (
    t.reviews.reduce((sum, r) => sum + r.rating, 0) / t.reviews.length
  ).toFixed(1)

  return (
    <Section id="stimmen" className="bg-raised">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading sub={t.reviewsIntro.subtext}>
          {t.reviewsIntro.heading}
        </SectionHeading>

        <GoogleRatingBadge rating={average} count={t.reviews.length} />
      </div>

      <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {t.reviews.map((review, i) => (
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
        <p className="text-base text-ink-muted">{t.reviewsIntro.ctaLine}</p>
        <ButtonLink href={waHref} target="_blank" rel="noopener noreferrer">
          {t.reviewsIntro.ctaLabel}
        </ButtonLink>
      </div>
    </Section>
  )
}
