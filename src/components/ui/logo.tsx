import { cn } from '@/lib/utils'

/**
 * MorphixFlow mark.
 *
 * A solid M, cut by a chisel and split at the valley by a hairline slot. Two
 * halves that meet without touching: the same hairline rule the rest of the
 * site is built on, and a restatement of the pitch that separate disciplines
 * interlock without handoffs.
 *
 * Authored geometry, in order of how much each carries:
 *  - The slot. A 1.2/32 channel down the valley, the one detail that makes
 *    this a mark rather than a letter.
 *  - The chisel. Both stem tops cut on the same rising angle, parallel rather
 *    than mirrored, so the form has a direction of travel.
 *  - The middle legs stop at y=26 against a 27 baseline. Landing on the
 *    baseline would spike the vertex and fill in solid when small.
 *  - Only two angles exist in the whole mark, the chisel and the diagonal.
 *
 * ── Both variants share one bounding box ──────────────────────────────────
 * The slot is carved inward from x=15.4 to x=16.6. It is not made by pushing
 * the two halves apart, which would make the primary 1.2 units wider than the
 * compact one and shift the layout every time the variant changed. Both span
 * exactly x 2..30, y 6..27.
 *
 * ── Why there are two variants ────────────────────────────────────────────
 * A hairline has a floor. Below roughly 20px the slot renders under one device
 * pixel and antialiasing turns it into a grey smudge that reads as a rendering
 * fault rather than a deliberate gap. Small sizes use the same letterform with
 * the slot closed.
 */

/** Primary. Two halves, hairline slot carved down the valley. */
const INTERLOCK_LEFT = 'M2 27V8.3L8.4 6l7 11v9l-7-11.4V27H2Z'
const INTERLOCK_RIGHT = 'M30 27V6l-6.4 2.3-7 8.7v9l7-11.4V27h6.4Z'

/** Compact. The identical letterform with the slot closed. */
const SOLID = 'M2 27V8.3L8.4 6 16 17l7.6-8.7L30 6v21h-6.4V14.6L16 26 8.4 14.6V27H2Z'

/**
 * Tight viewBox around the ink, not the 32 grid the paths were drawn on.
 *
 * This is what makes the mark alignable. With the box equal to the ink, the
 * element's bottom edge *is* the mark's baseline, so a parent using
 * `align-items: baseline` seats it on the text baseline with no magic offset.
 * A padded viewBox leaves dead space that silently drops the mark below the
 * line it is supposed to sit on.
 */
const INK_VIEWBOX = '2 6 28 21'

export function LogoMark({
  className,
  title,
  compact = false,
}: {
  className?: string
  title?: string
  /** Closes the slot. Use at or below 20px, and inside the favicon chip. */
  compact?: boolean
}) {
  return (
    <svg
      viewBox={INK_VIEWBOX}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn('h-7 w-auto', className)}
    >
      {compact ? (
        <path d={SOLID} fill="currentColor" />
      ) : (
        <>
          <path d={INTERLOCK_LEFT} fill="currentColor" />
          <path d={INTERLOCK_RIGHT} fill="currentColor" />
        </>
      )}
    </svg>
  )
}

/**
 * Mark plus wordmark.
 *
 * Aligned on the baseline rather than centred. A flex item that is a replaced
 * element takes its baseline from its bottom margin edge, so with the tight
 * viewBox above the mark's feet land exactly on the wordmark's baseline, which
 * is where the eye expects them.
 *
 * Both the mark's height and the gap are set in `em`, so the lockup scales as
 * one object through the fluid type scale. A fixed-pixel gap silently tightens
 * as the wordmark grows.
 *
 * Cabinet Grotesk's cap height measures 0.667em. The mark is set to 0.72em, an
 * 8% overshoot: enough presence to read as a mark rather than a letter, and
 * compensation for the chiselled top, whose upper edge mostly sits below its
 * peak. It was 0.78em, which measured as a 17% overshoot and looked top-heavy.
 *
 * The wordmark stays live text rather than outlined paths: sharper at small
 * sizes, and it inherits the site's own font loading.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-[0.4em] font-display text-lg font-extrabold tracking-tight text-ink',
        className,
      )}
    >
      <LogoMark className="h-[0.72em] text-accent" />
      <span>MorphixFlow</span>
    </span>
  )
}
