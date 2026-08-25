'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, EnvelopeSimple } from '@phosphor-icons/react'
import { auth, routes } from '@/content/auth'
import { Button } from '@/components/ui/button'
import { Field, Input } from '@/components/ui/field'
import { AuthHeading, FormError } from '@/components/auth/auth-shell'

export function ResetForm() {
  const [error, setError] = useState<string>()
  const [pending, setPending] = useState(false)
  const [sentTo, setSentTo] = useState<string>()
  const reduced = useReducedMotion()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get('email') ?? '').trim()

    if (!email) {
      setError(auth.errors.required)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(auth.errors.emailInvalid)
      return
    }

    // TODO(backend): no mail service is wired up yet.
    setError(undefined)
    setPending(true)
    await new Promise((r) => setTimeout(r, 700))
    setPending(false)
    setSentTo(email)
  }

  if (sentTo) {
    return (
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-col items-center gap-4 text-center"
        role="status"
      >
        <EnvelopeSimple size={40} weight="fill" className="text-accent" />
        <h1 className="text-xl">{auth.reset.success.heading}</h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          {auth.reset.success.bodyBefore}
          <strong className="font-bold text-ink">{sentTo}</strong>
          {auth.reset.success.bodyAfter}
        </p>
        <Link
          href={routes.login}
          className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-accent no-underline underline-offset-4 hover:underline"
        >
          <ArrowLeft size={15} weight="bold" />
          {auth.reset.back}
        </Link>
      </motion.div>
    )
  }

  return (
    <>
      <AuthHeading title={auth.reset.heading} sub={auth.reset.sub} />

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <FormError message={error} />

        <Field label={auth.fields.email.label} htmlFor="reset-email">
          <Input
            id="reset-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={auth.fields.email.placeholder}
            invalid={!!error}
          />
        </Field>

        <Button type="submit" size="lg" disabled={pending}>
          {pending ? 'Wird gesendet' : auth.reset.submit}
        </Button>
      </form>

      <Link
        href={routes.login}
        className="mt-8 inline-flex items-center gap-2 text-sm text-ink-muted no-underline transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} />
        {auth.reset.back}
      </Link>
    </>
  )
}
