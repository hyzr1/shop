import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { PADDING_OPTIONS, WIDTH_OPTIONS } from '@/sections/lib/layout'

export const ctaBannerSettings: FieldSchema[] = [
  { type: 'text', key: 'heading', label: 'Heading', default: 'Ready to move faster?' },
  { type: 'textarea', key: 'lede', label: 'Lede', default: 'Join 12,000+ teams shipping better work with Pulse. Free for 30 days.', rows: 2 },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_2' },
  { type: 'select', key: 'section_padding', label: 'Section padding', default: 'large', options: PADDING_OPTIONS },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const ctaBannerBlocks: BlockTypeSchema[] = [
  {
    type: 'button',
    label: 'Button',
    defaultSettings: { label: 'Get started free', link: '#', style: 'primary' },
    settingsSchema: [
      { type: 'text', key: 'label', label: 'Label' },
      { type: 'link', key: 'link', label: 'Link' },
      {
        type: 'select', key: 'style', label: 'Style', default: 'primary',
        options: [
          { value: 'primary', label: 'Primary' },
          { value: 'ghost', label: 'Ghost' },
        ],
      },
    ],
  },
]

export const ctaBannerDefaults = {
  settings: {
    heading: 'Ready to move faster?',
    lede: 'Join 12,000+ teams shipping better work with Pulse. Free for 30 days.',
    color_scheme: 'scheme_2',
    section_padding: 'large',
    container_width: 'normal',
  },
  blocks: [
    { type: 'button', settings: { label: 'Get started free', link: '#', style: 'primary' } },
    { type: 'button', settings: { label: 'Talk to sales', link: '#', style: 'ghost' } },
  ],
}
