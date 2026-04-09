import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)]',
          'px-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-subtle)]',
          'focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] focus:border-[var(--border-primary)]',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
