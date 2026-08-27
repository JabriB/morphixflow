import { beforeEach, describe, expect, it, vi } from 'vitest'
import { contact } from '@/content/site'
import { LEAD_LIMITS, parseLead } from '@/lib/leads'

/* `after()` needs a live Next request scope; in unit tests it is replaced
   with a recorder so scheduled work can be flushed and asserted on. */
const afterTasks: Array<() => Promise<void> | void> = []
vi.mock('next/server', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/server')>()),
  after: (task: () => Promise<void> | void) => {
    afterTasks.push(task)
  },
}))

vi.mock('@/lib/hubspot', () => ({
  createHubSpotLead: vi.fn(),
  notifyViaHubSpotForm: vi.fn(),
}))

import { POST } from '../route'
import { createHubSpotLead, notifyViaHubSpotForm } from '@/lib/hubspot'

const mockCreate = vi.mocked(createHubSpotLead)
const mockNotify = vi.mocked(notifyViaHubSpotForm)

/* The limiter buckets by IP, so every call gets a fresh one by default.
   Without this the suite would throttle itself partway through and later
   tests would fail for reasons unrelated to what they assert. Tests that
   exercise the limiter pass an explicit, shared ip. */
let ipCounter = 0

function post(body: unknown, ip?: string): Promise<Response> {
  return POST(
    new Request('http://localhost/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': ip ?? `203.0.113.${++ipCounter % 250}`,
      },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  )
}

const validBody = {
  name: '  Max Mustermann ',
  email: 'max@firma.de',
  phone: '+49 151 12345678',
  paket: 'Essential',
  message: 'Ich brauche eine neue Website.',
  /* DSGVO Art. 6 Abs. 1 lit. a. Absent or false must fail validation. */
  consent: true,
}

async function flushAfterTasks(): Promise<void> {
  for (const task of afterTasks.splice(0)) await task()
}

beforeEach(() => {
  vi.clearAllMocks()
  afterTasks.length = 0
  mockCreate.mockResolvedValue('contact-1')
  mockNotify.mockResolvedValue(true)
})

describe('POST /api/leads', () => {
  it('saves a valid lead, trims input, and responds ok', async () => {
    const res = await post(validBody)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(mockCreate).toHaveBeenCalledExactlyOnceWith({
      name: 'Max Mustermann',
      email: 'max@firma.de',
      phone: '+49 151 12345678',
      paket: 'Essential',
      message: 'Ich brauche eine neue Website.',
    })
  })

  it('schedules the push notification after the response instead of blocking it', async () => {
    const res = await post(validBody)

    expect(res.status).toBe(200)
    expect(mockNotify).not.toHaveBeenCalled()

    await flushAfterTasks()
    expect(mockNotify).toHaveBeenCalledOnce()
  })

  it('still responds ok when the notification fails', async () => {
    mockNotify.mockResolvedValue(false)

    const res = await post(validBody)
    await flushAfterTasks()

    expect(res.status).toBe(200)
    expect(mockNotify).toHaveBeenCalledOnce()
  })

  it('rejects malformed JSON with 400 instead of crashing', async () => {
    const res = await post('{not json')

    expect(res.status).toBe(400)
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('returns per-field German errors for missing fields', async () => {
    const res = await post({ email: 'not-an-email' })

    expect(res.status).toBe(400)
    const body = (await res.json()) as { fields: Record<string, string> }
    expect(body.fields).toEqual({
      name: contact.errors.name,
      email: contact.errors.emailInvalid,
      phone: contact.errors.phone,
      message: contact.errors.message,
      consent: contact.errors.consent,
    })
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('refuses an otherwise valid lead that withholds DSGVO consent', async () => {
    for (const consent of [undefined, false, 'on', 'true']) {
      const res = await post({ ...validBody, consent })

      expect(res.status).toBe(400)
      const body = (await res.json()) as { fields: Record<string, string> }
      expect(body.fields.consent).toBe(contact.errors.consent)
    }
    /* Storing personal data without a lawful basis is worse than losing it. */
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('throttles a flood from one IP with 429 and Retry-After', async () => {
    const ip = '198.51.100.7'
    const statuses: number[] = []
    for (let i = 0; i < 7; i++) {
      statuses.push((await post(validBody, ip)).status)
    }

    /* Five allowed, the rest blocked. */
    expect(statuses.filter((s) => s === 200)).toHaveLength(5)
    expect(statuses.filter((s) => s === 429)).toHaveLength(2)

    const blocked = await post(validBody, ip)
    expect(blocked.status).toBe(429)
    expect(Number(blocked.headers.get('Retry-After'))).toBeGreaterThan(0)
    expect(mockCreate).toHaveBeenCalledTimes(5)
  })

  it('keeps rate limit buckets separate per IP', async () => {
    const flooder = '198.51.100.9'
    for (let i = 0; i < 6; i++) await post(validBody, flooder)
    expect((await post(validBody, flooder)).status).toBe(429)

    /* A different visitor must be unaffected. */
    expect((await post(validBody, '198.51.100.10')).status).toBe(200)
  })

  it('rejects oversized input', async () => {
    const res = await post({
      ...validBody,
      message: 'x'.repeat(LEAD_LIMITS.message + 1),
    })

    expect(res.status).toBe(400)
    const body = (await res.json()) as { fields: Record<string, string> }
    expect(body.fields.message).toBe(contact.errors.tooLong)
  })

  it('answers 502 in German when HubSpot rejects the contact write', async () => {
    mockCreate.mockRejectedValue(new Error('hubspot down'))

    const res = await post(validBody)

    expect(res.status).toBe(502)
    expect(await res.json()).toEqual({
      error: 'Anfrage konnte nicht gespeichert werden.',
    })
    expect(mockNotify).not.toHaveBeenCalled()
  })

  it('silently accepts honeypot submissions without touching HubSpot', async () => {
    const res = await post({ ...validBody, website: 'https://spam.example' })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(mockCreate).not.toHaveBeenCalled()
    expect(mockNotify).not.toHaveBeenCalled()
  })
})

describe('parseLead', () => {
  it('drops an unknown paket instead of failing the lead', () => {
    const parsed = parseLead({ ...validBody, paket: 'Tampered-Tier' })

    expect(parsed.ok).toBe(true)
    if (parsed.ok) expect(parsed.lead.paket).toBeUndefined()
  })

  it('keeps every catalog paket option', () => {
    for (const paket of contact.paketOptions) {
      const parsed = parseLead({ ...validBody, paket })
      expect(parsed.ok).toBe(true)
      if (parsed.ok) expect(parsed.lead.paket).toBe(paket)
    }
  })

  it('rejects non-object bodies with the full field error set', () => {
    const parsed = parseLead(null)

    expect(parsed.ok).toBe(false)
    if (!parsed.ok) {
      expect(Object.keys(parsed.errors).sort()).toEqual([
        'consent',
        'email',
        'message',
        'name',
        'phone',
      ])
    }
  })
})
