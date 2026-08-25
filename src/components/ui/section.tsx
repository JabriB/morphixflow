import { cn } from '@/lib/utils'

/**
 * Section shell. Deliberately has no eyebrow/kicker slot: the heading
 * carries its own weight.
 */
export function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-16 py-24 sm:py-32', className)}
    >
      <div className="shell">{children}</div>
    </section>
  )
}

export function SectionHeading({
  children,
  sub,
  className,
}: {
  children: React.ReactNode
  sub?: string
  className?: string
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <h2 className="text-3xl">{children}</h2>
      {sub ? <p className="measure mt-5 text-lg text-ink-muted">{sub}</p> : null}
    </div>
  )
}
