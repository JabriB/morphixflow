import { motion, useReducedMotion } from 'framer-motion';
import ParticleCanvas from '../ParticleCanvas';

const services = ['Webseiten', 'AI Automationen', 'Meta & TikTok Ads', 'Google Ads', 'AI SEO'];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] } }),
};

const wordVariant = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const metrics = [
  { value: '50+',  label: 'Projekte' },
  { value: '98%',  label: 'Zufriedenheit' },
  { value: '3×',   label: 'Ø ROI' },
  { value: '24h',  label: 'Antwortzeit' },
];

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const pillVariant = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: (i) => ({
      opacity: 1, scale: 1,
      transition: { delay: prefersReduced ? 0 : 1.1 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section id="home" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', backgroundColor: 'var(--bg-primary)',
    }}>
      <ParticleCanvas />

      {/* Top teal glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(13,148,136,0.22) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
        animation: prefersReduced ? 'none' : 'glow-pulse 9s ease-in-out infinite',
      }} />

      {/* Secondary side orb — left */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '25%', left: '5%',
        width: '380px', height: '380px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none', zIndex: 1,
        animation: prefersReduced ? 'none' : 'glow-pulse 11s ease-in-out infinite 2s',
      }} />

      {/* Secondary side orb — right */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '35%', right: '6%',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none', zIndex: 1,
        animation: prefersReduced ? 'none' : 'glow-pulse 13s ease-in-out infinite 4s',
      }} />

      {/* Bottom fade */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'var(--hero-fade)', pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        padding: '6.5rem 1.5rem 4.5rem', maxWidth: '880px', margin: '0 auto', width: '100%',
      }}>

        {/* Eyebrow badge */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
          style={{ display: 'inline-flex', marginBottom: '2rem' }}>
          <span style={{
            border: '1px solid var(--border-teal)',
            color: 'var(--accent-text)', borderRadius: '9999px', padding: '9px 22px',
            fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em',
            backdropFilter: 'blur(14px)', background: 'var(--accent-primary-dim)',
            WebkitBackdropFilter: 'blur(14px)',
            display: 'inline-flex', alignItems: 'center', gap: '9px',
          }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: 'var(--accent-primary)', display: 'inline-block',
              boxShadow: '0 0 8px var(--accent-primary)',
              animation: prefersReduced ? 'none' : 'pulse 2s ease-in-out infinite',
            }} />
            Freelancer · Digital Solutions · Deutschland
          </span>
        </motion.div>

        {/* Headline */}
        <h1 style={{ margin: 0, lineHeight: 1.04 }}>
          {/* Line 1 */}
          <div style={{
            fontSize: 'clamp(46px, 7.5vw, 86px)', fontWeight: 800,
            letterSpacing: '-0.03em', color: 'var(--text-primary)',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.25em',
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

          {/* Line 2 — teal accent */}
          <div style={{
            fontSize: 'clamp(46px, 7.5vw, 86px)', fontWeight: 800,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #0D9488 0%, #2DD4BF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.25em',
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

        {/* Subheading */}
        <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={prefersReduced ? 0 : 0.45}
          style={{
            color: 'var(--text-muted)', fontSize: 'clamp(17px, 2.3vw, 20px)',
            maxWidth: '580px', margin: '1.75rem auto 0', lineHeight: 1.72, fontWeight: 400,
          }}>
          Webseiten, Automationen & Werbekampagnen — alles aus einer Hand.
          <br />
          <span style={{ color: 'var(--highlight-text)', fontWeight: 600 }}>
            Persönlich 1:1 per WhatsApp beraten.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={prefersReduced ? 0 : 0.7}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>

          <motion.a href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={prefersReduced ? {} : { scale: 1.03, boxShadow: '0 0 44px rgba(13,148,136,0.55)' }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px',
              background: 'linear-gradient(135deg, #0F766E, #0D9488)',
              color: '#fff', borderRadius: '12px', padding: '15px 30px',
              fontWeight: 700, fontSize: '15px', textDecoration: 'none',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 0 26px rgba(13,148,136,0.4)',
              transition: 'box-shadow 0.3s ease',
            }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Kostenlos beraten lassen
          </motion.a>

          <motion.a href="#pakete"
            onClick={(e) => { e.preventDefault(); document.querySelector('#pakete')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={prefersReduced ? {} : { borderColor: 'var(--border-teal)', boxShadow: '0 0 16px rgba(13,148,136,0.15)', color: 'var(--accent-primary)' }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center',
              border: '1px solid var(--border-strong)', color: 'var(--text-muted)',
              borderRadius: '12px', padding: '15px 28px', fontWeight: 600, fontSize: '15px',
              textDecoration: 'none', background: 'var(--bg-card)',
              backdropFilter: 'blur(10px)', cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}>
            Pakete ansehen ↓
          </motion.a>
        </motion.div>

        {/* Service pills */}
        <motion.div initial="hidden" animate="visible"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '3.5rem' }}>
          {services.map((service, i) => (
            <motion.span key={service} custom={i} variants={pillVariant} initial="hidden" animate="visible"
              whileHover={prefersReduced ? {} : { borderColor: 'var(--border-teal)', boxShadow: '0 0 12px rgba(13,148,136,0.15)' }}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: '9999px', padding: '7px 16px',
                fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'nowrap',
                fontWeight: 500, backdropFilter: 'blur(8px)',
                transition: 'all 0.25s ease', cursor: 'default',
              }}>
              {service}
            </motion.span>
          ))}
        </motion.div>

        {/* Metrics strip */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={prefersReduced ? 0 : 1.0}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            marginTop: '4rem',
            border: '1px solid var(--border)', borderRadius: '16px',
            background: 'var(--bg-card)', backdropFilter: 'blur(16px)',
            overflow: 'hidden', boxShadow: 'var(--card-shadow)',
          }}>
          {metrics.map((m, i) => (
            <div key={m.label} style={{
              padding: '1.25rem 1rem', textAlign: 'center',
              borderRight: i < metrics.length - 1 ? '1px solid var(--border-divider)' : 'none',
            }}>
              <div style={{
                fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, lineHeight: 1, marginBottom: '4px',
                background: 'linear-gradient(135deg, #0D9488, #2DD4BF)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {m.value}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-subtle)', fontWeight: 500 }}>
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={prefersReduced ? {} : { y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        onClick={() => document.querySelector('#solutions')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 10, opacity: 0.45, cursor: 'pointer',
        }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
