'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { services, servicesIntro } from '@/content/site'
import { Section, SectionHeading } from '@/components/ui/section'

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * An index, not a card grid. Each service is a full-width row on a
 * hairline, with the name at display weight and the detail set beside it.
 */
export function Services() {
  const reduced = useReducedMotion()

  return (
    <Section id="leistungen">
      <SectionHeading sub={servicesIntro.subtext}>
        {servicesIntro.heading}
      </SectionHeading>

      <ul className="mt-16 border-t border-line">
        {services.map((service, i) => (
          <motion.li
            key={service.slug}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            className="group border-b border-line"
          >
            <div className="grid items-start gap-x-10 gap-y-5 py-10 md:grid-cols-12 md:py-12">
              <h3 className="text-xl font-extrabold md:col-span-4">
                {service.name}
              </h3>

              <div className="md:col-span-5">
                <p className="measure text-base text-ink-muted">{service.body}</p>
                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-ink-subtle">
                  {service.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-3">
                <div className="relative aspect-4/3 overflow-hidden rounded-lg">
                  <Image
                    src={`/media/service-${service.slug}.jpg`}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 22vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
