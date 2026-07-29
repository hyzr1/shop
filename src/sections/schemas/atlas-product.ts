import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasProductSettings: FieldSchema[] = [
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
      { value: 'art', label: 'Abstract tone' },
      { value: 'photo', label: 'Photograph' },
    ],
  },
  {
    type: 'select', key: 'tone', label: 'Tone background', default: 'rust',
    options: [
      { value: 'rust', label: 'Rust' },
      { value: 'tan', label: 'Tan' },
      { value: 'stone', label: 'Stone' },
    ],
  },
  { type: 'checkbox', key: 'show_breadcrumb', label: 'Show breadcrumb', default: true },
  { type: 'text', key: 'breadcrumb', label: 'Breadcrumb', default: '04 / Index / Object' },
  { type: 'color', key: 'background_color', label: 'Background', default: '#211b17' },
]

export const atlasProductBlocks: BlockTypeSchema[] = [
  { type: 'title', label: 'Title', defaultSettings: {}, settingsSchema: [] },
  { type: 'price', label: 'Price', defaultSettings: {}, settingsSchema: [] },
  { type: 'variant-picker', label: 'Variant picker', defaultSettings: {}, settingsSchema: [] },
  { type: 'quantity', label: 'Quantity selector', defaultSettings: {}, settingsSchema: [] },
  { type: 'buy-button', label: 'Buy button', defaultSettings: {}, settingsSchema: [] },
  { type: 'description', label: 'Description', defaultSettings: {}, settingsSchema: [] },
  {
    type: 'shipping-note', label: 'Lead time / shipping note',
    defaultSettings: { text: 'Hand-finished in studio. Allow 14 days for fabrication and inspection.' },
    settingsSchema: [
      { type: 'textarea', key: 'text', label: 'Note text', rows: 2 },
    ],
  },
  { type: 'share', label: 'Provenance', defaultSettings: {}, settingsSchema: [] },
]

export const atlasProductDefaults = {
  settings: {
    layout: 'left-image',
    gallery_style: 'art',
    tone: 'rust',
    show_breadcrumb: true,
    breadcrumb: '04 / Index / Object',
    background_color: '#211b17',
  },
  blocks: [
    { type: 'title', settings: {} },
    { type: 'price', settings: {} },
    { type: 'description', settings: {} },
    { type: 'variant-picker', settings: {} },
    { type: 'quantity', settings: {} },
    { type: 'buy-button', settings: {} },
    { type: 'shipping-note', settings: { text: 'Hand-finished in studio. Allow 14 days for fabrication and inspection.' } },
    { type: 'share', settings: {} },
  ],
}
