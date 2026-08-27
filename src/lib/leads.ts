import { contact } from '@/content/site'
import type { LeadInput } from '@/lib/hubspot'

/**
 * Upper bounds for each field. They protect HubSpot and the notes payload
 * from abuse; the UI never comes near them in normal use.
 */
export const LEAD_LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  message: 4000,
} as const

/** Same pragmatic pattern the client uses; full RFC parsing buys nothing here. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type LeadFieldErrors = Partial<
  Record<'name' | 'email' | 'phone' | 'message' | 'consent', string>
>

export type ParsedLead =
  | { ok: true; lead: LeadInput }
  | { ok: false; errors: LeadFieldErrors }

function asTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

/**
 * Validates an untrusted request body into a `LeadInput`.
 *
 * Field errors reuse the exact German strings the form shows, so the client
 * can render a server-side 400 identically to its own inline validation.
 * An unknown `paket` is dropped rather than rejected: the select constrains
 * it in the UI, and a tampered value must not cost the lead itself.
 */
export function parseLead(body: unknown): ParsedLead {
  const record =
    typeof body === 'object' && body !== null
      ? (body as Record<string, unknown>)
      : {}

  const name = asTrimmedString(record.name)
  const email = asTrimmedString(record.email)
  const phone = asTrimmedString(record.phone)
  const paket = asTrimmedString(record.paket)
  const message = asTrimmedString(record.message)

  const errors: LeadFieldErrors = {}

  if (!name) errors.name = contact.errors.name
  else if (name.length > LEAD_LIMITS.name) errors.name = contact.errors.tooLong

  if (!email) errors.email = contact.errors.emailRequired
  else if (email.length > LEAD_LIMITS.email || !EMAIL_PATTERN.test(email))
    errors.email = contact.errors.emailInvalid

  if (!phone) errors.phone = contact.errors.phone
  else if (phone.length > LEAD_LIMITS.phone) errors.phone = contact.errors.tooLong

  if (!message) errors.message = contact.errors.message
  else if (message.length > LEAD_LIMITS.message)
    errors.message = contact.errors.tooLong

  /* DSGVO consent is checked here and not only in the form. A checkbox is
     trivially bypassed by posting to the route directly, and a lead stored
     without a lawful basis is worse than a lead not stored at all. */
  if (record.consent !== true) errors.consent = contact.errors.consent

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  const knownPaket = (contact.paketOptions as readonly string[]).includes(paket)
    ? paket
    : undefined

  return {
    ok: true,
    lead: { name, email, phone, paket: knownPaket, message },
  }
}
