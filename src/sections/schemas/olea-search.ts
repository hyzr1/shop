import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const oleaSearchSettings: FieldSchema[] = [
  { type: 'text', key: 'placeholder', label: 'Input placeholder', default: 'Search the apothecary…' },
  { type: 'text', key: 'initial_query', label: 'Initial query (for preview)', default: 'serum' },
  { type: 'text', key: 'popular_searches', label: 'Popular searches (· separated)', default: 'serum · barrier · veil · oil · tonic' },
  { type: 'text', key: 'empty_heading', label: 'Empty state heading (italic serif)', default: 'The shelves are quiet.' },
  { type: 'textarea', key: 'empty_body', label: 'Empty state body', default: 'Try a different word. We sort our formulas by ritual, not category.', rows: 2 },
  {
    type: 'select', key: 'columns', label: 'Result columns', default: '3',
    options: [
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
    ],
  },
  { type: 'color', key: 'background_color', label: 'Background', default: '#f4efe5' },
  { type: 'color', key: 'italic_color', label: 'Italic accent color', default: '#695036' },
]

export const oleaSearchBlocks: BlockTypeSchema[] = []

export const oleaSearchDefaults = {
  settings: {
    placeholder: 'Search the apothecary…',
    initial_query: 'serum',
    popular_searches: 'serum · barrier · veil · oil · tonic',
    empty_heading: 'The shelves are quiet.',
    empty_body: 'Try a different word. We sort our formulas by ritual, not category.',
    columns: '3',
    background_color: '#f4efe5',
    italic_color: '#695036',
  },
  blocks: [],
}
