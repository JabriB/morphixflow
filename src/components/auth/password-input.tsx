'use client'

import { useState } from 'react'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { auth } from '@/content/auth'
import { Input } from '@/components/ui/field'
import { cn } from '@/lib/utils'

export function PasswordInput({
  id = 'password',
  name = 'password',
  invalid,
  value,
  onChange,
  autoComplete = 'current-password',
  placeholder = auth.fields.password.placeholder,
  describedBy,
}: {
  id?: string
  name?: string
  invalid?: boolean
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
  placeholder?: string
  describedBy?: string
}) {
  const [shown, setShown] = useState(false)

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={shown ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        invalid={invalid}
        aria-describedby={describedBy}
        className="pr-12"
      />
      <button
        type="button"
        onClick={() => setShown((v) => !v)}
        aria-label={shown ? auth.hidePassword : auth.showPassword}
        aria-pressed={shown}
        className={cn(
          'absolute right-1.5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-sm',
          'text-ink-subtle transition-colors duration-200 hover:text-ink',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        )}
      >
        {shown ? <EyeSlash size={17} /> : <Eye size={17} />}
      </button>
    </div>
  )
}

/** Four-step strength meter. Bars, not a progress ring. */
export function strengthOf(password: string) {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return Math.max(0, score - 1) // 0..3
}

export function StrengthMeter({ password }: { password: string }) {
  if (!password) return null
  const score = strengthOf(password)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              'h-0.5 flex-1 rounded-full transition-colors duration-300',
              i <= score
                ? score === 0
                  ? 'bg-negative'
                  : score === 3
                    ? 'bg-positive'
                    : 'bg-notice'
                : 'bg-line-strong',
            )}
          />
        ))}
      </div>
      <p className="text-2xs text-ink-subtle" aria-live="polite">
        {auth.signup.strengthLabels[score]}
      </p>
    </div>
  )
}
