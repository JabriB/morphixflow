import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const reviews = [
  {
    id: 1,
    name: 'Lena Hoffmann',
    avatar: 'LH',
    avatarColor: '#4fd1c5',
    rating: 5,
    date: 'vor 2 Wochen',
    text: 'Absolut top! MorphixFlow hat unsere neue Website innerhalb kürzester Zeit umgesetzt — modern, schnell und genau nach unseren Vorstellungen. Die WhatsApp-Kommunikation war super unkompliziert.',
  },
  {
    id: 2,
    name: 'Marco Schneider',
    avatar: 'MS',
    avatarColor: '#a78bfa',
    rating: 5,
    date: 'vor 1 Monat',
    text: 'Die AI-Automation hat uns wöchentlich Stunden gespart. Lead-Erfassung, CRM-Sync, E-Mail-Follow-ups — alles läuft jetzt automatisch. Investition hat sich bereits im ersten Monat rentiert.',
  },
  {
    id: 3,
    name: 'Sophie Wagner',
    avatar: 'SW',
    avatarColor: '#f472b6',
    rating: 5,
    date: 'vor 3 Wochen',
    text: 'Unsere Meta-Kampagne hat einen ROAS von 4,8× erzielt. Sehr professionelle Betreuung, schnelle Reaktionszeiten und transparente Reportings. Klare Empfehlung für jeden, der online wachsen will!',
  },
  {
    id: 4,
    name: 'Felix Bauer',
    avatar: 'FB',
    avatarColor: '#fbbf24',
    rating: 5,
    date: 'vor 5 Wochen',
    text: 'E-Commerce-Shop von Grund auf neu aufgebaut. Design war genau was ich mir vorgestellt hatte, mobile Optimierung perfekt. Der Google Ads ROI hat sich in 6 Wochen verdreifacht.',
  },
  {
    id: 5,
    name: 'Anna Müller',
    avatar: 'AM',
    avatarColor: '#38bdf8',
    rating: 5,
    date: 'vor 2 Monaten',
    text: 'Dank AI SEO ranken wir jetzt für unsere wichtigsten Keywords auf Seite 1. MorphixFlow erklärt alles verständlich und liefert messbare Ergebnisse. Sehr zu empfehlen!',
  },
  {
    id: 6,
    name: 'Jonas Weber',
    avatar: 'JW',
    avatarColor: '#34d399',
    rating: 5,
    date: 'vor 6 Wochen',
    text: 'Landing Page + TikTok-Ads-Kampagne in unter 2 Wochen live. Conversion-Rate ist deutlich gestiegen. Super netter Kontakt über WhatsApp, immer erreichbar und hilfsbereit.',
  },
];

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }} aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14" height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? '#FBBC04' : 'rgba(251,188,4,0.25)'}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReduced ? {} : {
        y: -4,
        boxShadow: `0 12px 40px rgba(0,0,0,0.18)`,
        transition: { duration: 0.2 },
      }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-2xl)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--card-shadow)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle accent wash */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, right: 0,
        width: '100px', height: '100px',
        background: `radial-gradient(circle at top right, ${review.avatarColor}18, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Header: avatar + name + Google icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Avatar */}
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: `${review.avatarColor}22`,
            border: `1.5px solid ${review.avatarColor}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '13px', fontWeight: 700,
            color: review.avatarColor,
            flexShrink: 0,
          }}>
            {review.avatar}
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: 'var(--text-sm)',
              color: 'var(--text-primary)',
              margin: 0, lineHeight: 1.2,
            }}>
              {review.name}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-subtle)',
              margin: 0, lineHeight: 1.2,
              marginTop: '2px',
            }}>
              {review.date}
            </p>
          </div>
        </div>

        {/* Google logo */}
        <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Google" role="img" style={{ flexShrink: 0, opacity: 0.85 }}>
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Review text */}
      <p style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--text-muted)',
        fontSize: 'var(--text-sm)',
        lineHeight: 1.72,
        margin: 0,
        flex: 1,
      }}>
        "{review.text}"
      </p>
    </motion.div>
  );
}

export default function GoogleReviews() {
  const { ref, inView } = useInView({ threshold: 0.06, triggerOnce: true });
  const prefersReduced  = useReducedMotion();

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section
      id="reviews"
      ref={ref}
      style={{
        padding: '7rem 1.5rem',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s',
      }}
    >
      {/* Ambient glows */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-5%', left: '10%',
        width: '500px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(251,188,4,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(40px)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '0', right: '10%',
        width: '400px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(79,209,197,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(40px)',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <p className="section-label" style={{ margin: '0 0 1rem' }}>Kundenstimmen</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '1rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              Was Kunden sagen
            </h2>

            {/* Overall rating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.45 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '10px 18px',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Google logo small */}
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px', fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em', lineHeight: 1,
              }}>
                {avgRating}
              </span>
              <div>
                <StarRating rating={5} />
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px', color: 'var(--text-subtle)',
                  margin: '2px 0 0', fontWeight: 500,
                }}>
                  {reviews.length} Bewertungen
                </p>
              </div>
            </motion.div>
          </div>

          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)',
            fontSize: 'var(--text-base)',
            margin: 0, lineHeight: 1.7, maxWidth: '480px',
          }}>
            Echte Erfahrungen echter Kunden —{' '}
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>direkt von Google.</span>
          </p>
        </motion.div>

        {/* Review cards grid */}
        {inView && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '1.25rem',
          }}>
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ marginTop: '2.5rem', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-subtle)',
            fontSize: 'var(--text-sm)',
            margin: '0 0 1rem',
          }}>
            Überzeuge dich selbst — werde der nächste Erfolg.
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--gradient-cta)',
              color: '#fff',
              borderRadius: 'var(--radius-lg)',
              padding: '13px 28px',
              fontFamily: 'var(--font-body)',
              fontWeight: 700, fontSize: 'var(--text-sm)',
              textDecoration: 'none',
              boxShadow: 'var(--btn-shadow)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--btn-shadow-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--btn-shadow)'; e.currentTarget.style.transform = 'none'; }}
          >
            Kostenlos starten
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
