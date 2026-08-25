import type { Metadata } from 'next'
import { NotBuiltYet } from '@/components/dashboard/not-built-yet'

export const metadata: Metadata = { title: 'Kunden' }

export default function Page() {
  return <NotBuiltYet title="Kunden" />
}
