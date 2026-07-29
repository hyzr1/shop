import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const featuredCollectionSettings: FieldSchema[] = [
  { type: 'text', key: 'heading', label: 'Heading', default: 'Featured collection' },
  {
    type: 'text',
    key: 'collection_handle',
    label: 'Collection handle',
    placeholder: 'apparel',
    help: 'Demo handles: apparel, accessories',
  },
  {
    type: 'number',
    key: 'product_count',
    label: 'Products to show',
    default: 4,
    min: 1,
    max: 12,
  },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const featuredCollectionBlocks: BlockTypeSchema[] = []

export const featuredCollectionDefaults = {
  settings: {
    heading: 'Featured collection',
    collection_handle: 'apparel',
    product_count: 4,
    color_scheme: 'scheme_1',
  },
  blocks: [],
}
