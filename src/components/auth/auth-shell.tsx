'use client'

import Link from 'next/link'
import { GoogleLogo } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export function AuthHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl">{title}</h1>
      <p className="mt-2 text-sm text-ink-muted">{sub}</p>
    </div>
  )
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p
      role="alert"
      className="rounded-md border border-negative/30 bg-negative/10 px-3.5 py-2.5 text-xs font-medium text-negative"
    >
      {message}
    </p>
  )
}

export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="my-6 flex items-center gap-4">
      <span className="h-px flex-1 bg-line" />
      <span className="text-2xs uppercase tracking-[0.14em] text-ink-subtle">
        {label}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}

export function GoogleButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-md',
        'border border-line-strong bg-fill-subtle text-sm font-bold text-ink',
        'transition-colors duration-200 hover:border-line-hover hover:bg-fill-soft',
        'active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent',
      )}
    >
      <GoogleLogo size={17} weight="bold" />
      {label}
    </button>
  )
}

export function AuthFooter({
  text,
  href,
  linkLabel,
}: {
  text: string
  href: string
  linkLabel: string
}) {
  return (
    <p className="mt-8 text-center text-sm text-ink-muted">
      {text}{' '}
      <Link
        href={href}
        className="font-bold text-accent underline-offset-4 hover:underline"
      >
        {linkLabel}
      </Link>
    </p>
  )
}
