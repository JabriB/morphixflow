import { NextResponse, after } from 'next/server'
import { createHubSpotLead, notifyViaHubSpotForm } from '@/lib/hubspot'
import { parseLead } from '@/lib/leads'
import { clientIp, hit } from '@/lib/rate-limit'

/* Five enquiries per IP per ten minutes. Comfortably above any real person
   (who sends one, occasionally two after a typo) and far below what makes
   scripted abuse worthwhile. */
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 } as const

/**
 * Captures a lead from the contact form.
 *
 * Responses:
 * - 200 `{ ok: true }` — contact saved (or honeypot tripped; bots get no tell)
 * - 400 `{ error, fields? }` — malformed JSON or field validation, `fields`
 *   carrying per-field German messages the form renders inline
 * - 502 `{ error }` — HubSpot rejected the contact write
 *
 * Only the CRM write gates the response. The push notification (a HubSpot
 * form submission, see `notifyViaHubSpotForm`) runs via `after()` once the
 * response is sent: a missed push costs nothing but the ping, never the lead.
 */
export async function POST(request: Request) {
  /* Checked before the body is even read, so a flood costs no parsing. */
  const limit = hit(`leads:${clientIp(request)}`, RATE_LIMIT)
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte versuche es später noch einmal.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Ungültige Anfrage.' },
      { status: 400 },
    )
  }

  /* Honeypot: the form ships a visually hidden "website" input that humans
     never see. A filled value is a bot; answer success so it learns nothing. */
  if (typeof body === 'object' && body !== null) {
    const honeypot = (body as Record<string, unknown>).website
    if (typeof honeypot === 'string' && honeypot.trim() !== '') {
      return NextResponse.json({ ok: true })
    }
  }

  const parsed = parseLead(body)
  if (!parsed.ok) {
    return NextResponse.json(
      { error: 'Bitte prüfe deine Eingaben.', fields: parsed.errors },
      { status: 400 },
    )
  }

  try {
    await createHubSpotLead(parsed.lead)
  } catch (error) {
    console.error('HubSpot lead capture failed:', error)
    return NextResponse.json(
      { error: 'Anfrage konnte nicht gespeichert werden.' },
      { status: 502 },
    )
  }

  after(async () => {
    const notified = await notifyViaHubSpotForm(parsed.lead)
    if (!notified) {
      console.warn(
        `Lead ${parsed.lead.email} gespeichert, aber ohne Push-Benachrichtigung.`,
      )
    }
  })

  return NextResponse.json({ ok: true })
}
