'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Avatar } from '@/components/ui/avatar'
import {
  Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownLabel, DropdownSeparator,
} from '@/components/ui/dropdown'
import { Search, Bell, LogOut, User, Settings, CreditCard, ChevronsUpDown } from 'lucide-react'
import { CommandPalette } from './command-palette'

interface Profile {
  full_name: string | null
  email: string | null
  avatar_url: string | null
}

export function Topbar() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [cmdOpen, setCmdOpen] = useState(false)
  const router = useRouter()
  const [supabase] = useState(createClient)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase.from('profiles').select('full_name, email, avatar_url').eq('id', user.id).single()
      setProfile(data ?? { full_name: null, email: user.email ?? null, avatar_url: null })
    })
  }, [supabase])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-border glass px-5">
        {/* Search trigger — narrower, refined */}
        <button
          onClick={() => setCmdOpen(true)}
          className="group flex h-8 w-full max-w-sm items-center gap-2 rounded-md border border-border bg-background px-2.5 text-[13px] text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-muted/40"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="font-medium">Search</span>
          <kbd className="ml-auto hidden items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
            <span className="text-[11px]">⌘</span>K
          </kbd>
        </button>

        <div className="flex items-center gap-0.5">
          <button
            aria-label="Notifications"
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Bell className="h-[15px] w-[15px]" />
          </button>

          <div className="mx-1.5 h-5 w-px bg-border" />

          <Dropdown>
            <DropdownTrigger asChild>
              <button className="flex items-center gap-2 rounded-md py-1 pl-1 pr-1.5 transition-colors hover:bg-muted">
                <Avatar src={profile?.avatar_url} name={profile?.full_name ?? profile?.email} className="h-7 w-7" />
                <div className="hidden text-left sm:block">
                  <p className="max-w-[7.5rem] truncate text-[12.5px] font-semibold leading-tight tracking-tight">{profile?.full_name ?? 'Account'}</p>
                  <p className="max-w-[7.5rem] truncate text-[11px] leading-tight text-muted-foreground">{profile?.email}</p>
                </div>
                <ChevronsUpDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
              </button>
            </DropdownTrigger>
            <DropdownContent className="w-60">
              <DropdownLabel>
                <p className="text-[13px] font-semibold tracking-tight text-foreground">{profile?.full_name ?? 'Account'}</p>
                <p className="truncate text-[11.5px] font-normal text-muted-foreground">{profile?.email}</p>
              </DropdownLabel>
              <DropdownSeparator />
              <DropdownItem onClick={() => router.push('/dashboard/settings')}><User /> Profile</DropdownItem>
              <DropdownItem onClick={() => router.push('/dashboard/settings')}><Settings /> Settings</DropdownItem>
              <DropdownItem onClick={() => router.push('/dashboard/billing')}><CreditCard /> Billing</DropdownItem>
              <DropdownSeparator />
              <DropdownItem onClick={signOut} className="text-red-600 focus:text-red-600 dark:text-red-400 [&>svg]:text-red-500">
                <LogOut /> Sign out
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </header>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  )
}
