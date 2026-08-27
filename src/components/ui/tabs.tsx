'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface TabsProps<T extends string> {
  value: T
  onChange: (value: T) => void
  items: { value: T; label: React.ReactNode }[]
  'aria-label': string
  size?: 'sm' | 'md'
  className?: string
}

const sizes = {
  /* min-h rather than h: 44px is the comfortable touch target, but a long
     translated label still has to be free to wrap rather than overflow. */
  sm: 'min-h-11 px-4 py-2 text-xs',
  md: 'min-h-11 px-5 py-2.5 text-sm',
} as const

/** A controlled segmented control. Selection is a sliding shared-layout pill. */
export function Tabs<T extends string>({
  value,
  onChange,
  items,
  size = 'sm',
  className,
  ...aria
}: TabsProps<T>) {
  const reduced = useReducedMotion()
  const layoutId = React.useId()

  return (
    <div
      role="radiogroup"
      aria-label={aria['aria-label']}
      className={cn('inline-flex flex-wrap rounded-md border border-line p-1', className)}
    >
      {items.map((item) => {
        const selected = value === item.value
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(item.value)}
            className={cn(
              'relative flex items-center gap-1.5 rounded-sm font-bold transition-colors duration-200',
              sizes[size],
              selected ? 'text-accent-ink' : 'text-ink-muted hover:text-ink',
            )}
          >
            {selected ? (
              <motion.span
                layoutId={layoutId}
                transition={
                  reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                }
                className="absolute inset-0 -z-10 rounded-sm bg-accent"
              />
            ) : null}
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
