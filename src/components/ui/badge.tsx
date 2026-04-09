import * as React from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'muted'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-[var(--color-primary-dim)] text-[var(--color-primary)] border-[var(--border-primary)]',
  success: 'bg-[var(--color-success-dim)] text-[var(--color-success)] border-[color-mix(in_srgb,var(--color-success)_22%,transparent)]',
  warning: 'bg-[var(--color-amber-dim)] text-[var(--color-amber)] border-[color-mix(in_srgb,var(--color-amber)_22%,transparent)]',
  danger:  'bg-red-500/10 text-red-400 border-red-500/20',
  muted:   'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border)]',
}

export function Badge({ variant = 'primary', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold tracking-wide',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}
