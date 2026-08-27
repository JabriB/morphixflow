'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { type ServiceSlug } from '@/content/site'
import { useContent } from '@/content/use-content'
import { Section, SectionHeading } from '@/components/ui/section'
import { Tabs } from '@/components/ui/tabs'
import { TiltCard } from '@/components/ui/tilt-card'
import { useCountUp } from '@/hooks/use-count-up'

type Filter = ServiceSlug | 'all'

const EASE = [0.23, 1, 0.32, 1] as const

function Figure({ value, label, run }: { value: string; label: string; run: boolean }) {
  const reduced = useReducedMotion()
  const shown = useCountUp(value, 1600, run && !reduced)
  return (
    <div className="flex flex-col gap-1.5 px-2 py-6 sm:px-6">
      <span
        data-numeric
        className="font-display text-2xl font-extrabold tracking-tight text-ink"
      >
        {reduced ? value : shown}
      </span>
      <span className="text-xs font-medium text-ink-subtle">{label}</span>
    </div>
  )
}

export function Results() {
  const { t } = useContent()
  const reduced = useReducedMotion()
  const [run, setRun] = useState(false)
  const [filter, setFilter] = useState<Filter>('all')

  const indexed = useMemo(
    () => t.projects.map((p, i) => ({ ...p, image: i + 1 })),
    [t.projects],
  )
  const filtered = useMemo(
    () => (filter === 'all' ? indexed : indexed.filter((p) => p.slug === filter)),
    [indexed, filter],
  )

  return (
    <Section id="ergebnisse">
      <SectionHeading sub={t.resultsIntro.subtext}>
        {t.resultsIntro.heading}
      </SectionHeading>

      <motion.div
        onViewportEnter={() => setRun(true)}
        viewport={{ once: true, margin: '-10% 0px' }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mt-14 grid grid-cols-2 divide-x divide-y divide-line border-y border-line sm:grid-cols-4 sm:divide-y-0"
      >
        {t.figures.map((f) => (
          <Figure key={f.label} value={f.value} label={f.label} run={run} />
        ))}
      </motion.div>

      <div className="mt-20 flex flex-wrap items-center justify-between gap-6">
        <h3 className="text-xl font-extrabold">{t.resultsIntro.projectsHeading}</h3>
        <Tabs
          value={filter}
          onChange={setFilter}
          items={[
            { value: 'all', label: t.resultsIntro.filterAll },
            ...t.services.map((s) => ({ value: s.slug, label: s.name })),
          ]}
          aria-label={t.ui.filterProjects}
          size="sm"
        />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => {
          const domain = `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.de`
          return (
            <motion.article
              key={project.name}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            >
              <TiltCard className="group overflow-hidden rounded-xl border border-line-strong bg-well p-2 transition-colors duration-300 hover:border-accent/40">
              <div className="flex items-center gap-1.5 px-2 pb-2">
                <span className="h-2 w-2 rounded-full bg-fill-strong" />
                <span className="h-2 w-2 rounded-full bg-fill-strong" />
                <span className="h-2 w-2 rounded-full bg-fill-strong" />
                <span className="ms-2 truncate rounded-sm bg-fill-subtle px-3 py-1 text-2xs text-ink-subtle">
                  {domain}
                </span>
              </div>
              <div className="relative isolate aspect-4/5 overflow-hidden rounded-lg sm:aspect-4/3">
                <Image
                  src={`/media/project-${project.image}.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                />
                <div className="scrim-b absolute inset-0 -z-10" />
                <div className="flex h-full flex-col justify-end gap-2 p-6">
                  <p className="text-2xs font-bold uppercase tracking-[0.14em] text-ink-subtle">
                    {project.category}
                  </p>
                  <h4 className="text-lg font-extrabold">{project.name}</h4>
                  <p className="text-sm font-bold text-accent">{project.result}</p>
                </div>
              </div>
              </TiltCard>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}
