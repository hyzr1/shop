import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { WIDTH_OPTIONS } from '@/sections/lib/layout'

export const pulsePageBannerSettings: FieldSchema[] = [
  { type: 'text', key: 'breadcrumb', label: 'Breadcrumb (separated by /)', default: 'Shop / Apparel' },
  { type: 'text', key: 'pill_tag', label: 'Pill tag', default: '' },
  { type: 'text', key: 'pill_text', label: 'Pill text', default: '' },
  { type: 'text', key: 'heading', label: 'Heading', default: 'Page title' },
  { type: 'textarea', key: 'subheading', label: 'Subheading', default: '', rows: 2 },
  { type: 'checkbox', key: 'show_search', label: 'Show search', default: false },
  { type: 'text', key: 'search_placeholder', label: 'Search placeholder', default: 'Search products…' },
  {
    type: 'select', key: 'align', label: 'Alignment', default: 'center',
    options: [
      { value: 'center', label: 'Center' },
      { value: 'left', label: 'Left' },
    ],
  },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const pulsePageBannerBlocks: BlockTypeSchema[] = []

export const pulsePageBannerDefaults = {
  settings: {
    breadcrumb: 'Shop / Apparel',
    pill_tag: '',
    pill_text: '',
    heading: 'Page title',
    subheading: '',
    show_search: false,
    search_placeholder: 'Search products…',
    align: 'center',
    color_scheme: 'scheme_1',
    container_width: 'normal',
  },
  blocks: [],
}
