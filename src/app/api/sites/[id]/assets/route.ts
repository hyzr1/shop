import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

type SupabaseSrv = Awaited<ReturnType<typeof createClient>>
async function assertOwner(supabase: SupabaseSrv, siteId: string, userId: string) {
  const { data } = await supabase
    .from('sites')
    .select('id')
    .eq('id', siteId)
    .eq('user_id', userId)
    .maybeSingle()
  return !!data
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!(await assertOwner(supabase, id, user.id))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { data } = await supabase.from('assets').select('*').eq('site_id', id).order('created_at', { ascending: false })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!(await assertOwner(supabase, id, user.id))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
  if (file.size > 5_000_000) return NextResponse.json({ error: 'File too large (5MB max)' }, { status: 400 })

  const path = `${id}/${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, '_')}`
  const up = await supabase.storage.from('site-assets').upload(path, file, { contentType: file.type })
  if (up.error) return NextResponse.json({ error: up.error.message }, { status: 500 })

  const { data: { publicUrl } } = supabase.storage.from('site-assets').getPublicUrl(path)

  const { data: asset, error: insertErr } = await supabase.from('assets').insert({
    site_id: id, url: publicUrl, mime_type: file.type, bytes: file.size,
  }).select().single()
  if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 })
  return NextResponse.json(asset, { status: 201 })
}
