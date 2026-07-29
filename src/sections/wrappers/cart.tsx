import type { Section } from '@/sections/types'
import { SectionsRenderer } from '@/sections/renderer'
import { PageContextProvider } from './context'
import { getCart } from '@/lib/stub-commerce'

export function CartPageWrapper({ sections }: { sections: Section[] }) {
  const cart = getCart()
  return (
    <PageContextProvider value={{ cart }}>
      <main className="min-h-screen">
        <SectionsRenderer sections={sections} />
      </main>
    </PageContextProvider>
  )
}
