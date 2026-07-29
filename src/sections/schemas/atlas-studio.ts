import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasStudioSettings: FieldSchema[] = [
  { type: 'header', key: 'card_section', label: 'Card' },
  {
    type: 'select', key: 'icon', label: 'Icon', default: 'grid',
    options: [
      { value: 'grid', label: 'Grid' },
      { value: 'compass', label: 'Compass' },
      { value: 'circle', label: 'Circle' },
      { value: 'move', label: 'Move diagonal' },
    ],
  },
  { type: 'text', key: 'heading_line1', label: 'Heading line 1', default: 'Small studio.' },
  { type: 'text', key: 'heading_line2', label: 'Heading line 2', default: 'Long attention.' },
  { type: 'textarea', key: 'body', label: 'Body', rows: 3, default: 'We take on a limited number of projects each year so senior designers stay close to the work from first walk-through to final detail.' },
  { type: 'header', key: 'colors_section', label: 'Colors' },
  { type: 'color', key: 'icon_color', label: 'Icon color', default: '#a65e40' },
  { type: 'color', key: 'background_color', label: 'Background (ink)', default: '#171411' },
  { type: 'color', key: 'text_color', label: 'Text color (paper)', default: '#e8dfd2' },
]

export const atlasStudioBlocks: BlockTypeSchema[] = [
  {
    type: 'stat-text',
    label: 'Stat',
    defaultSettings: { text: 'Stat text' },
    settingsSchema: [
      { type: 'text', key: 'text', label: 'Text', default: 'Stat text' },
    ],
    limit: 8,
  },
]

export const atlasStudioDefaults = {
  settings: {
    icon: 'grid',
    heading_line1: 'Small studio.',
    heading_line2: 'Long attention.',
    body: 'We take on a limited number of projects each year so senior designers stay close to the work from first walk-through to final detail.',
    icon_color: '#a65e40',
    background_color: '#171411',
    text_color: '#e8dfd2',
  },
  blocks: [
    { type: 'stat-text', settings: { text: '18 built projects' } },
    { type: 'stat-text', settings: { text: '6 climate zones' } },
    { type: 'stat-text', settings: { text: '4 active sites' } },
    { type: 'stat-text', settings: { text: '0 generic details' } },
  ],
}
