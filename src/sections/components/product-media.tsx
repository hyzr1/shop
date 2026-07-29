'use client'
import { usePageContext } from '@/sections/wrappers/context'
import type { Section } from '@/sections/types'

export function ProductMediaSection({ section }: { section: Section }) {
  const { product } = usePageContext()
  if (!product) return null
  return (
    <section
      data-section-id={section.id}
      data-section-type="product-media"
      className="px-6 py-16"
    >
      <div className="mx-auto max-w-2xl">
        {product.media.map((m, i) => (
          <img
            key={i}
            src={m.url}
            alt={m.alt}
            className="mb-3 w-full rounded"
          />
        ))}
      </div>
    </section>
  )
}
