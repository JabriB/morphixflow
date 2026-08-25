import type { Metadata } from 'next'
import { NotBuiltYet } from '@/components/dashboard/not-built-yet'

export const metadata: Metadata = { title: 'Analytics' }

export default function Page() {
  return <NotBuiltYet title="Analytics" />
}
