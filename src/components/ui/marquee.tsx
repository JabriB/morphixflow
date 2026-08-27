'use client'

import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Continuous horizontal ticker. The list is rendered twice and the track
 * travels exactly -50%, so the loop is seamless. Motion lives entirely in
 * a CSS keyframe rather than a rAF loop, so it costs no main-thread work
 * and keeps running while React is busy elsewhere.
 *
 * Under reduced motion the track is replaced by a static wrapped row, not
 * a paused animation: a stopped ticker mid-cycle would clip its items.
 */
export function Marquee({
  items,
  durationSeconds = 42,
  className,
  itemClassName,
}: {
  items: readonly string[]
  durationSeconds?: number
  className?: string
  itemClassName?: string
}) {
  const reduced = useReducedMotion()

  const item = (label: string, key: string, hidden?: boolean) => (
    <li
      key={key}
      aria-hidden={hidden || undefined}
      className={cn(
        /* ink-subtle, not ink-faint: these are readable tool names, and
           ink-faint only reaches 2.1:1 on the raised surface. */
        'shrink-0 font-display text-lg font-extrabold tracking-tight text-ink-subtle transition-colors duration-300 hover:text-ink',
        itemClassName,
      )}
    >
      {label}
    </li>
  )

  if (reduced) {
    return (
      <ul className={cn('flex flex-wrap justify-center gap-x-8 gap-y-3', className)}>
        {items.map((label) => item(label, label))}
      </ul>
    )
  }

  return (
    <div className={cn('marquee-host marquee-mask overflow-hidden', className)}>
      <ul
        className="marquee-track flex w-max items-center gap-x-12"
        style={{ ['--marquee-duration' as string]: `${durationSeconds}s` }}
      >
        {items.map((label) => item(label, label))}
        {/* Duplicate carries the loop. Hidden from assistive tech so each
            name is announced exactly once. */}
        {items.map((label) => item(label, `${label}-echo`, true))}
      </ul>
    </div>
  )
}
