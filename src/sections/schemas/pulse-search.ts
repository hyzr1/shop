import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'
import { WIDTH_OPTIONS } from '@/sections/lib/layout'

export const pulseSearchSettings: FieldSchema[] = [
  { type: 'text', key: 'placeholder', label: 'Input placeholder', default: 'Search products, collections, articles…' },
  { type: 'text', key: 'initial_query', label: 'Initial query (for stub preview)', default: 'tee' },
  { type: 'text', key: 'popular_searches', label: 'Popular searches (· separated)', default: 'denim · tee · accessories · canvas · belt' },
  { type: 'text', key: 'empty_heading', label: 'Empty state heading', default: 'No results yet' },
  { type: 'textarea', key: 'empty_body', label: 'Empty state body', default: 'Try a different keyword or browse the latest drops.', rows: 2 },
  {
    type: 'select', key: 'columns', label: 'Result columns', default: '4',
    options: [
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
    ],
  },
  { type: 'color_scheme', key: 'color_scheme', label: 'Color scheme', default: 'scheme_1' },
  { type: 'select', key: 'container_width', label: 'Container width', default: 'normal', options: WIDTH_OPTIONS },
]

export const pulseSearchBlocks: BlockTypeSchema[] = []

export const pulseSearchDefaults = {
  settings: {
    placeholder: 'Search products, collections, articles…',
    initial_query: 'tee',
    popular_searches: 'denim · tee · accessories · canvas · belt',
    empty_heading: 'No results yet',
    empty_body: 'Try a different keyword or browse the latest drops.',
    columns: '4',
    color_scheme: 'scheme_1',
    container_width: 'normal',
  },
  blocks: [],
}
