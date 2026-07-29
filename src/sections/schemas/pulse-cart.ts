import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { WIDTH_OPTIONS } from '@/sections/lib/layout'

export const pulseCartSettings: FieldSchema[] = [
  { type: 'text', key: 'heading', label: 'Heading', default: 'Your cart' },
  { type: 'text', key: 'continue_label', label: 'Continue link label', default: 'Continue shopping' },
  { type: 'link', key: 'continue_url', label: 'Continue link URL', default: '/collections/all' },
  { type: 'text', key: 'checkout_label', label: 'Checkout button label', default: 'Checkout securely' },
  { type: 'checkbox', key: 'show_promo', label: 'Show promo code input', default: true },
  { type: 'text', key: 'shipping_note', label: 'Shipping note', default: 'Shipping calculated at checkout' },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const pulseCartBlocks: BlockTypeSchema[] = []

export const pulseCartDefaults = {
  settings: {
    heading: 'Your cart',
    continue_label: 'Continue shopping',
    continue_url: '/collections/all',
    checkout_label: 'Checkout securely',
    show_promo: true,
    shipping_note: 'Shipping calculated at checkout',
    color_scheme: 'scheme_1',
    container_width: 'normal',
  },
  blocks: [],
}
