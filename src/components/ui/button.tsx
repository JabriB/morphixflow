import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold ' +
  'transition-[background-color,border-color,color,box-shadow,scale] duration-200 ease-[var(--ease-out-expo)] ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-ink shadow-sm hover:bg-accent-hover active:bg-accent-press',
  secondary:
    'border border-line-strong bg-white/[0.03] text-ink hover:border-white/25 hover:bg-white/[0.06]',
  ghost: 'text-ink-muted hover:bg-white/[0.05] hover:text-ink',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-sm',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
)
Button.displayName = 'Button'

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <a
      ref={ref}
      className={cn(base, 'no-underline', variants[variant], sizes[size], className)}
      {...props}
    />
  ),
)
ButtonLink.displayName = 'ButtonLink'
