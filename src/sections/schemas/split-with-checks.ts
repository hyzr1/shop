import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { ICON_OPTIONS } from './icon-features-grid'
import { PADDING_OPTIONS, WIDTH_OPTIONS } from '@/sections/lib/layout'

export const splitWithChecksSettings: FieldSchema[] = [
  { type: 'text', key: 'eyebrow_text', label: 'Eyebrow', default: 'Built for momentum' },
  { type: 'select', key: 'eyebrow_icon', label: 'Eyebrow icon', default: 'workflow', options: ICON_OPTIONS },
  { type: 'text', key: 'heading', label: 'Heading', default: 'Automate the busywork, keep the focus.' },
  { type: 'textarea', key: 'lede', label: 'Lede', default: 'Pulse handles the handoffs, reminders, and reporting so your team can spend time on the work that matters.', rows: 3 },
  {
    type: 'select', key: 'media_position', label: 'Media position', default: 'left',
    options: [
      { value: 'left', label: 'Left' },
      { value: 'right', label: 'Right' },
    ],
  },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
  { type: 'select', key: 'section_padding', label: 'Section padding', default: 'large', options: PADDING_OPTIONS },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const splitWithChecksBlocks: BlockTypeSchema[] = [
  {
    type: 'check',
    label: 'Check item',
    defaultSettings: { heading: 'Feature', body: 'Short description of this benefit.' },
    settingsSchema: [
      { type: 'text', key: 'heading', label: 'Heading' },
      { type: 'text', key: 'body', label: 'Body' },
    ],
  },
]

export const splitWithChecksDefaults = {
  settings: {
    eyebrow_text: 'Built for momentum',
    eyebrow_icon: 'workflow',
    heading: 'Automate the busywork, keep the focus.',
    lede: 'Pulse handles the handoffs, reminders, and reporting so your team can spend time on the work that matters.',
    media_position: 'left',
    color_scheme: 'scheme_1',
    section_padding: 'large',
    container_width: 'normal',
  },
  blocks: [
    { type: 'check', settings: { heading: 'Triggers & automations', body: 'If-this-then-that flows across every tool you use.' } },
    { type: 'check', settings: { heading: 'Real-time collaboration', body: 'Comments, mentions, and presence baked into everything.' } },
    { type: 'check', settings: { heading: 'One-click reporting', body: 'Share live dashboards with a link — always up to date.' } },
  ],
}
