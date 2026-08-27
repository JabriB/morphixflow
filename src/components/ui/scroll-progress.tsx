'use client'

import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

/** Page-read progress under the header. Driven by motion values, never React state. */
export function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
    />
  )
}
