import { motion, useReducedMotion } from 'framer-motion';
import ParticleCanvas from '../ParticleCanvas';

const services = ['Webseiten', 'Automationen', 'Meta & TikTok Ads', 'Google Ads', 'AI SEO'];

const wordVariant = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }),
};

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const pillVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1, scale: 1,
      transition: { delay: prefersReduced ? 0 : 1.2 + i * 0.07, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  return (
    <section id="home" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', backgroundColor: 'var(--bg-primary)',
    }}>
      <ParticleCanvas />

      {/* Ambient Glow Orbs */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '15%', left: '10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,99,255,0.35) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1,
        animation: prefersReduced ? 'none' : 'glow-pulse 7s ease-in-out infinite',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '30%', right: '8%',
        width: '420px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.28) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1,
        animation: prefersReduced ? 'none' : 'glow-pulse 9s ease-in-out infinite 2s',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '20%', left: '30%',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1,
        animation: prefersReduced ? 'none' : 'glow-pulse 11s ease-in-out infinite 4s',
      }} />

      {/* Bottom fade into bg */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'var(--hero-fade)', pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        padding: '6rem 1.5rem 4rem', maxWidth: '900px', margin: '0 auto',
      }}>
        {/* Eyebrow badge */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
          style={{ display: 'inline-flex', marginBottom: '2rem' }}>
          <span style={{
            border: '1px solid rgba(108,99,255,0.4)',
            color: 'var(--accent-text)', borderRadius: '9999px', padding: '10px 26px',
            fontSize: '14px', fontWeight: 600, letterSpacing: '0.04em',
            backdropFilter: 'blur(16px)', background: 'rgba(108,99,255,0.1)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            boxShadow: '0 0 20px rgba(108,99,255,0.15), inset 0 0 20px rgba(108,99,255,0.05)',
          }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#6C63FF', display: 'inline-block',
              boxShadow: '0 0 8px rgba(108,99,255,0.8)',
              animation: prefersReduced ? 'none' : 'pulse 2s ease-in-out infinite',
            }} />
            Freelancer · Digital Solutions · Deutschland
          </span>
        </motion.div>

        {/* Headline */}
        <h1 style={{ margin: 0, lineHeight: 1.05 }}>
          <div style={{
            fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 700,
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '0 0.28em', marginBottom: '0.05em',
            background: 'linear-gradient(135deg, #6C63FF 0%, #A855F7 50%, #00D4FF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
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
          <div style={{
            fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 700,
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.28em',
            background: 'linear-gradient(135deg, #00D4FF 0%, #6C63FF 50%, #A855F7 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
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
        <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={prefersReduced ? 0 : 0.5}
          style={{
            color: 'var(--text-muted)', fontSize: 'clamp(17px, 2.5vw, 21px)',
            maxWidth: '640px', margin: '2rem auto 0', lineHeight: 1.7, fontWeight: 400,
          }}>
          Webseiten, Automationen & Werbekampagnen — alles aus einer Hand.
          <br />
          <span style={{ color: 'var(--highlight-text)', fontWeight: 600 }}>Persönlich 1:1 per WhatsApp beraten.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={prefersReduced ? 0 : 0.8}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.75rem' }}>
          <motion.a href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={prefersReduced ? {} : { scale: 1.04, boxShadow: '0 0 50px rgba(108,99,255,0.65)' }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
              color: '#fff', borderRadius: '9999px', padding: '17px 34px',
              fontWeight: 700, fontSize: '16px', textDecoration: 'none',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 0 28px rgba(108,99,255,0.45)',
              transition: 'box-shadow 0.3s ease',
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Kostenlos beraten lassen
          </motion.a>

          <motion.a href="#pakete"
            onClick={(e) => { e.preventDefault(); document.querySelector('#pakete')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={prefersReduced ? {} : { borderColor: 'rgba(108,99,255,0.6)', boxShadow: '0 0 20px rgba(108,99,255,0.2)', color: '#8B85FF' }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center',
              border: '1px solid rgba(108,99,255,0.3)', color: 'var(--text-muted)',
              borderRadius: '9999px', padding: '17px 34px', fontWeight: 600, fontSize: '16px',
              textDecoration: 'none', background: 'rgba(108,99,255,0.06)',
              backdropFilter: 'blur(10px)', cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}>
            Pakete ansehen ↓
          </motion.a>
        </motion.div>

        {/* Service pills */}
        <motion.div initial="hidden" animate="visible"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '4rem' }}>
          {services.map((service, i) => (
            <motion.span key={service} custom={i} variants={pillVariant} initial="hidden" animate="visible"
              whileHover={prefersReduced ? {} : { borderColor: 'rgba(108,99,255,0.45)', boxShadow: '0 0 14px rgba(108,99,255,0.2)' }}
              style={{
                background: 'rgba(108,99,255,0.07)', border: '1px solid rgba(108,99,255,0.2)',
                borderRadius: '9999px', padding: '8px 18px',
                fontSize: '14px', color: 'var(--accent-text)', whiteSpace: 'nowrap',
                fontWeight: 500, backdropFilter: 'blur(8px)',
                transition: 'all 0.25s ease', cursor: 'default',
              }}>
              {service}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={prefersReduced ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => document.querySelector('#solutions')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 10, opacity: 0.5, cursor: 'pointer',
        }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C63FF"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
