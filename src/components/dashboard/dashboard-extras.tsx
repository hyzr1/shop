import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  Activity, Pencil, Puzzle, Globe, Layers, ShieldCheck,
  LayoutGrid, Plug, LifeBuoy, ArrowUpRight,
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/* Activity feed                                                              */
/* -------------------------------------------------------------------------- */

interface FeedSite { id: string; name: string; status: string; updated_at?: string; created_at?: string }

export function GlobalActivityFeed({ sites }: { sites: FeedSite[] }) {
  if (!sites.length) {
    return (
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-[14.5px] font-semibold tracking-tight">Activity</p>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background/40 py-10 text-center">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <p className="mt-3 text-[13.5px] font-medium">No activity yet</p>
          <p className="mt-1 max-w-xs text-[12.5px] text-muted-foreground">
            Your edits and updates will appear here.
          </p>
        </div>
      </Card>
    )
  }

  // Build a deterministic activity feed seeded from each site's id so the same
  // user sees the same mock activity each visit.
  const types: { icon: typeof Pencil; tone: string; verb: (s: FeedSite) => string }[] = [
    { icon: Pencil, tone: 'text-emerald-600', verb: (s) => `Home page edited on ${s.name}` },
    { icon: Puzzle, tone: 'text-indigo-600', verb: (s) => `SEO plugin installed on ${s.name}` },
    { icon: Globe, tone: 'text-emerald-600', verb: (s) => `Published changes to ${s.name}` },
    { icon: Layers, tone: 'text-blue-600', verb: (s) => `Collection page updated on ${s.name}` },
    { icon: ShieldCheck, tone: 'text-amber-600', verb: (s) => `SSL renewed on ${s.name}` },
  ]

  const entries = sites.flatMap((s, i) => {
    const seed = hashStr(s.id)
    return types.map((t, j) => ({
      key: `${s.id}-${j}`,
      icon: t.icon,
      tone: t.tone,
      label: t.verb(s),
      hours: ((seed + i * 13 + j * 7) % 168) + 1,
    }))
  }).sort((a, b) => a.hours - b.hours).slice(0, 10)

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-[14.5px] font-semibold tracking-tight">Activity</p>
        <span className="text-[12px] text-muted-foreground">Last 7 days</span>
      </div>
      <ul className="mt-4 space-y-1.5">
        {entries.map((e) => (
          <li
            key={e.key}
            className="flex items-center gap-3 rounded-md border border-transparent px-2 py-2 transition-colors hover:border-border hover:bg-muted/40"
          >
            <div className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-background', e.tone)}>
              <e.icon className="h-3.5 w-3.5" />
            </div>
            <p className="flex-1 truncate text-[13px] font-medium">{e.label}</p>
            <span className="text-[12px] text-muted-foreground">{e.hours}h ago</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Resources                                                                  */
/* -------------------------------------------------------------------------- */

const RESOURCES = [
  {
    icon: LayoutGrid,
    label: 'Browse templates',
    desc: 'Production-ready designs to start from.',
    href: '/dashboard/templates',
    tone: 'from-violet-500 to-indigo-500',
  },
  {
    icon: Plug,
    label: 'Plugin marketplace',
    desc: 'Extend your site with one-click apps.',
    href: '/dashboard/plugins',
    tone: 'from-emerald-500 to-teal-500',
  },
  {
    icon: LifeBuoy,
    label: 'Help center',
    desc: 'Guides, FAQs, and direct support.',
    href: '#',
    tone: 'from-amber-500 to-orange-500',
  },
]

export function ResourcesGrid() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-[17px] font-semibold tracking-tight">Resources</h2>
        <p className="text-[13px] text-muted-foreground">Tools and guides to help you ship faster.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {RESOURCES.map((r) => (
          <Link
            key={r.label}
            href={r.href}
            className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white shadow-soft', r.tone)}>
              <r.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-[14px] font-semibold tracking-tight">{r.label}</p>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="mt-0.5 text-[12.5px] text-muted-foreground">{r.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Sparkline (used by stats)                                                  */
/* -------------------------------------------------------------------------- */

export function MiniSparkline({ data, className }: { data: number[]; className?: string }) {
  const w = 100, h = 28
  const max = Math.max(...data, 1)
  const step = w / (data.length - 1)
  const points = data.map((d, i) => `${i * step},${h - (d / max) * h}`)
  const linePath = `M ${points.join(' L ')}`
  const areaPath = `${linePath} L ${w},${h} L 0,${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn('h-full w-full', className)} preserveAspectRatio="none">
      <path d={areaPath} fill="currentColor" fillOpacity="0.15" />
      <path d={linePath} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function hashStr(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}
