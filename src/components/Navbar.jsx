import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, X } from 'lucide-react';

const navLinks = [
  { num: '01', label: 'Start',      href: '#home' },
  { num: '02', label: 'Leistungen', href: '#solutions' },
  { num: '03', label: 'Prozess',    href: '#how-it-works' },
  { num: '04', label: 'Pakete',     href: '#pakete' },
  { num: '05', label: 'Kontakt',    href: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled]  = useState(false);
  const [active, setActive]      = useState('#home');
  const [menuOpen, setMenuOpen]  = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow    = menuOpen ? 'hidden' : '';
    document.body.style.touchAction = menuOpen ? 'none' : '';
    return () => { document.body.style.overflow = ''; document.body.style.touchAction = ''; };
  }, [menuOpen]);

  /* Active section tracking */
  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive('#' + e.target.id); }),
      { threshold: 0.35 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setActive(href);
    setMenuOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 10);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: scrolled ? 'blur(18px) saturate(1.5)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(1.5)' : 'none',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--nav-border)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{
          maxWidth: '80rem', margin: '0 auto',
          padding: '0 1.25rem', height: '60px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px', fontWeight: 700,
              letterSpacing: '-0.02em',
              textDecoration: 'none',
              background: 'var(--gradient-brand)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              flexShrink: 0,
            }}
          >
            MorphixFlow
          </a>

          {/* Desktop nav links — only shown at 1024px+ */}
          <ul
            className="nav-links"
            style={{ alignItems: 'center', gap: '2.5rem', listStyle: 'none', padding: 0, margin: 0 }}
          >
            {navLinks.map((link) => (
              <li key={link.num}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  style={{
                    textDecoration: 'none', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', cursor: 'pointer', position: 'relative',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.1em', color: 'var(--accent-text)',
                    opacity: 0.55, lineHeight: 1, marginBottom: '2px',
                  }}>
                    {link.num}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em',
                    color: active === link.href ? 'var(--accent-primary)' : 'var(--text-muted)',
                    transition: 'color 0.2s',
                  }}>
                    {link.label.toUpperCase()}
                  </span>
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '2px',
                        background: 'var(--gradient-primary)',
                        borderRadius: 'var(--radius-full)',
                      }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            {/* Theme toggle — always visible */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln'}
              style={{
                width: '36px', height: '36px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                color: 'var(--accent-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              {isDark ? <Sun size={15} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
            </button>

            {/* Desktop CTA — only at 1024px+ */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="nav-cta items-center"
              style={{
                padding: '9px 20px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--gradient-cta)',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontSize: '13px', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.02em',
                boxShadow: 'var(--btn-shadow)',
                transition: 'all 0.25s ease',
                minHeight: '36px',
              }}
            >
              Kostenlos beraten
            </a>

            {/* Hamburger — tablet & mobile (below 1024px) */}
            <button
              className="hamburger-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              style={{
                width: '40px', height: '40px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(10px)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '5px', cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.2s',
              }}
            >
              <span style={{
                display: 'block', height: '1.5px', width: '18px',
                background: menuOpen ? 'var(--color-primary)' : 'var(--text-secondary)',
                borderRadius: '2px',
                transition: 'all 0.28s ease',
                transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
              }} />
              <span style={{
                display: 'block', height: '1.5px', width: '18px',
                background: menuOpen ? 'var(--color-primary)' : 'var(--text-secondary)',
                borderRadius: '2px',
                transition: 'all 0.28s ease',
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? 'scaleX(0)' : 'none',
              }} />
              <span style={{
                display: 'block', height: '1.5px', width: '18px',
                background: menuOpen ? 'var(--color-primary)' : 'var(--text-secondary)',
                borderRadius: '2px',
                transition: 'all 0.28s ease',
                transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile / Tablet dropdown menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 48,
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(4px)',
              }}
            />

            {/* Slide-down panel */}
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: '60px',
                left: 0, right: 0,
                zIndex: 49,
                background: 'var(--mobile-bg)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid var(--border)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
              }}
            >
              {/* Gradient accent top line */}
              <div aria-hidden="true" style={{
                height: '2px',
                background: 'var(--gradient-brand)',
                opacity: 0.7,
              }} />

              <div style={{ padding: '1rem 1.25rem 1.5rem' }}>

                {/* Nav links list */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem' }}>
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.num}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '13px 4px',
                          borderBottom: i < navLinks.length - 1 ? '1px solid var(--border-divider)' : 'none',
                          textDecoration: 'none', cursor: 'pointer',
                          transition: 'all 0.18s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px', fontWeight: 700,
                            letterSpacing: '0.1em',
                            color: active === link.href ? 'var(--accent-primary)' : 'var(--text-subtle)',
                            minWidth: '20px',
                          }}>
                            {link.num}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '16px', fontWeight: 600,
                            color: active === link.href ? 'var(--accent-primary)' : 'var(--text-primary)',
                            letterSpacing: '-0.01em',
                          }}>
                            {link.label}
                          </span>
                        </div>
                        {active === link.href && (
                          <motion.div
                            layoutId="mobile-active-dot"
                            style={{
                              width: '6px', height: '6px', borderRadius: '50%',
                              background: 'var(--gradient-primary)',
                            }}
                          />
                        )}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA button */}
                <motion.a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.05, duration: 0.3 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    width: '100%',
                    padding: '14px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--gradient-cta)',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700, fontSize: '15px',
                    textDecoration: 'none',
                    boxShadow: 'var(--btn-shadow)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  Kostenlos beraten lassen
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
