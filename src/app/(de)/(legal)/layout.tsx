import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { SiteFooter } from '@/components/site-footer'
import { Logo } from '@/components/ui/logo'
import { ScrollProgress } from '@/components/ui/scroll-progress'

/**
 * Legal pages carry the same chrome as the landing page: the logo lockup, a
 * sticky blurred header and the read-progress bar. Previously these rendered a
 * plain text wordmark and a static bar, so the two halves of the site looked
 * like they came from different projects, which is exactly the impression a
 * legal page should not give.
 *
 * The one deliberate difference is the return link. On a legal page the reader
 * arrived to check one fact, so the useful action is getting back, not the
 * section nav that has no targets here.
 */
export default function LegalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ground/80 backdrop-blur-xl">
        <ScrollProgress />

        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link href="/" aria-label="MorphixFlow, zur Startseite" className="no-underline">
            <Logo />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
          >
            <ArrowLeft size={15} weight="bold" aria-hidden="true" />
            <span className="hidden sm:inline">Zurück zur Startseite</span>
            <span className="sm:hidden">Zurück</span>
          </Link>
        </div>
      </header>

      {/* Same low accent wash the Statement section uses, so the top of the
          page has some depth instead of opening on flat obsidian. Sits behind
          everything and never touches a readable edge. */}
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 opacity-[0.06] blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse 55% 100% at 50% 0%, var(--color-accent), transparent 70%)',
          }}
        />

        <main id="inhalt" className="shell max-w-3xl py-20 sm:py-24">
          {children}
        </main>
      </div>

      <SiteFooter />
    </>
  )
}
