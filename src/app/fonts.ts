import localFont from 'next/font/local'

/** Display voice. Self-hosted from Fontshare. */
export const cabinet = localFont({
  src: [
    { path: './fonts/cabinet-grotesk-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/cabinet-grotesk-700.woff2', weight: '700', style: 'normal' },
    { path: './fonts/cabinet-grotesk-800.woff2', weight: '800', style: 'normal' },
    { path: './fonts/cabinet-grotesk-900.woff2', weight: '900', style: 'normal' },
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
