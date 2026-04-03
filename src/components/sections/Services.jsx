import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const cards = [
  {
    accent: '#0D9488', accentDim: 'rgba(13,148,136,0.1)', glowColor: 'rgba(13,148,136,0.2)',
    gradFrom: '#0D9488', gradTo: '#2DD4BF',
    title: 'Web Development',
    description: 'Professionelle Webseiten, Landing Pages, Web Apps & E-Commerce — komplett nach deinen Vorstellungen. Design, Farben, Logo — du entscheidest.',
    tags: ['Webseite', 'Landing Page', 'Web App', 'E-Commerce'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    accent: '#8B5CF6', accentDim: 'rgba(139,92,246,0.1)', glowColor: 'rgba(139,92,246,0.2)',
    gradFrom: '#7C3AED', gradTo: '#A78BFA',
    title: 'AI Automationen',
    description: 'Intelligente Workflow-Automationen die dein Business auf Autopilot stellen. CRM, Lead-Generierung, E-Mail & mehr — powered by KI.',
    tags: ['n8n', 'Make.com', 'CRM-Sync', 'AI-Powered'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    accent: '#F59E0B', accentDim: 'rgba(245,158,11,0.1)', glowColor: 'rgba(245,158,11,0.18)',
    gradFrom: '#D97706', gradTo: '#FBBF24',
    title: 'Werbe Kampagnen',
    description: 'Datengetriebene Werbekampagnen auf Meta (Facebook & Instagram), TikTok und Google Ads. Maximale Reichweite, echte Conversions.',
    tags: ['Meta Ads', 'TikTok Ads', 'Google Ads', 'Retargeting'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    accent: '#3B82F6', accentDim: 'rgba(59,130,246,0.1)', glowColor: 'rgba(59,130,246,0.18)',
    gradFrom: '#2563EB', gradTo: '#60A5FA',
    title: 'AI SEO & Conversions',
    description: 'KI-gestützte Suchmaschinenoptimierung für nachhaltigen organischen Traffic. Conversion-Optimierung für maximale Ergebnisse.',
    tags: ['AI SEO', 'On-Page SEO', 'Conversion-Rate', 'Analytics'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function ServiceCard({ card }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      variants={cardVariants}
      whileHover={prefersReduced ? {} : {
        y: -5,
        boxShadow: `0 8px 40px ${card.glowColor}, var(--card-shadow)`,
        borderColor: card.accent + '50',
        transition: { duration: 0.22 },
      }}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '18px', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        padding: '2rem', cursor: 'default', position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s ease', boxShadow: 'var(--card-shadow)',
      }}>
      {/* Corner accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, right: 0, width: '120px', height: '120px',
        background: `radial-gradient(circle at top right, ${card.glowColor}, transparent 70%)`,
        pointerEvents: 'none', opacity: 0.7,
      }} />

      {/* Icon */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: `linear-gradient(135deg, ${card.gradFrom}20, ${card.gradTo}20)`,
        border: `1px solid ${card.gradFrom}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.4rem', color: card.accent,
        boxShadow: `0 4px 16px ${card.glowColor}`,
      }}>
        {card.icon}
      </div>

      <h3 style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: 700, margin: '0 0 0.6rem', letterSpacing: '-0.01em' }}>
        {card.title}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.72, margin: '0 0 1.5rem' }}>
        {card.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
        {card.tags.map((tag) => (
          <span key={tag} style={{
            background: `${card.gradFrom}12`,
            border: `1px solid ${card.gradFrom}28`,
            borderRadius: '6px', padding: '4px 11px', fontSize: '12px',
            color: card.accent, fontWeight: 600,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const prefersReduced  = useReducedMotion();

  return (
    <section id="solutions" ref={ref}
      style={{ padding: '8rem 1.5rem', backgroundColor: 'var(--bg-secondary)', transition: 'background-color 0.3s', position: 'relative', overflow: 'hidden' }}>

      {/* Background mesh */}
      <div aria-hidden="true" className="bg-mesh" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <p className="section-label" style={{ margin: '0 0 0.9rem' }}>02 · Leistungen</p>
          <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 800, margin: '0 0 1.2rem', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
            Alles was dein Business braucht
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', margin: '0 auto', maxWidth: '520px', lineHeight: 1.68 }}>
            Von der Webseite bis zur Werbekampagne — ich kümmere mich um dein digitales Wachstum.
          </p>
        </motion.div>

        {inView && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {cards.map((card) => <ServiceCard key={card.title} card={card} />)}
          </motion.div>
        )}
      </div>
    </section>
  );
}
