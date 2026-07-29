import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const multicolumnSettings: FieldSchema[] = [
  { type: 'text', key: 'heading', label: 'Heading', default: 'Multicolumn' },
  { type: 'number', key: 'columns_per_row', label: 'Columns per row', default: 3, min: 1, max: 6 },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
]

export const multicolumnBlocks: BlockTypeSchema[] = [
  {
    type: 'column',
    label: 'Column',
    defaultSettings: {
      image: null,
      heading: 'Column',
      body: 'Pair text with an image to focus on your chosen product.',
      link: '',
    },
    settingsSchema: [
      { type: 'image', key: 'image', label: 'Image' },
      { type: 'text', key: 'heading', label: 'Heading' },
      { type: 'textarea', key: 'body', label: 'Body', rows: 3 },
      { type: 'link', key: 'link', label: 'Link' },
    ],
  },
]

export const multicolumnDefaults = {
  settings: { heading: 'Multicolumn', columns_per_row: 3, color_scheme: 'scheme_1' },
  blocks: [
    { type: 'column', settings: { heading: 'Column 1', body: 'Pair text with an image to focus on your chosen product.', link: '' } },
    { type: 'column', settings: { heading: 'Column 2', body: 'Pair text with an image to focus on your chosen product.', link: '' } },
    { type: 'column', settings: { heading: 'Column 3', body: 'Pair text with an image to focus on your chosen product.', link: '' } },
  ],
}
