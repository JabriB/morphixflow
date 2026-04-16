const navLinks = [
  { label: 'Start', href: '#home' },
  { label: 'Leistungen', href: '#solutions' },
  { label: 'Prozess', href: '#how-it-works' },
  { label: 'Pakete', href: '#pakete' },
  { label: 'Kontakt', href: '#contact' },
];

const socials = [
  {
    label: 'Instagram', href: '#',
    color: 'var(--color-rose)', dim: 'var(--color-rose-dim)', border: 'color-mix(in srgb, var(--color-rose) 22%, transparent)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'TikTok', href: '#',
    color: 'var(--color-primary)', dim: 'var(--color-primary-dim)', border: 'color-mix(in srgb, var(--color-primary) 22%, transparent)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.16 8.16 0 0 0 4.77 1.52V6.82a4.85 4.85 0 0 1-1-.13z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp', href: '#',
    color: 'var(--color-success)', dim: 'var(--color-success-dim)', border: 'color-mix(in srgb, var(--color-success) 22%, transparent)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.648 4.804 1.782 6.818L2 30l7.374-1.758A13.932 13.932 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.52 11.52 0 01-5.874-1.608l-.42-.248-4.374 1.042 1.078-4.258-.274-.44A11.52 11.52 0 014.4 16C4.4 9.594 9.594 4.4 16 4.4S27.6 9.594 27.6 16 22.406 27.6 16 27.6zm6.32-8.62c-.346-.174-2.05-1.012-2.368-1.128-.318-.116-.55-.174-.78.174-.232.346-.896 1.128-1.098 1.36-.202.232-.404.26-.75.086-.346-.174-1.46-.538-2.78-1.714-1.028-.916-1.722-2.048-1.924-2.394-.202-.346-.022-.534.152-.706.156-.154.346-.404.52-.606.172-.202.23-.346.346-.578.116-.232.058-.434-.028-.608-.087-.174-.78-1.882-1.07-2.578-.282-.676-.568-.584-.78-.594l-.664-.012c-.232 0-.608.086-.926.434-.318.346-1.214 1.186-1.214 2.892s1.242 3.354 1.416 3.586c.174.232 2.444 3.732 5.922 5.234.828.358 1.474.572 1.978.732.832.264 1.588.226 2.186.138.666-.1 2.05-.838 2.34-1.648.29-.81.29-1.504.202-1.648-.086-.144-.318-.232-.664-.406z" />
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
      borderTop: '1px solid var(--border)',
      padding: '4rem 1.5rem 2rem',
      position: 'relative',
    }}>

      {/* Multi-color accent line at top */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '1px',
        background: 'linear-gradient(90deg, transparent, #4fd1c5 20%, #a78bfa 50%, #f472b6 80%, transparent)',
        pointerEvents: 'none',
        opacity: 0.6,
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.75rem',
          alignItems: 'flex-start',
        }}>

          {/* Brand */}
          <div style={{ flex: '1 1 200px' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 400,
              marginBottom: '0.75rem',
              letterSpacing: '-0.01em',
              background: 'var(--gradient-brand)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              MorphixFlow
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-muted)',
              fontSize: 'var(--text-sm)',
              margin: 0,
              maxWidth: '210px',
              lineHeight: 1.7,
            }}>
              Webseiten · Automationen · Ads · AI SEO — aus einer Hand.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer Navigation" style={{ flex: '1 1 150px' }}>
            <ul style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column', gap: '0.55rem',
            }}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text-muted)',
                      fontSize: 'var(--text-sm)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                style={{
                  width: '40px', height: '40px',
                  borderRadius: 'var(--radius-lg)',
                  background: social.dim,
                  border: `1px solid ${social.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: social.color,
                  textDecoration: 'none',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.7';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border-divider)',
          paddingTop: '1.5rem',
          display: 'flex', flexWrap: 'wrap', gap: '1rem',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-subtle)',
            fontSize: 'var(--text-xs)',
            margin: 0,
          }}>
            © 2026 MorphixFlow. Alle Rechte vorbehalten.
          </p>
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-subtle)',
              fontSize: 'var(--text-xs)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-subtle)')}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
