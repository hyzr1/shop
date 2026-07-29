import type { FieldSchema, BlockTypeSchema } from '@/sections/registry'

export const customHtmlSettings: FieldSchema[] = [
  { type: 'textarea', key: 'html', label: 'HTML', rows: 8, default: '<div>Custom HTML</div>' },
  { type: 'textarea', key: 'css', label: 'CSS', rows: 6, default: '' },
]

export const customHtmlBlocks: BlockTypeSchema[] = []

export const customHtmlDefaults = {
  settings: { html: '<div>Custom HTML</div>', css: '' },
  blocks: [],
}
