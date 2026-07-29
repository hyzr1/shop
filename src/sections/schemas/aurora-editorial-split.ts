import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

const TONE_OPTIONS = [
  { value: 'warm', label: 'Warm (lavender)' },
  { value: 'cool', label: 'Cool (sky)' },
  { value: 'neutral', label: 'Neutral (amber)' },
  { value: 'amber', label: 'Amber (meadow)' },
  { value: 'rose', label: 'Rose (blush)' },
  { value: 'olive', label: 'Olive (orchid)' },
]

const ICON_OPTIONS = [
  { value: 'leaf', label: 'Leaf' },
  { value: 'shield', label: 'Shield' },
  { value: 'truck', label: 'Truck' },
  { value: 'sparkles', label: 'Sparkles' },
  { value: 'workflow', label: 'Workflow' },
]

export const auroraEditorialSplitSettings: FieldSchema[] = [
  { type: 'header', key: 'content_section', label: 'Content' },
  { type: 'text', key: 'eyebrow_text', label: 'Eyebrow', default: 'Our craft' },
  { type: 'text', key: 'heading_line1', label: 'Heading line 1', default: 'Better made,' },
  { type: 'text', key: 'heading_italic', label: 'Italic word', default: 'by design' },
  { type: 'text', key: 'heading_after', label: 'After italic', default: '.' },
  { type: 'textarea', key: 'lede', label: 'Lede paragraph', default: 'We work with a small circle of family-run mills to make fewer, better things — traceable from fiber to finish.', rows: 3 },
  { type: 'header', key: 'media_section', label: 'Media' },
  { type: 'select', key: 'media_tone', label: 'Media tone (gradient)', default: 'warm', options: TONE_OPTIONS },
  {
    type: 'select', key: 'media_position', label: 'Media position', default: 'left',
    options: [
      { value: 'left', label: 'Left' },
      { value: 'right', label: 'Right' },
    ],
  },
]

export const auroraEditorialSplitBlocks: BlockTypeSchema[] = [
  {
    type: 'feature',
    label: 'Feature',
    defaultSettings: { icon: 'leaf', heading: 'Feature heading', body: 'Short description here.' },
    settingsSchema: [
      { type: 'select', key: 'icon', label: 'Icon', default: 'leaf', options: ICON_OPTIONS },
      { type: 'text', key: 'heading', label: 'Heading', default: 'Feature heading' },
      { type: 'textarea', key: 'body', label: 'Body', default: 'Short description here.', rows: 2 },
    ],
    limit: 5,
  },
]

export const auroraEditorialSplitDefaults = {
  settings: {
    eyebrow_text: 'Our craft',
    heading_line1: 'Better made,',
    heading_italic: 'by design',
    heading_after: '.',
    lede: 'We work with a small circle of family-run mills to make fewer, better things — traceable from fiber to finish.',
    media_tone: 'warm',
    media_position: 'left',
  },
  blocks: [
    { type: 'feature', settings: { icon: 'leaf', heading: 'Responsibly sourced', body: 'Organic cotton, traceable merino, and GRS-certified cashmere.' } },
    { type: 'feature', settings: { icon: 'shield', heading: 'Built to last', body: 'Reinforced seams and natural fibers that age beautifully.' } },
    { type: 'feature', settings: { icon: 'truck', heading: 'Carbon-neutral delivery', body: 'Every order ships plastic-free and offset at source.' } },
  ],
}
