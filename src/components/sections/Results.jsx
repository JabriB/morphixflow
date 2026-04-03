import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useCountUp from '../../hooks/useCountUp';

const stats = [
  { value: '50+', label: 'Projekte umgesetzt' },
  { value: '98%', label: 'Kundenzufriedenheit' },
  { value: '3x',  label: 'Durchschn. ROI' },
  { value: '24h', label: 'Antwortzeit' },
];

const projects = [
  { name: 'Online-Shop Launch',  category: 'E-Commerce · Webseite',     result: '+180% Umsatz im ersten Monat', gradFrom: '#6C63FF', gradTo: '#00D4FF' },
  { name: 'Lead Automation',     category: 'AI Automation · CRM',       result: '40 Std./Monat gespart',        gradFrom: '#A855F7', gradTo: '#6C63FF' },
  { name: 'Meta Ads Kampagne',   category: 'Facebook & Instagram Ads',   result: '4.2× ROAS erzielt',            gradFrom: '#FF6B6B', gradTo: '#FF8E53' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

function StatCard({ stat, inView }) {
  const prefersReduced = useReducedMotion();
  const display = useCountUp(stat.value, 2000, inView && !prefersReduced);

  return (
    <motion.div variants={itemVariants}
      whileHover={{ y: -5, boxShadow: '0 0 30px rgba(108,99,255,0.2)', borderColor: 'rgba(108,99,255,0.4)', transition: { duration: 0.2 } }}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '20px', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        padding: '2.25rem', textAlign: 'center',
        transition: 'all 0.3s ease',
        boxShadow: 'var(--card-shadow)',
      }}>
      <div style={{
        fontSize: '52px', fontWeight: 700, lineHeight: 1, marginBottom: '0.75rem',
        background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        {prefersReduced ? stat.value : inView ? display : '0'}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: '15px', fontWeight: 500 }}>{stat.label}</div>
    </motion.div>
  );
}

function ProjectCard({ project }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div variants={itemVariants}
      whileHover={prefersReduced ? {} : {
        scale: 1.02,
        boxShadow: '0 0 30px rgba(108,99,255,0.25)',
        transition: { duration: 0.2 },
      }}
      style={{ borderRadius: '18px', overflow: 'hidden', position: 'relative', aspectRatio: '16 / 9', cursor: 'pointer',
        border: '1px solid rgba(108,99,255,0.2)',
        transition: 'all 0.3s ease',
      }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradTo})`, opacity: 0.75,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '1.5rem',
      }}>
        <span style={{
          display: 'inline-block', background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.25)', borderRadius: '9999px',
          padding: '4px 12px', fontSize: '12px', color: '#fff', marginBottom: '0.5rem',
          width: 'fit-content', fontWeight: 600, backdropFilter: 'blur(8px)',
        }}>
          {project.category}
        </span>
        <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: '0 0 0.35rem' }}>
          {project.name}
        </h3>
        <p style={{ color: '#00FFB3', fontSize: '13px', margin: 0, fontWeight: 700 }}>
          ✓ {project.result}
        </p>
      </div>
    </motion.div>
  );
}

export default function Results() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const prefersReduced = useReducedMotion();

  return (
    <section id="results" ref={ref}
      style={{ padding: '8rem 1.5rem', backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.35s', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'ui-monospace, monospace', color: 'var(--accent-text)', fontSize: '12px', letterSpacing: '0.15em', margin: '0 0 1rem', textTransform: 'uppercase', fontWeight: 600 }}>
            05 · Ergebnisse
          </p>
          <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, margin: '0 0 1rem', lineHeight: 1.1 }}>
            Zahlen sprechen für sich
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', margin: 0, lineHeight: 1.6 }}>
            Echte Ergebnisse für echte Kunden.
          </p>
        </motion.div>

        {inView && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            {stats.map((stat) => <StatCard key={stat.label} stat={stat} inView={inView} />)}
          </motion.div>
        )}

        <motion.h3
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ color: 'var(--text-primary)', fontSize: '22px', fontWeight: 700, margin: '0 0 1.5rem' }}>
          Beispiel-Projekte
        </motion.h3>

        {inView && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {projects.map((project) => <ProjectCard key={project.name} project={project} />)}
          </motion.div>
        )}
      </div>
    </section>
  );
}
