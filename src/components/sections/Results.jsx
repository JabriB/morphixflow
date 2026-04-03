import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useCountUp from '../../hooks/useCountUp';

const stats = [
  { value: '50+', label: 'Projekte umgesetzt',    icon: '🏗️' },
  { value: '98%', label: 'Kundenzufriedenheit',   icon: '⭐' },
  { value: '3x',  label: 'Durchschn. ROI',        icon: '📈' },
  { value: '24h', label: 'Antwortzeit',            icon: '⚡' },
];

const projects = [
  { name: 'Online-Shop Launch',  category: 'E-Commerce · Webseite',    result: '+180% Umsatz im ersten Monat', gradFrom: '#0D9488', gradTo: '#2DD4BF' },
  { name: 'Lead Automation',     category: 'AI Automation · CRM',      result: '40 Std./Monat gespart',        gradFrom: '#7C3AED', gradTo: '#A78BFA' },
  { name: 'Meta Ads Kampagne',   category: 'Facebook & Instagram Ads', result: '4.2× ROAS erzielt',            gradFrom: '#D97706', gradTo: '#FBBF24' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function StatCard({ stat, inView }) {
  const prefersReduced = useReducedMotion();
  const display = useCountUp(stat.value, 2000, inView && !prefersReduced);

  return (
    <motion.div variants={itemVariants}
      whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(13,148,136,0.15)', borderColor: 'rgba(13,148,136,0.3)', transition: { duration: 0.2 } }}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '18px', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        padding: '2rem', textAlign: 'center', transition: 'all 0.3s ease',
        boxShadow: 'var(--card-shadow)',
      }}>
      <div style={{
        fontSize: 'clamp(40px, 5vw, 52px)', fontWeight: 800, lineHeight: 1, marginBottom: '0.6rem',
        background: 'linear-gradient(135deg, #0D9488, #2DD4BF)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        letterSpacing: '-0.03em',
      }}>
        {prefersReduced ? stat.value : inView ? display : '0'}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.01em' }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div variants={itemVariants}
      whileHover={prefersReduced ? {} : { scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.25)', transition: { duration: 0.2 } }}
      style={{
        borderRadius: '16px', overflow: 'hidden', position: 'relative',
        aspectRatio: '16 / 9', cursor: 'pointer',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.3s ease',
      }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradTo})`, opacity: 0.8,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '1.5rem',
      }}>
        <span style={{
          display: 'inline-block', background: 'rgba(255,255,255,0.18)',
          border: '1px solid rgba(255,255,255,0.28)', borderRadius: '6px',
          padding: '4px 11px', fontSize: '11px', color: '#fff', marginBottom: '0.5rem',
          width: 'fit-content', fontWeight: 600, backdropFilter: 'blur(8px)', letterSpacing: '0.03em',
        }}>
          {project.category}
        </span>
        <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 700, margin: '0 0 0.3rem', letterSpacing: '-0.01em' }}>
          {project.name}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: 0, fontWeight: 700 }}>
          ✓ {project.result}
        </p>
      </div>
    </motion.div>
  );
}

export default function Results() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const prefersReduced  = useReducedMotion();

  return (
    <section id="results" ref={ref}
      style={{ padding: '8rem 1.5rem', backgroundColor: 'var(--bg-secondary)', transition: 'background-color 0.3s', position: 'relative', overflow: 'hidden' }}>

      {/* Background mesh */}
      <div aria-hidden="true" className="bg-mesh" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      {/* Glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(13,148,136,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '3.5rem' }}>
          <p className="section-label" style={{ margin: '0 0 0.9rem' }}>05 · Ergebnisse</p>
          <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 800, margin: '0 0 0.9rem', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
            Zahlen sprechen für sich
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '17px', margin: 0, lineHeight: 1.68 }}>
            Echte Ergebnisse für echte Kunden.
          </p>
        </motion.div>

        {/* Stats grid */}
        {inView && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1.25rem', marginBottom: '3.5rem' }}>
            {stats.map((stat) => <StatCard key={stat.label} stat={stat} inView={inView} />)}
          </motion.div>
        )}

        {/* Projects */}
        <motion.h3
          initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.55 }}
          style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: 700, margin: '0 0 1.25rem', letterSpacing: '-0.015em' }}>
          Beispiel-Projekte
        </motion.h3>

        {inView && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {projects.map((project) => <ProjectCard key={project.name} project={project} />)}
          </motion.div>
        )}
      </div>
    </section>
  );
}
