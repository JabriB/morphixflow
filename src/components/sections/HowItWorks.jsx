import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    num: '01', gradFrom: '#6C63FF', gradTo: '#00D4FF',
    glowColor: 'rgba(108,99,255,0.4)',
    title: 'Kostenlose Beratung',
    body: 'Wir sprechen 1:1 per WhatsApp Video oder Anruf. Du erzählst mir deine Ziele — ich zeige dir den besten Weg.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    num: '02', gradFrom: '#A855F7', gradTo: '#6C63FF',
    glowColor: 'rgba(168,85,247,0.4)',
    title: 'Individuelles Konzept',
    body: 'Du bekommst ein maßgeschneidertes Angebot. Kein Copy-Paste — jedes Projekt wird nach deinen genauen Wünschen geplant.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    num: '03', gradFrom: '#FF6B6B', gradTo: '#FF8E53',
    glowColor: 'rgba(255,107,107,0.4)',
    title: 'Umsetzung & Launch',
    body: 'Ich entwickle dein Projekt mit höchster Qualität — pünktlich, transparent und mit dir im regelmäßigen Austausch.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    num: '04', gradFrom: '#00FFB3', gradTo: '#00D4FF',
    glowColor: 'rgba(0,255,179,0.35)',
    title: 'Wachstum & Optimierung',
    body: 'Nach dem Launch bist du nicht allein. Laufende Optimierung, Support und Skalierung für nachhaltige Ergebnisse.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

function StepCard({ step }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div variants={stepVariants}
      whileHover={prefersReduced ? {} : { y: -5, boxShadow: `0 0 30px rgba(108,99,255,0.15)`, borderColor: 'rgba(108,99,255,0.35)' }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '20px', padding: '2rem', textAlign: 'center', overflow: 'hidden',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        transition: 'all 0.3s ease', boxShadow: 'var(--card-shadow)',
      }}>
      {/* Ghost number background */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-10px', right: '12px', fontSize: '100px',
        fontWeight: 800, lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        background: `linear-gradient(135deg, ${step.gradFrom}, ${step.gradTo})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        opacity: 0.08,
      }}>
        {step.num}
      </div>
      {/* Icon — gradient border circle */}
      <div style={{
        width: '62px', height: '62px', borderRadius: '50%',
        background: `linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box, linear-gradient(135deg, ${step.gradFrom}, ${step.gradTo}) border-box`,
        border: '2px solid transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.5rem',
        color: step.gradFrom,
        boxShadow: `0 0 18px ${step.glowColor}`,
        position: 'relative', zIndex: 1,
      }}>
        {step.icon}
      </div>
      <div style={{
        fontFamily: 'ui-monospace, monospace', fontSize: '13px', color: 'var(--accent-text)',
        letterSpacing: '0.15em', marginBottom: '0.75rem', position: 'relative', zIndex: 1,
        fontWeight: 700,
      }}>
        SCHRITT {step.num}
      </div>
      <h3 style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: 700, margin: '0 0 0.75rem', position: 'relative', zIndex: 1 }}>
        {step.title}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.7, margin: '0 auto', position: 'relative', zIndex: 1, maxWidth: '260px' }}>
        {step.body}
      </p>
    </motion.div>
  );
}

export default function HowItWorks() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const prefersReduced = useReducedMotion();

  return (
    <section id="how-it-works" ref={ref}
      style={{
        padding: '8rem 1.5rem', position: 'relative',
        backgroundColor: 'var(--bg-secondary)', overflow: 'hidden',
        transition: 'background-color 0.35s',
      }}>
      {/* Subtle background texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(108,99,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'ui-monospace, monospace', color: 'var(--accent-text)', fontSize: '12px', letterSpacing: '0.15em', margin: '0 0 1rem', textTransform: 'uppercase', fontWeight: 600 }}>
            03 · Prozess
          </p>
          <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, margin: '0 0 1.5rem', lineHeight: 1.1 }}>
            So arbeiten wir zusammen
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '19px', margin: 0, lineHeight: 1.6 }}>
            Von der ersten Idee bis zum fertigen Ergebnis — transparent und persönlich.
          </p>
        </motion.div>

        {inView && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {steps.map((step) => <StepCard key={step.num} step={step} />)}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '3.5rem', color: 'var(--text-muted)', fontSize: '14px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          <span>
            Jedes Paket beinhaltet eine <strong style={{ color: 'var(--text-primary)' }}>1:1 WhatsApp Video / Anruf Beratung</strong>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
