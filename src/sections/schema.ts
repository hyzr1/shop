import { z } from 'zod'

const SECTION_TYPES = [
  'header','footer','announcement-bar',
  'image-banner','rich-text','multicolumn',
  'image-with-text','collage','newsletter',
  'collection-list','featured-collection','featured-product',
  'product-info','product-media','collection-grid','cart-items',
  'custom-html',
  'hero-mockup','logo-list','icon-features-grid',
  'split-with-checks','stats','pricing',
  'testimonials','cta-banner',
  'olea-announcement','olea-header','olea-hero','olea-values',
  'olea-product-grid','olea-ritual','olea-story-quote',
  'olea-ingredients','olea-newsletter','olea-footer-minimal',
  'atlas-rail-nav','atlas-hero','atlas-section-header',
  'atlas-project-grid','atlas-method','atlas-studio','atlas-final-cta',
  'pulse-page-banner','pulse-product','pulse-collection-grid',
  'pulse-cart','pulse-search',
  'olea-page-banner','olea-product','olea-collection-grid',
  'olea-collection-list',
  'olea-cart','olea-search',
  'atlas-page-banner','atlas-product','atlas-collection-grid',
  'atlas-collection-list',
  'atlas-cart','atlas-search',
] as const

const PAGE_TYPES = [
  'home','page','product','collection','collection_list',
  'cart','search','blog','article','not_found','password',
] as const

export const blockSchema = z.object({
  id: z.string(),
  type: z.string(),
  settings: z.record(z.string(), z.unknown()).default({}),
})

export const sectionSchema = z.object({
  id: z.string(),
  type: z.enum(SECTION_TYPES),
  settings: z.record(z.string(), z.unknown()).default({}),
  blocks: z.array(blockSchema).default([]),
  disabled: z.boolean().default(false),
})

export const pageSchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  page_type: z.enum(PAGE_TYPES),
  title: z.string().default(''),
  sections: z.array(sectionSchema).default([]),
  draft_sections: z.array(sectionSchema).nullable().optional(),
  published_at: z.string().nullable().optional(),
  updated_at: z.string().optional(),
})

export const themeSettingsSchema = z.object({
  colors: z.object({
    schemes: z.record(z.string(), z.object({
      background: z.string(), text: z.string(), accent: z.string(),
      button: z.string(), button_text: z.string(),
    })),
  }),
  typography: z.object({
    heading_font: z.object({ family: z.string(), weight: z.number() }),
    body_font: z.object({ family: z.string(), weight: z.number() }),
    heading_scale: z.number(),
    body_scale: z.number(),
  }),
  spacing: z.object({
    section_padding: z.enum(['small','medium','large']),
    container_width: z.number(),
  }),
  buttons: z.object({
    radius: z.enum(['none','sm','md','lg','full']),
    weight: z.enum(['light','medium','bold']),
  }),
})

export type SectionParsed = z.infer<typeof sectionSchema>
export type PageParsed = z.infer<typeof pageSchema>
