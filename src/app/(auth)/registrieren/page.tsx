import type { Metadata } from 'next'
import { auth } from '@/content/auth'
import { SignupForm } from './signup-form'

export const metadata: Metadata = { title: auth.signup.title }

export default function SignupPage() {
  return <SignupForm />
}
