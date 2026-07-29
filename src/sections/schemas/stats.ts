import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { PADDING_OPTIONS, WIDTH_OPTIONS } from '@/sections/lib/layout'

export const statsSettings: FieldSchema[] = [
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_2' },
  { type: 'select', key: 'section_padding', label: 'Section padding', default: 'large', options: PADDING_OPTIONS },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const statsBlocks: BlockTypeSchema[] = [
  {
    type: 'stat',
    label: 'Stat',
    defaultSettings: { number: '0', label: 'Label' },
    settingsSchema: [
      { type: 'text', key: 'number', label: 'Number' },
      { type: 'text', key: 'label', label: 'Label' },
    ],
    limit: 6,
  },
]

export const statsDefaults = {
  settings: {
    color_scheme: 'scheme_2',
    section_padding: 'large',
    container_width: 'normal',
  },
  blocks: [
    { type: 'stat', settings: { number: '40%', label: 'Faster cycle time' } },
    { type: 'stat', settings: { number: '12k+', label: 'Teams onboarded' } },
    { type: 'stat', settings: { number: '99.99%', label: 'Uptime SLA' } },
    { type: 'stat', settings: { number: '4.9/5', label: 'Average rating' } },
  ],
}
