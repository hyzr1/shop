import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const imageWithTextSettings: FieldSchema[] = [
  { type: 'image', key: 'image', label: 'Image' },
  {
    type: 'select', key: 'image_position', label: 'Image position', default: 'left',
    options: [
      { value: 'left', label: 'Left' },
      { value: 'right', label: 'Right' },
    ],
  },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const imageWithTextBlocks: BlockTypeSchema[] = [
  {
    type: 'heading', label: 'Heading',
    defaultSettings: { text: 'Image with text' },
    settingsSchema: [{ type: 'text', key: 'text', label: 'Text' }],
  },
  {
    type: 'text', label: 'Text',
    defaultSettings: { body: '' },
    settingsSchema: [{ type: 'textarea', key: 'body', label: 'Body', rows: 4 }],
  },
  {
    type: 'button', label: 'Button',
    defaultSettings: { label: 'Learn more', link: '#' },
    settingsSchema: [
      { type: 'text', key: 'label', label: 'Label' },
      { type: 'link', key: 'link', label: 'Link' },
    ],
  },
]

export const imageWithTextDefaults = {
  settings: { image_position: 'left', color_scheme: 'scheme_1' },
  blocks: [
    { type: 'heading', settings: { text: 'Image with text' } },
    { type: 'text', settings: { body: 'Pair text with an image to focus on your chosen product, collection, or blog post.' } },
    { type: 'button', settings: { label: 'Learn more', link: '#' } },
  ],
}
