import path from 'node:path'
import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

/**
 * Content Security Policy.
 *
 * The strict `default-src 'self'` plus `connect-src 'self'` is doing real work
 * here beyond generic hardening: this site deliberately loads no third party
 * fonts, scripts or images, because under German case law every foreign CDN
 * call ships the visitor's IP abroad without a legal basis (the Google Fonts
 * judgments). The policy turns that from a convention someone could break by
 * pasting in an embed into something the browser refuses to execute.
 *
 * Known limitation: `script-src` and `style-src` still allow 'unsafe-inline'.
 * Next.js injects inline hydration scripts and styles, and removing this needs
 * per-request nonces threaded through middleware. `frame-ancestors`,
 * `object-src`, `base-uri` and `form-action` are all locked regardless, so
 * clickjacking, plugin injection, base-tag hijacking and form exfiltration are
 * closed off. 'unsafe-eval' is dev only, where React refresh requires it.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  /* Two years, preload eligible. Vercel terminates TLS, so this is safe. */
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  /* Belt and braces alongside frame-ancestors, for older browsers. */
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  /* Nothing on this site needs any of these. */
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
]

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home directory makes Turbopack infer the
  // wrong workspace root. Pin it to this project.
  turbopack: {
    root: path.resolve(__dirname),
  },

  experimental: {
    /**
     * Inlines the route's CSS into the document instead of linking it.
     *
     * The stylesheet was a render-blocking request on the critical path:
     * the browser parsed the HTML, discovered the link, opened a request and
     * waited before it could paint anything. Inlining removes that round trip
     * entirely, which is the single largest remaining lever on FCP here.
     *
     * This only works because the CSP already allows `style-src 'unsafe-inline'`.
     * Without it the browser would refuse the inlined block and the page would
     * render completely unstyled: if the CSP is ever tightened with nonces,
     * this flag has to be revisited at the same time.
     */
    inlineCss: true,

    /**
     * Rewrites barrel imports into direct per-module imports at build time.
     *
     * `import { List, X } from '@phosphor-icons/react'` otherwise pulls the
     * package's index, which re-exports every icon in the set and defeats
     * tree shaking.
     */
    optimizePackageImports: ['@phosphor-icons/react', 'motion'],
  },

  /* Hides the framework and version from responses. Free, and one less hint
     for anyone fingerprinting the stack for known CVEs. */
  poweredByHeader: false,

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
