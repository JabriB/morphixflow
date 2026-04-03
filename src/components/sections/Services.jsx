import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const cards = [
  {
    gradFrom: '#6C63FF', gradTo: '#00D4FF',
    glowColor: 'rgba(108,99,255,0.3)',
    title: 'Web Development',
    description: 'Professionelle Webseiten, Landing Pages, Web Apps & E-Commerce — komplett nach deinen Vorstellungen. Design, Farben, Logo — du entscheidest.',
    tags: ['Webseite', 'Landing Page', 'Web App', 'E-Commerce'],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="url(#g1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6C63FF" /><stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    gradFrom: '#A855F7', gradTo: '#6C63FF',
    glowColor: 'rgba(168,85,247,0.3)',
    title: 'AI Automationen',
    description: 'Intelligente Workflow-Automationen die dein Business auf Autopilot stellen. CRM, Lead-Generierung, E-Mail & mehr — powered by KI.',
    tags: ['n8n', 'Make.com', 'CRM-Sync', 'AI-Powered'],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="url(#g2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A855F7" /><stop offset="100%" stopColor="#6C63FF" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    gradFrom: '#FF6B6B', gradTo: '#FF8E53',
    glowColor: 'rgba(255,107,107,0.3)',
    title: 'Werbe Kampagnen',
    description: 'Datengetriebene Werbekampagnen auf Meta (Facebook & Instagram), TikTok und Google Ads. Maximale Reichweite, echte Conversions.',
    tags: ['Meta Ads', 'TikTok Ads', 'Google Ads', 'Retargeting'],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="url(#g3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF6B6B" /><stop offset="100%" stopColor="#FF8E53" />
          </linearGradient>
        </defs>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    gradFrom: '#00FFB3', gradTo: '#00D4FF',
    glowColor: 'rgba(0,255,179,0.3)',
    title: 'AI SEO & Conversions',
    description: 'KI-gestützte Suchmaschinenoptimierung für nachhaltigen organischen Traffic. Conversion-Optimierung für maximale Ergebnisse.',
    tags: ['AI SEO', 'On-Page SEO', 'Conversion-Rate', 'Analytics'],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="url(#g4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="g4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00FFB3" /><stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

function ServiceCard({ card }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      variants={cardVariants}
      whileHover={prefersReduced ? {} : {
        y: -6,
        boxShadow: `0 0 40px rgba(108,99,255,0.2), inset 0 0 30px rgba(108,99,255,0.03)`,
        borderColor: 'rgba(108,99,255,0.45)',
        transition: { duration: 0.25 },
      }}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '20px', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        padding: '2.25rem', cursor: 'default', position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}>
      {/* Corner glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, right: 0, width: '140px', height: '140px',
        background: `radial-gradient(circle at top right, ${card.glowColor}, transparent 70%)`,
        pointerEvents: 'none', opacity: 0.6,
      }} />
      {/* Icon wrapper */}
      <div style={{
        width: '56px', height: '56px', borderRadius: '16px',
        background: `linear-gradient(135deg, ${card.gradFrom}22, ${card.gradTo}22)`,
        border: `1px solid ${card.gradFrom}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
        boxShadow: `0 0 20px ${card.glowColor}`,
      }}>
        {card.icon}
      </div>
      <h3 style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: 700, margin: '0 0 0.75rem' }}>
        {card.title}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.7, margin: '0 0 1.75rem' }}>
        {card.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {card.tags.map((tag) => (
          <span key={tag} style={{
            background: 'var(--tag-bg)', border: '1px solid var(--tag-border)',
            borderRadius: '9999px', padding: '5px 14px', fontSize: '13px',
            color: 'var(--tag-text)', fontWeight: 600,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const prefersReduced = useReducedMotion();

  return (
    <section id="solutions" ref={ref}
      style={{ padding: '8rem 1.5rem', backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.35s', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(108,99,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'ui-monospace, monospace', color: '#6C63FF', fontSize: '12px', letterSpacing: '0.15em', margin: '0 0 1rem', textTransform: 'uppercase', fontWeight: 600 }}>
            02 · Leistungen
          </p>
          <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, margin: '0 0 1.5rem', lineHeight: 1.1 }}>
            Alles was dein Business braucht
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '19px', margin: '0 auto', maxWidth: '560px', lineHeight: 1.6 }}>
            Von der Webseite bis zur Werbekampagne — ich kümmere mich um dein digitales Wachstum.
          </p>
        </motion.div>

        {inView && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {cards.map((card) => <ServiceCard key={card.title} card={card} />)}
          </motion.div>
        )}
      </div>
    </section>
  );
}
