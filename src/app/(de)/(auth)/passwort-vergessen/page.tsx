import type { Metadata } from 'next'
import { auth } from '@/content/auth'
import { ResetForm } from './reset-form'

export const metadata: Metadata = { title: auth.reset.title }

export default function ResetPage() {
  return <ResetForm />
}
