import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

const TONE_OPTIONS = [
  { value: 'warm', label: 'Warm (lavender)' },
  { value: 'cool', label: 'Cool (sky)' },
  { value: 'neutral', label: 'Neutral (amber)' },
  { value: 'amber', label: 'Amber (meadow)' },
  { value: 'rose', label: 'Rose (blush)' },
  { value: 'olive', label: 'Olive (orchid)' },
]

export const auroraTestimonialsSettings: FieldSchema[] = [
  { type: 'header', key: 'content_section', label: 'Header' },
  { type: 'text', key: 'eyebrow_text', label: 'Eyebrow', default: 'Loved by thousands' },
  { type: 'text', key: 'heading_line1', label: 'Heading line 1', default: 'Words from the' },
  { type: 'text', key: 'heading_italic', label: 'Italic word', default: 'wardrobe' },
  { type: 'text', key: 'heading_after', label: 'After italic', default: '.' },
]

export const auroraTestimonialsBlocks: BlockTypeSchema[] = [
  {
    type: 'quote',
    label: 'Quote',
    defaultSettings: { text: 'A great review goes here.', name: 'Customer name', role: 'Verified buyer', avatar_tone: 'warm' },
    settingsSchema: [
      { type: 'textarea', key: 'text', label: 'Quote', default: 'A great review goes here.', rows: 3 },
      { type: 'text', key: 'name', label: 'Name', default: 'Customer name' },
      { type: 'text', key: 'role', label: 'Role / label', default: 'Verified buyer' },
      { type: 'select', key: 'avatar_tone', label: 'Avatar tone (gradient)', default: 'warm', options: TONE_OPTIONS },
    ],
    limit: 6,
  },
]

export const auroraTestimonialsDefaults = {
  settings: {
    eyebrow_text: 'Loved by thousands',
    heading_line1: 'Words from the',
    heading_italic: 'wardrobe',
    heading_after: '.',
  },
  blocks: [
    { type: 'quote', settings: { text: 'The quality is genuinely exceptional. The wool coat has become the most-worn thing in my closet.', name: 'Maya Lindgren', role: 'Verified buyer', avatar_tone: 'warm' } },
    { type: 'quote', settings: { text: 'Finally a brand that gets fit right. Considered details, beautiful fabric, and it arrived in two days.', name: 'Theo Park', role: 'Verified buyer', avatar_tone: 'cool' } },
    { type: 'quote', settings: { text: 'Sustainable without compromise. You can feel the craftsmanship the moment you open the box.', name: 'Ada Okonkwo', role: 'Verified buyer', avatar_tone: 'olive' } },
  ],
}
