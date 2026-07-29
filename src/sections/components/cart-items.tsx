'use client'
import { usePageContext } from '@/sections/wrappers/context'
import type { Section } from '@/sections/types'

export function CartItemsSection({ section }: { section: Section }) {
  const { cart } = usePageContext()
  if (!cart) return null
  return (
    <section
      data-section-id={section.id}
      data-section-type="cart-items"
      className="px-6 py-16"
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-semibold">Your cart</h1>
        <ul className="divide-y">
          {cart.lines.map((l) => (
            <li key={l.id} className="flex items-center gap-4 py-4">
              <img
                src={l.product.media[0]?.url}
                alt=""
                className="h-20 w-20 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{l.product.title}</p>
                <p className="text-sm text-neutral-500">Qty {l.quantity}</p>
              </div>
              <p>${(l.product.price * l.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-right text-lg font-semibold">
          Total: ${cart.total.toFixed(2)}
        </p>
        <button className="mt-4 w-full rounded bg-neutral-900 py-3 text-sm font-medium text-white">
          Checkout
        </button>
      </div>
    </section>
  )
}
