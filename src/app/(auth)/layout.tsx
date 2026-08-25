import Link from 'next/link'
import Image from 'next/image'
import { site } from '@/content/site'
import { routes } from '@/content/auth'

/**
 * Auth chrome. A single quiet column on the left, the cinematic frame on
 * the right. The photography does the persuading; the form stays plain.
 */
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-10">
        <Link
          href={routes.home}
          className="font-display text-lg font-extrabold tracking-tight text-ink no-underline"
        >
          {site.name}
        </Link>

        <main id="inhalt" className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-sm">{children}</div>
        </main>

        <p className="text-2xs text-ink-subtle">
          {site.city}, {site.country}
        </p>
      </div>

      <div className="relative hidden lg:block">
        <Image
          src="/media/hero.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-ground via-ground/20 to-transparent"
        />
      </div>
    </div>
  )
}
