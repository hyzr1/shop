import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { PromptComposer } from '@/components/dashboard/prompt-composer'
import { SiteThumb } from '@/components/dashboard/site-thumb'
import { OnboardingChecklist } from '@/components/dashboard/onboarding-checklist'
import {
  GlobalActivityFeed,
  ResourcesGrid,
  MiniSparkline,
} from '@/components/dashboard/dashboard-extras'
import Link from 'next/link'
import {
  Globe, Puzzle, TrendingUp, Rocket, ArrowUpRight, Plus,
  ArrowRight, ExternalLink,
} from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()
  const { data: sites } = await supabase.from('sites').select('*').eq('user_id', user!.id).order('created_at', { ascending: false })
  const { count: pluginCount } = await supabase
    .from('site_plugins').select('*', { count: 'exact', head: true })

  const isTrialing = profile?.subscription_status === 'trialing'
  const trialEnd = profile?.trial_ends_at ? new Date(profile.trial_ends_at) : null
  // This server component renders per request, so the current request time is intentional.
  // eslint-disable-next-line react-hooks/purity
  const daysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / 86400000)) : 0
  const siteCount = sites?.length ?? 0

  // Deterministic sparkline data, seeded so it's stable across renders
  const spark = (seed: number, amp: number) =>
    Array.from({ length: 12 }, (_, i) => {
      const x = (Math.sin((i + seed) * 0.7) + 1) * 0.5
      return 0.3 + x * amp
    })

  const stats = [
    {
      label: 'Active sites',
      value: siteCount,
      icon: Globe,
      trend: siteCount > 0 ? `${siteCount} live` : 'Create your first',
      tone: 'text-emerald-500',
      data: spark(2, 0.6),
    },
    {
      label: 'Installed plugins',
      value: pluginCount ?? 0,
      icon: Puzzle,
      trend: 'Across all sites',
      tone: 'text-indigo-500',
      data: spark(5, 0.5),
    },
    {
      label: 'Total visits',
      value: siteCount ? (siteCount * 1240).toLocaleString() : '0',
      icon: TrendingUp,
      trend: 'Last 30 days',
      tone: 'text-amber-500',
      data: spark(8, 0.7),
    },
  ]

  // Onboarding checklist — auto-check items we can derive from data
  const onboardingItems = [
    { id: 'site', label: 'Create your first site', href: '/dashboard/sites', done: siteCount > 0 },
    { id: 'edit', label: 'Edit your home page', href: sites?.[0] ? `/edit/${sites[0].id}` : '/dashboard/sites', done: false },
    { id: 'plugin', label: 'Install a plugin', href: '/dashboard/plugins', done: (pluginCount ?? 0) > 0 },
    {
      id: 'payment',
      label: 'Add a payment method',
      href: '/dashboard/billing',
      done: !isTrialing,
      show: isTrialing,
    },
    { id: 'domain', label: 'Connect a custom domain', href: '/dashboard/settings', done: false },
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-8 py-10">
      {/* Prompt composer hero */}
      <div className="animate-in" style={{ animationDelay: '0ms' }}>
        <PromptComposer />
      </div>

      {/* Trial banner */}
      {isTrialing && (
        <div
          className="animate-in flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between"
          style={{ animationDelay: '60ms' }}
        >
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-foreground text-background">
              <Rocket className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[14px] font-semibold tracking-tight">You&apos;re on the free trial</p>
              <p className="text-[13px] text-muted-foreground">
                {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left · ends {trialEnd ? formatDate(trialEnd) : ''}. Add a payment method to keep everything running.
              </p>
            </div>
          </div>
          <Link href="/dashboard/billing">
            <Button variant="primary" size="sm" className="shrink-0">
              Upgrade to Pro <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      )}

      {/* Onboarding checklist */}
      <div className="animate-in" style={{ animationDelay: '90ms' }}>
        <OnboardingChecklist items={onboardingItems} />
      </div>

      {/* Stats with sparklines */}
      <section className="animate-in" style={{ animationDelay: '120ms' }}>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <s.icon className="h-4 w-4" />
                  <span className="text-[12.5px] font-medium uppercase tracking-wider">{s.label}</span>
                </div>
              </div>
              <p className="mt-3 text-[32px] font-bold leading-none tracking-tight tabular-nums">{s.value}</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <p className="text-[12px] text-muted-foreground">{s.trend}</p>
                <div className={`h-7 w-24 ${s.tone}`}>
                  <MiniSparkline data={s.data} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sites — list view with thumbnails */}
      <section className="animate-in space-y-3" style={{ animationDelay: '180ms' }}>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight">Your sites</h2>
            <p className="text-[13px] text-muted-foreground">Manage and launch your sites on hyzr.ai</p>
          </div>
          <Link
            href="/dashboard/sites"
            className="flex shrink-0 items-center gap-1 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {!sites?.length ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-muted">
              <Globe className="h-5 w-5 text-foreground" />
            </div>
            <p className="mt-4 text-[15px] font-semibold tracking-tight">No sites yet</p>
            <p className="mt-1 max-w-xs text-[13px] text-muted-foreground">
              Create your first site and pick a subdomain on hyzr.ai.
            </p>
            <Link href="/dashboard/sites" className="mt-5">
              <Button variant="primary" size="sm">
                <Plus className="h-3.5 w-3.5" /> Create a site
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {sites.slice(0, 5).map((site, i) => (
              <Link
                key={site.id}
                href={`/dashboard/sites/${site.id}`}
                className={`group flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted/40 ${
                  i > 0 ? 'border-t border-border' : ''
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-background">
                    <SiteThumb
                      src={`/edit/${site.id}/preview?page=home`}
                      aspect="1/1"
                      sourceWidth={1280}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold tracking-tight">{site.name}</p>
                    <span className="inline-flex items-center gap-1 truncate text-[12.5px] text-muted-foreground">
                      {site.subdomain}.hyzr.ai <ExternalLink className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge variant={site.status === 'active' ? 'success' : 'warning'} dot>
                    {site.status}
                  </Badge>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Global activity feed */}
      <section className="animate-in" style={{ animationDelay: '240ms' }}>
        <GlobalActivityFeed sites={sites ?? []} />
      </section>

      {/* Resources */}
      <div className="animate-in" style={{ animationDelay: '300ms' }}>
        <ResourcesGrid />
      </div>
    </div>
  )
}
