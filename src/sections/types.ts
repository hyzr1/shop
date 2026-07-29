export type SectionType =
  | 'header' | 'footer' | 'announcement-bar'
  | 'image-banner' | 'rich-text' | 'multicolumn'
  | 'image-with-text' | 'collage' | 'newsletter'
  | 'collection-list' | 'featured-collection' | 'featured-product'
  | 'product-info' | 'product-media' | 'collection-grid' | 'cart-items'
  | 'custom-html'
  | 'hero-mockup' | 'logo-list' | 'icon-features-grid'
  | 'split-with-checks' | 'stats' | 'pricing'
  | 'testimonials' | 'cta-banner'
  | 'olea-announcement' | 'olea-header' | 'olea-hero' | 'olea-values'
  | 'olea-product-grid' | 'olea-ritual' | 'olea-story-quote'
  | 'olea-ingredients' | 'olea-newsletter' | 'olea-footer-minimal'
  | 'atlas-rail-nav' | 'atlas-hero' | 'atlas-section-header'
  | 'atlas-project-grid' | 'atlas-method' | 'atlas-studio' | 'atlas-final-cta'
  | 'pulse-page-banner' | 'pulse-product' | 'pulse-collection-grid'
  | 'pulse-cart' | 'pulse-search'
  | 'olea-page-banner' | 'olea-product' | 'olea-collection-grid'
  | 'olea-collection-list'
  | 'olea-cart' | 'olea-search'
  | 'atlas-page-banner' | 'atlas-product' | 'atlas-collection-grid'
  | 'atlas-collection-list'
  | 'atlas-cart' | 'atlas-search'

export type PageType =
  | 'home' | 'page' | 'product' | 'collection' | 'collection_list'
  | 'cart' | 'search' | 'blog' | 'article' | 'not_found' | 'password'

export type SettingValue = string | number | boolean | null | SettingValue[] | { [k: string]: SettingValue }

export interface Block {
  id: string
  type: string
  settings: Record<string, SettingValue>
}

export interface Section {
  id: string
  type: SectionType
  settings: Record<string, SettingValue>
  blocks: Block[]
  disabled: boolean
}

export interface Page {
  id: string
  slug: string
  page_type: PageType
  title: string
  sections: Section[]
  draft_sections?: Section[] | null
  published_at?: string | null
  updated_at?: string
}

export interface ThemeSettings {
  colors: {
    schemes: Record<string, {
      background: string; text: string; accent: string; button: string; button_text: string
    }>
  }
  typography: {
    heading_font: { family: string; weight: number }
    body_font: { family: string; weight: number }
    heading_scale: number
    body_scale: number
  }
  spacing: { section_padding: 'small' | 'medium' | 'large'; container_width: number }
  buttons: { radius: 'none' | 'sm' | 'md' | 'lg' | 'full'; weight: 'light' | 'medium' | 'bold' }
}

export interface Theme {
  id: string
  site_id: string
  settings: ThemeSettings
  custom_css: string
}
