'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { useRouter } from 'next/navigation'
import { Smartphone, AlertCircle, CheckCircle2 } from 'lucide-react'

type Mode = 'login' | 'signup'

export function AuthForm({ mode }: { mode: Mode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
      if (error) setError(error.message); else setMessage('Check your email to confirm your account.')
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message); else if (data.user) router.push('/dashboard')
    }
    setLoading(false)
  }

  async function handleGoogleLogin() {
    setOauthLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) { setError(error.message); setOauthLoading(false) }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-5 text-center">
        <Logo size={64} variant="mark" />
        <div className="space-y-1.5">
          <h1 className="text-[1.9rem] font-semibold leading-tight tracking-tight">
            {mode === 'login' ? 'Sign in to hyzr' : 'Create your hyzr account'}
          </h1>
          <p className="text-[0.95rem] text-muted-foreground">
            {mode === 'login' ? 'Welcome back. Pick up where you left off.' : 'Start building — free for your first 30 days.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === 'signup' && (
          <Field type="text" placeholder="Full name" value={fullName} onChange={setFullName} />
        )}
        <Field type="email" placeholder="name@email.com" value={email} onChange={setEmail} autoFocus />
        <Field type="password" placeholder="Password" value={password} onChange={setPassword} />

        {error && (
          <div className="flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
          </div>
        )}
        {message && (
          <div className="flex items-start gap-2 rounded-xl bg-emerald-50 px-3.5 py-3 text-sm text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {message}
          </div>
        )}

        <Button type="submit" variant="primary" className="h-12 w-full rounded-xl text-[0.95rem]" loading={loading}>
          {mode === 'login' ? 'Continue with Email' : 'Create account'}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-3">
        <button onClick={handleGoogleLogin} disabled={oauthLoading}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background text-[0.95rem] font-medium shadow-soft transition-colors hover:bg-muted disabled:opacity-60">
          <GoogleIcon /> Continue with Google
        </button>
        <button onClick={() => router.push('/auth/phone')}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background text-[0.95rem] font-medium shadow-soft transition-colors hover:bg-muted">
          <Smartphone className="h-[1.15rem] w-[1.15rem]" /> Continue with Phone
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          {mode === 'login' ? (
            <>Don&apos;t have an account? <a href="/auth/signup" className="font-medium text-foreground underline-offset-4 hover:underline">Sign up</a></>
          ) : (
            <>Already have an account? <a href="/auth/login" className="font-medium text-foreground underline-offset-4 hover:underline">Sign in</a></>
          )}
        </p>

        <p className="text-center text-xs leading-relaxed text-muted-foreground/80">
          By continuing, you agree to Hyzr&apos;s{' '}
          <a href="#" className="underline underline-offset-2 hover:text-foreground">Terms of Service</a> and{' '}
          <a href="#" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</a>, and to receive
          periodic emails with updates.
        </p>

        <div className="flex items-center justify-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">Single sign-on (SSO)</a>
          <span className="h-3 w-px bg-border" />
          <a href="#" className="transition-colors hover:text-foreground">Trouble signing in?</a>
        </div>
      </div>
    </div>
  )
}

function Field({ type, placeholder, value, onChange, autoFocus }: {
  type: string; placeholder: string; value: string; onChange: (v: string) => void; autoFocus?: boolean
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      autoFocus={autoFocus}
      required
      minLength={type === 'password' ? 8 : undefined}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 w-full rounded-xl border border-border bg-muted/40 px-4 text-[0.95rem] text-foreground placeholder:text-muted-foreground transition-all focus:border-foreground/40 focus:bg-background focus:outline-none focus:ring-4 focus:ring-foreground/[0.06]"
    />
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
