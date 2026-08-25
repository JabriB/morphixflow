import type { Metadata } from 'next'
import { auth } from '@/content/auth'
import { LoginForm } from './login-form'

export const metadata: Metadata = { title: auth.login.title }

export default function LoginPage() {
  return <LoginForm />
}
