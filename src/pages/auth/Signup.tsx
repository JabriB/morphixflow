import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GradientDots } from '@/components/ui/gradient-dots'

const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e']
const strengthLabels = ['Schwach', 'Mittelmäßig', 'Gut', 'Stark']

function getPasswordStrength(pw: string): number {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

export default function Signup() {
  const prefersReduced = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const strength = getPasswordStrength(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) { setError('Bitte alle Felder ausfüllen.'); return }
    if (strength < 2) { setError('Bitte wähle ein stärkeres Passwort.'); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="auth-container">
        <GradientDots duration={50} colorCycleDuration={12} dotSize={5} spacing={16} backgroundColor="var(--bg-primary)" style={{ opacity: 0.4 }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', zIndex: 10, textAlign: 'center',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-2xl)', padding: '3rem 2.5rem',
            maxWidth: '380px', width: '100%',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'var(--color-success-dim)', color: 'var(--color-success)' }}>
            <CheckCircle2 size={28} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Konto erstellt!
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Wir haben dir eine Bestätigungsmail gesendet. Bitte überprüfe dein Postfach.
          </p>
          <Link to="/login">
            <Button variant="primary" className="w-full">Zum Login <ArrowRight size={14} /></Button>
          </Link>
        </motion.div>
      </div>
    )
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
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-2xl)',
          padding: '2.5rem',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="mb-8 text-center">
          <Link to="/" className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', textDecoration: 'none' }}>
            Morphix<span style={{ color: 'var(--color-primary)' }}>Flow</span>
          </Link>
        </div>

        <h1 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          Konto erstellen
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Starte dein digitales Wachstum — kostenlos.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Vollständiger Name
            </label>
            <Input id="name" type="text" placeholder="Max Mustermann" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
              E-Mail
            </label>
            <Input id="email" type="email" placeholder="dein@email.de" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Passwort
            </label>
            <div className="relative">
              <Input
                id="password" type={showPw ? 'text' : 'password'}
                placeholder="Mindestens 8 Zeichen"
                value={password} onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password" required className="pr-10"
              />
              <button type="button" onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-subtle)' }}
                aria-label={showPw ? 'Verbergen' : 'Anzeigen'}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Strength meter */}
            {password.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                      style={{ background: i < strength ? strengthColors[strength - 1] : 'var(--border)' }}
                    />
                  ))}
                </div>
                <p className="text-[10px]" style={{ color: strengthColors[strength - 1] ?? 'var(--text-subtle)' }}>
                  {strength > 0 ? strengthLabels[strength - 1] : ''}
                </p>
              </div>
            )}
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
                Konto erstellen…
              </span>
            ) : (
              <>Kostenlos registrieren <ArrowRight size={15} /></>
            )}
          </Button>
        </form>

        <p className="text-center text-xs mt-5" style={{ color: 'var(--text-muted)' }}>
          Bereits registriert?{' '}
          <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
            Anmelden
          </Link>
        </p>

        <p className="text-center text-[10px] mt-4" style={{ color: 'var(--text-subtle)' }}>
          Mit der Registrierung stimmst du den{' '}
          <a href="#" className="underline">AGB</a> und der{' '}
          <a href="#" className="underline">Datenschutzerklärung</a> zu.
        </p>
      </motion.div>
    </div>
  )
}
