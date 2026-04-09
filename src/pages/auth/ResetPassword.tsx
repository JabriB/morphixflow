import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Mail, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GradientDots } from '@/components/ui/gradient-dots'

export default function ResetPassword() {
  const prefersReduced = useReducedMotion()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email) { setError('Bitte gib deine E-Mail-Adresse ein.'); return }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) { setError('Ungültige E-Mail-Adresse.'); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="auth-container">
      <GradientDots duration={50} colorCycleDuration={12} dotSize={5} spacing={16} backgroundColor="var(--bg-primary)" style={{ opacity: 0.4 }} />

      <div aria-hidden="true" style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, var(--color-primary-glow) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '420px',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-2xl)', padding: '2.5rem',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="mb-8 text-center">
          <Link to="/" className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', textDecoration: 'none' }}>
            Morphix<span style={{ color: 'var(--color-primary)' }}>Flow</span>
          </Link>
        </div>

        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'var(--color-primary-dim)', color: 'var(--color-primary)' }}>
              <Mail size={26} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              E-Mail gesendet
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              Wir haben einen Reset-Link an <strong style={{ color: 'var(--text-primary)' }}>{email}</strong> gesendet. Bitte überprüfe dein Postfach.
            </p>
            <Link to="/login">
              <Button variant="secondary" className="w-full">
                <ArrowLeft size={14} /> Zurück zum Login
              </Button>
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'var(--color-primary-dim)', color: 'var(--color-primary)' }}>
                <CheckCircle2 size={22} />
              </div>
              <h1 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Passwort zurücksetzen
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Gib deine E-Mail ein — wir senden dir einen Reset-Link.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  E-Mail-Adresse
                </label>
                <Input
                  id="reset-email" type="email" placeholder="dein@email.de"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email" required
                />
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl p-3 text-xs"
                  style={{ background: 'rgba(239,68,68,0.08)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  <AlertCircle size={14} /> {error}
                </motion.div>
              )}

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                    Senden…
                  </span>
                ) : (
                  <>Link senden <ArrowRight size={15} /></>
                )}
              </Button>
            </form>

            <div className="mt-5 text-center">
              <Link to="/login" className="flex items-center justify-center gap-1.5 text-xs font-semibold hover:underline"
                style={{ color: 'var(--text-muted)' }}>
                <ArrowLeft size={13} /> Zurück zum Login
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
