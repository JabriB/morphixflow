'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Counts a display string like "50+", "98%", "3x", "24h" up from zero,
 * preserving whatever suffix the value carries.
 */
export function useCountUp(raw: string, duration = 1600, active = false) {
  const [display, setDisplay] = useState('0')
  const frame = useRef<number | null>(null)
  const start = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return

    const end = parseFloat(raw.replace(/[^0-9.]/g, ''))
    const suffix = raw.replace(/[\d.,]+/, '')

    if (Number.isNaN(end)) {
      setDisplay(raw)
      return
    }

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      if (start.current === null) start.current = now
      const t = Math.min((now - start.current) / duration, 1)
      const value = end * easeOut(t)
      const rounded = end % 1 === 0 ? Math.round(value) : value.toFixed(1)
      setDisplay(`${rounded}${suffix}`)
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      start.current = null
    }
  }, [raw, duration, active])

  return display
}
