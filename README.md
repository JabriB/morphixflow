# MorphixFlow

Agentur-Website für Webseiten, Automationen und Werbekampagnen. Next.js 16
App Router, React 19, TypeScript strict, Tailwind v4. Dark-Cinematic-Design,
komplette deutsche Inhalte in `src/content/`.

## Setup

```bash
npm install
cp .env.local.example .env.local   # falls vorhanden; sonst .env.local anlegen
npm run dev                        # http://localhost:3000
```

### Umgebungsvariablen

| Variable | Pflicht | Zweck |
| --- | --- | --- |
| `HUBSPOT_ACCESS_TOKEN` | Ja, für Lead-Erfassung | Private-App-Token; schreibt Kontakte und Notizen über die CRM-v3-API |
| `HUBSPOT_PORTAL_ID` | Nein | Zusammen mit `HUBSPOT_FORM_GUID`: Push-Benachrichtigung via Formular-Submission |
| `HUBSPOT_FORM_GUID` | Nein | GUID des HubSpot-Formulars, dessen Benachrichtigung ausgelöst wird |

Ohne Token antwortet `/api/leads` bei validen Anfragen mit 502 und einer
deutschen Fehlermeldung; das Formular verweist dann auf WhatsApp.

## Befehle

```bash
npm run dev     # Dev-Server
npm run build   # Produktions-Build
npm run start   # Produktions-Server
npm run lint    # ESLint, null Warnungen erwartet
npm test        # Vitest (Route- und Validierungs-Suite)
```

## API-Referenz

### `POST /api/leads`

Erfasst einen Lead aus dem Kontaktformular. Request-Body (JSON), abgeleitet
aus `LeadInput` in `src/lib/hubspot.ts` und `LEAD_LIMITS` in `src/lib/leads.ts`:

| Feld | Typ | Regel |
| --- | --- | --- |
| `name` | `string` | Pflicht, max. 120 Zeichen |
| `email` | `string` | Pflicht, gültiges Format, max. 254 Zeichen |
| `phone` | `string` | Pflicht, max. 40 Zeichen |
| `paket` | `string?` | Optional; unbekannte Werte werden verworfen, nicht abgelehnt |
| `message` | `string` | Pflicht, max. 4000 Zeichen |
| `website` | `string?` | Honeypot. Jeder Wert ⇒ stille Annahme ohne Speicherung |

Antworten:

| Status | Body | Bedeutung |
| --- | --- | --- |
| 200 | `{ "ok": true }` | Kontakt gespeichert (oder Honeypot ausgelöst) |
| 400 | `{ "error", "fields"? }` | Ungültiges JSON oder Feldfehler; `fields` trägt dieselben deutschen Meldungen, die das Formular inline zeigt |
| 502 | `{ "error" }` | HubSpot hat den Kontakt-Write abgelehnt |

Ablauf: Der CRM-Write (`createHubSpotLead`, Upsert per E-Mail + Notiz) gate-t
die Antwort. Die Push-Benachrichtigung (`notifyViaHubSpotForm`, eine
Formular-Submission — der einzige kostenlose Weg zu einer Handy-Notification)
läuft über `after()` aus `next/server` erst **nach** dem Senden der Antwort;
ihr Scheitern kostet nur den Ping, nie den Lead.

### HubSpot-API-Hinweis

Die Integration nutzt bewusst rohes `fetch` gegen die CRM-v3-Endpunkte statt
des `@hubspot/api-client`-SDK: zwei Endpunkte rechtfertigen keine
Runtime-Dependency. HubSpot empfiehlt für *neue* Integrationen inzwischen
datumsbasierte API-Versionen (`/crm/objects/2026-03/…`); v3 bleibt unterstützt.
Bei einer künftigen Migration sind `src/lib/hubspot.ts` die einzige Stelle.

## Tests

Vitest (dev-only). Die Suite in `src/app/api/leads/__tests__/route.test.ts`
deckt ab: Erfolg inkl. Trimming, nicht-blockierende Benachrichtigung,
Benachrichtigungs-Fehler ohne Statuseinfluss, kaputtes JSON, Feldfehler,
Längen-Limits, HubSpot-Ausfall (502), Honeypot sowie die Paket-Whitelist.
`after()` wird gemockt, da es außerhalb eines Next-Request-Scopes nicht läuft.

## Deployment

Noch nicht konfiguriert. Erwartetes Ziel: Vercel (`npm run build`), die drei
HubSpot-Variablen als Environment-Secrets. Vor dem Launch offen: Impressum/
Datenschutz-Platzhalter füllen, WhatsApp-Nummer und Social-Links ersetzen
(siehe `CLAUDE.md`, Current Sprint).
