import type { Metadata } from 'next'
import { NotBuiltYet } from '@/components/dashboard/not-built-yet'

export const metadata: Metadata = { title: 'Einstellungen' }

export default function Page() {
  return <NotBuiltYet title="Einstellungen" />
}
