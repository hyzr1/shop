import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

const TONE_OPTIONS = [
  { value: 'warm', label: 'Warm (lavender)' },
  { value: 'cool', label: 'Cool (sky)' },
  { value: 'neutral', label: 'Neutral (amber)' },
  { value: 'amber', label: 'Amber (meadow)' },
  { value: 'rose', label: 'Rose (blush)' },
  { value: 'olive', label: 'Olive (orchid)' },
]

export const auroraFeaturedCollectionSettings: FieldSchema[] = [
  { type: 'header', key: 'content_section', label: 'Header' },
  { type: 'text', key: 'eyebrow_text', label: 'Eyebrow', default: 'Featured' },
  { type: 'text', key: 'heading_line1', label: 'Heading line 1', default: 'Pieces worth' },
  { type: 'text', key: 'heading_italic', label: 'Italic word', default: 'keeping' },
  { type: 'text', key: 'heading_after', label: 'After italic', default: '.' },
  { type: 'textarea', key: 'lede', label: 'Lede paragraph', default: 'A tightly edited selection — each piece designed to earn its place in your wardrobe.', rows: 3 },
  { type: 'header', key: 'layout_section', label: 'Layout' },
  { type: 'range', key: 'columns', label: 'Columns', default: 3, min: 2, max: 4, step: 1 },
  { type: 'header', key: 'cta_section', label: 'Bottom CTA' },
  { type: 'text', key: 'cta_label', label: 'CTA label', default: 'View all products' },
  { type: 'link', key: 'cta_url', label: 'CTA URL', default: '#' },
]

export const auroraFeaturedCollectionBlocks: BlockTypeSchema[] = [
  {
    type: 'product-card',
    label: 'Product card',
    defaultSettings: { name: 'Product name', category: 'Category', price: '$128', was_price: '', tone: 'warm', tag: '' },
    settingsSchema: [
      { type: 'text', key: 'name', label: 'Product name', default: 'Product name' },
      { type: 'text', key: 'category', label: 'Category', default: 'Category' },
      { type: 'text', key: 'price', label: 'Price', default: '$128' },
      { type: 'text', key: 'was_price', label: 'Was price (optional, strikethrough)', default: '' },
      { type: 'select', key: 'tone', label: 'Tone (gradient)', default: 'warm', options: TONE_OPTIONS },
      { type: 'text', key: 'tag', label: 'Tag (e.g. New / Sale)', default: '' },
    ],
    limit: 12,
  },
]

export const auroraFeaturedCollectionDefaults = {
  settings: {
    eyebrow_text: 'Featured',
    heading_line1: 'Pieces worth',
    heading_italic: 'keeping',
    heading_after: '.',
    lede: 'A tightly edited selection — each piece designed to earn its place in your wardrobe.',
    columns: 3,
    cta_label: 'View all products',
    cta_url: '#',
  },
  blocks: [
    { type: 'product-card', settings: { name: 'Cloud Knit Sweater', category: 'Knitwear', price: '$148', was_price: '', tone: 'warm', tag: 'New' } },
    { type: 'product-card', settings: { name: 'Ember Wool Coat', category: 'Outerwear', price: '$320', was_price: '$380', tone: 'neutral', tag: 'Sale' } },
    { type: 'product-card', settings: { name: 'Tide Oxford Shirt', category: 'Shirting', price: '$96', was_price: '', tone: 'cool', tag: '' } },
    { type: 'product-card', settings: { name: 'Meadow Linen Trouser', category: 'Trousers', price: '$124', was_price: '', tone: 'amber', tag: 'New' } },
    { type: 'product-card', settings: { name: 'Orchid Silk Scarf', category: 'Accessories', price: '$64', was_price: '', tone: 'olive', tag: '' } },
    { type: 'product-card', settings: { name: 'Rose Cashmere Beanie', category: 'Accessories', price: '$58', was_price: '', tone: 'rose', tag: '' } },
  ],
}
