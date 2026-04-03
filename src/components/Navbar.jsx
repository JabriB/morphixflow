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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow   = menuOpen ? 'hidden' : '';
    document.body.style.touchAction = menuOpen ? 'none' : '';
    return () => { document.body.style.overflow = ''; document.body.style.touchAction = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive('#' + e.target.id); }),
      { threshold: 0.4 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setActive(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const lineColor = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,15,0.8)';
  const textColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,15,0.65)';

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--nav-border)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="text-xl font-semibold tracking-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 8px rgba(108,99,255,0.4))',
            }}
          >
            MorphixFlow
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.num}>
                <a href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="flex flex-col items-center group cursor-pointer relative">
                  <span className="text-xs leading-none mb-0.5"
                    style={{ fontFamily: 'ui-monospace, monospace', color: '#6C63FF', letterSpacing: '0.06em', opacity: 0.7 }}>
                    {link.num}
                  </span>
                  <span className="text-sm font-medium transition-all duration-200"
                    style={{ color: active === link.href ? '#6C63FF' : textColor }}>
                    {link.label}
                  </span>
                  {active === link.href && (
                    <motion.span layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg, #6C63FF, #00D4FF)' }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: theme toggle + CTA + hamburger */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: '38px', height: '38px', borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)', color: '#6C63FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
                backdropFilter: 'blur(10px)', flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(108,99,255,0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                boxShadow: '0 0 18px rgba(108,99,255,0.35)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(108,99,255,0.6)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 18px rgba(108,99,255,0.35)'; e.currentTarget.style.transform = 'none'; }}>
              Kostenlos beraten
            </a>

            {/* Hamburger */}
            <button className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
              <span className="block h-0.5 w-6 transition-all duration-300"
                style={{ background: lineColor, transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
              <span className="block h-0.5 w-6 transition-all duration-300"
                style={{ background: lineColor, opacity: menuOpen ? 0 : 1 }} />
              <span className="block h-0.5 w-6 transition-all duration-300"
                style={{ background: lineColor, transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div key="mobile-menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'var(--mobile-bg)', backdropFilter: 'blur(20px)' }}>
            {/* Background orb */}
            <div style={{
              position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
              width: '400px', height: '400px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
              filter: 'blur(60px)', pointerEvents: 'none',
            }} />
            <ul className="flex flex-col items-center gap-8" style={{ position: 'relative', zIndex: 1 }}>
              {navLinks.map((link, i) => (
                <motion.li key={link.num} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}>
                  <a href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="flex flex-col items-center gap-1 cursor-pointer">
                    <span className="text-xs" style={{ fontFamily: 'ui-monospace, monospace', color: '#6C63FF' }}>
                      {link.num}
                    </span>
                    <span className="text-2xl font-semibold transition-colors"
                      style={{ color: active === link.href ? '#6C63FF' : 'var(--text-primary)' }}>
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                  className="inline-flex items-center px-8 py-3 rounded-full text-base font-semibold text-white mt-4"
                  style={{
                    background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                    boxShadow: '0 0 24px rgba(108,99,255,0.45)',
                  }}>
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
