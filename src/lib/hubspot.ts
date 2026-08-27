/**
 * Server-only HubSpot integration. Never import this from a client component:
 * it reads HUBSPOT_ACCESS_TOKEN, a secret that must not reach the browser.
 */

const HUBSPOT_API = 'https://api.hubapi.com'

/** Note to Contact, a standard HubSpot-defined association type. */
const NOTE_TO_CONTACT_ASSOCIATION_TYPE_ID = 202

function hubspotHeaders(): HeadersInit {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  if (!token) {
    throw new Error(
      'HUBSPOT_ACCESS_TOKEN ist nicht gesetzt. Trage ihn in .env.local ein.',
    )
  }
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

export interface LeadInput {
  name: string
  email: string
  phone: string
  paket?: string
  message: string
}

interface HubSpotUpsertResponse {
  results?: { id: string }[]
}

/**
 * Creates or updates a HubSpot contact by email, then attaches the project
 * message as a note. The note is best-effort: a failure there must not
 * throw away a lead whose contact record already saved successfully.
 */
export async function createHubSpotLead(lead: LeadInput): Promise<string> {
  const [firstname, ...rest] = lead.name.trim().split(/\s+/)
  const lastname = rest.join(' ') || undefined

  const upsertRes = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts/batch/upsert`, {
    method: 'POST',
    headers: hubspotHeaders(),
    body: JSON.stringify({
      inputs: [
        {
          idProperty: 'email',
          id: lead.email,
          properties: {
            email: lead.email,
            firstname,
            lastname,
            phone: lead.phone,
          },
        },
      ],
    }),
  })

  if (!upsertRes.ok) {
    const body = await upsertRes.text()
    throw new Error(`HubSpot Kontakt-Upsert fehlgeschlagen (${upsertRes.status}): ${body}`)
  }

  const upsertData = (await upsertRes.json()) as HubSpotUpsertResponse
  const contactId = upsertData.results?.[0]?.id
  if (!contactId) {
    throw new Error('HubSpot hat keine Kontakt-ID zurückgegeben.')
  }

  try {
    await fetch(`${HUBSPOT_API}/crm/v3/objects/notes`, {
      method: 'POST',
      headers: hubspotHeaders(),
      body: JSON.stringify({
        properties: {
          hs_note_body: `Paket: ${lead.paket || 'Nicht angegeben'}\n\nNachricht:\n${lead.message}`,
          hs_timestamp: Date.now(),
        },
        associations: [
          {
            to: { id: contactId },
            types: [
              {
                associationCategory: 'HUBSPOT_DEFINED',
                associationTypeId: NOTE_TO_CONTACT_ASSOCIATION_TYPE_ID,
              },
            ],
          },
        ],
      }),
    })
  } catch {
    // The contact itself is already saved. Losing the note is not fatal.
  }

  return contactId
}

/**
 * Registers the lead as a HubSpot *form submission*, which is the only free
 * way to get a push notification onto the phone.
 *
 * Why this exists alongside `createHubSpotLead`: a contact written through
 * the CRM API fires no notification of any kind on Free or Starter. The
 * "send notification" workflow action that would cover it needs Marketing or
 * Operations Hub Professional. A form submission, by contrast, triggers the
 * form's own native notification setting, which every tier including Free
 * has, and which the mobile app can subscribe to.
 *
 * Best-effort by design. The contact is already saved by the time this runs,
 * so a failure here costs a notification, never the lead. Also unauthenticated:
 * this endpoint takes no token, only the portal and form ids.
 *
 * No-ops unless HUBSPOT_PORTAL_ID and HUBSPOT_FORM_GUID are both set.
 */
export async function notifyViaHubSpotForm(lead: LeadInput): Promise<boolean> {
  const portalId = process.env.HUBSPOT_PORTAL_ID
  const formGuid = process.env.HUBSPOT_FORM_GUID
  if (!portalId || !formGuid) return false

  const [firstname, ...rest] = lead.name.trim().split(/\s+/)

  const fields = [
    { objectTypeId: '0-1', name: 'email', value: lead.email },
    { objectTypeId: '0-1', name: 'firstname', value: firstname },
    { objectTypeId: '0-1', name: 'lastname', value: rest.join(' ') },
    { objectTypeId: '0-1', name: 'phone', value: lead.phone },
    { objectTypeId: '0-1', name: 'message', value: lead.message },
  ].filter((f) => f.value)

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields,
          context: { pageName: 'MorphixFlow Kontaktformular' },
        }),
      },
    )
    if (!res.ok) {
      console.error('HubSpot Formular-Benachrichtigung fehlgeschlagen:', await res.text())
      return false
    }
    return true
  } catch (error) {
    console.error('HubSpot Formular-Benachrichtigung fehlgeschlagen:', error)
    return false
  }
}

export interface HubSpotContact {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
}

interface HubSpotSearchResult {
  results?: {
    id: string
    properties: {
      email?: string
      firstname?: string
      lastname?: string
      phone?: string
      createdate?: string
    }
  }[]
}

/** Most recently created HubSpot contacts, for the dashboard's Kunden view. */
export async function listRecentHubSpotLeads(limit = 20): Promise<HubSpotContact[]> {
  const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts/search`, {
    method: 'POST',
    headers: hubspotHeaders(),
    body: JSON.stringify({
      sorts: [{ propertyName: 'createdate', direction: 'DESCENDING' }],
      properties: ['email', 'firstname', 'lastname', 'phone', 'createdate'],
      limit,
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`HubSpot Kontakte konnten nicht geladen werden (${res.status}): ${body}`)
  }

  const data = (await res.json()) as HubSpotSearchResult

  return (data.results ?? []).map((r) => ({
    id: r.id,
    name: [r.properties.firstname, r.properties.lastname].filter(Boolean).join(' ') || 'Unbekannt',
    email: r.properties.email ?? '',
    phone: r.properties.phone ?? '',
    createdAt: r.properties.createdate ?? '',
  }))
}
