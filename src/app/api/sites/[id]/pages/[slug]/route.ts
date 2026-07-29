import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { sectionSchema } from '@/sections/schema'
import { z } from 'zod'

type SupabaseSrv = Awaited<ReturnType<typeof createClient>>

const patchSchema = z.object({
  draft_sections: z.array(sectionSchema).nullable().optional(),
  title: z.string().optional(),
  expected_updated_at: z.string().optional(), // optimistic lock
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
  { params }: { params: Promise<{ id: string; slug: string }> }
) {
  const { id, slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!(await assertOwner(supabase, id, user.id))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('site_id', id)
    .eq('slug', slug)
    .maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; slug: string }> }
) {
  const { id, slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!(await assertOwner(supabase, id, user.id))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const json = await req.json()
  const parsed = patchSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid body', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { expected_updated_at, ...patch } = parsed.data

  // Optimistic lock check
  if (expected_updated_at) {
    const { data: current } = await supabase
      .from('pages')
      .select('updated_at')
      .eq('site_id', id)
      .eq('slug', slug)
      .single()
    if (current && current.updated_at !== expected_updated_at) {
      return NextResponse.json(
        { error: 'Stale', server_updated_at: current.updated_at },
        { status: 409 }
      )
    }
  }

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (patch.draft_sections !== undefined) update.draft_sections = patch.draft_sections
  if (patch.title !== undefined) update.title = patch.title

  const { data, error } = await supabase
    .from('pages')
    .update(update)
    .eq('site_id', id)
    .eq('slug', slug)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; slug: string }> }
) {
  const { id, slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!(await assertOwner(supabase, id, user.id))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Don't allow deleting universal pages
  if (
    ['home', 'product', 'collection', 'cart', 'search', 'collection_list'].includes(slug)
  ) {
    return NextResponse.json({ error: 'Cannot delete this page type' }, { status: 400 })
  }

  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('site_id', id)
    .eq('slug', slug)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
