'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

/** A hairline surface with a radial spotlight that tracks the pointer. Inert on touch/reduced-motion. */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const spotlight = el.querySelector<HTMLElement>('[data-spotlight]')
    if (!spotlight) return

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      spotlight!.style.background = `radial-gradient(400px circle at ${x}% ${y}%, rgb(255 255 255 / 0.06), transparent 40%)`
    }
    function onEnter() {
      spotlight!.style.opacity = '1'
    }
    function onLeave() {
      spotlight!.style.opacity = '0'
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className={cn('relative isolate overflow-hidden', className)}>
      <div
        data-spotlight
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300"
      />
      {children}
    </div>
  )
}
