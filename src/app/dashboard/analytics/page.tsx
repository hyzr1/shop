'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/dashboard/page-header'
import { TrendingUp, Users, MousePointerClick, Timer, ArrowUpRight } from 'lucide-react'

const data = [12, 18, 14, 22, 19, 28, 24, 32, 30, 38, 35, 44, 40, 52]

export default function AnalyticsPage() {
  const max = Math.max(...data)
  const w = 800, h = 240
  const step = w / (data.length - 1)
  const points = data.map((d, i) => `${i * step},${h - (d / max) * h}`)
  const linePath = `M ${points.join(' L ')}`
  const areaPath = `${linePath} L ${w},${h} L 0,${h} Z`

  const stats = [
    { label: 'Total visitors', value: '0', change: '+0%', icon: Users, color: 'text-blue-500' },
    { label: 'Page views', value: '0', change: '+0%', icon: MousePointerClick, color: 'text-violet-500' },
    { label: 'Avg. session', value: '0s', change: '+0%', icon: Timer, color: 'text-emerald-500' },
    { label: 'Bounce rate', value: '0%', change: '+0%', icon: TrendingUp, color: 'text-amber-500' },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <PageHeader title="Analytics" description="Traffic and engagement across all your sites" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} hover className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted"><s.icon className={`h-[1.1rem] w-[1.1rem] ${s.color}`} /></div>
              <Badge variant="success"><ArrowUpRight className="h-3 w-3" />{s.change}</Badge>
            </div>
            <p className="mt-3 text-2xl font-bold tabular-nums">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Visitors over time</CardTitle>
          <Badge variant="outline">Last 14 days</Badge>
        </CardHeader>
        <CardContent>
          <div className="relative w-full">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: 240 }}>
              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#area)" />
              <path d={linePath} fill="none" stroke="url(#line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>2 weeks ago</span><span>Today</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted"><TrendingUp className="h-6 w-6 text-muted-foreground" /></div>
          <p className="mt-3 font-medium">No traffic data yet</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">Once your sites start receiving visitors, detailed analytics will appear here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
