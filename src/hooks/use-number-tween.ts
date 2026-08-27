'use client'

import { useEffect, useRef, useState } from 'react'

/** Tweens a plain number from 0 to `target`, easing out. For bars/metrics, not display strings. */
export function useNumberTween(target: number, decimals = 0, duration = 1400, active = false) {
  const [value, setValue] = useState(0)
  const frame = useRef<number | null>(null)
  const start = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      if (start.current === null) start.current = now
      const t = Math.min((now - start.current) / duration, 1)
      setValue(target * easeOut(t))
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      start.current = null
    }
  }, [target, duration, active])

  return value.toFixed(decimals)
}
