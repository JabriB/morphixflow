import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FFB3"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0, marginTop: '2px' }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)"
    strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: '2px' }}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const packages = [
  {
    id: 1, badge: null, name: 'Essential', tagline: 'Dein digitaler Auftritt',
    gradFrom: '#6C63FF', gradTo: '#00D4FF', glowColor: 'rgba(108,99,255,0.2)',
    featured: false, vip: false,
    pricing: {
      monthly: { main: '99 €', suffix: '/ Monat', note: null },
      onetime: { main: '499 €', suffix: 'einmalig', note: '+ 29 € / Monat Wartung' },
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
    id: 2, badge: '⭐ Beliebteste Wahl', name: 'Customized', tagline: 'Website + Automation',
    gradFrom: '#6C63FF', gradTo: '#A855F7', glowColor: 'rgba(108,99,255,0.3)',
    featured: true, vip: false,
    pricing: {
      monthly: { main: '149 €', suffix: '/ Monat', note: null },
      onetime: { main: '799 €', suffix: 'einmalig', note: '+ 39 € / Monat Wartung' },
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
    gradFrom: '#A855F7', gradTo: '#00D4FF', glowColor: 'rgba(168,85,247,0.25)',
    featured: false, vip: false,
    pricing: {
      monthly: { main: '249 €', suffix: '/ Monat', note: null },
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
    id: 4, badge: '👑 Exklusiv', name: 'VIP', tagline: 'Alles — ohne Kompromisse',
    gradFrom: '#FFD700', gradTo: '#FF8E53', glowColor: 'rgba(255,215,0,0.2)',
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
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

function PriceDisplay({ pricing, billing, pkg }) {
  const p = pricing[billing];
  const priceColor = pkg.featured
    ? '#fff'
    : pkg.vip
    ? '#FFD700'
    : '#8B85FF';
  const suffixColor = pkg.featured ? 'rgba(255,255,255,0.8)' : 'var(--text-subtle)';
  const noteColor = pkg.featured ? 'rgba(255,255,255,0.65)' : 'var(--price-note)';
  const dividerColor = pkg.featured ? 'rgba(255,255,255,0.2)' : 'var(--price-divider)';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={billing}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        style={{ marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: `1px solid ${dividerColor}` }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: p.suffix ? '36px' : '24px',
            fontWeight: 700, lineHeight: 1,
            background: `linear-gradient(135deg, ${pkg.gradFrom}, ${pkg.gradTo})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: pkg.featured ? '#fff' : 'transparent',
            backgroundClip: 'text',
            color: pkg.featured ? '#fff' : 'transparent',
          }}>
            {p.main}
          </span>
          {p.suffix && (
            <span style={{ fontSize: '15px', color: suffixColor, fontWeight: 500 }}>
              {p.suffix}
            </span>
          )}
        </div>
        {p.note && (
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: noteColor, fontWeight: 500 }}>
            {p.note}
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function PackageCard({ pkg, billing }) {
  const prefersReduced = useReducedMotion();

  const isVip = pkg.vip;
  const isFeatured = pkg.featured;

  const cardStyle = {
    background: isFeatured
      ? `linear-gradient(145deg, ${pkg.gradFrom}22, ${pkg.gradTo}22)`
      : 'var(--bg-card)',
    border: isFeatured
      ? `2px solid rgba(108,99,255,0.55)`
      : isVip
      ? '2px solid transparent'
      : '1px solid var(--border)',
    borderRadius: '24px',
    padding: '2.5rem',
    position: 'relative',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: isFeatured
      ? '0 0 50px rgba(108,99,255,0.25)'
      : isVip
      ? '0 0 30px rgba(255,215,0,0.15)'
      : 'none',
    ...(isVip && {
      background: 'linear-gradient(var(--bg-card), var(--bg-card)) padding-box, linear-gradient(135deg, #FFD700, #FF8E53) border-box',
    }),
    transition: 'all 0.3s ease',
  };

  return (
    <motion.div variants={cardVariants} style={{ position: 'relative' }}>
      {/* Glow orb */}
      {(isFeatured || isVip) && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: -20, borderRadius: '40px',
          background: `radial-gradient(ellipse at 50% 0%, ${pkg.glowColor}, transparent 70%)`,
          pointerEvents: 'none', zIndex: -1,
        }} />
      )}
      <motion.div
        whileHover={prefersReduced ? {} : {
          y: -6,
          boxShadow: isFeatured
            ? '0 0 70px rgba(108,99,255,0.4)'
            : isVip
            ? '0 0 40px rgba(255,215,0,0.25)'
            : `0 0 30px ${pkg.glowColor}`,
          transition: { duration: 0.22 },
        }}
        style={cardStyle}
      >
        {pkg.badge && (
          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', padding: '6px 16px',
              borderRadius: '9999px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em',
              background: isFeatured
                ? 'rgba(255,255,255,0.2)'
                : isVip
                ? 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,142,83,0.2))'
                : `linear-gradient(135deg, ${pkg.gradFrom}22, ${pkg.gradTo}22)`,
              border: isFeatured
                ? '1px solid rgba(255,255,255,0.3)'
                : isVip
                ? '1px solid rgba(255,215,0,0.4)'
                : `1px solid ${pkg.gradFrom}40`,
              color: isFeatured ? '#fff' : isVip ? '#FFD700' : '#8B85FF',
            }}>
              {pkg.badge}
            </span>
          </div>
        )}

        <h3 style={{
          margin: '0 0 0.35rem', fontSize: '24px', fontWeight: 700,
          color: isFeatured ? '#fff' : isVip ? '#FFD700' : 'var(--text-primary)',
        }}>
          {pkg.name}
        </h3>

        <p style={{
          color: isFeatured ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)',
          fontSize: '15px', margin: '0 0 1.75rem', fontWeight: 500,
        }}>
          {pkg.tagline}
        </p>

        <PriceDisplay pricing={pkg.pricing} billing={billing} pkg={pkg} />

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.25rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pkg.features.map((f) => (
            <li key={f.text} style={{
              display: 'flex', alignItems: 'flex-start', gap: '10px',
              fontSize: '15px',
              color: f.included
                ? (isFeatured ? '#fff' : 'var(--text-feature)')
                : (isFeatured ? 'rgba(255,255,255,0.3)' : 'var(--text-disabled)'),
              textDecoration: f.included ? 'none' : 'line-through',
              lineHeight: 1.55,
              fontWeight: f.included && isFeatured ? 500 : 400,
            }}>
              {f.included ? <CheckIcon /> : <XIcon />}
              {f.text}
            </li>
          ))}
        </ul>

        <motion.a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          whileHover={prefersReduced ? {} : {
            scale: 1.03,
            boxShadow: isFeatured ? '0 0 30px rgba(255,255,255,0.3)' : `0 0 24px ${pkg.glowColor}`,
          }}
          whileTap={prefersReduced ? {} : { scale: 0.97 }}
          style={{
            display: 'block', textAlign: 'center', padding: '16px 24px',
            borderRadius: '9999px', fontWeight: 800, fontSize: '16px',
            textDecoration: 'none', cursor: 'pointer', transition: 'all 0.25s ease',
            ...(isFeatured
              ? { background: '#fff', color: '#6C63FF', boxShadow: '0 8px 24px rgba(255,255,255,0.15)' }
              : isVip
              ? { background: 'linear-gradient(135deg, #FFD700, #FF8E53)', color: '#1a1208', boxShadow: '0 8px 24px rgba(255,215,0,0.2)' }
              : {
                  background: `linear-gradient(135deg, ${pkg.gradFrom}, ${pkg.gradTo})`,
                  color: '#fff',
                  boxShadow: `0 4px 16px ${pkg.glowColor}`,
                }),
          }}
        >
          {pkg.cta} →
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default function Pakete() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const prefersReduced = useReducedMotion();
  const [billing, setBilling] = useState('monthly');

  return (
    <section id="pakete" ref={ref} style={{
      padding: '8rem 1.5rem', position: 'relative',
      backgroundColor: 'var(--bg-secondary)', overflow: 'hidden', transition: 'background-color 0.35s',
    }}>
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '400px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '84rem', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ marginBottom: '3rem', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'ui-monospace, monospace', color: '#6C63FF',
            fontSize: '12px', letterSpacing: '0.15em', margin: '0 0 1rem', textTransform: 'uppercase', fontWeight: 600,
          }}>
            04 · Pakete
          </p>
          <h2 style={{
            color: 'var(--text-primary)', fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700, margin: '0 0 1.5rem', lineHeight: 1.1,
          }}>
            Wähle dein{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Paket
            </span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '19px', margin: '0 auto 3rem', maxWidth: '540px', lineHeight: 1.6 }}>
            Jedes Paket beinhaltet eine persönliche{' '}
            <span style={{ color: '#6C63FF', fontWeight: 600 }}>1:1 Beratung per WhatsApp</span>.
          </p>

          {/* Billing toggle */}
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'var(--toggle-bg)', border: '1px solid var(--toggle-border)',
            borderRadius: '9999px', padding: '4px',
          }}>
            {[
              { key: 'monthly', label: 'Monatlich', sub: 'Abo' },
              { key: 'onetime', label: 'Einmalig', sub: 'Kauf' },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setBilling(opt.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 24px', borderRadius: '9999px', border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700,
                  transition: 'all 0.25s ease',
                  ...(billing === opt.key
                    ? { background: 'linear-gradient(135deg, #6C63FF, #00D4FF)', color: '#fff', boxShadow: '0 4px 14px rgba(108,99,255,0.4)' }
                    : { background: 'transparent', color: 'var(--toggle-text-inactive)' }),
                }}
              >
                {opt.label}
                <span style={{
                  fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '9999px',
                  ...(billing === opt.key
                    ? { background: 'rgba(255,255,255,0.2)', color: '#fff' }
                    : { background: 'var(--toggle-inactive)', color: 'var(--toggle-text-inactive)' }),
                }}>
                  {opt.sub}
                </span>
              </button>
            ))}
          </div>

          {billing === 'onetime' && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: 'var(--text-subtle)', fontSize: '13px', marginTop: '12px' }}
            >
              Einmalzahlung + Wartungsabo ab 29 € / Monat — inklusive Updates & Support
            </motion.p>
          )}
        </motion.div>

        {/* Cards */}
        {inView && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              alignItems: 'start',
            }}
          >
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} billing={billing} />
            ))}
          </motion.div>
        )}

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{ marginTop: '3.5rem', textAlign: 'center' }}
        >
          <p style={{ color: 'var(--text-subtle)', fontSize: '14px', marginBottom: '1rem' }}>
            Nicht sicher welches Paket passt? Kein Problem.
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={prefersReduced ? {} : { scale: 1.04, boxShadow: '0 0 30px rgba(37,211,102,0.35)' }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(135deg, rgba(37,211,102,0.12), rgba(18,140,126,0.12))',
              border: '1px solid rgba(37,211,102,0.3)',
              color: '#25D366', borderRadius: '9999px', padding: '14px 28px',
              fontWeight: 600, fontSize: '15px', textDecoration: 'none', cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Kostenlos per WhatsApp beraten lassen
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
