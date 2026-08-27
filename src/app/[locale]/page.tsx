import { DEFAULT_LOCALE, isLocale, type Locale } from '@/content/dictionary'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { Toolchain } from '@/components/sections/toolchain'
import { Services } from '@/components/sections/services'
import { Showcase } from '@/components/sections/showcase'
import { Process } from '@/components/sections/process'
import { Statement } from '@/components/sections/statement'
import { Results } from '@/components/sections/results'
import { Reviews } from '@/components/sections/reviews'
import { Calculator } from '@/components/sections/calculator'
import { Pricing } from '@/components/sections/pricing'
import { Faq } from '@/components/sections/faq'
import { Contact } from '@/components/sections/contact'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { StructuredData } from '@/components/structured-data'

/**
 * Section order is a rhythm, not a list. Dense sections (Services, Showcase,
 * Process) are broken by a quiet one (Toolchain, Statement) so the page reads
 * as chapters rather than one continuous scroll, and the two objection-handling
 * blocks (Faq, Contact) sit after the price.
 *
 * The client sections read their copy from the ContentProvider in the layout.
 * The two server components here take `locale` explicitly, because a Server
 * Component cannot call the hook.
 */
export default async function LandingPage({
  params,
}: PageProps<'/[locale]'>) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE

  return (
    <>
      <StructuredData locale={locale} />
      <SiteHeader />
      <main id="inhalt">
        <Hero />
        <Toolchain />
        <Services />
        <Showcase />
        <Process />
        <Statement />
        <Results />
        <Reviews />
        <Calculator />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <SiteFooter locale={locale} />
      <WhatsAppWidget />
    </>
  )
}
