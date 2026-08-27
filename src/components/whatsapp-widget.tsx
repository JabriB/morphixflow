'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { WhatsappLogo, X, Rocket, Lightning, ChatCircleDots } from '@phosphor-icons/react'
import { useContent } from '@/content/use-content'
import { Button, ButtonLink } from '@/components/ui/button'
import { buildWhatsAppLink } from '@/lib/whatsapp'

const EASE = [0.23, 1, 0.32, 1] as const

const icons = {
  Rocket,
  Lightning,
  ChatCircleDots,
} as const

/** A floating quick-start trigger for the marketing page only, never the dashboard or auth flows. */
export function WhatsAppWidget() {
  const { t } = useContent()
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="fixed bottom-6 end-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            id="whatsapp-widget-menu"
            role="group"
            aria-label={t.whatsappWidget.heading}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="flex w-72 flex-col gap-1 rounded-lg border border-line-strong bg-card p-3 shadow-lg"
          >
            <p className="px-2 pb-2 text-xs font-bold text-ink-muted">{t.whatsappWidget.heading}</p>
            {t.whatsappWidget.presets.map((preset) => {
              const Icon = icons[preset.icon as keyof typeof icons]
              return (
                <ButtonLink
                  key={preset.label}
                  href={buildWhatsAppLink(preset.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  className="!justify-start gap-3 text-start"
                  onClick={() => setOpen(false)}
                >
                  <Icon size={16} weight="bold" className="shrink-0 text-accent" />
                  {preset.label}
                </ButtonLink>
              )
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="whatsapp-widget-menu"
        aria-label={t.whatsappWidget.ariaLabel}
        className="h-14 w-14 rounded-full p-0 shadow-lg"
      >
        {open ? <X size={22} weight="bold" /> : <WhatsappLogo size={24} weight="fill" />}
      </Button>
    </div>
  )
}
