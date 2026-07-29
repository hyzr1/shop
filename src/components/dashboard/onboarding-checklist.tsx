'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CircleCheck, Circle, ArrowUpRight, X } from 'lucide-react'

export interface OnboardingItem {
  id: string
  label: string
  href: string
  done: boolean
  /** Show only if this is true; used for trial-only steps. */
  show?: boolean
}

const STORAGE_KEY = 'hyzr.onboarding.manualDone'
const HIDDEN_KEY = 'hyzr.onboarding.hidden'

export function OnboardingChecklist({ items }: { items: OnboardingItem[] }) {
  const [manualDone, setManualDone] = useState<Record<string, boolean>>({})
  const [hidden, setHidden] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      setMounted(true)
      try {
        setManualDone(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'))
        setHidden(localStorage.getItem(HIDDEN_KEY) === '1')
      } catch {
        /* ignore */
      }
    })
    return () => { cancelled = true }
  }, [])

  const visible = useMemo(() => items.filter((i) => i.show !== false), [items])
  const withState = useMemo(
    () => visible.map((i) => ({ ...i, done: i.done || !!manualDone[i.id] })),
    [visible, manualDone]
  )
  const completed = withState.filter((i) => i.done).length
  const total = withState.length
  const allDone = total > 0 && completed === total

  function toggle(id: string) {
    setManualDone((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }

  function dismiss() {
    setHidden(true)
    try { localStorage.setItem(HIDDEN_KEY, '1') } catch { /* ignore */ }
  }

  // Hide until hydrated to avoid SSR/CSR mismatch flicker
  if (!mounted) return null
  if (hidden || allDone || total === 0) return null

  const pct = Math.round((completed / total) * 100)

  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <div className="min-w-0">
          <p className="text-[14.5px] font-semibold tracking-tight">Get started with Hyzr</p>
          <p className="text-[12.5px] text-muted-foreground">
            {completed} of {total} complete · finish setup to unlock everything.
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Dismiss onboarding"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="h-1 w-full bg-muted">
        <div
          className="h-full bg-foreground transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ul className="divide-y divide-border">
        {withState.map((item) => (
          <li key={item.id} className="flex items-center gap-3 px-5 py-3">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="shrink-0 transition-transform hover:scale-110"
              aria-label={item.done ? `Mark "${item.label}" incomplete` : `Mark "${item.label}" complete`}
            >
              {item.done ? (
                <CircleCheck className="h-5 w-5 text-emerald-600" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            <span
              className={cn(
                'flex-1 text-[13.5px]',
                item.done ? 'text-muted-foreground line-through' : 'text-foreground'
              )}
            >
              {item.label}
            </span>
            {!item.done && (
              <Link href={item.href}>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-[12px]">
                  Go <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </Card>
  )
}
