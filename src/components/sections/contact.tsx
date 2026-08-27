'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { toast } from 'sonner'
import {
  CheckCircle,
  CircleNotch,
  Clock,
  EnvelopeSimple,
  MapPin,
  WhatsappLogo,
} from '@phosphor-icons/react'
import type { Dictionary } from '@/content/dictionary'
import { useContent } from '@/content/use-content'
import { Section, SectionHeading } from '@/components/ui/section'
import { Button, ButtonLink } from '@/components/ui/button'
import { Field, Input, Select, Textarea } from '@/components/ui/field'
import { buildWhatsAppLink } from '@/lib/whatsapp'

const EASE = [0.23, 1, 0.32, 1] as const
const waHref = buildWhatsAppLink()

const trustIcons = {
  mail: EnvelopeSimple,
  pin: MapPin,
  clock: Clock,
} as const

type FieldName = 'name' | 'email' | 'phone' | 'message' | 'consent'
type Errors = Partial<Record<FieldName, string>>

/* Focus order follows the visual order, so the first reported error is the
   first one the eye lands on. Consent sits last because it does. */
const FIELD_ORDER: readonly FieldName[] = [
  'name',
  'email',
  'phone',
  'message',
  'consent',
]

function focusFirstInvalid(errors: Errors) {
  const first = FIELD_ORDER.find((name) => errors[name])
  if (first) document.getElementById(first)?.focus()
}

/**
 * Takes the messages as an argument rather than reading a module-level import.
 * Validation runs outside the component, so it cannot call a hook, and the
 * error strings now depend on the active locale.
 */
function validateField(
  name: FieldName,
  value: string,
  errors: Dictionary['contact']['errors'],
): string | undefined {
  const trimmed = value.trim()
  switch (name) {
    case 'name':
      return trimmed ? undefined : errors.name
    case 'email':
      if (!trimmed) return errors.emailRequired
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? undefined : errors.emailInvalid
    case 'phone':
      return trimmed ? undefined : errors.phone
    case 'message':
      return trimmed ? undefined : errors.message
  }
}

export function Contact() {
  const { t } = useContent()
  const reduced = useReducedMotion()
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sent) successRef.current?.focus()
  }, [sent])

  function handleBlur(name: FieldName) {
    return (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const message = validateField(name, event.currentTarget.value, t.contact.errors)
      setErrors((prev) => ({ ...prev, [name]: message }))
    }
  }

  function handleChange(name: FieldName) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!errors[name]) return
      const message = validateField(name, event.currentTarget.value, t.contact.errors)
      if (!message) setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const get = (k: string) => String(data.get(k) ?? '')

    /* A checkbox reports its value only when checked, so absence is refusal. */
    const consented = data.get('consent') === 'on'

    const next: Errors = {
      name: validateField('name', get('name'), t.contact.errors),
      email: validateField('email', get('email'), t.contact.errors),
      phone: validateField('phone', get('phone'), t.contact.errors),
      message: validateField('message', get('message'), t.contact.errors),
      consent: consented ? undefined : t.contact.errors.consent,
    }

    setErrors(next)
    if (Object.values(next).some(Boolean)) {
      toast.error(t.contact.toastInvalid)
      focusFirstInvalid(next)
      return
    }

    setPending(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: get('name'),
          email: get('email'),
          phone: get('phone'),
          paket: get('paket'),
          message: get('message'),
          consent: consented,
          website: get('website'),
        }),
      })
      if (res.status === 400) {
        const body = (await res.json().catch(() => null)) as {
          fields?: Partial<Record<FieldName, string>>
        } | null
        if (body?.fields) {
          setErrors(body.fields)
          focusFirstInvalid(body.fields)
        }
        toast.error(t.contact.toastInvalid)
        return
      }
      if (res.status === 429) {
        toast.error(t.contact.toastRateLimited)
        return
      }
      if (!res.ok) throw new Error('request failed')
      setSent(true)
    } catch {
      toast.error(t.contact.toastFailed)
    } finally {
      setPending(false)
    }
  }

  return (
    <Section id="kontakt" className="bg-raised">
      <div className="mx-auto max-w-2xl">
        <SectionHeading sub={t.contact.subtext} className="mx-auto text-center">
          {t.contact.heading}
        </SectionHeading>

        <div className="mt-9 flex justify-center">
          <ButtonLink
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            <WhatsappLogo size={17} weight="fill" />
            {t.contact.whatsappCta}
          </ButtonLink>
        </div>

        <div className="my-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-line" />
          <span className="text-2xs font-bold uppercase tracking-[0.14em] text-ink-subtle">
            {t.contact.divider}
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
              className="flex flex-col items-center gap-4 rounded-lg border border-line p-12 text-center outline-none"
              role="status"
              ref={successRef}
              tabIndex={-1}
            >
              <CheckCircle size={44} weight="fill" className="text-accent" />
              <h3 className="text-xl font-extrabold">{t.contact.success.heading}</h3>
              <p className="measure text-sm text-ink-muted">{t.contact.success.body}</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative flex flex-col gap-6"
              aria-busy={pending || undefined}
            >
              {/* Honeypot: invisible to people, filled only by bots. The
                  server silently drops any submission that carries a value. */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={t.contact.fields.name.label} htmlFor="name" error={errors.name}>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder={t.contact.fields.name.placeholder}
                    invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                  />
                </Field>
                <Field label={t.contact.fields.email.label} htmlFor="email" error={errors.email}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t.contact.fields.email.placeholder}
                    invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                  />
                </Field>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={t.contact.fields.phone.label} htmlFor="phone" error={errors.phone}>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t.contact.fields.phone.placeholder}
                    invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    onBlur={handleBlur('phone')}
                    onChange={handleChange('phone')}
                  />
                </Field>
                <Field label={t.contact.fields.paket.label} htmlFor="paket">
                  <Select
                    id="paket"
                    name="paket"
                    options={t.contact.paketOptions}
                    placeholder={t.contact.fields.paket.placeholder}
                  />
                </Field>
              </div>

              <Field
                label={t.contact.fields.message.label}
                htmlFor="message"
                error={errors.message}
              >
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t.contact.fields.message.placeholder}
                  invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  onBlur={handleBlur('message')}
                  onChange={handleChange('message')}
                />
              </Field>

              {/* DSGVO Art. 6 Abs. 1 lit. a. Never pre-ticked: a checkbox that
                  starts checked is not consent under the GDPR. */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="consent"
                  className="flex cursor-pointer items-start gap-3 text-sm text-ink-muted"
                >
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                    onChange={() =>
                      setErrors((prev) =>
                        prev.consent ? { ...prev, consent: undefined } : prev,
                      )
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border border-line-strong bg-transparent"
                  />
                  <span>
                    {t.contact.consent.label}{' '}
                    <a
                      href={t.contact.consent.linkHref}
                      className="font-medium text-accent underline"
                    >
                      {t.contact.consent.linkLabel}
                    </a>
                  </span>
                </label>
                {errors.consent ? (
                  <p id="consent-error" role="alert" className="text-xs text-negative">
                    {errors.consent}
                  </p>
                ) : (
                  <p className="text-xs text-ink-subtle">{t.contact.consent.note}</p>
                )}
              </div>

              <Button type="submit" size="lg" disabled={pending}>
                {pending ? (
                  <>
                    <CircleNotch
                      size={17}
                      className="animate-spin motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    {t.contact.submitPending}
                  </>
                ) : (
                  t.contact.submit
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {t.contact.trust.map((point) => {
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
