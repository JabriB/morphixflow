import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useCountUp from '../../hooks/useCountUp';

/* Vibrant dynamic colors for the stats panel */
const stats = [
  { value: '50+', label: 'Projekte umgesetzt',  color: 'var(--color-primary)', gradient: 'var(--gradient-primary)', glow: 'var(--color-primary-glow)' },
  { value: '98%', label: 'Kundenzufriedenheit', color: 'var(--color-success)', gradient: 'var(--gradient-success)', glow: 'var(--color-success-glow)' },
  { value: '3x',  label: 'Durchschn. ROI',      color: 'var(--color-amber)',   gradient: 'var(--gradient-amber)',   glow: 'var(--color-amber-glow)' },
  { value: '24h', label: 'Antwortzeit',         color: 'var(--color-blue)',    gradient: 'var(--gradient-blue)',    glow: 'var(--color-blue-glow)' },
];

const projects = [
  {
    name: 'Online-Shop Launch',
    category: 'E-Commerce · Webseite',
    result: '+180% Umsatz im ersten Monat',
    accentGlow: 'var(--color-primary-glow)',
    gradient: 'var(--gradient-primary)',
  },
  {
    name: 'Lead Automation',
    category: 'AI Automation · CRM',
    result: '40 Std./Monat gespart',
    accentGlow: 'var(--color-violet-glow)',
    gradient: 'var(--gradient-violet)',
  },
  {
    name: 'Meta Ads Kampagne',
    category: 'Facebook & Instagram Ads',
    result: '4.2× ROAS erzielt',
    accentGlow: 'var(--color-rose-glow)',
    gradient: 'var(--gradient-rose)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

function StatCard({ stat, inView }) {
  const prefersReduced = useReducedMotion();
  const display = useCountUp(stat.value, 2000, inView && !prefersReduced);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -4,
        boxShadow: `0 8px 32px ${stat.glow}`,
        borderColor: `color-mix(in srgb, ${stat.color} 25%, transparent)`,
        transition: { duration: 0.2 },
      }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-2xl)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(42px, 5.5vw, 56px)',
        fontWeight: 400,
        lineHeight: 1,
        marginBottom: '0.5rem',
        background: stat.gradient,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        letterSpacing: '-0.02em',
      }}>
        {prefersReduced ? stat.value : inView ? display : '0'}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--text-muted)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        letterSpacing: '0.01em',
      }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={itemVariants}
      whileHover={prefersReduced ? {} : {
        scale: 1.02,
        boxShadow: `0 10px 40px ${project.accentGlow}`,
        transition: { duration: 0.2 },
      }}
      style={{
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '16 / 9',
        cursor: 'default',
        border: '1px solid var(--border)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Gradient background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: project.gradient,
        opacity: 0.82,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />

      {/* Content overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1.5rem',
      }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.16)',
          border: '1px solid rgba(255,255,255,0.26)',
          borderRadius: 'var(--radius-md)',
          padding: '3px 10px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          color: '#fff',
          marginBottom: '0.5rem',
          width: 'fit-content',
          fontWeight: 600,
          backdropFilter: 'blur(8px)',
          letterSpacing: '0.03em',
        }}>
          {project.category}
        </span>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          color: '#fff',
          fontSize: 'var(--text-lg)',
          fontWeight: 400,
          margin: '0 0 0.35rem',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
        }}>
          {project.name}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          color: 'rgba(255,255,255,0.92)',
          fontSize: 'var(--text-sm)',
          margin: 0,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {project.result}
        </p>
      </div>
    </motion.div>
  );
}

export default function Results() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const prefersReduced  = useReducedMotion();

  return (
    <section
      id="results"
      ref={ref}
      style={{
        padding: '7rem 1.5rem',
        backgroundColor: 'var(--bg-secondary)',
        transition: 'background-color 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" className="bg-mesh" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />

      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '280px',
        background: 'radial-gradient(ellipse, var(--color-primary-dim) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '3.5rem' }}
        >
          <p className="section-label" style={{ margin: '0 0 1rem' }}>05 · Ergebnisse</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            margin: '0 0 0.9rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            Zahlen sprechen für sich
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)',
            fontSize: 'var(--text-base)',
            margin: 0,
            lineHeight: 1.7,
          }}>
            Echte Ergebnisse für echte Kunden.
          </p>
        </motion.div>

        {/* Stat cards */}
        {inView && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="results-stats-grid"
            style={{ marginBottom: '3.5rem' }}
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} inView={inView} />
            ))}
          </motion.div>
        )}

        {/* Projects sub-heading */}
        <motion.h3
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-xl)',
            fontWeight: 400,
            margin: '0 0 1.25rem',
            letterSpacing: '-0.01em',
          }}
        >
          Beispiel-Projekte
        </motion.h3>

        {/* Project cards */}
        {inView && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="results-projects-grid"
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
