import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { PADDING_OPTIONS, WIDTH_OPTIONS } from '@/sections/lib/layout'

export const logoListSettings: FieldSchema[] = [
  { type: 'text', key: 'heading_text', label: 'Heading text', default: 'Trusted by fast-moving teams at' },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
  { type: 'select', key: 'section_padding', label: 'Section padding', default: 'small', options: PADDING_OPTIONS },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const logoListBlocks: BlockTypeSchema[] = [
  {
    type: 'logo-name',
    label: 'Logo (text)',
    defaultSettings: { name: 'Company' },
    settingsSchema: [
      { type: 'text', key: 'name', label: 'Name' },
    ],
  },
]

export const logoListDefaults = {
  settings: {
    heading_text: 'Trusted by fast-moving teams at',
    color_scheme: 'scheme_1',
    section_padding: 'small',
    container_width: 'normal',
  },
  blocks: [
    { type: 'logo-name', settings: { name: 'Northwind' } },
    { type: 'logo-name', settings: { name: 'Vela' } },
    { type: 'logo-name', settings: { name: 'Loop' } },
    { type: 'logo-name', settings: { name: 'Cartwheel' } },
    { type: 'logo-name', settings: { name: 'Mast' } },
    { type: 'logo-name', settings: { name: 'Beacon' } },
  ],
}
