/**
 * Fixed-window rate limiter, in memory.
 *
 * `/api/leads` is unauthenticated by necessity, and every accepted request
 * writes a contact into the CRM and fires a push notification. Without a limit
 * a single script can fill the pipeline with junk and bury real enquiries.
 *
 * ── What this does and does not buy ──────────────────────────────────────
 * State lives in the process, so on serverless each instance counts
 * separately and a cold start resets the window. That stops naive floods and
 * accidental double submits, which is the realistic threat for a small
 * agency site. It is NOT a defence against a distributed or determined
 * attacker: that needs shared state (Upstash, Redis, or Vercel's own WAF).
 * Swap `hit()` for a Redis call and the call sites stay unchanged.
 */

type Window = { count: number; resetAt: number }

const windows = new Map<string, Window>()

/** Bounds the map so a stream of unique IPs cannot grow it without limit. */
const MAX_TRACKED_KEYS = 10_000

function sweep(now: number) {
  for (const [key, w] of windows) {
    if (w.resetAt <= now) windows.delete(key)
  }
  /* If expiry alone did not free anything, drop oldest insertions. Map
     preserves insertion order, so the first keys are the stalest. */
  if (windows.size > MAX_TRACKED_KEYS) {
    const excess = windows.size - MAX_TRACKED_KEYS
    let i = 0
    for (const key of windows.keys()) {
      if (i++ >= excess) break
      windows.delete(key)
    }
  }
}

export interface RateLimitResult {
  ok: boolean
  /** Requests left in the current window. */
  remaining: number
  /** Seconds until the window resets. Sent as Retry-After on a block. */
  retryAfter: number
}

export function hit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now()
  if (windows.size > MAX_TRACKED_KEYS) sweep(now)

  const existing = windows.get(key)
  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: limit - 1, retryAfter: 0 }
  }

  existing.count += 1
  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000))
  if (existing.count > limit) {
    return { ok: false, remaining: 0, retryAfter }
  }
  return { ok: true, remaining: limit - existing.count, retryAfter }
}

/**
 * Best-effort client IP.
 *
 * Only trusts `x-forwarded-for`'s first entry, which on Vercel is set by the
 * edge and cannot be spoofed by the client. Off Vercel this header is
 * attacker-controlled, so the limiter degrades to per-claimed-IP rather than
 * per-real-IP. Falls back to a single shared bucket when absent, which fails
 * closed: unknown callers throttle each other rather than bypassing the limit.
 */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}
