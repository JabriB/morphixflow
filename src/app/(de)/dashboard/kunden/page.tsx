import type { Metadata } from 'next'
import { listRecentHubSpotLeads } from '@/lib/hubspot'

export const metadata: Metadata = { title: 'Kunden' }

function formatDate(iso: string): string {
  if (!iso) return '—'
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('de-DE')
}

export default async function Page() {
  let leads: Awaited<ReturnType<typeof listRecentHubSpotLeads>> = []
  let error: string | null = null

  try {
    leads = await listRecentHubSpotLeads()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unbekannter Fehler'
  }

  return (
    <main id="inhalt" className="flex min-w-0 flex-1 flex-col p-6">
      <h1 className="text-xl">Kunden</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Live aus HubSpot. Neue Anfragen über das Kontaktformular landen automatisch hier.
      </p>

      {error ? (
        <div className="mt-6 flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-negative/30 bg-negative/5 px-6 py-16 text-center">
          <p className="font-display text-lg font-extrabold text-ink">
            HubSpot Verbindung fehlgeschlagen
          </p>
          <p className="measure text-sm text-ink-muted">{error}</p>
          <p className="measure text-xs text-ink-subtle">
            Prüfe, ob HUBSPOT_ACCESS_TOKEN in .env.local gesetzt ist und die Private App die
            Berechtigung crm.objects.contacts.read hat.
          </p>
        </div>
      ) : leads.length === 0 ? (
        <div className="mt-6 flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-line bg-card px-6 py-16 text-center">
          <p className="font-display text-lg font-extrabold text-ink">Noch keine Leads</p>
          <p className="measure text-sm text-ink-muted">
            Sobald jemand das Kontaktformular absendet, erscheint der Lead hier und in HubSpot.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-start text-sm">
            <thead>
              <tr className="border-b border-line text-xs text-ink-subtle">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">E-Mail</th>
                <th className="px-4 py-3 font-medium">Telefon</th>
                <th className="px-4 py-3 font-medium">Erstellt</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-bold text-ink">{lead.name}</td>
                  <td className="px-4 py-3 text-ink-muted">{lead.email || '—'}</td>
                  <td className="px-4 py-3 text-ink-muted">{lead.phone || '—'}</td>
                  <td data-numeric className="px-4 py-3 text-ink-subtle">
                    {formatDate(lead.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
