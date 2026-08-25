'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const control =
  'w-full rounded-md border bg-well px-4 text-base text-ink transition-[border-color,box-shadow] duration-200 ' +
  'ease-[var(--ease-out-expo)] outline-none placeholder:text-ink-subtle ' +
  'hover:border-white/20 focus:border-accent focus:shadow-[0_0_0_3px_rgb(255_92_41/0.18)] ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

export function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={htmlFor}
        className="text-xs font-bold tracking-wide text-ink-muted"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-xs font-medium text-negative"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <input
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(
      control,
      'h-13',
      invalid ? 'border-negative' : 'border-line-strong',
      className,
    )}
    {...props}
  />
))
Input.displayName = 'Input'

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <textarea
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(
      control,
      'min-h-32 resize-y py-3.5 leading-relaxed',
      invalid ? 'border-negative' : 'border-line-strong',
      className,
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

/** Native select, themed. The chevron is drawn, not a unicode glyph. */
export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }
>(({ className, invalid, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        control,
        'h-13 cursor-pointer appearance-none pr-11',
        invalid ? 'border-negative' : 'border-line-strong',
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  </div>
))
Select.displayName = 'Select'
