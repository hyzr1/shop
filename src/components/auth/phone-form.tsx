'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Smartphone, KeyRound, ArrowLeft, AlertCircle } from 'lucide-react'

export function PhoneForm() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithOtp({ phone })
    if (error) setError(error.message); else setStep('otp')
    setLoading(false)
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' })
    if (error) setError(error.message); else router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          {step === 'phone' ? 'Sign in with phone' : 'Enter the code'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {step === 'phone' ? "We'll text you a one-time passcode" : `Sent to ${phone}`}
        </p>
      </div>

      {step === 'phone' ? (
        <form onSubmit={sendOtp} className="space-y-4">
          <Input id="phone" label="Phone number" type="tel" placeholder="+1 (555) 000-0000"
            icon={<Smartphone />} value={phone} onChange={(e) => setPhone(e.target.value)} required />
          {error && <ErrorBox msg={error} />}
          <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>Send code</Button>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="space-y-4">
          <Input id="otp" label="Verification code" inputMode="numeric" placeholder="123456"
            icon={<KeyRound />} value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} required />
          {error && <ErrorBox msg={error} />}
          <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>Verify & continue</Button>
          <Button type="button" variant="ghost" className="w-full" onClick={() => setStep('phone')}>Use a different number</Button>
        </form>
      )}

      <a href="/auth/login" className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to login
      </a>
    </div>
  )
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {msg}
    </div>
  )
}
