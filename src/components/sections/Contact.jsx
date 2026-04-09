import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Clock } from 'lucide-react';

/* ── Field wrapper ── */
function Field({ label, required, children, err }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', width: '100%' }}>
      <label style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--text-secondary)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        paddingLeft: '2px',
      }}>
        {label}{required && <span style={{ color: 'var(--color-primary)', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
      {err && (
        <span style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--color-danger, #ef4444)',
          fontSize: 'var(--text-xs)',
          paddingLeft: '2px',
          fontWeight: 500,
        }}>
          {err}
        </span>
      )}
    </div>
  );
}

const trustPoints = [
  { label: 'hello@morphixflow.io', Icon: Mail },
  { label: 'Aachen, Deutschland',  Icon: MapPin },
  { label: 'Antwort in 24h',       Icon: Clock },
];

const inputBase = {
  background: 'var(--input-bg)',
  border: '1.5px solid var(--input-border)',
  borderRadius: 'var(--radius-lg)',
  padding: '14px 18px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-base)',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 0.22s ease, box-shadow 0.22s ease',
  minHeight: '50px',
};

export default function Contact() {
  const { ref, inView }           = useInView({ threshold: 0.08, triggerOnce: true });
  const prefersReduced            = useReducedMotion();
  const [form, setForm]           = useState({ name: '', email: '', phone: '', paket: '', message: '' });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Name ist erforderlich.';
    if (!form.email.trim())   errs.email   = 'E-Mail ist erforderlich.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Bitte gültige E-Mail-Adresse eingeben.';
    if (!form.phone.trim())   errs.phone   = 'Telefon ist erforderlich.';
    if (!form.message.trim()) errs.message = 'Nachricht ist erforderlich.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--color-primary)';
    e.target.style.boxShadow   = '0 0 0 3px var(--color-primary-dim)';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = 'var(--input-border)';
    e.target.style.boxShadow   = 'none';
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: '7rem 1.5rem',
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s',
      }}
    >
      <div aria-hidden="true" className="bg-mesh" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-5%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '320px',
        background: 'radial-gradient(ellipse, var(--color-primary-dim) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '52rem', margin: '0 auto', position: 'relative' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '2.75rem' }}
        >
          <p className="section-label" style={{ margin: '0 0 1rem' }}>06 · Kontakt</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 400,
            margin: '0 0 1rem',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}>
            Lass uns gemeinsam loslegen
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)',
            fontSize: 'var(--text-base)',
            margin: 0,
            lineHeight: 1.7,
          }}>
            Schreib mir — ich antworte innerhalb von{' '}
            <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>24 Stunden</strong>{' '}
            persönlich.
          </p>
        </motion.div>

        {/* WhatsApp primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.25rem' }}
        >
          <motion.a
            href="https://wa.me/4915901234567"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={prefersReduced ? {} : { scale: 1.03, boxShadow: '0 0 36px rgba(37,211,102,0.42)' }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              color: '#fff',
              borderRadius: 'var(--radius-lg)',
              padding: '15px 30px',
              fontFamily: 'var(--font-body)',
              fontWeight: 700, fontSize: 'var(--text-base)',
              textDecoration: 'none', cursor: 'pointer',
              boxShadow: '0 4px 22px rgba(37,211,102,0.3)',
              transition: 'all 0.28s ease',
              minHeight: '52px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Direkt per WhatsApp schreiben
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.18 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.25rem' }}
        >
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--border-divider))' }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-subtle)',
            fontSize: 'var(--text-xs)',
            whiteSpace: 'nowrap',
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            oder Formular nutzen
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--border-divider))' }} />
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-2xl)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            padding: '2.25rem',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              /* Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '3rem 0' }}
              >
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'var(--color-primary-dim)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.4rem',
                  border: '1px solid var(--border-primary)',
                  boxShadow: '0 0 20px var(--color-primary-glow)',
                }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                    stroke="var(--color-primary)" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 400,
                  margin: '0 0 0.65rem',
                }}>
                  Nachricht gesendet!
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-muted)',
                  fontSize: 'var(--text-base)',
                  margin: 0, lineHeight: 1.65,
                }}>
                  Vielen Dank! Ich melde mich innerhalb von 24 Stunden bei dir.
                </p>
              </motion.div>
            ) : (
              /* Form */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                {/* Row 1: Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <Field label="Vollständiger Name" required err={errors.name}>
                    <input
                      type="text"
                      placeholder="Max Mustermann"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={handleFocus} onBlur={handleBlur}
                      style={{ ...inputBase, borderColor: errors.name ? 'var(--color-danger, #ef4444)' : 'var(--input-border)' }}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                    />
                  </Field>
                  <Field label="E-Mail-Adresse" required err={errors.email}>
                    <input
                      type="email"
                      placeholder="max@firma.de"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={handleFocus} onBlur={handleBlur}
                      style={{ ...inputBase, borderColor: errors.email ? 'var(--color-danger, #ef4444)' : 'var(--input-border)' }}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                    />
                  </Field>
                </div>

                {/* Row 2: Phone + Package */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <Field label="Telefonnummer" required err={errors.phone}>
                    <input
                      type="tel"
                      placeholder="+49 151 12345678"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      onFocus={handleFocus} onBlur={handleBlur}
                      style={{ ...inputBase, borderColor: errors.phone ? 'var(--color-danger, #ef4444)' : 'var(--input-border)' }}
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                    />
                  </Field>
                  <Field label="Welches Paket interessiert dich?">
                    <select
                      value={form.paket}
                      onChange={(e) => setForm({ ...form, paket: e.target.value })}
                      onFocus={handleFocus} onBlur={handleBlur}
                      style={{ ...inputBase, cursor: 'pointer' }}
                    >
                      <option value="">— Paket wählen —</option>
                      <option value="essential">Essential</option>
                      <option value="customized">Customized</option>
                      <option value="premium">All-in-One Premium</option>
                      <option value="vip">VIP</option>
                      <option value="unsicher">Noch unsicher</option>
                    </select>
                  </Field>
                </div>

                {/* Textarea */}
                <Field label="Erzähle mir von deinem Projekt" required err={errors.message}>
                  <textarea
                    rows={5}
                    placeholder="Beschreibe kurz dein Projekt, deine Ziele und was du dir vorstellst..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={handleFocus} onBlur={handleBlur}
                    style={{
                      ...inputBase,
                      resize: 'vertical',
                      minHeight: '140px',
                      lineHeight: 1.65,
                      borderColor: errors.message ? 'var(--color-danger, #ef4444)' : 'var(--input-border)',
                    }}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                  />
                </Field>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={prefersReduced ? {} : { scale: 1.015, boxShadow: 'var(--btn-shadow-hover)' }}
                  whileTap={prefersReduced ? {} : { scale: 0.98 }}
                  style={{
                    width: '100%',
                    background: 'var(--gradient-cta)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    padding: '16px 28px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: 'var(--text-base)',
                    cursor: 'pointer',
                    boxShadow: 'var(--btn-shadow)',
                    transition: 'all 0.28s ease',
                    letterSpacing: '0.01em',
                    minHeight: '52px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}
                >
                  Anfrage senden
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '0.6rem', marginTop: '1.75rem',
          }}
        >
          {trustPoints.map(({ label, Icon }) => (
            <div key={label} style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-full)',
              padding: '7px 16px',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-muted)',
              fontSize: 'var(--text-sm)',
              backdropFilter: 'blur(10px)',
              fontWeight: 500,
            }}>
              <Icon size={13} style={{ color: 'var(--accent-text)', flexShrink: 0 }} aria-hidden="true" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
