'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'
export const DEFAULT_THEME: Theme = 'dark'

/* `storage` only fires in *other* tabs, so same-tab updates need their own
   signal for the store to re-read. Dispatching it also keeps two open tabs
   in sync for free. */
const CHANGE_EVENT = 'mf-theme-change'

/** Length of the cross-fade when the theme flips. Mirrors the CSS duration. */
const TRANSITION_MS = 240

/**
 * Applies a theme to the document and persists it.
 *
 * The transition is enabled only for the duration of the switch, via a class on
 * <html>, rather than living permanently on every element. A standing
 * `transition: background-color` on `*` would also animate every hover state on
 * the page and make buttons feel laggy.
 */
export function applyTheme(theme: Theme) {
  const root = document.documentElement

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (!reduced) {
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), TRANSITION_MS)
  }

  root.setAttribute('data-theme', theme)

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable (private mode, cookies blocked). The choice
    // still applies to this page view; it just will not survive a reload.
  }

  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/**
 * localStorage is an external, mutable store, so it is read through
 * `useSyncExternalStore` rather than copied into state inside an effect.
 */
const themeStore = {
  subscribe(onChange: () => void) {
    window.addEventListener('storage', onChange)
    window.addEventListener(CHANGE_EVENT, onChange)
    return () => {
      window.removeEventListener('storage', onChange)
      window.removeEventListener(CHANGE_EVENT, onChange)
    }
  },
  getSnapshot(): Theme {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : DEFAULT_THEME
    } catch {
      return DEFAULT_THEME
    }
  },
  /* Dark on the server and for the hydration pass, matching the default the
     inline script applies, so the markup agrees and nothing flashes. */
  getServerSnapshot(): Theme {
    return DEFAULT_THEME
  },
}

/**
 * Two-state theme switch: light or dark, dark by default.
 *
 * ── Geometry ──────────────────────────────────────────────────────────────
 * The track is 72px. The 1px border and 3px of padding leave a 64px interior
 * split into two exact 32px halves. The thumb is 32px and travels exactly 32px, so it
 * lands flush inside the padding at both ends. The previous version used a
 * 68px track with a 36px travel, which pushed the thumb 4px past the padding
 * and made the control look lopsided in dark mode. Halves, thumb and travel
 * are now the same number, so the two states are symmetrical by construction.
 * The padding is 3px rather than 4px precisely because the border occupies the
 * first pixel: with p-1 the thumb sat 5px from one end and 3px from the other,
 * which is small enough to look like a rendering artefact and not a mistake.
 *
 * ── Colour ────────────────────────────────────────────────────────────────
 * The thumb is ink, not accent. The design system reserves jade for things
 * whose *purpose* is the primary action, and the page already spends it on
 * every CTA; a jade blob in the header competes with them. Ink against the
 * track reads as a physical switch and lets the accent stay meaningful.
 *
 * Deliberately not mirrored under RTL: sun-then-moon is a light-to-dark
 * gradient, not a reading order, and flipping it would put "dark" on the side
 * every other control treats as the start.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  )
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      dir="ltr"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      title={isDark ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln'}
      onClick={() => applyTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'group relative inline-flex h-10 w-[4.5rem] shrink-0 items-center rounded-full p-[3px]',
        'border border-line bg-fill-subtle',
        'transition-colors duration-200 hover:border-line-strong hover:bg-fill-soft',
        'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent',
        className,
      )}
    >
      {/* Thumb. Transform only, so it composites on the GPU and never lays out.
          32px travel across a 32px half: flush at both ends. */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-[3px] top-[3px] h-8 w-8 rounded-full bg-ink shadow-sm',
          'transition-transform duration-240 ease-[var(--ease-out-expo)]',
          'motion-reduce:transition-none',
          isDark ? 'translate-x-8' : 'translate-x-0',
        )}
      />

      {/* Both icons stay mounted. The one under the thumb takes the ground
          colour so it knocks out of it; the other recedes to subtle. */}
      <span className="relative z-10 grid h-8 w-8 place-items-center">
        <Sun
          size={16}
          weight={isDark ? 'regular' : 'bold'}
          aria-hidden="true"
          className={cn(
            'transition-colors duration-200',
            isDark ? 'text-ink-subtle group-hover:text-ink-muted' : 'text-ground',
          )}
        />
      </span>
      <span className="relative z-10 grid h-8 w-8 place-items-center">
        <Moon
          size={16}
          weight={isDark ? 'bold' : 'regular'}
          aria-hidden="true"
          className={cn(
            'transition-colors duration-200',
            isDark ? 'text-ground' : 'text-ink-subtle group-hover:text-ink-muted',
          )}
        />
      </span>
    </button>
  )
}
