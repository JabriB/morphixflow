import type { Metadata } from 'next'
import { legal, site } from '@/content/site'
import { DraftBanner, Detail, LegalMasthead, LegalProse } from '@/components/legal-prose'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  robots: { index: false, follow: true },
}

export default function DatenschutzPage() {
  return (
    <>
      <LegalMasthead title="Datenschutzerklärung" updated="August 2026" />
      <DraftBanner />

      <LegalProse>
        <h2>Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          {legal.businessName}
          <br />
          Inhaber: <Detail value={legal.fullName} label="Vollständiger Name" />
          <br />
          <Detail value={legal.street} label="Straße und Hausnummer" />
          <br />
          <Detail value={legal.postalCode} label="PLZ" /> {legal.city},{' '}
          {site.country}
          <br />
          E-Mail: {site.email}
        </p>

        <h2>Hosting</h2>
        <p>
          Diese Website wird bei der Vercel Inc., 440 N Barranca Ave #4133,
          Covina, CA 91723, USA gehostet. Die Auslieferung erfolgt über
          Rechenzentren in der Europäischen Union (Region Frankfurt). Vercel
          verarbeitet in unserem Auftrag personenbezogene Daten auf Grundlage
          eines Vertrags zur Auftragsverarbeitung nach Art. 28 DSGVO. Für den
          Fall einer Übermittlung in die USA stützt sich Vercel auf die
          EU-Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, unser berechtigtes
          Interesse an einer sicheren und zuverlässigen Bereitstellung.
        </p>

        <h2>Server-Log-Dateien</h2>
        <p>
          Der Hosting-Anbieter erhebt und speichert automatisch Informationen in
          Server-Log-Dateien, die dein Browser übermittelt: Browsertyp und
          Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des
          zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine
          Zusammenführung dieser Daten mit anderen Datenquellen findet nicht
          statt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
        </p>

        <h2>Kontaktformular</h2>
        <p>
          Wenn du uns über das Kontaktformular eine Anfrage schickst, verarbeiten
          wir die von dir angegebenen Daten: Name, E-Mail-Adresse, Telefonnummer,
          das ausgewählte Paket und deine Projektbeschreibung. Die Verarbeitung
          erfolgt ausschließlich zur Bearbeitung deiner Anfrage und für den Fall
          von Anschlussfragen.
        </p>
        <p>
          Rechtsgrundlage ist deine ausdrückliche Einwilligung nach Art. 6 Abs. 1
          lit. a DSGVO, die du vor dem Absenden über die Checkbox erteilst, sowie
          Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage der Anbahnung eines
          Vertrags dient. Du kannst deine Einwilligung jederzeit formlos per
          E-Mail an {site.email} widerrufen. Die Rechtmäßigkeit der bis zum
          Widerruf erfolgten Verarbeitung bleibt davon unberührt.
        </p>
        <p>
          Zum Schutz vor automatisierten Einsendungen verwendet das Formular ein
          verstecktes Feld sowie eine Begrenzung der Anfragen pro IP-Adresse.
          Dabei werden keine Daten dauerhaft gespeichert und es findet keine
          Auswertung deines Nutzungsverhaltens statt.
        </p>

        <h2>Customer-Relationship-Management (HubSpot)</h2>
        <p>
          Die über das Kontaktformular übermittelten Daten werden in unserem
          CRM-System HubSpot gespeichert. Anbieter ist die HubSpot Ireland
          Limited, 1 Sir John Rogerson&apos;s Quay, Dublin 2, Irland, für Nutzer
          im Europäischen Wirtschaftsraum. Eine Verarbeitung durch die
          Muttergesellschaft HubSpot, Inc., 2 Canal Park, Cambridge, MA 02141,
          USA, findet statt.
        </p>
        <p>
          Mit HubSpot besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28
          DSGVO. Die Übermittlung in die USA erfolgt auf Grundlage der
          EU-Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO sowie,
          soweit einschlägig, des EU-US Data Privacy Framework. Rechtsgrundlage
          der Speicherung ist Art. 6 Abs. 1 lit. a DSGVO. Deine Daten bleiben
          gespeichert, bis du die Löschung verlangst oder der Zweck entfällt.
        </p>

        <h2>Kontaktaufnahme über WhatsApp</h2>
        <p>
          Diese Website verlinkt auf WhatsApp. Wenn du diesen Weg nutzt, werden
          deine Telefonnummer und die Inhalte der Kommunikation an WhatsApp
          Ireland Limited übermittelt und dort nach deren
          Datenschutzbestimmungen verarbeitet. Eine Übermittlung in Drittländer
          kann dabei nicht ausgeschlossen werden. Die Nutzung erfolgt
          freiwillig. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.
        </p>

        <h2>Cookies und lokale Speicherung</h2>
        <p>
          Diese Website setzt keine Cookies und verwendet weder Analyse- noch
          Marketing-Werkzeuge, kein Tracking und keine Pixel. Es findet keine
          Profilbildung statt. Ein Einwilligungsbanner ist deshalb nach § 25 Abs.
          2 TDDDG nicht erforderlich. Sollten künftig Analyse- oder
          Marketing-Dienste eingebunden werden, geschieht dies erst nach deiner
          vorherigen Einwilligung.
        </p>

        <h2>Externe Ressourcen</h2>
        <p>
          Sämtliche Schriftarten, Bilder und Skripte werden von unserem eigenen
          Server ausgeliefert. Es werden keine Inhalte von fremden
          Content-Delivery-Netzwerken nachgeladen. Beim Aufruf dieser Seite wird
          deine IP-Adresse daher an keinen Drittanbieter übertragen. Technisch
          abgesichert wird dies zusätzlich über eine Content-Security-Policy, die
          Verbindungen zu fremden Servern unterbindet.
        </p>

        <h2>Schriftarten</h2>
        <p>
          Die verwendeten Schriftarten werden lokal von unserem eigenen Server
          ausgeliefert. Eine Verbindung zu Servern Dritter findet dabei nicht
          statt und es werden keine Daten an Dritte übertragen.
        </p>

        <h2>Deine Rechte</h2>
        <ul>
          <li>Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>
            Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO). Zuständig ist
            die Landesbeauftragte für Datenschutz und Informationsfreiheit
            Nordrhein-Westfalen.
          </li>
        </ul>
        <p>
          Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die
          Zukunft widerrufen. Wende dich dafür formlos an {site.email}.
        </p>

        <h2>SSL- und TLS-Verschlüsselung</h2>
        <p>
          Diese Seite nutzt aus Sicherheitsgründen eine SSL- beziehungsweise
          TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du daran,
          dass die Adresszeile des Browsers von http:// auf https:// wechselt.
        </p>
      </LegalProse>
    </>
  )
}
