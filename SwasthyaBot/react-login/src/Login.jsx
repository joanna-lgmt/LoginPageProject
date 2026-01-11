import React, { useState } from 'react'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validate = () => {
    if (!email) return 'Email is required.'
    if (!/\S+@\S+\.\S+/.test(email)) return 'Enter a valid email.'
    if (!password) return 'Password is required.'
    if (password.length < 6) return 'Password must be at least 6 characters.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const v = validate()
    if (v) {
      setError(v)
      return
    }
    setLoading(true)
    // Try network auth first
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.message || 'Invalid email or password.')
        setLoading(false)
        return
      }

      const data = await res.json().catch(() => ({}))
      // store token if provided by backend
      if (data.token) localStorage.setItem('token', data.token)
      // success (frontend demo behavior)
      alert('Login successful')
      if (remember) {
        localStorage.setItem('rememberedEmail', email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }
    } catch (err) {
      // network error or no backend: fallback to local mock
      // mock authentication delay
      await new Promise((r) => setTimeout(r, 500))

      if (email === 'user@example.com' && password === 'password123') {
        alert('Login successful (mock)')
        if (remember) {
          localStorage.setItem('rememberedEmail', email)
        } else {
          localStorage.removeItem('rememberedEmail')
        }
      } else {
        setError('Invalid email or password.')
      }
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    const saved = localStorage.getItem('rememberedEmail')
    if (saved) setEmail(saved)
  }, [])

  return (
    <main className="login-page" aria-labelledby="login-heading">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h1 id="login-heading">Sign in to your account</h1>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <div className="password-row">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
            />
            <button
              type="button"
              className="toggle"
              aria-pressed={showPassword}
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="row small">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>

          <a className="muted" href="#forgot">Forgot password?</a>
        </div>

        <div aria-live="polite" className="error" role="status">
          {error}
        </div>

        <button className="primary" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <div className="signup small muted">
          Don't have an account? <a href="#signup">Sign up</a>
        </div>
      </form>
    </main>
  )
}
