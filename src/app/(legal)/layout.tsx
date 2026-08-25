import Link from 'next/link'
import { site } from '@/content/site'
import { SiteFooter } from '@/components/site-footer'

export default function LegalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="border-b border-line">
        <div className="shell flex h-16 items-center">
          <Link
            href="/"
            className="font-display text-lg font-extrabold tracking-tight text-ink no-underline"
          >
            {site.name}
          </Link>
        </div>
      </header>

      <main id="inhalt" className="shell max-w-3xl py-20">
        {children}
      </main>

      <SiteFooter />
    </>
  )
}
