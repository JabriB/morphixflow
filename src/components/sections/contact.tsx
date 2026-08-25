'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  CheckCircle,
  Clock,
  EnvelopeSimple,
  MapPin,
  WhatsappLogo,
} from '@phosphor-icons/react'
import { contact, site } from '@/content/site'
import { Section, SectionHeading } from '@/components/ui/section'
import { Button, ButtonLink } from '@/components/ui/button'
import { Field, Input, Select, Textarea } from '@/components/ui/field'

const EASE = [0.23, 1, 0.32, 1] as const
const waHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`

const trustIcons = {
  mail: EnvelopeSimple,
  pin: MapPin,
  clock: Clock,
} as const

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>

export function Contact() {
  const reduced = useReducedMotion()
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const get = (k: string) => String(data.get(k) ?? '').trim()

    const next: Errors = {}
    if (!get('name')) next.name = contact.errors.name
    const email = get('email')
    if (!email) next.email = contact.errors.emailRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = contact.errors.emailInvalid
    if (!get('phone')) next.phone = contact.errors.phone
    if (!get('message')) next.message = contact.errors.message

    setErrors(next)
    if (Object.keys(next).length > 0) return

    // TODO(backend): no submission endpoint exists yet. Nothing is sent.
    setPending(true)
    await new Promise((r) => setTimeout(r, 600))
    setPending(false)
    setSent(true)
  }

  return (
    <Section id="kontakt" className="bg-raised">
      <div className="mx-auto max-w-2xl">
        <SectionHeading sub={contact.subtext} className="mx-auto text-center">
          {contact.heading}
        </SectionHeading>

        <div className="mt-9 flex justify-center">
          <ButtonLink
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            <WhatsappLogo size={17} weight="fill" />
            {contact.whatsappCta}
          </ButtonLink>
        </div>

        <div className="my-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-line" />
          <span className="text-2xs font-bold uppercase tracking-[0.14em] text-ink-subtle">
            {contact.divider}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="success"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex flex-col items-center gap-4 rounded-lg border border-line p-12 text-center"
              role="status"
            >
              <CheckCircle size={44} weight="fill" className="text-accent" />
              <h3 className="text-xl font-extrabold">{contact.success.heading}</h3>
              <p className="measure text-sm text-ink-muted">{contact.success.body}</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col gap-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={contact.fields.name.label} htmlFor="name" error={errors.name}>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder={contact.fields.name.placeholder}
                    invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                </Field>
                <Field label={contact.fields.email.label} htmlFor="email" error={errors.email}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={contact.fields.email.placeholder}
                    invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </Field>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={contact.fields.phone.label} htmlFor="phone" error={errors.phone}>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={contact.fields.phone.placeholder}
                    invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                </Field>
                <Field label={contact.fields.paket.label} htmlFor="paket">
                  <Select id="paket" name="paket" defaultValue="">
                    <option value="" disabled>
                      {contact.fields.paket.placeholder}
                    </option>
                    {contact.paketOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>

              <Field
                label={contact.fields.message.label}
                htmlFor="message"
                error={errors.message}
              >
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={contact.fields.message.placeholder}
                  invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
              </Field>

              <Button type="submit" size="lg" disabled={pending}>
                {pending ? 'Wird gesendet' : contact.submit}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {contact.trust.map((point) => {
            const Icon = trustIcons[point.icon as keyof typeof trustIcons]
            return (
              <li
                key={point.label}
                className="flex items-center gap-2 text-xs text-ink-subtle"
              >
                <Icon size={14} className="text-ink-faint" aria-hidden="true" />
                {point.label}
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
