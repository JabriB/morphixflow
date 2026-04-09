import { motion, useReducedMotion } from 'framer-motion';
import { SplineScene } from '../ui/splite';
import { Spotlight } from '../ui/spotlight';
import { Card } from '../ui/card';

const services = [
  { label: 'Webseiten',        color: '#4fd1c5', glow: 'rgba(79,209,197,0.18)' },
  { label: 'AI Automationen',  color: '#a78bfa', glow: 'rgba(167,139,250,0.18)' },
  { label: 'Meta & TikTok Ads',color: '#f472b6', glow: 'rgba(244,114,182,0.18)' },
  { label: 'Google Ads',       color: '#fbbf24', glow: 'rgba(251,191,36,0.18)' },
  { label: 'AI SEO',           color: '#38bdf8', glow: 'rgba(56,189,248,0.18)' },
];

const metrics = [
  { value: '50+', label: 'Projekte',      gradient: 'linear-gradient(135deg,#0d9488,#4fd1c5)' },
  { value: '98%', label: 'Zufriedenheit', gradient: 'linear-gradient(135deg,#7c3aed,#a78bfa)' },
  { value: '3×',  label: 'Ø ROI',         gradient: 'linear-gradient(135deg,#d97706,#fbbf24)' },
  { value: '24h', label: 'Antwortzeit',   gradient: 'linear-gradient(135deg,#059669,#34d399)' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const wordVariant = {
  hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
  visible: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const pillVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1, scale: 1,
      transition: { delay: prefersReduced ? 0 : 1.0 + i * 0.07, duration: 0.32, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4.5rem, 8vw, 6.5rem) 1.5rem 3rem',
        backgroundColor: 'var(--bg-primary)',
        overflow: 'hidden',
      }}
    >
      {/* Multi-color ambient orbs behind the card */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-12%', left: '20%',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(167,139,250,0.18) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(40px)',
        animation: prefersReduced ? 'none' : 'glow-pulse 10s ease-in-out infinite',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '5%', right: '10%',
        width: '500px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(251,191,36,0.14) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(40px)',
        animation: prefersReduced ? 'none' : 'glow-pulse 12s ease-in-out infinite 3s',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '30%', right: '5%',
        width: '400px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(79,209,197,0.14) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(40px)',
        animation: prefersReduced ? 'none' : 'glow-pulse 9s ease-in-out infinite 1.5s',
      }} />

      {/* Noise grain */}
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none', zIndex: 1 }}>
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* ── Hero Card ── */}
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '88rem' }}
      >
        <Card
          className="w-full relative overflow-hidden"
          style={{
            background: 'rgba(10,10,12,0.96)',
            minHeight: 'clamp(480px, 65vh, 680px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Spotlight beam */}
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          {/* Multi-color inner glows */}
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: 0, right: 0,
            width: '520px', height: '520px',
            background: 'radial-gradient(circle at bottom right, rgba(167,139,250,0.18) 0%, transparent 60%)',
            pointerEvents: 'none', zIndex: 0,
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, left: '30%',
            width: '400px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(79,209,197,0.1) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: '20%', left: '5%',
            width: '300px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(244,114,182,0.1) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
          }} />

          {/* ── Split layout ── */}
          <div className="flex h-full" style={{ minHeight: 'inherit' }}>

            {/* LEFT — content */}
            <div className="flex-1 flex flex-col justify-center"
              style={{ padding: 'clamp(2rem, 5vw, 3.5rem)', position: 'relative', zIndex: 10 }}>

              {/* Eyebrow badge — violet accent */}
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.1}
                style={{ display: 'inline-flex', marginBottom: '1.75rem' }}>
                <span style={{
                  border: '1px solid rgba(167,139,250,0.3)',
                  borderRadius: 'var(--radius-full)',
                  padding: '7px 18px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'rgba(167,139,250,0.1)',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  color: '#a78bfa',
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: 'linear-gradient(135deg,#4fd1c5,#a78bfa)',
                    boxShadow: '0 0 8px rgba(167,139,250,0.7)',
                    animation: prefersReduced ? 'none' : 'pulse 2.2s ease-in-out infinite',
                  }} />
                  Freelancer · Digital Solutions · DE
                </span>
              </motion.div>

              {/* Primary Brand Heading */}
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.2} style={{ marginBottom: '1.25rem' }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px, 2.8vw, 24px)',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: 'var(--text-primary)',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  MorphixFlow
                  <span style={{ 
                    width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-primary)' 
                  }} />
                  <span style={{ 
                    background: 'var(--gradient-brand)', 
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Premium Freelancing Solutions
                  </span>
                </h2>
              </motion.div>

              {/* Headline */}
              <h1 style={{ margin: '0 0 1.25rem', lineHeight: 1.05 }}>
                {/* Line 1 — white to grey */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 5vw, 64px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(to bottom, #f0f0f2, #8a8a95)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  display: 'flex', flexWrap: 'wrap', gap: '0 0.22em',
                }}>
                  {['Mehr', 'Kunden.'].map((word, i) => (
                    <motion.span key={word} custom={prefersReduced ? 0 : i}
                      initial="hidden" animate="visible"
                      variants={prefersReduced ? {} : wordVariant}
                      style={{ display: 'inline-block' }}>
                      {word}
                    </motion.span>
                  ))}
                </div>

                {/* Line 2 — teal → violet → amber multi-color */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 5vw, 64px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  fontStyle: 'italic',
                  background: 'var(--gradient-hero)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  display: 'flex', flexWrap: 'wrap', gap: '0 0.22em',
                }}>
                  {['Mehr', 'Umsatz.'].map((word, i) => (
                    <motion.span key={word} custom={prefersReduced ? 0 : 2 + i}
                      initial="hidden" animate="visible"
                      variants={prefersReduced ? {} : wordVariant}
                      style={{ display: 'inline-block' }}>
                      {word}
                    </motion.span>
                  ))}
                </div>
              </h1>

              {/* Subtext */}
              <motion.p
                initial="hidden" animate="visible" variants={fadeUp} custom={0.4}
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#a0a0aa',
                  fontSize: 'clamp(15px, 1.6vw, 17px)',
                  maxWidth: '420px',
                  margin: '0 0 2rem',
                  lineHeight: 1.72,
                }}
              >
                Webseiten, Automationen & Werbekampagnen — alles aus einer Hand.{' '}
                <span style={{ color: '#34d399', fontWeight: 600 }}>
                  Persönlich 1:1 per WhatsApp beraten.
                </span>
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial="hidden" animate="visible" variants={fadeUp} custom={0.55}
                style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.75rem' }}
              >
                <motion.a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  whileHover={prefersReduced ? {} : { scale: 1.03, boxShadow: '0 6px 32px rgba(124,58,237,0.55)' }}
                  whileTap={prefersReduced ? {} : { scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'var(--gradient-cta)',
                    color: '#fff',
                    borderRadius: 'var(--radius-lg)',
                    padding: '13px 24px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700, fontSize: '14px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
                    minHeight: '46px',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  Kostenlos beraten lassen
                </motion.a>

                <motion.a
                  href="#pakete"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#pakete')?.scrollIntoView({ behavior: 'smooth' }); }}
                  whileHover={prefersReduced ? {} : { borderColor: 'rgba(167,139,250,0.4)', color: '#a78bfa' }}
                  whileTap={prefersReduced ? {} : { scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#a0a0aa',
                    borderRadius: 'var(--radius-lg)',
                    padding: '13px 22px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600, fontSize: '14px',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(10px)',
                    minHeight: '46px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Pakete ansehen
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.a>
              </motion.div>

              {/* Colored service pills */}
              <motion.div
                initial="hidden" animate="visible"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.75rem' }}
              >
                {services.map((s, i) => (
                  <motion.span
                    key={s.label}
                    custom={i}
                    variants={pillVariant}
                    initial="hidden"
                    animate="visible"
                    style={{
                      background: `rgba(${s.color === '#4fd1c5' ? '79,209,197' : s.color === '#a78bfa' ? '167,139,250' : s.color === '#f472b6' ? '244,114,182' : s.color === '#fbbf24' ? '251,191,36' : '56,189,248'},0.1)`,
                      border: `1px solid ${s.glow.replace('0.18', '0.3')}`,
                      borderRadius: 'var(--radius-full)',
                      padding: '5px 13px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: s.color,
                      whiteSpace: 'nowrap',
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </motion.span>
                ))}
              </motion.div>

              {/* 4-color metrics strip */}
              <motion.div
                initial="hidden" animate="visible" variants={fadeUp} custom={0.9}
                style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 'var(--radius-xl)',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(16px)',
                  overflow: 'hidden',
                  maxWidth: '440px',
                }}
              >
                {metrics.map((m, i) => (
                  <div key={m.label} style={{
                    padding: '1rem 0.5rem',
                    textAlign: 'center',
                    borderRight: i < metrics.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(18px, 2vw, 24px)',
                      fontWeight: 700,
                      lineHeight: 1,
                      marginBottom: '4px',
                      background: m.gradient,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                      {m.value}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#5a5a65', fontWeight: 500 }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Spline robot */}
            <div className="flex-1 relative hidden md:block" style={{ minHeight: '480px' }}>
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        aria-label="Nach unten scrollen"
        animate={prefersReduced ? {} : { y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        onClick={() => document.querySelector('#solutions')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          position: 'absolute', bottom: '1.5rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
          opacity: 0.4, cursor: 'pointer',
          background: 'none', border: 'none', padding: '8px',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="var(--color-primary)" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.button>
    </section>
  );
}
