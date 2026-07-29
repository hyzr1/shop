import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaAnnouncementSettings: FieldSchema[] = [
  { type: 'text', key: 'text', label: 'Announcement text', default: 'Complimentary ritual pouch with orders over $90' },
  { type: 'link', key: 'link', label: 'Link (optional)' },
  { type: 'checkbox', key: 'show_arrow', label: 'Show arrow', default: true },
  { type: 'color', key: 'background_color', label: 'Background', default: '#20251d' },
  { type: 'color', key: 'text_color', label: 'Text color', default: '#eae6da' },
]

export const oleaAnnouncementBlocks: BlockTypeSchema[] = []

export const oleaAnnouncementDefaults = {
  settings: {
    text: 'Complimentary ritual pouch with orders over $90',
    link: '',
    show_arrow: true,
    background_color: '#20251d',
    text_color: '#eae6da',
  },
  blocks: [],
}
