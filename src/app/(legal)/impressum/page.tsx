import type { Metadata } from 'next'
import { site } from '@/content/site'
import { DraftBanner, Fill, LegalProse } from '@/components/legal-prose'

export const metadata: Metadata = {
  title: 'Impressum',
  robots: { index: false, follow: true },
}

export default function ImpressumPage() {
  return (
    <>
      <h1 className="text-2xl">Impressum</h1>
      <DraftBanner />

      <LegalProse>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          <Fill>Vollständiger Name</Fill>
          <br />
          <Fill>Straße und Hausnummer</Fill>
          <br />
          <Fill>PLZ</Fill> {site.city}
          <br />
          {site.country}
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: <Fill>Telefonnummer</Fill>
          <br />
          E-Mail: {site.email}
        </p>

        <h2>Umsatzsteuer-Identifikationsnummer</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{' '}
          <Fill>USt-IdNr.</Fill>
        </p>
        <p>
          Wird das Unternehmen als Kleinunternehmer nach § 19 UStG geführt, ist
          dieser Abschnitt durch den entsprechenden Hinweis zu ersetzen.
        </p>

        <h2>Redaktionell verantwortlich</h2>
        <p>
          <Fill>Vollständiger Name</Fill>, Anschrift wie oben.
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
