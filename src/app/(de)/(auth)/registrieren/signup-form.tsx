'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CheckCircle } from '@phosphor-icons/react'
import { auth, routes } from '@/content/auth'
import { Button, ButtonLink } from '@/components/ui/button'
import { Field, Input } from '@/components/ui/field'
import {
  PasswordInput,
  StrengthMeter,
  strengthOf,
} from '@/components/auth/password-input'
import {
  AuthDivider,
  AuthFooter,
  AuthHeading,
  FormError,
  GoogleButton,
} from '@/components/auth/auth-shell'

export function SignupForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)
  const reduced = useReducedMotion()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()

    if (!name || !email || !password) {
      setError(auth.errors.required)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(auth.errors.emailInvalid)
      return
    }
    if (strengthOf(password) < 1) {
      setError(auth.errors.weakPassword)
      return
    }

    // TODO(backend): no auth provider is wired up yet.
    setError(undefined)
    setPending(true)
    await new Promise((r) => setTimeout(r, 700))
    setPending(false)
    setDone(true)
  }

  if (done) {
    return (
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-col items-center gap-4 text-center"
        role="status"
      >
        <CheckCircle size={44} weight="fill" className="text-accent" />
        <h1 className="text-xl">{auth.signup.success.heading}</h1>
        <p className="text-sm text-ink-muted">{auth.signup.success.body}</p>
        <ButtonLink href={routes.login} className="mt-2 w-full">
          {auth.signup.success.cta}
        </ButtonLink>
      </motion.div>
    )
  }

  return (
    <>
      <AuthHeading title={auth.signup.heading} sub={auth.signup.sub} />

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <FormError message={error} />

        <Field label={auth.fields.name.label} htmlFor="name">
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder={auth.fields.name.placeholder}
          />
        </Field>

        <Field label={auth.fields.email.label} htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={auth.fields.email.placeholder}
          />
        </Field>

        <Field label={auth.fields.password.label} htmlFor="password">
          <PasswordInput
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StrengthMeter password={password} />
        </Field>

        <Button type="submit" size="lg" disabled={pending} className="mt-1">
          {pending ? 'Konto wird erstellt' : auth.signup.submit}
        </Button>

        <p className="text-2xs leading-relaxed text-ink-subtle">
          {auth.signup.consentBefore}
          <Link
            href="/datenschutz"
            className="text-ink-muted underline underline-offset-2"
          >
            {auth.signup.consentLink}
          </Link>
          {auth.signup.consentAfter}
        </p>
      </form>

      <AuthDivider label={auth.signup.divider} />
      <GoogleButton label={auth.signup.google} />
      <AuthFooter
        text={auth.signup.footerText}
        href={routes.login}
        linkLabel={auth.signup.footerLink}
      />
    </>
  )
}
