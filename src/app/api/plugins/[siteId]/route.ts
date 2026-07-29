import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ siteId: string }> }) {
  const { siteId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Verify site ownership
  const { data: site } = await supabase.from('sites').select('id').eq('id', siteId).eq('user_id', user.id).single()
  if (!site) return NextResponse.json({ error: 'Site not found' }, { status: 404 })

  const { pluginId, enabled } = await req.json()

  if (enabled) {
    const { error } = await supabase.from('site_plugins').upsert({ site_id: siteId, plugin_id: pluginId, enabled: true })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  } else {
    await supabase.from('site_plugins').delete().eq('site_id', siteId).eq('plugin_id', pluginId)
  }

  return NextResponse.json({ ok: true })
}
