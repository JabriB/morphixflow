'use client'

import { useContent } from '@/content/use-content'
import { Marquee } from '@/components/ui/marquee'

/**
 * Credibility strip under the t.hero. Labelled "Gebaut mit" on purpose:
 * these are the tools used in delivery, not client logos. Presenting a
 * tool list as if it were a customer list is the cheap version of this
 * pattern and it is the first thing an informed buyer catches.
 */
export function Toolchain() {
  const { t } = useContent()
  return (
    <section
      aria-labelledby="toolchain-label"
      className="border-y border-line bg-raised py-10"
    >
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
        <p
          id="toolchain-label"
          className="shrink-0 text-2xs font-bold uppercase tracking-[0.16em] text-ink-subtle"
        >
          {t.toolchain.label}
        </p>
        {/* min-w-0 lets the marquee shrink inside the flex row instead of
            forcing the whole strip wider than the viewport. */}
        <div className="min-w-0 flex-1">
          <Marquee items={t.toolchain.items} durationSeconds={46} />
        </div>
      </div>
    </section>
  )
}
