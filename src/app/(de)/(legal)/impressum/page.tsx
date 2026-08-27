import type { Metadata } from 'next'
import { legal, site } from '@/content/site'
import { DraftBanner, Detail, LegalMasthead, LegalProse, VatReminder } from '@/components/legal-prose'

export const metadata: Metadata = {
  title: 'Impressum',
  robots: { index: false, follow: true },
}

export default function ImpressumPage() {
  return (
    <>
      <LegalMasthead title="Impressum" updated="August 2026" />
      <DraftBanner />

      <LegalProse>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {legal.businessName}
          <br />
          Inhaber: <Detail value={legal.fullName} label="Vollständiger Name" />
          <br />
          <Detail value={legal.street} label="Straße und Hausnummer" />
          <br />
          <Detail value={legal.postalCode} label="PLZ" /> {legal.city}
          <br />
          {site.country}
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: <Detail value={legal.phone} label="Telefonnummer" />
          <br />
          E-Mail: {site.email}
        </p>

        {/* Omitted entirely when no USt-IdNr is on file. §5 Abs. 1 Nr. 6 DDG
            requires it only "sofern vorhanden", so an empty section is worse
            than none: it implies a number exists and is being withheld. */}
        {legal.kleinunternehmer ? (
          <>
            <h2>Umsatzsteuer</h2>
            <p>
              Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und daher auch
              keine Umsatzsteuer-Identifikationsnummer geführt.
            </p>
          </>
        ) : legal.vatId ? (
          <>
            <h2>Umsatzsteuer</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a
              Umsatzsteuergesetz: {legal.vatId}
            </p>
          </>
        ) : null}

        <VatReminder />

        <h2>Redaktionell verantwortlich</h2>
        <p>
          <Detail value={legal.fullName} label="Vollständiger Name" />, Anschrift
          wie oben.
        </p>

        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Wir sind nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen oder
          nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
          hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
          Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links
          umgehend.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind
          als solche gekennzeichnet. Vervielfältigung, Bearbeitung, Verbreitung
          und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
          bedürfen der schriftlichen Zustimmung des jeweiligen Autors.
        </p>
      </LegalProse>
    </>
  )
}
