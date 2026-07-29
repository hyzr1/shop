'use client'
import { getCollection } from '@/lib/stub-commerce'
import type { Section } from '@/sections/types'

export function FeaturedCollectionSection({ section }: { section: Section }) {
  const handle = (section.settings.collection_handle as string) || undefined
  const c = getCollection(handle)
  const max = (section.settings.product_count as number) ?? 4
  return (
    <section
      data-section-id={section.id}
      data-section-type="featured-collection"
      className="px-6 py-16"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-semibold">{c.title}</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {c.products.slice(0, max).map((p) => (
            <a key={p.id} href={`/products/${p.handle}`}>
              <img
                src={p.media[0]?.url}
                alt=""
                className="aspect-square w-full rounded object-cover"
              />
              <p className="mt-2 text-sm">{p.title}</p>
              <p className="text-sm text-neutral-500">${p.price.toFixed(2)}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
