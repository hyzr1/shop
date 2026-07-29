import { createClient } from '@/lib/supabase/server'
import { DefaultPageWrapper } from '@/sections/wrappers/default'
import { ProductPageWrapper } from '@/sections/wrappers/product'
import { CollectionPageWrapper } from '@/sections/wrappers/collection'
import { CartPageWrapper } from '@/sections/wrappers/cart'
import { InteractivePreview } from './interactive'
import { notFound } from 'next/navigation'
import type { Page, Section } from '@/sections/types'
import '@/sections/registry'  // ensure side-effect registrations

export const dynamic = 'force-dynamic'

const wrapperMap = {
  product: (sections: Section[]) => <ProductPageWrapper sections={sections} />,
  collection: (sections: Section[]) => <CollectionPageWrapper sections={sections} />,
  cart: (sections: Section[]) => <CartPageWrapper sections={sections} />,
} as const

export default async function Preview({
  params,
  searchParams,
}: {
  params: Promise<{ siteId: string }>
  searchParams: Promise<{ page?: string; interactive?: string }>
}) {
  const { siteId } = await params
  const { page = 'home', interactive } = await searchParams

  const supabase = await createClient()
  const { data: pageRow } = await supabase
    .from('pages')
    .select('*')
    .eq('site_id', siteId)
    .eq('slug', page)
    .single()

  if (!pageRow) notFound()

  if (interactive === '1') {
    return <InteractivePreview initialPage={pageRow as Page} />
  }

  const sections: Section[] = (pageRow.draft_sections ?? pageRow.sections ?? []) as Section[]
  const wrap = wrapperMap[pageRow.page_type as keyof typeof wrapperMap]
  return wrap ? wrap(sections) : <DefaultPageWrapper sections={sections} />
}
