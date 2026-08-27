# 72-Stunden-Plan bei einer Datenpanne

DSGVO Art. 33: Ab dem Moment, in dem dir eine Verletzung des Schutzes
personenbezogener Daten **bekannt wird**, bleiben **72 Stunden** für die Meldung
an die Aufsichtsbehörde. Die Uhr läuft ab Kenntnis, nicht ab Eintritt. Im
Ernstfall ist keine Zeit zu recherchieren, wer zuständig ist, deshalb steht es
hier.

---

## Zuständige Aufsichtsbehörde

**Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)**
Kavalleriestraße 2–4, 40213 Düsseldorf
Meldung online über das Formular der LDI NRW.

Maßgeblich ist der Sitz des Verantwortlichen. Solange `legal` in
`src/content/site.ts` einen Sitz in Aachen ausweist, ist NRW zuständig. Bei
Umzug in ein anderes Bundesland ist dieser Abschnitt anzupassen.

---

## Welche personenbezogenen Daten überhaupt verarbeitet werden

Vollständige Liste. Was hier nicht steht, wird nicht gespeichert.

| Datum | Wo | Herkunft |
|---|---|---|
| Name, E-Mail, Telefon | HubSpot (Kontakt) | Kontaktformular |
| Gewähltes Paket, Projektnachricht | HubSpot (Notiz am Kontakt) | Kontaktformular |
| Einwilligung (Zeitpunkt) | HubSpot (Formular-Submission) | Kontaktformular |
| IP-Adresse | Server-Logs bei Vercel, flüchtig | Jeder Seitenaufruf |
| IP-Adresse (gehasht im Speicher) | Rate-Limiter, max. 10 Minuten, nicht persistiert | Formular-Absendungen |

**Keine** Zahlungsdaten, **keine** Passwörter, **keine** Gesundheitsdaten,
**keine** besonderen Kategorien nach Art. 9 DSGVO. Es gibt kein Tracking, keine
Cookies und keine Analyse-Werkzeuge.

### Auftragsverarbeiter

| Anbieter | Rolle | Vertrag |
|---|---|---|
| Vercel Inc. | Hosting, Auslieferung (Region Frankfurt) | AVV Art. 28, SCC Art. 46 |
| HubSpot Ireland Ltd. | CRM | AVV Art. 28, SCC Art. 46 |

Bei einer Panne beim Anbieter ist **dieser** verpflichtet, dich unverzüglich zu
informieren (Art. 33 Abs. 2). Deine eigene 72-Stunden-Frist beginnt dann mit
seiner Meldung an dich.

---

## Ablauf

### Stunde 0 bis 1 — eindämmen

1. Betroffenes Zugangsmittel sofort entwerten:
   - HubSpot: Settings → Integrations → Private Apps → **Rotate** Token
   - Vercel: Project → Settings → Environment Variables → Wert ersetzen, danach
     Redeploy
2. Bei Verdacht auf einen kompromittierten Account: Passwort ändern und
   Zwei-Faktor-Authentifizierung erzwingen, aktive Sessions beenden.
3. **Nichts löschen.** Logs, E-Mails und Screenshots sind später der Nachweis.

### Stunde 1 bis 6 — Umfang feststellen

Schriftlich festhalten, auch wenn die Antwort „unbekannt" lautet:

- Was ist passiert, und seit wann?
- Wann und wodurch wurde es bemerkt?
- Welche Datenarten sind betroffen (Tabelle oben)?
- Wie viele Personen ungefähr?
- Sind die Daten abgeflossen, verändert oder nur unbefugt einsehbar gewesen?
- Ist der Vorgang beendet oder läuft er noch?

### Stunde 6 bis 72 — melden

Meldung an die LDI NRW ist Pflicht, **außer** die Panne führt
voraussichtlich zu keinem Risiko für Rechte und Freiheiten der Betroffenen
(Art. 33 Abs. 1). Im Zweifel melden: eine unnötige Meldung kostet nichts, eine
unterlassene bis zu 10 Mio. € oder 2% des Jahresumsatzes.

Die Meldung enthält nach Art. 33 Abs. 3: Art der Verletzung, Kategorien und
ungefähre Zahl der Betroffenen und Datensätze, Kontaktstelle für Rückfragen,
wahrscheinliche Folgen, ergriffene und geplante Gegenmaßnahmen.

Sind noch nicht alle Angaben verfügbar, **trotzdem fristgerecht melden** und
nachreichen (Art. 33 Abs. 4). Verspätete Meldungen sind zu begründen.

### Betroffene benachrichtigen

Zusätzlich nach Art. 34 erforderlich, wenn ein **hohes** Risiko besteht.
Benachrichtigung in klarer, einfacher Sprache, direkt an die Personen. Bei den
hier verarbeiteten Daten (Name, E-Mail, Telefon, Projektbeschreibung) ist ein
hohes Risiko nicht ausgeschlossen, etwa weil die Daten für gezieltes Phishing
taugen.

---

## Dokumentationspflicht

Art. 33 Abs. 5: **jede** Datenpanne ist intern zu dokumentieren, auch die nicht
meldepflichtige. Die Aufsichtsbehörde kann diese Dokumentation verlangen.

Ablage: `docs/vorfaelle/JJJJ-MM-TT-kurzbeschreibung.md`, mit den Antworten aus
Schritt „Umfang feststellen", der getroffenen Melde-Entscheidung und ihrer
Begründung.

---

*Kein Rechtsrat. Bei einer realen Panne mit nennenswertem Umfang gehört ein
Fachanwalt für IT-Recht hinzugezogen, bevor gemeldet wird.*
