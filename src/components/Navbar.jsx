import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { num: '01', label: 'START',      href: '#home' },
  { num: '02', label: 'LEISTUNGEN', href: '#solutions' },
  { num: '03', label: 'PROZESS',    href: '#how-it-works' },
  { num: '04', label: 'PAKETE',     href: '#pakete' },
  { num: '05', label: 'KONTAKT',    href: '#contact' },
];

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

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

  const lineColor = isDark ? 'rgba(239,246,248,0.8)' : 'rgba(13,21,32,0.75)';
  const textColor = isDark ? 'rgba(239,246,248,0.65)' : 'rgba(13,21,32,0.6)';

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
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #0D9488, #14B8A6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 6px rgba(13,148,136,0.35))',
            }}>
            MorphixFlow
          </a>

          {/* Desktop nav */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none', padding: 0, margin: 0 }}
            className="hidden lg:flex">
            {navLinks.map((link) => (
              <li key={link.num}>
                <a href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', position: 'relative' }}>
                  <span style={{
                    fontFamily: 'ui-monospace, monospace', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.1em', color: 'var(--accent-text)', opacity: 0.6,
                    lineHeight: 1, marginBottom: '2px',
                  }}>
                    {link.num}
                  </span>
                  <span style={{
                    fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em',
                    color: active === link.href ? 'var(--accent-primary)' : textColor,
                    transition: 'color 0.2s',
                  }}>
                    {link.label}
                  </span>
                  {active === link.href && (
                    <motion.span layoutId="nav-underline"
                      style={{
                        position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '2px',
                        background: 'linear-gradient(90deg, #0D9488, #14B8A6)',
                        borderRadius: '9999px',
                      }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Theme toggle */}
            <button onClick={toggleTheme} aria-label="Toggle theme"
              style={{
                width: '36px', height: '36px', borderRadius: '10px',
                border: '1px solid var(--border)', background: 'var(--bg-card)',
                color: 'var(--accent-primary)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer',
                backdropFilter: 'blur(10px)', transition: 'all 0.2s', flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-teal)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(13,148,136,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* CTA */}
            <a href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="hidden sm:inline-flex items-center"
              style={{
                padding: '9px 20px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #0F766E, #0D9488)',
                color: '#fff', fontSize: '13px', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.02em',
                boxShadow: '0 0 18px rgba(13,148,136,0.3)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(13,148,136,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 18px rgba(13,148,136,0.3)'; e.currentTarget.style.transform = 'none'; }}>
              Kostenlos beraten
            </a>

            {/* Hamburger */}
            <button className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu"
              style={{ background: 'none', border: 'none' }}>
              <span style={{ display: 'block', height: '2px', width: '22px', background: lineColor, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none', borderRadius: '2px' }} />
              <span style={{ display: 'block', height: '2px', width: '22px', background: lineColor, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1, borderRadius: '2px' }} />
              <span style={{ display: 'block', height: '2px', width: '22px', background: lineColor, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none', borderRadius: '2px' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div key="mobile-menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--mobile-bg)', backdropFilter: 'blur(20px)' }}>
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,148,136,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', position: 'relative', zIndex: 1 }}>
              {navLinks.map((link, i) => (
                <motion.li key={link.num}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}>
                  <a href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textDecoration: 'none', cursor: 'pointer' }}>
                    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', color: 'var(--accent-text)', fontWeight: 700 }}>
                      {link.num}
                    </span>
                    <span style={{ fontSize: '26px', fontWeight: 800, color: active === link.href ? 'var(--accent-primary)' : 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}>
                <a href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                  style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 32px', borderRadius: '12px', background: 'linear-gradient(135deg, #0F766E, #0D9488)', color: '#fff', fontWeight: 700, fontSize: '16px', textDecoration: 'none', boxShadow: '0 0 24px rgba(13,148,136,0.4)', marginTop: '0.5rem' }}>
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
