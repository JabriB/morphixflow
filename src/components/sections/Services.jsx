import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layers, Bot, MonitorPlay, BarChart3 } from 'lucide-react';

/* Each card maps to a CSS-variable accent slot — no hardcoded hex */
const cards = [
  {
    accentColor:  'var(--color-primary)',
    accentBg:     'var(--color-primary-dim)',
    accentBorder: 'var(--border-primary)',
    accentGlow:   'var(--color-primary-glow)',
    title: 'Web Development',
    description:
      'Professionelle Webseiten, Landing Pages, Web Apps & E-Commerce — komplett nach deinen Vorstellungen. Design, Farben, Logo — du entscheidest.',
    tags: ['Webseite', 'Landing Page', 'Web App', 'E-Commerce'],
    Icon: Layers,
  },
  {
    accentColor:  'var(--color-violet)',
    accentBg:     'var(--color-violet-dim)',
    accentBorder: 'rgba(167,139,250,0.25)',
    accentGlow:   'var(--color-violet-glow)',
    title: 'AI Automationen',
    description:
      'Intelligente Workflow-Automationen die dein Business auf Autopilot stellen. CRM, Lead-Generierung, E-Mail & mehr — powered by KI.',
    tags: ['n8n', 'Make.com', 'CRM-Sync', 'AI-Powered'],
    Icon: Bot,
  },
  {
    accentColor:  'var(--color-amber)',
    accentBg:     'var(--color-amber-dim)',
    accentBorder: 'color-mix(in srgb, var(--color-amber) 22%, transparent)',
    accentGlow:   'var(--color-amber-glow)',
    title: 'Werbe Kampagnen',
    description:
      'Datengetriebene Werbekampagnen auf Meta (Facebook & Instagram), TikTok und Google Ads. Maximale Reichweite, echte Conversions.',
    tags: ['Meta Ads', 'TikTok Ads', 'Google Ads', 'Retargeting'],
    Icon: MonitorPlay,
  },
  {
    accentColor:  'var(--color-blue)',
    accentBg:     'var(--color-blue-dim)',
    accentBorder: 'rgba(56,189,248,0.25)',
    accentGlow:   'var(--color-blue-glow)',
    title: 'AI SEO & Conversions',
    description:
      'KI-gestützte Suchmaschinenoptimierung für nachhaltigen organischen Traffic. Conversion-Optimierung für maximale Ergebnisse.',
    tags: ['AI SEO', 'On-Page SEO', 'Conversion-Rate', 'Analytics'],
    Icon: BarChart3,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

function ServiceCard({ card }) {
  const prefersReduced = useReducedMotion();
  const { Icon } = card;

  return (
    <motion.div
      className="service-card-wrap"
      variants={cardVariants}
      whileHover={prefersReduced ? {} : {
        y: -5,
        boxShadow: `0 10px 44px ${card.accentGlow}`,
        borderColor: card.accentBorder,
        transition: { duration: 0.22 },
      }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-2xl)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        padding: '2.25rem',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: 'var(--card-shadow)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Subtle corner accent wash */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, right: 0,
        width: '130px', height: '130px',
        background: `radial-gradient(circle at top right, ${card.accentGlow}, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Icon */}
      <div style={{
        width: '50px', height: '50px',
        borderRadius: 'var(--radius-lg)',
        background: card.accentBg,
        border: `1px solid ${card.accentBorder}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.5rem',
        color: card.accentColor,
        flexShrink: 0,
      }}>
        <Icon size={20} aria-hidden="true" />
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        color: 'var(--text-primary)',
        fontSize: 'var(--text-lg)',
        fontWeight: 400,
        margin: '0 0 0.65rem',
        letterSpacing: '-0.01em',
        lineHeight: 1.2,
      }}>
        {card.title}
      </h3>

      <p style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--text-muted)',
        fontSize: 'var(--text-base)',
        lineHeight: 1.7,
        margin: '0 0 1.5rem',
        flex: 1,
      }}>
        {card.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {card.tags.map((tag) => (
          <span key={tag} style={{
            background: card.accentBg,
            border: `1px solid ${card.accentBorder}`,
            borderRadius: 'var(--radius-md)',
            padding: '3px 10px',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: card.accentColor,
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Hover reveal — "Mehr erfahren" */}
      <span className="service-link-reveal" aria-hidden="true">
        Mehr erfahren
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </motion.div>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const prefersReduced  = useReducedMotion();

  return (
    <section
      id="solutions"
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

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>

        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '3.5rem' }}
        >
          <p className="section-label" style={{ margin: '0 0 1rem' }}>02 · Leistungen</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            margin: '0 0 1.1rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            Alles was dein Business braucht
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)',
            fontSize: 'var(--text-base)',
            margin: 0,
            maxWidth: '520px',
            lineHeight: 1.7,
          }}>
            Von der Webseite bis zur Werbekampagne — ich kümmere mich um dein digitales Wachstum.
          </p>
        </motion.div>

        {inView && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="services-grid"
          >
            {cards.map((card) => <ServiceCard key={card.title} card={card} />)}
          </motion.div>
        )}
      </div>
    </section>
  );
}
