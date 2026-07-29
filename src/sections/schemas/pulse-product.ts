import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { WIDTH_OPTIONS } from '@/sections/lib/layout'

export const pulseProductSettings: FieldSchema[] = [
  {
    type: 'select', key: 'layout', label: 'Layout', default: 'left-image',
    options: [
      { value: 'left-image', label: 'Image left, info right' },
      { value: 'right-image', label: 'Info left, image right' },
    ],
  },
  {
    type: 'select', key: 'gallery_style', label: 'Gallery style', default: 'single',
    options: [
      { value: 'single', label: 'Single image' },
      { value: 'grid', label: 'Grid (2×2)' },
      { value: 'carousel', label: 'Carousel with thumbnails' },
    ],
  },
  { type: 'checkbox', key: 'show_breadcrumb', label: 'Show breadcrumb', default: true },
  { type: 'text', key: 'breadcrumb', label: 'Breadcrumb (separated by /)', default: 'Shop / Apparel' },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const pulseProductBlocks: BlockTypeSchema[] = [
  { type: 'title', label: 'Title', defaultSettings: {}, settingsSchema: [] },
  { type: 'price', label: 'Price', defaultSettings: {}, settingsSchema: [] },
  { type: 'variant-picker', label: 'Variant picker', defaultSettings: {}, settingsSchema: [] },
  { type: 'quantity', label: 'Quantity selector', defaultSettings: {}, settingsSchema: [] },
  { type: 'buy-button', label: 'Buy button', defaultSettings: {}, settingsSchema: [] },
  { type: 'description', label: 'Description', defaultSettings: {}, settingsSchema: [] },
  {
    type: 'shipping-note', label: 'Shipping note',
    defaultSettings: { text: 'Free shipping on orders over $50. 30-day returns.' },
    settingsSchema: [
      { type: 'textarea', key: 'text', label: 'Note text', rows: 2 },
    ],
  },
  { type: 'share', label: 'Share / trust', defaultSettings: {}, settingsSchema: [] },
]

export const pulseProductDefaults = {
  settings: {
    layout: 'left-image',
    gallery_style: 'single',
    show_breadcrumb: true,
    breadcrumb: 'Shop / Apparel',
    color_scheme: 'scheme_1',
    container_width: 'normal',
  },
  blocks: [
    { type: 'title', settings: {} },
    { type: 'price', settings: {} },
    { type: 'description', settings: {} },
    { type: 'variant-picker', settings: {} },
    { type: 'quantity', settings: {} },
    { type: 'buy-button', settings: {} },
    { type: 'shipping-note', settings: { text: 'Free shipping on orders over $50. 30-day returns.' } },
    { type: 'share', settings: {} },
  ],
}
