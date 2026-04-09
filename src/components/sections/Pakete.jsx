import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, Crown, Star } from 'lucide-react';

/* ── Package data ── */
const packages = [
  {
    id: 1, badge: null, name: 'Essential', tagline: 'Dein digitaler Auftritt',
    accentColor:  'var(--color-primary)',
    accentBg:     'var(--color-primary-dim)',
    accentBorder: 'var(--border-primary)',
    accentGlow:   'var(--color-primary-glow)',
    gradient:     'var(--gradient-primary)',
    featured: false, vip: false,
    pricing: {
      monthly: { main: '99 €',   suffix: '/ Monat', note: null },
      onetime: { main: '499 €',  suffix: 'einmalig', note: '+ 29 € / Monat Wartung' },
    },
    features: [
      { text: 'Webseite / Landing Page / Web App / E-Commerce', included: true },
      { text: 'Design nach deinen Wünschen (Farben, Logo, Stil)', included: true },
      { text: 'Mobile-optimiert & schnell', included: true },
      { text: 'SEO-Grundoptimierung', included: true },
      { text: '1:1 WhatsApp Video / Anruf Beratung', included: true },
      { text: 'Automation Workflow', included: false },
      { text: 'Werbe Kampagne', included: false },
    ],
    cta: 'Jetzt anfragen',
  },
  {
    id: 2, badge: 'Beliebteste Wahl', name: 'Customized', tagline: 'Website + Automation',
    accentColor:  'var(--color-violet)',
    accentBg:     'var(--color-violet-dim)',
    accentBorder: 'color-mix(in srgb, var(--color-violet) 22%, transparent)',
    accentGlow:   'var(--color-violet-glow)',
    gradient:     'var(--gradient-violet)',
    featured: true, vip: false,
    pricing: {
      monthly: { main: '149 €',  suffix: '/ Monat', note: null },
      onetime: { main: '799 €',  suffix: 'einmalig', note: '+ 39 € / Monat Wartung' },
    },
    features: [
      { text: 'Webseite / Landing Page / Web App / E-Commerce', included: true },
      { text: 'Design nach deinen Wünschen', included: true },
      { text: '1 Automation Workflow (CRM, E-Mail, Leads)', included: true },
      { text: 'Step-by-step Umsetzung nach Wunsch', included: true },
      { text: 'Bis zu 3× kostenlose Anpassungen', included: true },
      { text: '1:1 WhatsApp Video / Anruf Beratung', included: true },
      { text: 'Werbe Kampagne', included: false },
    ],
    cta: 'Jetzt anfragen',
  },
  {
    id: 3, badge: null, name: 'All-in-One Premium', tagline: 'Das Komplettpaket',
    accentColor:  'var(--color-blue)',
    accentBg:     'var(--color-blue-dim)',
    accentBorder: 'color-mix(in srgb, var(--color-blue) 22%, transparent)',
    accentGlow:   'var(--color-blue-glow)',
    gradient:     'var(--gradient-blue)',
    featured: false, vip: false,
    pricing: {
      monthly: { main: '249 €',  suffix: '/ Monat', note: null },
      onetime: { main: '1.499 €', suffix: 'einmalig', note: '+ 49 € / Monat Wartung' },
    },
    features: [
      { text: 'Webseite / Landing Page / Web App / E-Commerce', included: true },
      { text: 'Design nach deinen Wünschen', included: true },
      { text: '1 Automation Workflow (CRM, E-Mail, Leads)', included: true },
      { text: '1 Werbe Kampagne (Meta, TikTok ODER Google)', included: true },
      { text: 'Conversion-Optimierung', included: true },
      { text: 'AI SEO Setup', included: true },
      { text: '1:1 WhatsApp Video / Anruf Beratung', included: true },
    ],
    cta: 'Jetzt anfragen',
  },
  {
    id: 4, badge: 'Exklusiv', name: 'VIP', tagline: 'Alles — ohne Kompromisse',
    accentColor:  'var(--color-amber)',
    accentBg:     'var(--color-amber-dim)',
    accentBorder: 'color-mix(in srgb, var(--color-amber) 22%, transparent)',
    accentGlow:   'var(--color-amber-glow)',
    gradient:     'var(--gradient-amber)',
    featured: false, vip: true,
    pricing: {
      monthly: { main: 'Auf Anfrage', suffix: null, note: 'Individuelles Angebot' },
      onetime: { main: 'Auf Anfrage', suffix: null, note: 'Individuelles Angebot' },
    },
    features: [
      { text: 'Alles aus All-in-One Premium', included: true },
      { text: 'Alle Werbe Kampagnen (Meta + TikTok + Google)', included: true },
      { text: 'Unbegrenzte Anpassungen', included: true },
      { text: 'AI SEO & Conversion-Optimierung', included: true },
      { text: 'Priority Support & laufende Betreuung', included: true },
      { text: 'Individuelles Full-Service Paket', included: true },
      { text: '1:1 WhatsApp Video / Anruf Beratung', included: true },
    ],
    cta: 'VIP anfragen',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Price display with animated transitions ── */
function PriceDisplay({ pricing, billing }) {
  const p = pricing[billing];
  const dividerColor = 'var(--price-divider)';
  const noteColor    = 'var(--price-note)';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={billing}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        style={{
          marginBottom: '1.5rem',
          paddingBottom: '1.5rem',
          borderBottom: `1px solid ${dividerColor}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '7px', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: p.suffix ? '36px' : '22px',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--color-primary)',
          }}>
            {p.main}
          </span>
          {p.suffix && (
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-subtle)',
              fontWeight: 500,
            }}>
              {p.suffix}
            </span>
          )}
        </div>
        {p.note && (
          <p style={{
            fontFamily: 'var(--font-body)',
            margin: '5px 0 0',
            fontSize: 'var(--text-xs)',
            color: noteColor,
            fontWeight: 500,
          }}>
            {p.note}
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Individual package card ── */
function PackageCard({ pkg, billing }) {
  const prefersReduced = useReducedMotion();
  const { featured: isFeatured, vip: isVip } = pkg;

  /* Featured: elevated surface + accent border; VIP: amber border; others: glass card */
  const cardStyle = isFeatured
    ? {
        background: 'var(--bg-elevated)',
        border: `1px solid color-mix(in srgb, ${pkg.accentColor} 38%, transparent)`,
        borderRadius: 'var(--radius-2xl)',
        padding: '2.25rem',
        position: 'relative',
        boxShadow: `0 0 0 1px color-mix(in srgb, ${pkg.accentColor} 8%, transparent), 0 12px 48px rgba(0,0,0,0.6), 0 0 32px color-mix(in srgb, ${pkg.accentColor} 10%, transparent)`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        transition: 'all 0.3s ease',
      }
    : isVip
    ? {
        background: 'var(--bg-card)',
        border: '2px solid transparent',
        backgroundClip: 'padding-box',
        outline: '2px solid',
        outlineColor: 'var(--color-amber)',
        outlineOffset: '-2px',
        borderRadius: 'var(--radius-2xl)',
        padding: '2.25rem',
        position: 'relative',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: `0 6px 32px var(--color-amber-glow)`,
        transition: 'all 0.3s ease',
      }
    : {
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-2xl)',
        padding: '2.25rem',
        position: 'relative',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: 'var(--card-shadow)',
        transition: 'all 0.3s ease',
      };

  return (
    <motion.div variants={cardVariants} style={{ position: 'relative' }}>
      {/* Ambient glow halo for featured / VIP */}
      {(isFeatured || isVip) && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: -20, borderRadius: '40px',
          background: `radial-gradient(ellipse at 50% 0%, ${pkg.accentGlow}, transparent 65%)`,
          pointerEvents: 'none', zIndex: -1,
        }} />
      )}

      <motion.div
        whileHover={prefersReduced ? {} : {
          y: -5,
          boxShadow: isFeatured
            ? `0 18px 64px ${pkg.accentGlow}`
            : isVip
            ? `0 14px 52px var(--color-amber-glow)`
            : `0 10px 40px ${pkg.accentGlow}`,
          transition: { duration: 0.2 },
        }}
        style={cardStyle}
      >
        {/* Badge */}
        {pkg.badge && (
          <div style={{ marginBottom: '1.1rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '4px 13px',
              borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              ...(isFeatured
                ? {
                    background: pkg.accentBg,
                    border: `1px solid color-mix(in srgb, ${pkg.accentColor} 32%, transparent)`,
                    color: pkg.accentColor,
                  }
                : isVip
                ? {
                    background: 'var(--color-amber-dim)',
                    border: '1px solid color-mix(in srgb, var(--color-amber) 35%, transparent)',
                    color: 'var(--color-amber)',
                  }
                : {
                    background: pkg.accentBg,
                    border: `1px solid ${pkg.accentBorder}`,
                    color: pkg.accentColor,
                  }),
            }}>
              {isVip ? <Crown size={11} aria-hidden="true" /> : <Star size={11} aria-hidden="true" />}
              {pkg.badge}
            </span>
          </div>
        )}

        {/* Plan name */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          margin: '0 0 0.3rem',
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          color: isFeatured ? pkg.accentColor : isVip ? 'var(--color-amber)' : 'var(--text-primary)',
        }}>
          {pkg.name}
        </h3>

        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--text-muted)',
          fontSize: 'var(--text-sm)',
          margin: '0 0 1.5rem',
          fontWeight: 500,
        }}>
          {pkg.tagline}
        </p>

        <PriceDisplay pricing={pkg.pricing} billing={billing} />

        {/* Feature list */}
        <ul style={{
          listStyle: 'none', padding: 0,
          margin: '0 0 2rem',
          display: 'flex', flexDirection: 'column', gap: '10px',
        }}>
          {pkg.features.map((f) => (
            <li key={f.text} style={{
              display: 'flex', alignItems: 'flex-start', gap: '9px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: f.included ? 'var(--text-feature)' : 'var(--text-disabled)',
              textDecoration: f.included ? 'none' : 'line-through',
              lineHeight: 1.6,
            }}>
              {f.included
                ? <Check size={14} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-success)' }} aria-hidden="true" />
                : <X size={14} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--text-disabled)' }} aria-hidden="true" />
              }
              {f.text}
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <motion.a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          whileHover={prefersReduced ? {} : {
            scale: 1.02,
            boxShadow: isFeatured
              ? `0 0 32px ${pkg.accentGlow}`
              : `0 0 24px ${pkg.accentGlow}`,
          }}
          whileTap={prefersReduced ? {} : { scale: 0.97 }}
          style={{
            display: 'block', textAlign: 'center',
            padding: '14px 20px',
            borderRadius: 'var(--radius-lg)',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: 'var(--text-sm)',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.22s ease',
            letterSpacing: '0.01em',
            minHeight: '48px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            ...(isFeatured
              ? { background: pkg.gradient, color: '#fff', boxShadow: `0 4px 20px color-mix(in srgb, ${pkg.accentColor} 40%, transparent)` }
              : isVip
              ? { background: 'var(--gradient-amber)', color: '#1a0f00', boxShadow: `0 4px 16px var(--color-amber-glow)` }
              : {
                  background: pkg.gradient,
                  color: '#fff',
                  boxShadow: `0 4px 14px ${pkg.accentGlow}`,
                }),
          }}
        >
          {pkg.cta}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

/* ── Section ── */
export default function Pakete() {
  const { ref, inView } = useInView({ threshold: 0.04, triggerOnce: true });
  const prefersReduced  = useReducedMotion();
  const [billing, setBilling] = useState('monthly');

  return (
    <section
      id="pakete"
      ref={ref}
      style={{
        padding: '7rem 1.5rem',
        position: 'relative',
        backgroundColor: 'var(--bg-primary)',
        overflow: 'hidden',
        transition: 'background-color 0.3s',
      }}
    >
      {/* Ambient top glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '380px',
        background: 'radial-gradient(ellipse at 50% 0%, var(--color-primary-dim) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '88rem', margin: '0 auto', position: 'relative' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <p className="section-label" style={{ margin: '0 0 1rem' }}>04 · Pakete</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            margin: '0 0 1.1rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            Wähle dein{' '}
            <span style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontStyle: 'italic',
            }}>
              Paket
            </span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)',
            fontSize: 'var(--text-base)',
            margin: '0 0 2.5rem',
            maxWidth: '480px',
            lineHeight: 1.7,
          }}>
            Jedes Paket beinhaltet eine persönliche{' '}
            <span style={{ color: 'var(--accent-text)', fontWeight: 600 }}>
              1:1 Beratung per WhatsApp
            </span>.
          </p>

          {/* ── Billing toggle — polished segmented control ── */}
          <div
            role="group"
            aria-label="Abrechnungszeitraum wählen"
            style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'var(--toggle-bg)',
              border: '1px solid var(--toggle-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '4px',
              gap: '2px',
            }}
          >
            {[
              { key: 'monthly', label: 'Monatlich', sub: 'Abo' },
              { key: 'onetime', label: 'Einmalig',  sub: 'Kauf' },
            ].map((opt) => {
              const active = billing === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setBilling(opt.key)}
                  aria-pressed={active}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    padding: '9px 22px',
                    borderRadius: 'var(--radius-lg)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 700,
                    transition: 'all 0.22s ease',
                    minHeight: '44px',
                    ...(active
                      ? {
                          background: 'var(--gradient-cta)',
                          color: '#fff',
                          boxShadow: '0 2px 12px var(--color-primary-glow)',
                        }
                      : {
                          background: 'transparent',
                          color: 'var(--toggle-text-inactive)',
                        }),
                  }}
                >
                  {opt.label}
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    padding: '2px 7px',
                    borderRadius: 'var(--radius-md)',
                    ...(active
                      ? { background: 'rgba(255,255,255,0.22)', color: '#fff' }
                      : { background: 'var(--toggle-inactive)', color: 'var(--toggle-text-inactive)' }),
                  }}>
                    {opt.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {billing === 'onetime' && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-subtle)',
                fontSize: 'var(--text-xs)',
                marginTop: '10px',
              }}
            >
              Einmalzahlung + Wartungsabo ab 29 € / Monat — inkl. Updates & Support
            </motion.p>
          )}
        </motion.div>

        {/* Package cards */}
        {inView && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(248px, 1fr))',
              gap: '1.25rem',
              alignItems: 'start',
            }}
          >
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} billing={billing} />
            ))}
          </motion.div>
        )}

        {/* WhatsApp consultation nudge */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.5 }}
          style={{ marginTop: '3rem', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-subtle)',
            fontSize: 'var(--text-sm)',
            marginBottom: '1rem',
          }}>
            Nicht sicher welches Paket passt? Kein Problem.
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={prefersReduced ? {} : { scale: 1.03, boxShadow: '0 0 28px rgba(37,211,102,0.32)' }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px',
              background: 'rgba(37,211,102,0.08)',
              border: '1px solid rgba(37,211,102,0.26)',
              color: '#25D366',
              borderRadius: 'var(--radius-lg)',
              padding: '12px 24px',
              fontFamily: 'var(--font-body)',
              fontWeight: 600, fontSize: 'var(--text-sm)',
              textDecoration: 'none', cursor: 'pointer',
              transition: 'all 0.28s ease',
              minHeight: '44px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Kostenlos per WhatsApp beraten lassen
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
