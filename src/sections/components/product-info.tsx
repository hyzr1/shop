'use client'
import { useState } from 'react'
import type { Section } from '@/sections/types'
import { usePageContext } from '@/sections/wrappers/context'

export function ProductInfoSection({ section }: { section: Section }) {
  const { product } = usePageContext()
  const [variantId, setVariantId] = useState<string | undefined>(
    product?.variants[0]?.id
  )
  const [qty, setQty] = useState(1)
  if (!product) return null
  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0]

  return (
    <section
      data-section-id={section.id}
      data-section-type="product-info"
      className="px-6 py-16"
    >
      <div className="mx-auto max-w-2xl space-y-5">
        {section.blocks.map((b) => {
          if (b.type === 'title')
            return (
              <h1
                key={b.id}
                className="text-3xl font-semibold tracking-tight"
              >
                {product.title}
              </h1>
            )
          if (b.type === 'price')
            return (
              <p key={b.id} className="text-xl">
                ${variant.price.toFixed(2)}
              </p>
            )
          if (b.type === 'variant-picker')
            return (
              <div key={b.id}>
                <p className="mb-2 text-xs font-medium uppercase">Size</p>
                <div className="flex gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      disabled={!v.available}
                      onClick={() => setVariantId(v.id)}
                      className={`rounded border px-3 py-1.5 text-sm ${
                        variantId === v.id
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-300'
                      } ${!v.available ? 'opacity-30' : ''}`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )
          if (b.type === 'quantity')
            return (
              <div key={b.id} className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-8 w-8 rounded border"
                >
                  -
                </button>
                <span className="w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="h-8 w-8 rounded border"
                >
                  +
                </button>
              </div>
            )
          if (b.type === 'buy-button')
            return (
              <button
                key={b.id}
                className="w-full rounded bg-neutral-900 py-3 text-sm font-medium text-white"
              >
                Add to cart
              </button>
            )
          if (b.type === 'description')
            return (
              <p key={b.id} className="text-sm text-neutral-600">
                {product.description}
              </p>
            )
          if (b.type === 'share')
            return (
              <p key={b.id} className="text-xs text-neutral-400">
                Share this product
              </p>
            )
          return null
        })}
      </div>
    </section>
  )
}
