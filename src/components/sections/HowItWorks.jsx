import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PhoneCall, PenTool, Rocket, TrendingUp } from 'lucide-react';

/* Steps use the same 4-accent brand palette as Services */
const steps = [
  {
    num: '01',
    accentColor:  'var(--color-primary)',
    accentBg:     'var(--color-primary-dim)',
    accentBorder: 'var(--border-primary)',
    accentGlow:   'var(--color-primary-glow)',
    gradient:     'var(--gradient-primary)',
    Icon: PhoneCall,
    title: 'Kostenlose Beratung',
    body: 'Wir sprechen 1:1 per WhatsApp Video oder Anruf. Du erzählst mir deine Ziele — ich zeige dir den besten Weg.',
  },
  {
    num: '02',
    accentColor:  'var(--color-violet)',
    accentBg:     'var(--color-violet-dim)',
    accentBorder: 'rgba(167,139,250,0.25)',
    accentGlow:   'var(--color-violet-glow)',
    gradient:     'var(--gradient-violet)',
    Icon: PenTool,
    title: 'Individuelles Konzept',
    body: 'Du bekommst ein maßgeschneidertes Angebot. Kein Copy-Paste — jedes Projekt wird nach deinen genauen Wünschen geplant.',
  },
  {
    num: '03',
    accentColor:  'var(--color-amber)',
    accentBg:     'var(--color-amber-dim)',
    accentBorder: 'color-mix(in srgb, var(--color-amber) 22%, transparent)',
    accentGlow:   'var(--color-amber-glow)',
    gradient:     'var(--gradient-amber)',
    Icon: Rocket,
    title: 'Umsetzung & Launch',
    body: 'Ich entwickle dein Projekt mit höchster Qualität — pünktlich, transparent und mit dir im regelmäßigen Austausch.',
  },
  {
    num: '04',
    accentColor:  'var(--color-success)',
    accentBg:     'var(--color-success-dim)',
    accentBorder: 'color-mix(in srgb, var(--color-success) 22%, transparent)',
    accentGlow:   'var(--color-success-glow)',
    gradient:     'var(--gradient-success)',
    Icon: TrendingUp,
    title: 'Wachstum & Optimierung',
    body: 'Nach dem Launch bist du nicht allein. Laufende Optimierung, Support und Skalierung für nachhaltige Ergebnisse.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

function StepCard({ step, isLast }) {
  const prefersReduced = useReducedMotion();
  const { Icon } = step;

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <motion.div
        variants={stepVariants}
        whileHover={prefersReduced ? {} : {
          y: -4,
          boxShadow: `0 10px 36px ${step.accentGlow}`,
          borderColor: step.accentBorder,
          transition: { duration: 0.22 },
        }}
        style={{
          position: 'relative',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-2xl)',
          padding: '2rem 1.75rem',
          textAlign: 'center',
          overflow: 'hidden',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          transition: 'all 0.3s ease',
          boxShadow: 'var(--card-shadow)',
          flex: 1,
        }}
      >
        {/* Ghost step number — decorative depth only */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-10px', right: '8px',
          fontSize: '88px', fontWeight: 800, lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none',
          fontFamily: 'var(--font-display)',
          background: step.gradient,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          opacity: 0.07,
        }}>
          {step.num}
        </div>

        {/* Icon circle */}
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: step.accentBg,
          border: `1.5px solid ${step.accentBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem',
          color: step.accentColor,
          position: 'relative', zIndex: 1,
        }}>
          <Icon size={20} aria-hidden="true" />
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: step.accentColor,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '0.6rem',
          position: 'relative', zIndex: 1,
          fontWeight: 700,
        }}>
          Schritt {step.num}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--text-primary)',
          fontSize: 'var(--text-lg)',
          fontWeight: 400,
          margin: '0 0 0.65rem',
          position: 'relative', zIndex: 1,
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
        }}>
          {step.title}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--text-muted)',
          fontSize: 'var(--text-sm)',
          lineHeight: 1.72,
          margin: '0 auto',
          position: 'relative', zIndex: 1,
          maxWidth: '230px',
        }}>
          {step.body}
        </p>
      </motion.div>

      {/* Connector arrow — visible between steps on wide screens */}
      {!isLast && (
        <div aria-hidden="true" className="step-connector" style={{
          position: 'absolute', right: '-18px', top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 5, display: 'none',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="var(--border-strong)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
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
    <section
      id="how-it-works"
      ref={ref}
      style={{
        padding: '7rem 1.5rem',
        position: 'relative',
        backgroundColor: 'var(--bg-primary)',
        overflow: 'hidden',
        transition: 'background-color 0.3s',
      }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, var(--color-primary-dim) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>

        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '3.5rem' }}
        >
          <p className="section-label" style={{ margin: '0 0 1rem' }}>03 · Prozess</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            margin: '0 0 1.1rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            So arbeiten wir zusammen
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)',
            fontSize: 'var(--text-base)',
            margin: 0,
            lineHeight: 1.7,
            maxWidth: '460px',
          }}>
            Von der ersten Idee bis zum fertigen Ergebnis — transparent und persönlich.
          </p>
        </motion.div>

        {inView && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1.25rem',
              position: 'relative',
            }}
          >
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} isLast={i === steps.length - 1} />
            ))}
          </motion.div>
        )}

        {/* WhatsApp note */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '9px', marginTop: '2.75rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)', fontSize: 'var(--text-sm)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span>
            Jedes Paket beinhaltet eine{' '}
            <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
              1:1 WhatsApp Video / Anruf Beratung
            </strong>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
