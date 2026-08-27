'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { List, X, WhatsappLogo } from '@phosphor-icons/react'
import { useContent } from '@/content/use-content'
import { cn } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LocaleSwitcher } from '@/components/ui/locale-switcher'
import { buildWhatsAppLink } from '@/lib/whatsapp'

const waHref = buildWhatsAppLink()

export function SiteHeader() {
  const { t } = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('#start')
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [t.navLinks])

  /**
   * Active section, resolved against a reading line just below the header.
   *
   * This deliberately does not use IntersectionObserver ratios. A threshold is
   * a percentage of the section's own height, and these sections range from
   * roughly 770px to 2040px, so a tall one can never put enough of itself
   * inside the viewport to cross the threshold and simply never activates.
   * Asking "which section is the reading line currently inside" is independent
   * of section height, and always yields exactly one answer.
   */
  useEffect(() => {
    const ids = t.navLinks.map((l) => l.href.slice(1))
    let raf = 0

    const update = () => {
      raf = 0
      const line = window.scrollY + 96
      const doc = document.documentElement

      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= line) current = id
      }

      /* The last section is usually too short to reach the reading line, so
         at the end of the page it would never light up on its own. */
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        current = ids[ids.length - 1]
      }

      setActive(`#${current}`)
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [t.navLinks])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-[var(--ease-out-expo)]',
        scrolled
          ? 'border-b border-line bg-ground/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <ScrollProgress />

      <div className="shell flex h-16 items-center justify-between gap-6">
        {/* py-2.5 gives the lockup a 44px tap area without changing how it looks. */}
        <a href="#start" aria-label={t.ui.homeLabel} className="-my-2.5 inline-flex py-2.5 no-underline">
          <Logo />
        </a>

        <nav aria-label={t.ui.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {t.navLinks.map((link) => {
              const isActive = active === link.href
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors duration-200',
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    {link.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 420, damping: 34 }
                        }
                        className="absolute inset-x-3 -bottom-px h-px bg-accent"
                      />
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden md:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />

          <ButtonLink
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="hidden lg:inline-flex"
          >
            {t.navCta.short}
          </ButtonLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.ui.menuClose : t.ui.menuOpen}
            className="grid h-11 w-11 place-items-center rounded-md border border-line-strong text-ink transition-colors duration-200 hover:bg-fill-soft lg:hidden"
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className="border-t border-line bg-ground/98 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label={t.ui.mobileNav} className="shell py-5">
              <ul className="flex flex-col">
                {t.navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-line py-3.5 text-base font-medium text-ink-muted no-underline transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="mt-5 w-full"
              >
                <WhatsappLogo size={17} weight="fill" />
                {t.navCta.long}
              </ButtonLink>

              {/* Mobile home for the toggle, which is hidden in the bar itself
                  to keep the small-screen header down to logo plus menu. */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <LocaleSwitcher className="md:hidden" />
                <ThemeToggle className="sm:hidden" />
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
