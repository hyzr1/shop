import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaProductSettings: FieldSchema[] = [
  {
    type: 'select', key: 'layout', label: 'Layout', default: 'left-image',
    options: [
      { value: 'left-image', label: 'Image left, info right' },
      { value: 'right-image', label: 'Info left, image right' },
    ],
  },
  {
    type: 'select', key: 'gallery_style', label: 'Gallery style', default: 'art',
    options: [
      { value: 'art', label: 'Bottle illustration' },
      { value: 'photo', label: 'Photograph' },
    ],
  },
  {
    type: 'select', key: 'tone', label: 'Bottle tone', default: 'clear',
    options: [
      { value: 'clear', label: 'Clear glass' },
      { value: 'amber', label: 'Amber' },
      { value: 'ivory', label: 'Ivory' },
    ],
  },
  { type: 'text', key: 'brand_label', label: 'Brand label on bottle', default: 'OLÉA' },
  { type: 'checkbox', key: 'show_breadcrumb', label: 'Show breadcrumb', default: true },
  { type: 'text', key: 'breadcrumb', label: 'Breadcrumb', default: 'Formulas / Serum' },
  { type: 'color', key: 'background_color', label: 'Background', default: '#f4efe5' },
  { type: 'color', key: 'italic_color', label: 'Italic accent color', default: '#695036' },
]

export const oleaProductBlocks: BlockTypeSchema[] = [
  { type: 'title', label: 'Title', defaultSettings: {}, settingsSchema: [] },
  { type: 'price', label: 'Price', defaultSettings: {}, settingsSchema: [] },
  { type: 'variant-picker', label: 'Variant picker', defaultSettings: {}, settingsSchema: [] },
  { type: 'quantity', label: 'Quantity selector', defaultSettings: {}, settingsSchema: [] },
  { type: 'buy-button', label: 'Buy button', defaultSettings: {}, settingsSchema: [] },
  { type: 'description', label: 'Description', defaultSettings: {}, settingsSchema: [] },
  {
    type: 'shipping-note', label: 'Care note',
    defaultSettings: { text: 'Complimentary ritual pouch on orders over $90. Refillable glass.' },
    settingsSchema: [
      { type: 'textarea', key: 'text', label: 'Note text', rows: 2 },
    ],
  },
  { type: 'share', label: 'Share', defaultSettings: {}, settingsSchema: [] },
]

export const oleaProductDefaults = {
  settings: {
    layout: 'left-image',
    gallery_style: 'art',
    tone: 'clear',
    brand_label: 'OLÉA',
    show_breadcrumb: true,
    breadcrumb: 'Formulas / Serum',
    background_color: '#f4efe5',
    italic_color: '#695036',
  },
  blocks: [
    { type: 'title', settings: {} },
    { type: 'price', settings: {} },
    { type: 'description', settings: {} },
    { type: 'variant-picker', settings: {} },
    { type: 'quantity', settings: {} },
    { type: 'buy-button', settings: {} },
    { type: 'shipping-note', settings: { text: 'Complimentary ritual pouch on orders over $90. Refillable glass.' } },
    { type: 'share', settings: {} },
  ],
}
