import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const featuredProductSettings: FieldSchema[] = [
  { type: 'text', key: 'heading', label: 'Heading', default: 'Featured product' },
  {
    type: 'text',
    key: 'product_handle',
    label: 'Product handle',
    placeholder: 'classic-tee',
    help: 'Demo handles: classic-tee, denim-jacket, wool-beanie, leather-belt, canvas-tote',
  },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const featuredProductBlocks: BlockTypeSchema[] = []

export const featuredProductDefaults = {
  settings: {
    heading: 'Featured product',
    product_handle: 'classic-tee',
    color_scheme: 'scheme_1',
  },
  blocks: [],
}
