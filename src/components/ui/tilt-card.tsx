'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

const SPRING = { stiffness: 260, damping: 26, mass: 0.6 } as const

const finePointer = {
  subscribe(onChange: () => void) {
    const mq = window.matchMedia('(pointer: fine)')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  },
  get: () => window.matchMedia('(pointer: fine)').matches,
  /** Server and first client render agree on false, so hydration stays stable. */
  getServer: () => false,
}

/**
 * Subtle 3D tilt tracking the pointer. Motion values only, so the React
 * tree never re-renders per frame. Inert on touch and reduced motion.
 */
export function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: React.ReactNode
  className?: string
  max?: number
}) {
  const reduced = useReducedMotion()
  const fine = React.useSyncExternalStore(
    finePointer.subscribe,
    finePointer.get,
    finePointer.getServer,
  )

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), SPRING)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), SPRING)

  const active = fine && !reduced

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!active) return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onPointerLeave() {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={active ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
