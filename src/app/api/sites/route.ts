import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { getTemplateData } from '@/lib/templates/registry'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: sites } = await supabase
    .from('sites')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return NextResponse.json(sites ?? [])
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, subdomain, template } = await request.json()

  if (!name || !subdomain) {
    return NextResponse.json({ error: 'Name and subdomain are required' }, { status: 400 })
  }

  if (!/^[a-z0-9-]+$/.test(subdomain)) {
    return NextResponse.json({ error: 'Subdomain may only contain lowercase letters, numbers, and hyphens' }, { status: 400 })
  }

  const { data: site, error } = await supabase
    .from('sites')
    .insert({ user_id: user.id, name, subdomain, template: template ?? 'default' })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'That subdomain is already taken' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!site) {
    return NextResponse.json({ error: 'Failed to create site' }, { status: 500 })
  }

  // Seed theme + pages from the selected template (defaults to Pulse).
  // Best-effort: if RLS or transient failures occur the site already exists, so
  // log and continue. The Phase 13 migration backfills any orphaned sites.
  const tpl = getTemplateData(template ?? 'pulse')

  const { error: themeError } = await supabase.from('themes').insert({
    site_id: site.id,
    settings: tpl.theme,
    custom_css: '',
  })
  if (themeError) {
    console.error('[sites.POST] failed to seed default theme', {
      site_id: site.id,
      code: themeError.code,
      message: themeError.message,
    })
  }

  const { error: pagesError } = await supabase.from('pages').insert(
    Object.entries(tpl.pages).map(([slug, p]) => ({
      site_id: site.id,
      slug,
      page_type: p.page_type,
      title: p.title,
      sections: p.sections,
    }))
  )
  if (pagesError) {
    console.error('[sites.POST] failed to seed default pages', {
      site_id: site.id,
      code: pagesError.code,
      message: pagesError.message,
    })
  }

  return NextResponse.json(site, { status: 201 })
}
