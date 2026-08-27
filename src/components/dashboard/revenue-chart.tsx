'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { revenueChart, revenueSeries } from '@/content/dashboard'
import { cn } from '@/lib/utils'

const EASE = [0.23, 1, 0.32, 1] as const
const max = Math.max(...revenueSeries.map((d) => d.value))
const fmt = new Intl.NumberFormat('de-DE')

/**
 * Single-series magnitude over time.
 *
 * One hue at two steps: recessive for history, accent for the current month.
 * No legend, because one series is named by the title. Direct label only on
 * the emphasised bar and whatever is hovered. Hover tooltip on every mark.
 *
 * Bars top out at 86% of the plot box so a direct label always has headroom
 * and never lands on the fill.
 */
const CEILING = 86

export function RevenueChart() {
  const reduced = useReducedMotion()
  const [hover, setHover] = useState<number | null>(null)
  const last = revenueSeries.length - 1

  return (
    <section className="rounded-lg border border-line bg-card p-6">
      <h2 className="text-sm font-bold text-ink">{revenueChart.title}</h2>

      <div className="mt-6">
        <ul className="relative flex h-44 items-end gap-2">
          {revenueSeries.map((d, i) => {
            const pct = (d.value / max) * CEILING
            const isLast = i === last
            const isHover = hover === i
            const labelled = isLast || isHover

            return (
              <li
                key={d.month}
                tabIndex={0}
                aria-label={`${d.month}: ${fmt.format(d.value)} ${revenueChart.unit}`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="relative flex h-full flex-1 items-end rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {labelled && (
                  <span
                    data-numeric
                    style={{ bottom: `calc(${pct}% + 7px)` }}
                    className={cn(
                      'pointer-events-none absolute inset-x-0 text-center text-2xs font-bold tabular-nums',
                      isHover ? 'text-ink' : 'text-ink-muted',
                    )}
                  >
                    {fmt.format(d.value)}
                  </span>
                )}

                <motion.span
                  initial={reduced ? { height: `${pct}%` } : { height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: EASE }}
                  className={cn(
                    'w-full rounded-t-[4px] transition-colors duration-200',
                    isLast ? 'bg-accent' : isHover ? 'bg-ink-faint' : 'bg-fill-strong',
                  )}
                />
              </li>
            )
          })}
        </ul>

        <div className="h-px w-full bg-line-strong" />

        <ul className="mt-2.5 flex gap-2">
          {revenueSeries.map((d, i) => (
            <li
              key={d.month}
              className={cn(
                'flex-1 text-center text-2xs transition-colors duration-200',
                hover === i || i === last ? 'text-ink-muted' : 'text-ink-subtle',
              )}
            >
              {d.month}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
