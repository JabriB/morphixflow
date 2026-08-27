import { Star } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export function GoogleMark({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.5 7l6.9 5.4c4.1-3.8 6.6-9.4 6.6-15.7z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8.1 41.1 15.5 46 24 46z" />
      <path fill="#FBBC05" d="M11.5 28.4c-.5-1.4-.8-2.9-.8-4.4s.3-3 .7-4.4l-7.1-5.5C2.8 17 2 20.4 2 24s.8 7 2.3 9.9l7.2-5.5z" />
      <path fill="#EA4335" d="M24 10.5c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4.3 29.9 2 24 2 15.5 2 8.1 6.9 4.3 14.1l7.1 5.5c1.9-5.3 6.8-9.1 12.6-9.1z" />
    </svg>
  )
}

export function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div role="img" className="flex gap-0.5" aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          weight="fill"
          className={i < rating ? 'text-notice' : 'text-ink-faint'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

/** A compact Google rating badge. `tone="dark"` for use over photography. */
export function GoogleRatingBadge({
  rating,
  count,
  tone = 'light',
  className,
}: {
  rating: string
  count: number
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 rounded-lg border px-4 py-3',
        tone === 'dark' ? 'border-line-strong bg-ground/50 backdrop-blur-sm' : 'border-line',
        className,
      )}
    >
      <GoogleMark size={18} />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span data-numeric className="text-sm font-extrabold text-ink">
            {rating}
          </span>
          <Stars rating={5} />
        </div>
        <span className="text-2xs text-ink-subtle">{count} Bewertungen</span>
      </div>
    </div>
  )
}
