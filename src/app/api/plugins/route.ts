import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: plugins } = await supabase
    .from('plugins')
    .select('*')
    .eq('active', true)
    .order('name')

  return NextResponse.json(plugins ?? [])
}
