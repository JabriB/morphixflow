import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GradientDots } from '@/components/ui/gradient-dots'

export default function Login() {
  const prefersReduced = useReducedMotion()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Bitte alle Felder ausfüllen.')
      return
    }
    setLoading(true)
    // Simulate auth — replace with real call
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setError('Ungültige Anmeldedaten. (Demo-Modus)')
  }

  return (
    <div className="auth-container">
      {/* Background */}
      <GradientDots
        duration={50}
        colorCycleDuration={12}
        dotSize={5}
        spacing={16}
        backgroundColor="var(--bg-primary)"
        style={{ opacity: 0.4 }}
      />

      <div aria-hidden="true" style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, var(--color-primary-glow) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Card */}
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
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', textDecoration: 'none' }}
          >
            Morphix<span style={{ color: 'var(--color-primary)' }}>Flow</span>
          </Link>
        </div>

        <h1
          className="text-xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          Willkommen zurück
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Melde dich an, um fortzufahren.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold mb-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              E-Mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="dein@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold"
                style={{ color: 'var(--text-muted)' }}
              >
                Passwort
              </label>
              <Link
                to="/reset-password"
                className="text-xs font-semibold hover:underline"
                style={{ color: 'var(--color-primary)' }}
              >
                Vergessen?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-subtle)' }}
                aria-label={showPw ? 'Passwort verbergen' : 'Passwort anzeigen'}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-xl p-3 text-xs"
              style={{ background: 'rgba(239,68,68,0.08)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <AlertCircle size={14} />
              {error}
            </motion.div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span
                  style={{
                    width: '14px', height: '14px', borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    animation: 'spin 0.7s linear infinite',
                    display: 'inline-block',
                  }}
                />
                Anmelden…
              </span>
            ) : (
              <>Anmelden <ArrowRight size={15} /></>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>oder</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        {/* OAuth placeholder */}
        <Button variant="secondary" className="w-full" type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Mit Google anmelden
        </Button>

        <p className="text-center text-xs mt-5" style={{ color: 'var(--text-muted)' }}>
          Noch kein Konto?{' '}
          <Link
            to="/signup"
            className="font-semibold hover:underline"
            style={{ color: 'var(--color-primary)' }}
          >
            Registrieren
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
