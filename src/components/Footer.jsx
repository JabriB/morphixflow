const navLinks = [
  { label: 'Start',      href: '#home' },
  { label: 'Leistungen', href: '#solutions' },
  { label: 'Prozess',    href: '#how-it-works' },
  { label: 'Pakete',     href: '#pakete' },
  { label: 'Kontakt',    href: '#contact' },
];

const socials = [
  {
    label: 'LinkedIn', href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram', href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter', href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--footer-bg)',
      borderTop: '1px solid transparent',
      backgroundOrigin: 'border-box',
      backgroundImage: 'linear-gradient(var(--footer-bg), var(--footer-bg)), linear-gradient(90deg, transparent 0%, rgba(108,99,255,0.4) 30%, rgba(0,212,255,0.4) 70%, transparent 100%)',
      backgroundClip: 'padding-box, border-box',
      padding: '4rem 1.5rem 2rem',
      transition: 'background-color 0.35s',
      position: 'relative',
    }}>
      {/* Top gradient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.5), rgba(0,212,255,0.5), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Top row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '2rem',
          justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem',
        }}>
          {/* Logo + tagline */}
          <div style={{ flex: '1 1 200px' }}>
            <div style={{
              fontSize: '22px', fontWeight: 700, marginBottom: '0.75rem',
              background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              filter: 'drop-shadow(0 0 8px rgba(108,99,255,0.3))',
            }}>
              MorphixFlow
            </div>
            <p style={{ color: 'var(--text-subtle)', fontSize: '14px', margin: 0, maxWidth: '220px', lineHeight: 1.7 }}>
              Webseiten · Automationen · Ads · AI SEO — aus einer Hand.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation" style={{ flex: '1 1 200px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    style={{ color: 'var(--text-subtle)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s', cursor: 'pointer', fontWeight: 500 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#6C63FF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-subtle)')}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div style={{ flex: '1 1 120px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
            {socials.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label}
                style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-subtle)', textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#6C63FF';
                  e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)';
                  e.currentTarget.style.background = 'rgba(108,99,255,0.1)';
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(108,99,255,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-subtle)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.background = 'var(--bg-card)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border-divider)', paddingTop: '1.5rem',
          display: 'flex', flexWrap: 'wrap', gap: '1rem',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ color: 'var(--text-subtle)', fontSize: '13px', margin: 0 }}>
            © 2025 MorphixFlow. Alle Rechte vorbehalten.
          </p>
          <a href="#" style={{ color: 'var(--text-subtle)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6C63FF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-subtle)')}>
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
