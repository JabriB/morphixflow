'use client'

import { useEffect, type RefObject } from 'react'

const PULL = 7 // px, max offset toward the pointer
const GLOW_RADIUS = 130 // px

/**
 * Gentle pointer-tracking pull + optional accent glow, on the same node
 * (no wrapper div). Uses the standalone `translate` CSS property so it
 * composes with Tailwind's `scale-*` utilities instead of fighting them
 * over `transform`. Fully inert on touch and reduced-motion.
 */
export function useMagnetic(ref: RefObject<HTMLElement | null>, glow: boolean) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect()
      const relX = e.clientX - rect.left
      const relY = e.clientY - rect.top
      const dx = (relX / rect.width - 0.5) * PULL * 2
      const dy = (relY / rect.height - 0.5) * PULL * 2
      el!.style.translate = `${dx}px ${dy}px`

      if (glow) {
        const gx = (relX / rect.width) * 100
        const gy = (relY / rect.height) * 100
        el!.style.backgroundImage = `radial-gradient(${GLOW_RADIUS}px circle at ${gx}% ${gy}%, rgb(45 212 167 / 0.3), transparent 70%)`
      }
    }

    function onLeave() {
      el!.style.translate = ''
      if (glow) el!.style.backgroundImage = ''
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.style.translate = ''
      if (glow) el.style.backgroundImage = ''
    }
  }, [ref, glow])
}
