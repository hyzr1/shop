import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasMethodSettings: FieldSchema[] = [
  { type: 'header', key: 'header_section', label: 'Header' },
  { type: 'text', key: 'header_label', label: 'Numbered label', default: '02 / Method' },
  { type: 'text', key: 'heading_line1', label: 'Heading line 1', default: 'We start with forces,' },
  { type: 'text', key: 'heading_line2', label: 'Heading line 2', default: 'not finishes.' },
  { type: 'textarea', key: 'lede', label: 'Lede', rows: 3, default: 'Sun, wind, slope, access, memory, and maintenance shape the work before style enters the conversation.' },
  { type: 'header', key: 'colors_section', label: 'Colors' },
  { type: 'color', key: 'accent_color', label: 'Accent (numbers)', default: '#a65e40' },
  { type: 'color', key: 'background_color', label: 'Background', default: '#e8dfd2' },
  { type: 'color', key: 'text_color', label: 'Text color', default: '#171411' },
]

export const atlasMethodBlocks: BlockTypeSchema[] = [
  {
    type: 'method-item',
    label: 'Method item',
    defaultSettings: { number: '01', heading: 'Heading', body: 'Body text describing this step of the method.' },
    settingsSchema: [
      { type: 'text', key: 'number', label: 'Number', default: '01' },
      { type: 'text', key: 'heading', label: 'Heading', default: 'Heading' },
      { type: 'textarea', key: 'body', label: 'Body', rows: 3, default: 'Body text describing this step of the method.' },
    ],
    limit: 8,
  },
]

export const atlasMethodDefaults = {
  settings: {
    header_label: '02 / Method',
    heading_line1: 'We start with forces,',
    heading_line2: 'not finishes.',
    lede: 'Sun, wind, slope, access, memory, and maintenance shape the work before style enters the conversation.',
    accent_color: '#a65e40',
    background_color: '#e8dfd2',
    text_color: '#171411',
  },
  blocks: [
    { type: 'method-item', settings: { number: '01', heading: 'Site readings', body: 'Environmental constraints become design tools.' } },
    { type: 'method-item', settings: { number: '02', heading: 'Material studies', body: 'Local texture, weathering, and thermal behavior guide the palette.' } },
    { type: 'method-item', settings: { number: '03', heading: 'Spatial edits', body: 'Every line earns its place through use, light, and movement.' } },
    { type: 'method-item', settings: { number: '04', heading: 'Long stewardship', body: 'The building is detailed for the decades after opening day.' } },
  ],
}
