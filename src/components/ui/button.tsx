import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

    const variants: Record<string, string> = {
      primary:
        'bg-[#0d9488] text-white hover:bg-[#0f766e] shadow-[0_2px_16px_rgba(79,209,197,0.22)] hover:shadow-[0_4px_24px_rgba(79,209,197,0.36)] hover:scale-[1.02] active:scale-[0.98]',
      secondary:
        'bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--border-primary)] hover:text-[var(--color-primary)]',
      ghost:
        'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]',
      outline:
        'border border-[var(--border-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-dim)]',
    }

    const sizes: Record<string, string> = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-11 px-5 text-sm',
      lg: 'h-13 px-7 text-base',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
