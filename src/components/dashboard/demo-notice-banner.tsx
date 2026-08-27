'use client'

import { usePathname } from 'next/navigation'
import { demoNotice } from '@/content/dashboard'

/** Hidden on /dashboard/kunden: that view shows real HubSpot leads, not demo data. */
export function DemoNoticeBanner() {
  const pathname = usePathname()
  if (pathname === '/dashboard/kunden') return null

  return (
    <p className="border-b border-line bg-notice/10 px-6 py-2 text-2xs font-medium text-notice">
      {demoNotice}
    </p>
  )
}
