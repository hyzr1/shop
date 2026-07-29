import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

type SupabaseSrv = Awaited<ReturnType<typeof createClient>>

const PAGE_TYPES = [
  'home',
  'page',
  'product',
  'collection',
  'collection_list',
  'cart',
  'search',
  'blog',
  'article',
  'not_found',
  'password',
] as const

const createSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  page_type: z.enum(PAGE_TYPES),
  title: z.string().default(''),
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
    .from('pages')
    .select('id, slug, page_type, title, updated_at, published_at')
    .eq('site_id', id)
    .order('page_type')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(
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

  const parsed = createSchema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid body', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('pages')
    .insert({
      site_id: id,
      slug: parsed.data.slug,
      page_type: parsed.data.page_type,
      title: parsed.data.title,
      sections: [],
    })
    .select()
    .single()
  if (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'A page with that slug already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data, { status: 201 })
}
