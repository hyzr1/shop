import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasSectionHeaderSettings: FieldSchema[] = [
  { type: 'header', key: 'content_section', label: 'Content' },
  { type: 'text', key: 'numbered_label', label: 'Numbered label', default: '01 / Selected work' },
  { type: 'text', key: 'heading_line1', label: 'Heading line 1', default: 'Precise forms,' },
  { type: 'text', key: 'heading_line2', label: 'Heading line 2', default: 'quiet materials.' },
  {
    type: 'select', key: 'align', label: 'Alignment', default: 'left',
    options: [
      { value: 'left', label: 'Left (split)' },
      { value: 'center', label: 'Center' },
    ],
  },
  { type: 'header', key: 'layout_section', label: 'Layout' },
  {
    type: 'select', key: 'color_scheme', label: 'Color scheme', default: 'scheme_2',
    options: [
      { value: 'scheme_1', label: 'Cream (light)' },
      { value: 'scheme_2', label: 'Dark + cream' },
    ],
  },
  {
    type: 'select', key: 'container_width', label: 'Container width', default: 'normal',
    options: [
      { value: 'narrow', label: 'Narrow' },
      { value: 'normal', label: 'Normal' },
      { value: 'wide', label: 'Wide' },
    ],
  },
]

export const atlasSectionHeaderBlocks: BlockTypeSchema[] = []

export const atlasSectionHeaderDefaults = {
  settings: {
    numbered_label: '01 / Selected work',
    heading_line1: 'Precise forms,',
    heading_line2: 'quiet materials.',
    align: 'left',
    color_scheme: 'scheme_2',
    container_width: 'normal',
  },
  blocks: [],
}
