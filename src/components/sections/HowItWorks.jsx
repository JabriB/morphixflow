import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    num: '01', accent: '#0D9488', gradFrom: '#0D9488', gradTo: '#2DD4BF',
    glowColor: 'rgba(13,148,136,0.3)',
    title: 'Kostenlose Beratung',
    body: 'Wir sprechen 1:1 per WhatsApp Video oder Anruf. Du erzählst mir deine Ziele — ich zeige dir den besten Weg.',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    num: '02', accent: '#8B5CF6', gradFrom: '#7C3AED', gradTo: '#A78BFA',
    glowColor: 'rgba(139,92,246,0.3)',
    title: 'Individuelles Konzept',
    body: 'Du bekommst ein maßgeschneidertes Angebot. Kein Copy-Paste — jedes Projekt wird nach deinen genauen Wünschen geplant.',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    num: '03', accent: '#F59E0B', gradFrom: '#D97706', gradTo: '#FBBF24',
    glowColor: 'rgba(245,158,11,0.28)',
    title: 'Umsetzung & Launch',
    body: 'Ich entwickle dein Projekt mit höchster Qualität — pünktlich, transparent und mit dir im regelmäßigen Austausch.',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    num: '04', accent: '#3B82F6', gradFrom: '#2563EB', gradTo: '#60A5FA',
    glowColor: 'rgba(59,130,246,0.28)',
    title: 'Wachstum & Optimierung',
    body: 'Nach dem Launch bist du nicht allein. Laufende Optimierung, Support und Skalierung für nachhaltige Ergebnisse.',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function StepCard({ step, isLast }) {
  const prefersReduced = useReducedMotion();
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <motion.div variants={stepVariants}
        whileHover={prefersReduced ? {} : { y: -4, boxShadow: `0 8px 32px ${step.glowColor}`, borderColor: step.accent + '45', transition: { duration: 0.22 } }}
        style={{
          position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: '18px', padding: '1.75rem', textAlign: 'center', overflow: 'hidden',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          transition: 'all 0.3s ease', boxShadow: 'var(--card-shadow)',
          flex: 1,
        }}>

        {/* Ghost number */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-8px', right: '10px', fontSize: '90px',
          fontWeight: 800, lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          background: `linear-gradient(135deg, ${step.gradFrom}, ${step.gradTo})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          opacity: 0.07,
        }}>
          {step.num}
        </div>

        {/* Icon circle with gradient border */}
        <div style={{
          width: '58px', height: '58px', borderRadius: '50%',
          background: `linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box, linear-gradient(135deg, ${step.gradFrom}, ${step.gradTo}) border-box`,
          border: '2px solid transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem', color: step.accent,
          boxShadow: `0 4px 16px ${step.glowColor}`,
          position: 'relative', zIndex: 1,
        }}>
          {step.icon}
        </div>

        {/* Step label */}
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: '11px',
          color: step.accent, letterSpacing: '0.15em',
          marginBottom: '0.6rem', position: 'relative', zIndex: 1, fontWeight: 700,
        }}>
          SCHRITT {step.num}
        </div>

        <h3 style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: 700, margin: '0 0 0.6rem', position: 'relative', zIndex: 1, letterSpacing: '-0.01em' }}>
          {step.title}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.7, margin: '0 auto', position: 'relative', zIndex: 1, maxWidth: '240px' }}>
          {step.body}
        </p>
      </motion.div>

      {/* Connector arrow — shown between cards on wider screens */}
      {!isLast && (
        <div aria-hidden="true" style={{
          position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 5, display: 'none',
        }} className="step-connector">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--border-strong)"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function HowItWorks() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const prefersReduced  = useReducedMotion();

  return (
    <section id="how-it-works" ref={ref}
      style={{
        padding: '8rem 1.5rem', position: 'relative',
        backgroundColor: 'var(--bg-primary)', overflow: 'hidden',
        transition: 'background-color 0.3s',
      }}>

      {/* Background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(13,148,136,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <p className="section-label" style={{ margin: '0 0 0.9rem' }}>03 · Prozess</p>
          <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 800, margin: '0 0 1.2rem', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
            So arbeiten wir zusammen
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', margin: 0, lineHeight: 1.68, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            Von der ersten Idee bis zum fertigen Ergebnis — transparent und persönlich.
          </p>
        </motion.div>

        {inView && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem', position: 'relative' }}>
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} isLast={i === steps.length - 1} />
            ))}
          </motion.div>
        )}

        {/* WhatsApp note */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.55 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px', marginTop: '3rem', color: 'var(--text-muted)', fontSize: '14px' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          <span>
            Jedes Paket beinhaltet eine <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>1:1 WhatsApp Video / Anruf Beratung</strong>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
