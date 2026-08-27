'use client'

import * as React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const EASE = [0.23, 1, 0.32, 1] as const

const control =
  'w-full rounded-md border bg-well px-4 text-base text-ink transition-[border-color,box-shadow] duration-200 ' +
  'ease-[var(--ease-out-expo)] outline-none placeholder:text-ink-subtle ' +
  'hover:border-line-hover focus:border-accent focus:shadow-[0_0_0_3px_rgb(255_92_41/0.18)] ' +
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

/**
 * A custom listbox, not a native select: the browser's own dropdown
 * popup renders with OS chrome (usually a system blue highlight) that
 * cannot be restyled to the single-accent dark system. This draws its
 * own panel instead, and submits via a hidden input so form handling
 * (a plain FormData read) needs no changes.
 */
export function Select({
  id,
  name,
  options,
  placeholder,
  defaultValue = '',
  invalid,
  className,
  'aria-describedby': describedBy,
}: {
  id: string
  name: string
  options: readonly string[]
  placeholder: string
  defaultValue?: string
  invalid?: boolean
  className?: string
  'aria-describedby'?: string
}) {
  const reduced = useReducedMotion()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState(defaultValue)
  const [activeIndex, setActiveIndex] = React.useState(0)

  const listboxId = `${id}-listbox`
  const optionId = (i: number) => `${id}-option-${i}`

  function openList() {
    const startIndex = Math.max(options.indexOf(selected), 0)
    setActiveIndex(startIndex)
    setOpen(true)
  }

  function choose(value: string) {
    setSelected(value)
    setOpen(false)
    rootRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
  }

  React.useEffect(() => {
    if (!open) return
    listRef.current?.focus()

    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  function handleListKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
        break
      case 'Home':
        e.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        e.preventDefault()
        setActiveIndex(options.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        choose(options[activeIndex])
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        rootRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
        break
      case 'Tab':
        setOpen(false)
        break
      default:
        if (e.key.length === 1) {
          const key = e.key.toLowerCase()
          const order = options.map((_, i) => (activeIndex + 1 + i) % options.length)
          const match = order.find((i) => options[i].toLowerCase().startsWith(key))
          if (match !== undefined) setActiveIndex(match)
        }
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={selected} />
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        className={cn(
          control,
          'h-13 flex cursor-pointer items-center justify-between pe-4 text-start',
          invalid ? 'border-negative' : 'border-line-strong',
          className,
        )}
      >
        <span className={selected ? 'text-ink' : 'text-ink-subtle'}>
          {selected || placeholder}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className={cn(
            'h-4 w-4 shrink-0 text-ink-subtle transition-transform duration-200',
            open && 'rotate-180',
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={optionId(activeIndex)}
            onKeyDown={handleListKeyDown}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: EASE }}
            className="absolute inset-x-0 top-[calc(100%+6px)] z-20 max-h-64 overflow-auto rounded-md border border-line-strong bg-card p-1.5 shadow-lg outline-none"
          >
            {options.map((option, i) => (
              <li
                key={option}
                id={optionId(i)}
                role="option"
                aria-selected={option === selected}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => choose(option)}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 rounded-sm px-3 py-2.5 text-sm',
                  i === activeIndex ? 'bg-fill-soft text-ink' : 'text-ink-muted',
                )}
              >
                {option}
                {option === selected ? (
                  <Check size={14} weight="bold" className="shrink-0 text-accent" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
