'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navSections } from '@/lib/nav'
import { Logo } from '@/components/ui/logo'
import { ChevronsUpDown, Sparkles } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-card">
      {/* Logo + workspace */}
      <div className="flex flex-col gap-3 px-4 pt-5 pb-4">
        <div className="px-1">
          <Logo size={18} />
        </div>
        <button className="group flex items-center gap-2.5 rounded-md border border-border bg-background px-2.5 py-2 text-left transition-colors hover:bg-muted/50">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-foreground text-background text-[11px] font-bold tracking-tight">
            HZ
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold leading-tight">Hyzr Workspace</p>
            <p className="truncate text-[11px] leading-tight text-muted-foreground">Personal</p>
          </div>
          <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 pt-2 pb-4">
        {navSections.map((section, i) => (
          <div key={i} className="space-y-0.5">
            {section.heading && (
              <p className="px-3 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/70">
                {section.heading}
              </p>
            )}
            {section.items.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-2.5 rounded-md px-3 py-[7px] text-[13.5px] font-medium transition-colors',
                    active
                      ? 'bg-muted/60 text-foreground'
                      : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                  )}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-1 left-0 w-[2.5px] rounded-r-full bg-foreground"
                    />
                  )}
                  <item.icon
                    className={cn(
                      'h-[15px] w-[15px] shrink-0 transition-colors',
                      active ? 'text-foreground' : 'text-muted-foreground/80 group-hover:text-foreground'
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Pro plan card */}
      <div className="px-3 pb-3">
        <div className="rounded-lg border border-border bg-background p-3.5">
          <div className="flex items-center gap-2">
            <div className="grid h-6 w-6 place-items-center rounded-md bg-foreground text-background">
              <Sparkles className="h-3 w-3" />
            </div>
            <p className="text-[13px] font-semibold tracking-tight">Hyzr Pro</p>
          </div>
          <p className="mt-1.5 text-[12px] leading-snug text-muted-foreground">
            Unlimited sites, plugins, and priority support.
          </p>
          <Link
            href="/dashboard/billing"
            className="mt-3 inline-flex h-7 w-full items-center justify-center rounded-md bg-foreground text-[11.5px] font-semibold text-background transition-opacity hover:opacity-90"
          >
            Manage plan
          </Link>
        </div>
      </div>
    </aside>
  )
}
