import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasProjectGridSettings: FieldSchema[] = [
  { type: 'header', key: 'header_section', label: 'Header' },
  { type: 'text', key: 'header_label', label: 'Numbered label', default: '01 / Selected work' },
  { type: 'text', key: 'heading_line1', label: 'Heading line 1', default: 'Precise forms,' },
  { type: 'text', key: 'heading_line2', label: 'Heading line 2', default: 'quiet materials.' },
]

export const atlasProjectGridBlocks: BlockTypeSchema[] = [
  {
    type: 'project',
    label: 'Project',
    defaultSettings: { name: 'Project name', place: 'Location', type_label: 'Residential / 2026', tone: 'rust' },
    settingsSchema: [
      { type: 'text', key: 'name', label: 'Project name', default: 'Project name' },
      { type: 'text', key: 'place', label: 'Place', default: 'Location' },
      { type: 'text', key: 'type_label', label: 'Type label', default: 'Residential / 2026' },
      {
        type: 'select', key: 'tone', label: 'Tone (panel color)', default: 'rust',
        options: [
          { value: 'rust', label: 'Rust' },
          { value: 'tan', label: 'Tan' },
          { value: 'stone', label: 'Stone (dark)' },
        ],
      },
    ],
    limit: 6,
  },
]

export const atlasProjectGridDefaults = {
  settings: {
    header_label: '01 / Selected work',
    heading_line1: 'Precise forms,',
    heading_line2: 'quiet materials.',
  },
  blocks: [
    { type: 'project', settings: { name: 'Mesa House', place: 'Joshua Tree, CA', type_label: 'Residential / 2026', tone: 'rust' } },
    { type: 'project', settings: { name: 'Courtyard Works', place: 'Marfa, TX', type_label: 'Hospitality / 2025', tone: 'tan' } },
    { type: 'project', settings: { name: 'Low Archive', place: 'Taos, NM', type_label: 'Cultural / 2024', tone: 'stone' } },
  ],
}
