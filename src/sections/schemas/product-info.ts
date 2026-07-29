import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const productInfoSettings: FieldSchema[] = [
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const productInfoBlocks: BlockTypeSchema[] = [
  { type: 'title', label: 'Title', defaultSettings: {}, settingsSchema: [] },
  { type: 'price', label: 'Price', defaultSettings: {}, settingsSchema: [] },
  { type: 'variant-picker', label: 'Variant picker', defaultSettings: {}, settingsSchema: [] },
  { type: 'quantity', label: 'Quantity selector', defaultSettings: {}, settingsSchema: [] },
  { type: 'buy-button', label: 'Buy button', defaultSettings: {}, settingsSchema: [] },
  { type: 'description', label: 'Description', defaultSettings: {}, settingsSchema: [] },
  { type: 'share', label: 'Share', defaultSettings: {}, settingsSchema: [] },
]

export const productInfoDefaults = {
  settings: { color_scheme: 'scheme_1' },
  blocks: [
    { type: 'title', settings: {} },
    { type: 'price', settings: {} },
    { type: 'variant-picker', settings: {} },
    { type: 'quantity', settings: {} },
    { type: 'buy-button', settings: {} },
    { type: 'description', settings: {} },
  ],
}
