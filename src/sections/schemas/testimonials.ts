import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { ICON_OPTIONS } from './icon-features-grid'
import { PADDING_OPTIONS, WIDTH_OPTIONS } from '@/sections/lib/layout'

export const testimonialsSettings: FieldSchema[] = [
  { type: 'text', key: 'eyebrow_text', label: 'Eyebrow', default: 'Loved by teams' },
  { type: 'select', key: 'eyebrow_icon', label: 'Eyebrow icon', default: 'zap', options: ICON_OPTIONS },
  { type: 'text', key: 'heading', label: 'Heading', default: 'Don’t take our word for it.' },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
  { type: 'select', key: 'section_padding', label: 'Section padding', default: 'large', options: PADDING_OPTIONS },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const testimonialsBlocks: BlockTypeSchema[] = [
  {
    type: 'quote',
    label: 'Quote',
    defaultSettings: { text: 'Add a customer quote here.', name: 'Customer name', role: 'Role, Company' },
    settingsSchema: [
      { type: 'textarea', key: 'text', label: 'Quote', rows: 3 },
      { type: 'text', key: 'name', label: 'Name' },
      { type: 'text', key: 'role', label: 'Role / company' },
    ],
    limit: 12,
  },
]

export const testimonialsDefaults = {
  settings: {
    eyebrow_text: 'Loved by teams',
    eyebrow_icon: 'zap',
    heading: 'Don’t take our word for it.',
    color_scheme: 'scheme_1',
    section_padding: 'large',
    container_width: 'normal',
  },
  blocks: [
    { type: 'quote', settings: { text: 'Pulse replaced four tools for us. Our cycle time dropped 40% in the first month.', name: 'Lena Park', role: 'VP Eng, Northwind' } },
    { type: 'quote', settings: { text: 'The cleanest product analytics I’ve used. Onboarding took ten minutes.', name: 'Marcus Hale', role: 'Founder, Vela' } },
    { type: 'quote', settings: { text: 'Finally a platform our whole company actually wants to use.', name: 'Priya Raman', role: 'COO, Loop' } },
    { type: 'quote', settings: { text: 'We shipped our roadmap a quarter early. Pulse paid for itself instantly.', name: 'Tom Becker', role: 'PM, Cartwheel' } },
    { type: 'quote', settings: { text: 'Support is unreal, and the API is a joy. Rare combination.', name: 'Sofia Ruiz', role: 'CTO, Mast' } },
    { type: 'quote', settings: { text: 'The dashboards alone changed how our leadership makes decisions.', name: 'Dan Whitfield', role: 'Head of Ops, Beacon' } },
  ],
}
