import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const navLinks = [
  { num: '01', label: 'START',      href: '#home' },
  { num: '02', label: 'LEISTUNGEN', href: '#solutions' },
  { num: '03', label: 'PROZESS',    href: '#how-it-works' },
  { num: '04', label: 'PAKETE',     href: '#pakete' },
  { num: '05', label: 'KONTAKT',    href: '#contact' },
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

  useEffect(() => {
    document.body.style.overflow    = menuOpen ? 'hidden' : '';
    document.body.style.touchAction = menuOpen ? 'none' : '';
    return () => { document.body.style.overflow = ''; document.body.style.touchAction = ''; };
  }, [menuOpen]);

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
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
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
          padding: '0 1.5rem', height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px', fontWeight: 400,
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            MorphixFlow
          </a>

          {/* Desktop nav links */}
          <ul
            style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none', padding: 0, margin: 0 }}
            className="hidden lg:flex"
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
                    {link.label}
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

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

            {/* Theme toggle */}
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
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-primary)';
                e.currentTarget.style.boxShadow  = '0 0 12px var(--color-primary-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow  = 'none';
              }}
            >
              {isDark
                ? <Sun size={16} aria-hidden="true" />
                : <Moon size={15} aria-hidden="true" />
              }
            </button>

            {/* CTA button */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="hidden sm:inline-flex items-center"
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
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow   = 'var(--btn-shadow-hover)';
                e.currentTarget.style.transform   = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow  = 'var(--btn-shadow)';
                e.currentTarget.style.transform  = 'none';
              }}
            >
              Kostenlos beraten
            </a>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={menuOpen}
              style={{ background: 'none', border: 'none' }}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: 'block', height: '2px', width: '22px',
                  background: 'var(--text-secondary)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: i === 0 && menuOpen ? 'rotate(45deg) translateY(7px)'
                           : i === 2 && menuOpen ? 'rotate(-45deg) translateY(-7px)'
                           : 'none',
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: 'var(--mobile-bg)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Ambient glow */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
              width: '400px', height: '400px', borderRadius: '50%',
              background: 'radial-gradient(circle, var(--color-primary-dim) 0%, transparent 70%)',
              filter: 'blur(60px)', pointerEvents: 'none',
            }} />

            <ul style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '2rem', position: 'relative', zIndex: 1,
            }}>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.num}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textDecoration: 'none', cursor: 'pointer' }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-text)', fontWeight: 700 }}>
                      {link.num}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px', fontWeight: 400,
                      color: active === link.href ? 'var(--accent-primary)' : 'var(--text-primary)',
                      letterSpacing: '-0.01em',
                    }}>
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
              >
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '14px 32px',
                    borderRadius: 'var(--radius-xl)',
                    background: 'var(--gradient-cta)',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700, fontSize: '16px',
                    textDecoration: 'none',
                    boxShadow: 'var(--btn-shadow-hover)',
                    marginTop: '0.5rem',
                  }}
                >
                  Kostenlos beraten
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
