import type { Section } from '@/sections/types'
import { SectionsRenderer } from '@/sections/renderer'
import { PageContextProvider } from './context'
import { getProduct } from '@/lib/stub-commerce'

export function ProductPageWrapper({
  sections,
  handle,
}: {
  sections: Section[]
  handle?: string
}) {
  const product = getProduct(handle)
  return (
    <PageContextProvider value={{ product }}>
      <main className="min-h-screen">
        <SectionsRenderer sections={sections} />
      </main>
    </PageContextProvider>
  )
}
