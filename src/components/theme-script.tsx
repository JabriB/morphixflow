/**
 * Sets the theme before first paint.
 *
 * This has to be a blocking inline script in <head>, not an effect. React only
 * runs after hydration, by which point the browser has already painted, so a
 * light-mode viewer would see a dark flash on every single navigation.
 *
 * Dark is the default whenever nothing is stored. The OS preference is
 * deliberately not consulted: the brand is dark first, and the theme is a
 * choice the visitor makes here, not one inherited from their operating
 * system.
 *
 * `data-theme` is always written, never left absent, so the CSS never has to
 * fall back to a media query to work out what to show.
 *
 * Wrapped in try/catch because localStorage throws outright in some contexts
 * (Safari private mode, cookies disabled). A theme preference is never worth
 * breaking the page for; on failure it simply lands on dark.
 *
 * It stays a bare <script> rather than `next/script`. The `beforeInteractive`
 * strategy looks like the right API but wraps the code in Next's deferred
 * `self.__next_s` queue, which runs after first paint and so reintroduces
 * exactly the flash this exists to prevent.
 */
const script = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
