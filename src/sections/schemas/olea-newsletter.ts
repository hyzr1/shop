import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaNewsletterSettings: FieldSchema[] = [
  {
    type: 'select', key: 'icon', label: 'Icon', default: 'sparkles',
    options: [
      { value: 'sparkles', label: 'Sparkles' },
      { value: 'leaf', label: 'Leaf' },
    ],
  },
  { type: 'text', key: 'eyebrow', label: 'Eyebrow', default: 'Notes from the grove' },
  { type: 'text', key: 'heading', label: 'Heading', default: 'Seasonal rituals, quietly delivered.' },
  { type: 'text', key: 'placeholder', label: 'Input placeholder', default: 'Email address' },
  { type: 'text', key: 'button_label', label: 'Button label', default: 'Join the journal' },
  { type: 'header', key: 'colors_section', label: 'Colors' },
  { type: 'color', key: 'background_color', label: 'Background', default: '#3e2d24' },
  { type: 'color', key: 'text_color', label: 'Text color', default: '#f0e8dc' },
  { type: 'color', key: 'icon_color', label: 'Icon color', default: '#c7a98d' },
  { type: 'color', key: 'eyebrow_color', label: 'Eyebrow color', default: '#c7b6a4' },
]

export const oleaNewsletterBlocks: BlockTypeSchema[] = []

export const oleaNewsletterDefaults = {
  settings: {
    icon: 'sparkles',
    eyebrow: 'Notes from the grove',
    heading: 'Seasonal rituals, quietly delivered.',
    placeholder: 'Email address',
    button_label: 'Join the journal',
    background_color: '#3e2d24',
    text_color: '#f0e8dc',
    icon_color: '#c7a98d',
    eyebrow_color: '#c7b6a4',
  },
  blocks: [],
}
