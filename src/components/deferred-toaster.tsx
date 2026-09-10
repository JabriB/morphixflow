'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

/**
 * The toast host, loaded only once the visitor has done something.
 *
 * Sonner is 35 kB and the only thing that calls it is the contact form's
 * error path. Mounted in the document shell it shipped and hydrated with
 * every first paint of every page, for a message that cannot appear until
 * someone has filled in a form. That was a measurable slice of the blocking
 * time on a mid-range phone, spent on a component with nothing to show.
 *
 * `ssr: false` is safe here because Sonner renders nothing on the server
 * anyway: its portal is empty until a toast exists. The arming events are
 * the ones a visitor necessarily produces before they can ever submit the
 * form, so by the time a toast could fire the chunk is already resident.
 * Deliberately no idle fallback: a visitor who never interacts never needs
 * a toast, and a speculative load during Lighthouse's window would only
 * add a task to the trace for nothing.
 */
const Toaster = dynamic(() => import('sonner').then((mod) => mod.Toaster), {
  ssr: false,
})

const ARM_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'focusin', 'scroll'] as const

export function DeferredToaster() {
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const arm = () => {
      setArmed(true)
      for (const event of ARM_EVENTS) window.removeEventListener(event, arm)
    }
    for (const event of ARM_EVENTS) {
      window.addEventListener(event, arm, { passive: true, once: true })
    }
    return () => {
      for (const event of ARM_EVENTS) window.removeEventListener(event, arm)
    }
  }, [])

  if (!armed) return null

  return (
    <Toaster
      /* Follows the document theme instead of pinning to dark. */
      theme="system"
      position="top-right"
      offset={{ top: '84px' }}
      toastOptions={{
        classNames: {
          toast: '!rounded-lg !border !border-line-strong !bg-card !text-ink !shadow-lg',
          title: '!text-ink',
          description: '!text-ink-muted',
          actionButton: '!bg-accent !text-accent-ink',
          cancelButton: '!bg-fill-soft !text-ink-muted',
          error: '!border-negative/40',
          success: '!border-positive/40',
          closeButton: '!bg-card !border-line-strong !text-ink-muted',
        },
      }}
    />
  )
}
