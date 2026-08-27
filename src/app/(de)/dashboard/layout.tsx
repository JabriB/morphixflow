import type { Metadata } from 'next'
import Link from 'next/link'
import { Bell, SignOut } from '@phosphor-icons/react/dist/ssr'
import { routes } from '@/content/auth'
import { dashboardNav, dashboardStrings } from '@/content/dashboard'
import { DemoNoticeBanner } from '@/components/dashboard/demo-notice-banner'
import { Logo } from '@/components/ui/logo'

export const metadata: Metadata = { title: dashboardStrings.title }

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-svh">
      <aside className="sticky top-0 hidden h-svh w-56 shrink-0 flex-col border-e border-line bg-raised px-3 py-5 lg:flex">
        <Link
          href={routes.home}
          aria-label="MorphixFlow, zur Startseite"
          className="mb-7 px-2 no-underline"
        >
          {/* Slightly smaller than the marketing lockup: sidebar chrome should
              sit under the content it frames, not compete with it. */}
          <Logo className="text-base" />
        </Link>

        <nav aria-label="Dashboard Navigation">
          <ul className="flex flex-col gap-0.5">
            {dashboardNav.map((item, i) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={i === 0 ? 'page' : undefined}
                  className={
                    i === 0
                      ? 'block rounded-md bg-fill-soft px-3 py-2 text-sm font-bold text-ink no-underline'
                      : 'block rounded-md px-3 py-2 text-sm font-medium text-ink-muted no-underline transition-colors duration-150 hover:bg-fill-subtle hover:text-ink'
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-0.5">
          <button className="flex items-center gap-2.5 rounded-md px-3 py-2 text-start text-sm font-medium text-ink-muted transition-colors duration-150 hover:bg-fill-subtle hover:text-ink">
            <Bell size={15} aria-hidden="true" />
            {dashboardStrings.notifications}
          </button>
          <Link
            href={routes.login}
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-ink-muted no-underline transition-colors duration-150 hover:bg-fill-subtle hover:text-ink"
          >
            <SignOut size={15} aria-hidden="true" />
            {dashboardStrings.signOut}
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <DemoNoticeBanner />
        {children}
      </div>
    </div>
  )
}
