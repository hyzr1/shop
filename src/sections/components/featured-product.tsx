'use client'
import { getProduct } from '@/lib/stub-commerce'
import type { Section } from '@/sections/types'

export function FeaturedProductSection({ section }: { section: Section }) {
  const handle = (section.settings.product_handle as string) || undefined
  const product = getProduct(handle)
  return (
    <section
      data-section-id={section.id}
      data-section-type="featured-product"
      className="px-6 py-16"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <img
          src={product.media[0]?.url}
          alt=""
          className="aspect-square w-full rounded object-cover"
        />
        <div>
          <h2 className="text-3xl font-semibold">{product.title}</h2>
          <p className="mt-2 text-xl">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-base text-neutral-600">{product.description}</p>
          <a
            href={`/products/${product.handle}`}
            className="mt-6 inline-block rounded bg-neutral-900 px-5 py-2 text-sm text-white"
          >
            View
          </a>
        </div>
      </div>
    </section>
  )
}
