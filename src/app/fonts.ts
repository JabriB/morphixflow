import localFont from 'next/font/local'

/**
 * Display voice. Self-hosted from Fontshare.
 *
 * One weight only. Every `font-display` usage on the site pairs with
 * `font-extrabold` (800), and `font-black` appears nowhere, so 500/700/900
 * were never rendered. They were not free: `preload: true` preloads every
 * declared file, and on Slow 4G those three (~58 kB) queued ahead of the
 * hero image and pushed its request back. Add a weight here only together
 * with a class that actually uses it.
 */
export const cabinet = localFont({
  src: [
    { path: './fonts/cabinet-grotesk-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-cabinet',
  display: 'swap',
  preload: true,
})

/** Body and UI voice. Self-hosted from Fontshare. */
export const satoshi = localFont({
  src: [
    { path: './fonts/satoshi-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/satoshi-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/satoshi-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
})
