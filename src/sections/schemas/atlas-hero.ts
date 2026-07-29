import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const atlasHeroSettings: FieldSchema[] = [
  { type: 'header', key: 'media_section', label: 'Media' },
  { type: 'image', key: 'image', label: 'Background image' },
  { type: 'header', key: 'topline_section', label: 'Topline' },
  { type: 'text', key: 'topline_left', label: 'Topline left', default: 'Architecture / Interiors / Landscape' },
  { type: 'text', key: 'topline_link_label', label: 'Topline link label', default: 'Start a project' },
  { type: 'link', key: 'topline_link_url', label: 'Topline link URL', default: '#contact' },
  { type: 'header', key: 'eyebrow_section', label: 'Eyebrow' },
  {
    type: 'select', key: 'eyebrow_icon', label: 'Eyebrow icon', default: 'compass',
    options: [
      { value: 'compass', label: 'Compass' },
      { value: 'circle', label: 'Circle' },
      { value: 'grid', label: 'Grid' },
      { value: 'move', label: 'Move diagonal' },
    ],
  },
  { type: 'text', key: 'eyebrow_text', label: 'Eyebrow text', default: 'Studio for grounded modern spaces' },
  { type: 'header', key: 'heading_section', label: 'Heading' },
  { type: 'text', key: 'heading_line1', label: 'Heading line 1', default: 'Buildings that listen' },
  { type: 'text', key: 'heading_line2', label: 'Heading line 2', default: 'to the land.' },
  { type: 'textarea', key: 'lede', label: 'Lede', rows: 3, default: 'Atlas designs quiet, exacting places where material, light, and landscape become one continuous experience.' },
  { type: 'header', key: 'index_section', label: 'Index card' },
  { type: 'text', key: 'index_label', label: 'Index label', default: 'Current feature' },
  { type: 'text', key: 'index_title', label: 'Index title', default: 'Mesa House' },
  { type: 'textarea', key: 'index_body', label: 'Index body', rows: 3, default: 'A desert residence shaped by shade, thermal mass, and the long line of the horizon.' },
  { type: 'text', key: 'index_cta_label', label: 'Index CTA label', default: 'View case study' },
  { type: 'link', key: 'index_cta_url', label: 'Index CTA URL', default: '#work' },
]

export const atlasHeroBlocks: BlockTypeSchema[] = []

export const atlasHeroDefaults = {
  settings: {
    image: { url: '/templates/atlas-hero.webp' },
    topline_left: 'Architecture / Interiors / Landscape',
    topline_link_label: 'Start a project',
    topline_link_url: '#contact',
    eyebrow_icon: 'compass',
    eyebrow_text: 'Studio for grounded modern spaces',
    heading_line1: 'Buildings that listen',
    heading_line2: 'to the land.',
    lede: 'Atlas designs quiet, exacting places where material, light, and landscape become one continuous experience.',
    index_label: 'Current feature',
    index_title: 'Mesa House',
    index_body: 'A desert residence shaped by shade, thermal mass, and the long line of the horizon.',
    index_cta_label: 'View case study',
    index_cta_url: '#work',
  },
  blocks: [],
}
