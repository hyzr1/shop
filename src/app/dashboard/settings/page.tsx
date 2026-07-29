'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/dashboard/page-header'
import { Switch } from '@/components/ui/switch'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import {
  User, Building2, Palette, Bell, Shield, CheckCircle2, AlertCircle,
} from 'lucide-react'

interface Profile { full_name: string | null; email: string | null; avatar_url: string | null }

const SECTIONS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'account', label: 'Account', icon: Building2 },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
] as const

export default function SettingsPage() {
  const [section, setSection] = useState<typeof SECTIONS[number]['id']>('profile')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [supabase] = useState(createClient)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase.from('profiles').select('full_name, email, avatar_url').eq('id', user.id).single()
      setProfile(data ?? { full_name: null, email: user.email ?? null, avatar_url: null })
    })
  }, [supabase])

  async function saveProfile() {
    if (!profile) return
    setSaving(true); setMessage('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('profiles').update({ full_name: profile.full_name }).eq('id', user.id)
    setMessage(error ? `Error: ${error.message}` : 'Saved'); setSaving(false)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <PageHeader title="Settings" description="Manage your account, preferences, and security" />

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Section nav */}
        <nav className="flex shrink-0 gap-1 overflow-x-auto lg:w-48 lg:flex-col">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => setSection(s.id)}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                section === s.id ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
              )}>
              <s.icon className="h-4 w-4" /> {s.label}
            </button>
          ))}
        </nav>

        <div className="min-w-0 flex-1 space-y-6">
          {section === 'profile' && (
            <Card>
              <CardHeader><CardTitle>Profile</CardTitle><CardDescription>This information is visible across your workspace.</CardDescription></CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4">
                  <Avatar src={profile?.avatar_url} name={profile?.full_name ?? profile?.email} className="h-16 w-16 text-lg" />
                  <div>
                    <Button variant="outline" size="sm">Change photo</Button>
                    <p className="mt-1.5 text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <Input label="Full name" value={profile?.full_name ?? ''} onChange={(e) => setProfile(p => p ? { ...p, full_name: e.target.value } : p)} />
                <Input label="Email" value={profile?.email ?? ''} disabled hint="Contact support to change your email address." />
                {message && (
                  <div className={cn('flex items-center gap-2 text-sm', message.startsWith('Error') ? 'text-red-500' : 'text-emerald-500')}>
                    {message.startsWith('Error') ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />} {message}
                  </div>
                )}
              </CardContent>
              <CardFooter className="justify-end"><Button variant="primary" onClick={saveProfile} loading={saving}>Save changes</Button></CardFooter>
            </Card>
          )}

          {section === 'account' && (
            <>
              <Card>
                <CardHeader><CardTitle>Organization</CardTitle><CardDescription>Details about your Hyzr workspace.</CardDescription></CardHeader>
                <CardContent className="space-y-5">
                  <Input label="Workspace name" defaultValue="My Workspace" />
                  <Input label="Workspace URL" defaultValue="my-workspace" suffix={<span className="text-xs">.hyzr.ai</span>} />
                </CardContent>
                <CardFooter className="justify-end"><Button variant="primary">Save</Button></CardFooter>
              </Card>
              <Card className="border-red-200 dark:border-red-500/20">
                <CardHeader><CardTitle className="text-red-600 dark:text-red-400">Delete account</CardTitle><CardDescription>Permanently remove your account and all associated sites.</CardDescription></CardHeader>
                <CardFooter><Button variant="destructive">Delete my account</Button></CardFooter>
              </Card>
            </>
          )}

          {section === 'appearance' && <AppearanceSection />}

          {section === 'notifications' && <NotificationsSection />}

          {section === 'security' && (
            <Card>
              <CardHeader><CardTitle>Password & security</CardTitle><CardDescription>Keep your account secure.</CardDescription></CardHeader>
              <CardContent className="space-y-5">
                <Input label="Current password" type="password" placeholder="••••••••" />
                <Input label="New password" type="password" placeholder="••••••••" />
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div><p className="text-sm font-medium">Active sessions</p><p className="text-xs text-muted-foreground">You&apos;re signed in on this device.</p></div>
                  <Badge variant="success" dot>Current</Badge>
                </div>
              </CardContent>
              <CardFooter className="justify-end"><Button variant="primary">Update password</Button></CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function AppearanceSection() {
  return (
    <Card>
      <CardHeader><CardTitle>Appearance</CardTitle><CardDescription>Hyzr currently ships in light mode. Dark mode is coming soon.</CardDescription></CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">No appearance options to configure yet.</p>
      </CardContent>
    </Card>
  )
}

function NotificationsSection() {
  const [prefs, setPrefs] = useState({ product: true, billing: true, marketing: false, security: true })
  const items = [
    { id: 'product', label: 'Product updates', desc: 'New features and improvements' },
    { id: 'billing', label: 'Billing alerts', desc: 'Payment receipts and trial reminders' },
    { id: 'security', label: 'Security alerts', desc: 'Sign-ins and password changes' },
    { id: 'marketing', label: 'Marketing emails', desc: 'Tips, offers, and announcements' },
  ] as const
  return (
    <Card>
      <CardHeader><CardTitle>Notifications</CardTitle><CardDescription>Choose what you want to hear about.</CardDescription></CardHeader>
      <CardContent className="space-y-1">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between border-b border-border py-4 last:border-0">
            <div><p className="text-sm font-medium">{it.label}</p><p className="text-xs text-muted-foreground">{it.desc}</p></div>
            <Switch checked={prefs[it.id]} onCheckedChange={(v) => setPrefs(p => ({ ...p, [it.id]: v }))} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
