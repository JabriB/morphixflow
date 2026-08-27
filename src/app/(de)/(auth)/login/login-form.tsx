'use client'

import Link from 'next/link'
import { useState } from 'react'
import { auth, routes } from '@/content/auth'
import { Button } from '@/components/ui/button'
import { Field, Input } from '@/components/ui/field'
import { PasswordInput } from '@/components/auth/password-input'
import {
  AuthDivider,
  AuthFooter,
  AuthHeading,
  FormError,
  GoogleButton,
} from '@/components/auth/auth-shell'

export function LoginForm() {
  const [error, setError] = useState<string>()
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') ?? '').trim()
    const password = String(data.get('password') ?? '')

    if (!email || !password) {
      setError(auth.errors.required)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(auth.errors.emailInvalid)
      return
    }

    // TODO(backend): no auth provider is wired up yet.
    setError(undefined)
    setPending(true)
    await new Promise((r) => setTimeout(r, 700))
    setPending(false)
    setError(auth.errors.credentials)
  }

  return (
    <>
      <AuthHeading title={auth.login.heading} sub={auth.login.sub} />

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <FormError message={error} />

        <Field label={auth.fields.email.label} htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={auth.fields.email.placeholder}
            invalid={!!error}
          />
        </Field>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <label
              htmlFor="password"
              className="text-xs font-bold tracking-wide text-ink-muted"
            >
              {auth.fields.password.label}
            </label>
            <Link
              href={routes.reset}
              className="text-2xs text-ink-subtle underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {auth.login.forgot}
            </Link>
          </div>
          <PasswordInput invalid={!!error} />
        </div>

        <Button type="submit" size="lg" disabled={pending} className="mt-1">
          {pending ? 'Wird geprüft' : auth.login.submit}
        </Button>
      </form>

      <AuthDivider label={auth.login.divider} />
      <GoogleButton label={auth.login.google} />
      <AuthFooter
        text={auth.login.footerText}
        href={routes.signup}
        linkLabel={auth.login.footerLink}
      />
    </>
  )
}
