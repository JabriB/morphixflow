import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { Process } from '@/components/sections/process'
import { Results } from '@/components/sections/results'
import { Reviews } from '@/components/sections/reviews'
import { Pricing } from '@/components/sections/pricing'
import { Contact } from '@/components/sections/contact'

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main id="inhalt">
        <Hero />
        <Services />
        <Process />
        <Results />
        <Reviews />
        <Pricing />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
