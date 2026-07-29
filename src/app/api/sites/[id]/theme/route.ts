import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { themeSettingsSchema } from '@/sections/schema'
import { z } from 'zod'

type SupabaseSrv = Awaited<ReturnType<typeof createClient>>

const patchSchema = z.object({
  settings: themeSettingsSchema.optional(),
  custom_css: z.string().optional(),
})

async function assertOwner(supabase: SupabaseSrv, siteId: string, userId: string) {
  const { data } = await supabase
    .from('sites')
    .select('id')
    .eq('id', siteId)
    .eq('user_id', userId)
    .maybeSingle()
  return !!data
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!(await assertOwner(supabase, id, user.id))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('themes')
    .select('*')
    .eq('site_id', id)
    .maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!(await assertOwner(supabase, id, user.id))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const parsed = patchSchema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid body', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (parsed.data.settings) update.settings = parsed.data.settings
  if (parsed.data.custom_css !== undefined) update.custom_css = parsed.data.custom_css

  const { data, error } = await supabase
    .from('themes')
    .update(update)
    .eq('site_id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
