import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const auroraMarqueeSettings: FieldSchema[] = [
  { type: 'header', key: 'content_section', label: 'Content' },
  { type: 'textarea', key: 'items_text', label: 'Items (one per line)', default: 'Considered design\nNatural fibers\nMade to last\nCarbon neutral\nHonest craft', rows: 6 },
  {
    type: 'select', key: 'icon', label: 'Separator icon', default: 'asterisk',
    options: [
      { value: 'asterisk', label: 'Asterisk' },
      { value: 'star', label: 'Star' },
      { value: 'plus', label: 'Plus' },
      { value: 'circle', label: 'Circle (dot)' },
    ],
  },
  { type: 'header', key: 'colors_section', label: 'Colors' },
  { type: 'color', key: 'background_color', label: 'Background color', default: '#efece3' },
  { type: 'color', key: 'text_color', label: 'Text color', default: '#2a2826' },
  { type: 'color', key: 'icon_color', label: 'Icon color', default: '#7c5cff' },
]

export const auroraMarqueeBlocks: BlockTypeSchema[] = []

export const auroraMarqueeDefaults = {
  settings: {
    items_text: 'Considered design\nNatural fibers\nMade to last\nCarbon neutral\nHonest craft',
    icon: 'asterisk',
    background_color: '#efece3',
    text_color: '#2a2826',
    icon_color: '#7c5cff',
  },
  blocks: [],
}
