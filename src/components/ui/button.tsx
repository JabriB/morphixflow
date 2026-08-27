/**
 * Client component. Both exports hold a ref and run `useMagnetic`, so this
 * module cannot render on the server. Without the directive the dashboard
 * and legal pages, which are Server Components, crash at prerender with
 * "useRef is not a function". The landing page hid the problem because
 * every section that imports a button is already a client component.
 */
'use client'

import * as React from 'react'
import { cn, mergeRefs } from '@/lib/utils'
import { useMagnetic } from '@/hooks/use-magnetic'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold ' +
  'transition-[background-color,border-color,color,box-shadow,scale,translate] duration-200 ease-[var(--ease-out-expo)] ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-ink shadow-sm hover:bg-accent-hover active:bg-accent-press',
  secondary:
    'border border-line-strong bg-fill-subtle text-ink hover:border-line-hover hover:bg-fill-soft',
  ghost: 'text-ink-muted hover:bg-fill-subtle hover:text-ink',
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
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const innerRef = React.useRef<HTMLButtonElement>(null)
    useMagnetic(innerRef, variant === 'primary')
    return (
      <button
        ref={mergeRefs(innerRef, ref)}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const innerRef = React.useRef<HTMLAnchorElement>(null)
    useMagnetic(innerRef, variant === 'primary')
    return (
      <a
        ref={mergeRefs(innerRef, ref)}
        className={cn(base, 'no-underline', variants[variant], sizes[size], className)}
        {...props}
      />
    )
  },
)
ButtonLink.displayName = 'ButtonLink'
