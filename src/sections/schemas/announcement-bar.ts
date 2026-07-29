import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const announcementBarSettings: FieldSchema[] = [
  { type: 'number', key: 'rotation_speed', label: 'Rotation (seconds)', default: 5, min: 2, max: 30 },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_2' },
  { type: 'checkbox', key: 'dismissible', label: 'Dismissible', default: false },
]

export const announcementBarBlocks: BlockTypeSchema[] = [
  {
    type: 'announcement',
    label: 'Announcement',
    defaultSettings: { text: 'Free shipping over $50', link: '' },
    settingsSchema: [
      { type: 'text', key: 'text', label: 'Text' },
      { type: 'link', key: 'link', label: 'Link (optional)' },
    ],
  },
]

export const announcementBarDefaults = {
  settings: { rotation_speed: 5, color_scheme: 'scheme_2', dismissible: false },
  blocks: [{ type: 'announcement', settings: { text: 'Welcome to our store', link: '' } }],
}
