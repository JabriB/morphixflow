'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { type DeviceId } from '@/content/site'
import type { Dictionary } from '@/content/dictionary'
import { useContent } from '@/content/use-content'
import { Section, SectionHeading } from '@/components/ui/section'
import { Tabs } from '@/components/ui/tabs'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { useNumberTween } from '@/hooks/use-number-tween'
import { cn } from '@/lib/utils'

const EASE = [0.23, 1, 0.32, 1] as const

function DeviceFrame({ device }: { device: DeviceId }) {
  const { t } = useContent()
  const config = t.showcaseDevices.find((d) => d.id === device)!
  const isDesktop = device === 'desktop'

  return (
    <div
      className={cn(
        'rounded-xl border border-line-strong bg-well p-2',
        device === 'tablet' && 'mx-auto max-w-md',
        device === 'mobile' && 'mx-auto max-w-[240px] rounded-[2rem] border-4 p-2.5',
      )}
    >
      {isDesktop ? (
        <div className="flex items-center gap-1.5 px-2 pb-2">
          <span className="h-2.5 w-2.5 rounded-full bg-fill-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-fill-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-fill-strong" />
          {/* ink-subtle, not ink-faint. Dimmed chrome is realistic, but this
              still carries a readable domain, and ink-faint measures 2.1:1. */}
          <div className="ms-3 flex-1 rounded-sm bg-fill-subtle px-3 py-1 text-2xs text-ink-subtle">
            morphixflow.de
          </div>
        </div>
      ) : device === 'mobile' ? (
        <div className="mx-auto mb-2 h-1.5 w-14 rounded-full bg-fill-strong" />
      ) : null}

      <div
        className="relative overflow-hidden rounded-lg"
        style={{ aspectRatio: `${config.frameWidth} / ${config.frameHeight}` }}
      >
        <Image
          src="/media/service-web.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}

function ComparisonRow({
  metric,
  unit,
  wordpress,
  morphixflow,
  run,
}: Dictionary['performanceComparison'][number] & { run: boolean }) {
  const reduced = useReducedMotion()
  const decimals = wordpress % 1 !== 0 || morphixflow % 1 !== 0 ? 1 : 0
  const max = Math.max(wordpress, morphixflow) * 1.15
  const wpShown = useNumberTween(wordpress, decimals, 1200, run && !reduced)
  const mfShown = useNumberTween(morphixflow, decimals, 1200, run && !reduced)

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-xs font-bold text-ink-muted">{metric}</p>
      <div className="flex items-center gap-3">
        <span className="w-20 shrink-0 text-2xs text-ink-subtle">WordPress</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: run ? `${(wordpress / max) * 100}%` : 0 }}
            transition={{ duration: reduced ? 0 : 1.2, ease: EASE }}
            className="h-full rounded-full bg-ink-faint"
          />
        </div>
        <span data-numeric className="w-14 shrink-0 text-end text-xs text-ink-subtle">
          {reduced ? wordpress : wpShown}{unit}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 shrink-0 text-2xs font-bold text-accent">MorphixFlow</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: run ? `${(morphixflow / max) * 100}%` : 0 }}
            transition={{ duration: reduced ? 0 : 1.2, ease: EASE, delay: 0.1 }}
            className="h-full rounded-full bg-accent"
          />
        </div>
        <span data-numeric className="w-14 shrink-0 text-end text-xs font-bold text-ink">
          {reduced ? morphixflow : mfShown}{unit}
        </span>
      </div>
    </div>
  )
}

export function Showcase() {
  const { t } = useContent()
  const [device, setDevice] = useState<DeviceId>('desktop')
  const [run, setRun] = useState(false)
  const reduced = useReducedMotion()

  return (
    <Section id="handwerk" className="bg-raised">
      <SectionHeading sub={t.showcaseIntro.subtext}>{t.showcaseIntro.heading}</SectionHeading>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div className="flex flex-col gap-6">
          <Tabs
            value={device}
            onChange={setDevice}
            items={t.showcaseDevices.map((d) => ({ value: d.id, label: d.label }))}
            aria-label={t.ui.chooseDevice}
            size="sm"
            className="self-start"
          />

          <SpotlightCard className="rounded-xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={device}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <DeviceFrame device={device} />
              </motion.div>
            </AnimatePresence>
          </SpotlightCard>
        </div>

        <motion.div
          onViewportEnter={() => setRun(true)}
          viewport={{ once: true, margin: '-10% 0px' }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-7 rounded-lg border border-line p-7"
        >
          {t.performanceComparison.map((row) => (
            <ComparisonRow key={row.metric} {...row} run={run} />
          ))}
          <p className="text-2xs text-ink-subtle">{t.showcaseIntro.disclaimer}</p>
        </motion.div>
      </div>
    </Section>
  )
}
