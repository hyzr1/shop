'use client'
import { usePageContext } from '@/sections/wrappers/context'
import type { Section } from '@/sections/types'

export function CollectionGridSection({ section }: { section: Section }) {
  const { collection } = usePageContext()
  if (!collection) return null
  return (
    <section
      data-section-id={section.id}
      data-section-type="collection-grid"
      className="px-6 py-16"
    >
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-semibold">{collection.title}</h1>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {collection.products.map((p) => (
            <a key={p.id} href={`/products/${p.handle}`} className="group">
              <img
                src={p.media[0]?.url}
                alt=""
                className="aspect-square w-full rounded object-cover"
              />
              <p className="mt-2 text-sm">{p.title}</p>
              <p className="text-sm text-neutral-600">${p.price.toFixed(2)}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
