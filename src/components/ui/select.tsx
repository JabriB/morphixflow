import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  error?: boolean
}

const Select = ({
  options,
  value,
  onChange,
  placeholder = 'Wählen...',
  className,
  error = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <button
        type="button"
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-primary)';
          e.currentTarget.style.boxShadow   = '0 0 0 3px var(--color-primary-dim)';
        }}
        onBlur={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = error ? 'var(--color-danger)' : 'var(--input-border)';
            e.currentTarget.style.boxShadow   = 'none';
          }
        }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          minHeight: '56px',
          boxSizing: 'border-box',
          background: 'var(--input-bg)',
          border: `1.5px solid ${error ? 'var(--color-danger)' : isOpen ? 'var(--color-primary)' : 'var(--input-border)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.22s ease',
          boxShadow: isOpen ? '0 0 0 3px var(--color-primary-dim)' : 'none',
        }}
      >
        <span style={{ color: selectedOption ? 'var(--text-primary)' : 'var(--text-subtle)' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          style={{
            color: 'var(--text-muted)',
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <div className="max-h-60 overflow-y-auto py-1.5 px-1.5">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-all',
                    'hover:bg-[var(--color-primary-dim)] hover:text-[var(--color-primary)]',
                    value === option.value
                      ? 'bg-[var(--color-primary-dim)] text-[var(--color-primary)]'
                      : 'text-[var(--text-secondary)]'
                  )}
                >
                  <span className="font-medium">{option.label}</span>
                  {value === option.value && <Check size={14} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Select }
