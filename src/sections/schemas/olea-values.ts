import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaValuesSettings: FieldSchema[] = [
  { type: 'color', key: 'background_color', label: 'Background', default: '#f5f0e6' },
]

export const oleaValuesBlocks: BlockTypeSchema[] = [
  {
    type: 'value-item',
    label: 'Value item',
    defaultSettings: { number: '01', heading: 'Potent by nature', body: 'Clinically considered actives paired with whole-plant extracts.' },
    settingsSchema: [
      { type: 'text', key: 'number', label: 'Number', default: '01' },
      { type: 'text', key: 'heading', label: 'Heading', default: 'Potent by nature' },
      { type: 'textarea', key: 'body', label: 'Body', rows: 2 },
    ],
    limit: 6,
  },
]

export const oleaValuesDefaults = {
  settings: {
    background_color: '#f5f0e6',
  },
  blocks: [
    { type: 'value-item', settings: { number: '01', heading: 'Potent by nature', body: 'Clinically considered actives paired with whole-plant extracts.' } },
    { type: 'value-item', settings: { number: '02', heading: 'Made in small batches', body: 'Fresh formulas, produced close to the ingredients that inspire them.' } },
    { type: 'value-item', settings: { number: '03', heading: 'Designed to return', body: 'Refillable glass, recyclable aluminum, and nothing ornamental.' } },
  ],
}
