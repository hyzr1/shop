import type { Section } from '@/sections/types'
import { SectionsRenderer } from '@/sections/renderer'
import { PageContextProvider } from './context'
import { getCollection } from '@/lib/stub-commerce'

export function CollectionPageWrapper({
  sections,
  handle,
}: {
  sections: Section[]
  handle?: string
}) {
  const collection = getCollection(handle)
  return (
    <PageContextProvider value={{ collection }}>
      <main className="min-h-screen">
        <SectionsRenderer sections={sections} />
      </main>
    </PageContextProvider>
  )
}
