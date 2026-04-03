import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function Field({ label, children, err }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
      <label style={{ color: 'var(--text-muted)', fontSize: '15px', fontWeight: 600, paddingLeft: '4px' }}>{label}</label>
      {children}
      {err && <span style={{ color: '#FF6B6B', fontSize: '14px', paddingLeft: '4px', fontWeight: 500 }}>{err}</span>}
    </div>
  );
}

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const prefersReduced = useReducedMotion();

  const [form, setForm]         = useState({ name: '', email: '', phone: '', paket: '', message: '' });
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);

  const inputBase = {
    background: 'var(--input-bg)', border: '1.5px solid var(--input-border)',
    borderRadius: '14px', padding: '16px 20px', color: 'var(--text-primary)',
    fontSize: '16px', width: '100%', boxSizing: 'border-box',
    fontFamily: "'Space Grotesk', 'Inter', sans-serif", outline: 'none',
    transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
    backdropFilter: 'blur(10px)',
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Name ist erforderlich.';
    if (!form.email.trim())   errs.email   = 'E-Mail ist erforderlich.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Bitte gültige E-Mail-Adresse eingeben.';
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
    e.target.style.borderColor = '#6C63FF';
    e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.15)';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = 'var(--input-border)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <section id="contact" ref={ref}
      style={{ padding: '8rem 1.5rem', backgroundColor: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', transition: 'background-color 0.35s' }}>
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-5%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '350px',
        background: 'radial-gradient(ellipse, rgba(108,99,255,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '52rem', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontFamily: 'ui-monospace, monospace', color: 'var(--accent-text)', fontSize: '12px', letterSpacing: '0.15em', margin: '0 0 1rem', textTransform: 'uppercase', fontWeight: 600 }}>
            06 · Kontakt
          </p>
          <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, margin: '0 0 1.5rem', lineHeight: 1.1 }}>
            Lass uns gemeinsam loslegen
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '19px', margin: 0, lineHeight: 1.6 }}>
            Schreib mir — ich antworte innerhalb von 24 Stunden persönlich.
          </p>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <motion.a href="https://wa.me/4915901234567" target="_blank" rel="noopener noreferrer"
            whileHover={prefersReduced ? {} : { scale: 1.04, boxShadow: '0 0 35px rgba(37,211,102,0.4)' }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              color: '#fff', borderRadius: '9999px', padding: '15px 32px',
              fontWeight: 700, fontSize: '16px', textDecoration: 'none', cursor: 'pointer',
              boxShadow: '0 0 20px rgba(37,211,102,0.3)',
              transition: 'all 0.3s ease',
            }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.9 12.9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Direkt per WhatsApp schreiben
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--border-divider))' }} />
          <span style={{ color: 'var(--text-subtle)', fontSize: '13px', whiteSpace: 'nowrap' }}>oder Formular nutzen</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--border-divider))' }} />
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '24px', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            padding: '2.5rem',
            boxShadow: '0 0 40px rgba(108,99,255,0.08)',
          }}>
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{
                width: '70px', height: '70px', borderRadius: '50%',
                background: 'rgba(0,255,179,0.12)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                border: '1px solid rgba(0,255,179,0.3)',
                boxShadow: '0 0 20px rgba(0,255,179,0.2)',
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00FFB3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '22px', fontWeight: 700, margin: '0 0 0.75rem' }}>
                Nachricht gesendet!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', margin: 0, lineHeight: 1.6 }}>
                Vielen Dank! Ich melde mich innerhalb von 24 Stunden bei dir.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem' }}>
                <Field label="Vollständiger Name *" err={errors.name}>
                  <input type="text" placeholder="Max Mustermann" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={handleFocus} onBlur={handleBlur}
                    style={{ ...inputBase, borderColor: errors.name ? '#FF6B6B' : 'var(--input-border)' }} aria-required="true" />
                </Field>
                <Field label="E-Mail-Adresse *" err={errors.email}>
                  <input type="email" placeholder="max@firma.de" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={handleFocus} onBlur={handleBlur}
                    style={{ ...inputBase, borderColor: errors.email ? '#FF6B6B' : 'var(--input-border)' }} aria-required="true" />
                </Field>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem' }}>
                <Field label="Telefonnummer *" err={errors.phone}>
                  <input type="tel" placeholder="+49 151 12345678" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    onFocus={handleFocus} onBlur={handleBlur}
                    style={{ ...inputBase, borderColor: errors.phone ? '#FF6B6B' : 'var(--input-border)' }} aria-required="true" />
                </Field>
                <Field label="Welches Paket interessiert dich?">
                  <select value={form.paket} onChange={(e) => setForm({ ...form, paket: e.target.value })}
                    onFocus={handleFocus} onBlur={handleBlur}
                    style={{ ...inputBase, cursor: 'pointer' }}>
                    <option value="" style={{ color: 'var(--text-subtle)' }}>— Paket wählen —</option>
                    <option value="essential">Essential</option>
                    <option value="customized">Customized</option>
                    <option value="premium">All-in-One Premium</option>
                    <option value="vip">VIP</option>
                    <option value="unsicher">Noch unsicher</option>
                  </select>
                </Field>
              </div>

              <Field label="Erzähle mir von deinem Projekt *" err={errors.message}>
                <textarea rows={5} placeholder="Beschreibe kurz dein Projekt, deine Ziele und was du dir vorstellst..."
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={handleFocus} onBlur={handleBlur}
                  style={{ ...inputBase, resize: 'vertical', minHeight: '140px', borderColor: errors.message ? '#FF6B6B' : 'var(--input-border)' }}
                  aria-required="true" />
              </Field>

              <motion.button type="submit"
                whileHover={prefersReduced ? {} : { scale: 1.02, boxShadow: '0 0 45px rgba(108,99,255,0.55)' }}
                whileTap={prefersReduced ? {} : { scale: 0.98 }}
                style={{
                  width: '100%', background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                  color: '#fff', border: 'none', borderRadius: '9999px', padding: '18px 32px',
                  fontWeight: 800, fontSize: '17px', cursor: 'pointer',
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif", marginTop: '0.25rem',
                  boxShadow: '0 0 28px rgba(108,99,255,0.35)',
                  transition: 'all 0.3s ease',
                }}>
                Anfrage senden →
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
          {[
            { label: 'hello@morphixflow.io', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
            { label: 'Aachen, Deutschland',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
            { label: 'Antwort in 24h',       icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
          ].map((detail) => (
            <div key={detail.label} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: '9999px', padding: '8px 18px', color: 'var(--text-muted)', fontSize: '14px',
              backdropFilter: 'blur(10px)',
            }}>
              <span style={{ color: 'var(--accent-text)', display: 'flex' }}>{detail.icon}</span>
              {detail.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
