'use client'

import { useEffect, useState, Suspense } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/dashboard/page-header'
import { useSearchParams } from 'next/navigation'
import { Check, CheckCircle2, CreditCard, CalendarClock, Zap } from 'lucide-react'

interface Profile { subscription_status: string; trial_ends_at: string | null; stripe_subscription_id: string | null }

const FEATURES = [
  'Unlimited sites on hyzr.ai',
  'Full plugin marketplace',
  'Custom domain support',
  'Visual site editor',
  'Priority support',
  'Advanced analytics',
]

function BillingContent() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const success = useSearchParams().get('success')

  useEffect(() => {
    fetch('/api/stripe/profile').then(r => r.json()).then(d => { setProfile(d); setLoading(false) })
  }, [])

  async function startCheckout() {
    setCheckoutLoading(true)
    const { url } = await (await fetch('/api/stripe/create-checkout', { method: 'POST' })).json()
    if (url) window.location.href = url; else setCheckoutLoading(false)
  }
  async function openPortal() {
    setPortalLoading(true)
    const { url } = await (await fetch('/api/stripe/portal', { method: 'POST' })).json()
    if (url) window.location.href = url; else setPortalLoading(false)
  }

  const statusColor = { active: 'success', trialing: 'warning', canceled: 'error', past_due: 'error' } as const
  const trialEnd = profile?.trial_ends_at ? new Date(profile.trial_ends_at) : null

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-8">
      <PageHeader title="Billing" description="Manage your subscription and payment method" />

      {success && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
          <CheckCircle2 className="h-5 w-5" /> Your subscription is active. Welcome to Pro!
        </div>
      )}

      {loading ? <Skeleton className="h-80" /> : (
        <Card className="overflow-hidden">
          <div className="relative border-b border-border bg-card p-6">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_right,black,transparent_55%)]" />
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold">Hyzr Pro</p>
                    {profile?.subscription_status && (
                      <Badge variant={statusColor[profile.subscription_status as keyof typeof statusColor] ?? 'default'} dot>
                        {profile.subscription_status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Everything you need to build and grow.</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold tracking-tight">$20<span className="text-base font-normal text-muted-foreground">/mo</span></p>
              </div>
            </div>
          </div>

          <CardContent className="pt-6">
            <div className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                    <Check className="h-3 w-3" />
                  </div>
                  {f}
                </div>
              ))}
            </div>

            {profile?.subscription_status === 'trialing' && trialEnd && (
              <div className="mt-5 flex items-center gap-2.5 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                <CalendarClock className="h-4 w-4" />
                Free trial ends {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(trialEnd)}.
              </div>
            )}
          </CardContent>

          <CardFooter className="justify-between">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><CreditCard className="h-3.5 w-3.5" /> Secured by Stripe</p>
            {!profile?.stripe_subscription_id ? (
              <Button variant="primary" onClick={startCheckout} loading={checkoutLoading}>Add payment method</Button>
            ) : (
              <Button variant="outline" onClick={openPortal} loading={portalLoading}>Manage subscription</Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default function BillingPage() {
  return <Suspense><BillingContent /></Suspense>
}
