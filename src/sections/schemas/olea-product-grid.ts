import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaProductGridSettings: FieldSchema[] = [
  { type: 'header', key: 'head_section', label: 'Heading' },
  { type: 'text', key: 'eyebrow', label: 'Eyebrow', default: 'The essentials' },
  { type: 'text', key: 'heading', label: 'Heading', default: 'A ritual for every day.' },
  { type: 'text', key: 'link_label', label: 'Link label', default: 'Shop all formulas' },
  { type: 'link', key: 'link_url', label: 'Link URL', default: '#ritual' },
  { type: 'header', key: 'brand_section', label: 'Bottle brand' },
  { type: 'text', key: 'brand_label', label: 'Brand text on bottles', default: 'OLÉA' },
  { type: 'header', key: 'colors_section', label: 'Colors' },
  { type: 'color', key: 'background_color', label: 'Background', default: '#f4efe5' },
]

export const oleaProductGridBlocks: BlockTypeSchema[] = [
  {
    type: 'product-card',
    label: 'Product card',
    defaultSettings: { name: 'Product name', type: 'Renew + restore', price: '$74', tone: 'clear' },
    settingsSchema: [
      { type: 'text', key: 'name', label: 'Product name', default: 'Product name' },
      { type: 'text', key: 'type', label: 'Type / subtitle', default: 'Renew + restore' },
      { type: 'text', key: 'price', label: 'Price', default: '$74' },
      {
        type: 'select', key: 'tone', label: 'Tone (bottle style)', default: 'clear',
        options: [
          { value: 'clear', label: 'Clear (cream)' },
          { value: 'amber', label: 'Amber (warm)' },
          { value: 'ivory', label: 'Ivory (soft)' },
        ],
      },
    ],
    limit: 6,
  },
]

export const oleaProductGridDefaults = {
  settings: {
    eyebrow: 'The essentials',
    heading: 'A ritual for every day.',
    link_label: 'Shop all formulas',
    link_url: '#ritual',
    brand_label: 'OLÉA',
    background_color: '#f4efe5',
  },
  blocks: [
    { type: 'product-card', settings: { name: 'Dawn Recovery Serum', type: 'Renew + restore', price: '$74', tone: 'clear' } },
    { type: 'product-card', settings: { name: 'Olive Barrier Cream', type: 'Nourish + protect', price: '$58', tone: 'amber' } },
    { type: 'product-card', settings: { name: 'Fig Enzyme Veil', type: 'Refine + soften', price: '$46', tone: 'ivory' } },
  ],
}
