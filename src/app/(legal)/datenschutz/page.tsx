import type { Metadata } from 'next'
import { site } from '@/content/site'
import { DraftBanner, Fill, LegalProse } from '@/components/legal-prose'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  robots: { index: false, follow: true },
}

export default function DatenschutzPage() {
  return (
    <>
      <h1 className="text-2xl">Datenschutzerklärung</h1>
      <DraftBanner />

      <LegalProse>
        <h2>Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          <Fill>Vollständiger Name</Fill>
          <br />
          <Fill>Straße und Hausnummer</Fill>
          <br />
          <Fill>PLZ</Fill> {site.city}, {site.country}
          <br />
          E-Mail: {site.email}
        </p>

        <h2>Hosting</h2>
        <p>
          Diese Website wird bei <Fill>Hosting-Anbieter</Fill> gehostet. Der
          Anbieter verarbeitet in unserem Auftrag personenbezogene Daten. Sofern
          erforderlich, besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28
          DSGVO. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
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
          Wenn du uns über das Kontaktformular Anfragen zukommen lässt, werden
          deine Angaben inklusive der dort angegebenen Kontaktdaten zwecks
          Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns
          gespeichert. Diese Daten geben wir nicht ohne deine Einwilligung
          weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern die
          Anfrage mit der Erfüllung eines Vertrags zusammenhängt, andernfalls
          Art. 6 Abs. 1 lit. f DSGVO.
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
          <Fill>
            Zu prüfen: Diese Seite setzt derzeit keine Analyse- oder
            Marketing-Cookies. Sobald Tracking, Analytics oder Pixel eingebunden
            werden, ist ein Consent-Banner erforderlich und dieser Abschnitt
            muss ergänzt werden.
          </Fill>
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
