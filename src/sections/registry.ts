import type { ComponentType } from 'react'
import type { SectionType, Section } from './types'

export type FieldType =
  | 'text' | 'textarea' | 'number' | 'range' | 'checkbox'
  | 'select' | 'radio' | 'color' | 'color_scheme'
  | 'image' | 'link' | 'font' | 'header' | 'paragraph'

export interface FieldSchema {
  type: FieldType
  key: string
  label: string
  default?: unknown
  options?: Array<{ value: string; label: string }>  // select / radio
  min?: number; max?: number; step?: number          // number / range
  placeholder?: string
  help?: string
  rows?: number                                       // textarea
}

export interface BlockTypeSchema {
  type: string
  label: string
  defaultSettings: Record<string, unknown>
  settingsSchema: FieldSchema[]
  limit?: number
}

export interface SectionDefinition {
  type: SectionType
  label: string
  category: 'universal' | 'marketing' | 'commerce' | 'custom'
  Component: ComponentType<{ section: Section }>
  settingsSchema: FieldSchema[]
  blockTypes: BlockTypeSchema[]
  defaultSettings: Record<string, unknown>
  defaultBlocks?: Array<{ type: string; settings: Record<string, unknown> }>
  presets?: Array<{ name: string; settings: Record<string, unknown>; blocks?: Array<{ type: string; settings: Record<string, unknown> }> }>
}

const registry = new Map<SectionType, SectionDefinition>()

export function registerSection(def: SectionDefinition) {
  registry.set(def.type, def)
}

export function getSection(type: SectionType): SectionDefinition | undefined {
  return registry.get(type)
}

export function hasSection(type: SectionType): boolean {
  return registry.has(type)
}

export function listSections(): SectionDefinition[] {
  return Array.from(registry.values())
}

export function listByCategory(category: SectionDefinition['category']): SectionDefinition[] {
  return listSections().filter((s) => s.category === category)
}

// --- auto-registration on import ---
import { HeaderSection } from './components/header'
import { headerSettings, headerBlocks, headerDefaults } from './schemas/header'

registerSection({
  type: 'header',
  label: 'Header',
  category: 'universal',
  Component: HeaderSection,
  settingsSchema: headerSettings,
  blockTypes: headerBlocks,
  defaultSettings: headerDefaults.settings,
  defaultBlocks: headerDefaults.blocks,
})

import { FooterSection } from './components/footer'
import { footerSettings, footerBlocks, footerDefaults } from './schemas/footer'

registerSection({
  type: 'footer',
  label: 'Footer',
  category: 'universal',
  Component: FooterSection,
  settingsSchema: footerSettings,
  blockTypes: footerBlocks,
  defaultSettings: footerDefaults.settings,
  defaultBlocks: footerDefaults.blocks,
})

import { ImageBannerSection } from './components/image-banner'
import { imageBannerSettings, imageBannerBlocks, imageBannerDefaults } from './schemas/image-banner'

registerSection({
  type: 'image-banner',
  label: 'Image banner',
  category: 'marketing',
  Component: ImageBannerSection,
  settingsSchema: imageBannerSettings,
  blockTypes: imageBannerBlocks,
  defaultSettings: imageBannerDefaults.settings,
  defaultBlocks: imageBannerDefaults.blocks,
})

import { AnnouncementBarSection } from './components/announcement-bar'
import { announcementBarSettings, announcementBarBlocks, announcementBarDefaults } from './schemas/announcement-bar'

registerSection({
  type: 'announcement-bar',
  label: 'Announcement bar',
  category: 'universal',
  Component: AnnouncementBarSection,
  settingsSchema: announcementBarSettings,
  blockTypes: announcementBarBlocks,
  defaultSettings: announcementBarDefaults.settings,
  defaultBlocks: announcementBarDefaults.blocks,
})

import { RichTextSection } from './components/rich-text'
import { richTextSettings, richTextBlocks, richTextDefaults } from './schemas/rich-text'

registerSection({
  type: 'rich-text',
  label: 'Rich text',
  category: 'marketing',
  Component: RichTextSection,
  settingsSchema: richTextSettings,
  blockTypes: richTextBlocks,
  defaultSettings: richTextDefaults.settings,
  defaultBlocks: richTextDefaults.blocks,
})

import { MulticolumnSection } from './components/multicolumn'
import { multicolumnSettings, multicolumnBlocks, multicolumnDefaults } from './schemas/multicolumn'

registerSection({
  type: 'multicolumn',
  label: 'Multicolumn',
  category: 'marketing',
  Component: MulticolumnSection,
  settingsSchema: multicolumnSettings,
  blockTypes: multicolumnBlocks,
  defaultSettings: multicolumnDefaults.settings,
  defaultBlocks: multicolumnDefaults.blocks,
})

import { ImageWithTextSection } from './components/image-with-text'
import { imageWithTextSettings, imageWithTextBlocks, imageWithTextDefaults } from './schemas/image-with-text'

registerSection({
  type: 'image-with-text',
  label: 'Image with text',
  category: 'marketing',
  Component: ImageWithTextSection,
  settingsSchema: imageWithTextSettings,
  blockTypes: imageWithTextBlocks,
  defaultSettings: imageWithTextDefaults.settings,
  defaultBlocks: imageWithTextDefaults.blocks,
})

import { CollageSection } from './components/collage'
import { collageSettings, collageBlocks, collageDefaults } from './schemas/collage'

registerSection({
  type: 'collage',
  label: 'Collage',
  category: 'marketing',
  Component: CollageSection,
  settingsSchema: collageSettings,
  blockTypes: collageBlocks,
  defaultSettings: collageDefaults.settings,
  defaultBlocks: collageDefaults.blocks,
})

import { NewsletterSection } from './components/newsletter'
import { newsletterSettings, newsletterBlocks, newsletterDefaults } from './schemas/newsletter'

registerSection({
  type: 'newsletter',
  label: 'Newsletter',
  category: 'marketing',
  Component: NewsletterSection,
  settingsSchema: newsletterSettings,
  blockTypes: newsletterBlocks,
  defaultSettings: newsletterDefaults.settings,
  defaultBlocks: newsletterDefaults.blocks,
})

import { CollectionListSection } from './components/collection-list'
import { collectionListSettings, collectionListBlocks, collectionListDefaults } from './schemas/collection-list'

registerSection({
  type: 'collection-list',
  label: 'Collection list',
  category: 'commerce',
  Component: CollectionListSection,
  settingsSchema: collectionListSettings,
  blockTypes: collectionListBlocks,
  defaultSettings: collectionListDefaults.settings,
  defaultBlocks: collectionListDefaults.blocks,
})

import { FeaturedCollectionSection } from './components/featured-collection'
import { featuredCollectionSettings, featuredCollectionBlocks, featuredCollectionDefaults } from './schemas/featured-collection'

registerSection({
  type: 'featured-collection',
  label: 'Featured collection',
  category: 'commerce',
  Component: FeaturedCollectionSection,
  settingsSchema: featuredCollectionSettings,
  blockTypes: featuredCollectionBlocks,
  defaultSettings: featuredCollectionDefaults.settings,
  defaultBlocks: featuredCollectionDefaults.blocks,
})

import { FeaturedProductSection } from './components/featured-product'
import { featuredProductSettings, featuredProductBlocks, featuredProductDefaults } from './schemas/featured-product'

registerSection({
  type: 'featured-product',
  label: 'Featured product',
  category: 'commerce',
  Component: FeaturedProductSection,
  settingsSchema: featuredProductSettings,
  blockTypes: featuredProductBlocks,
  defaultSettings: featuredProductDefaults.settings,
  defaultBlocks: featuredProductDefaults.blocks,
})

import { CustomHtmlSection } from './components/custom-html'
import { customHtmlSettings, customHtmlBlocks, customHtmlDefaults } from './schemas/custom-html'

registerSection({
  type: 'custom-html',
  label: 'Custom HTML',
  category: 'custom',
  Component: CustomHtmlSection,
  settingsSchema: customHtmlSettings,
  blockTypes: customHtmlBlocks,
  defaultSettings: customHtmlDefaults.settings,
  defaultBlocks: customHtmlDefaults.blocks,
})

import { ProductInfoSection } from './components/product-info'
import { productInfoSettings, productInfoBlocks, productInfoDefaults } from './schemas/product-info'

registerSection({
  type: 'product-info',
  label: 'Product info',
  category: 'commerce',
  Component: ProductInfoSection,
  settingsSchema: productInfoSettings,
  blockTypes: productInfoBlocks,
  defaultSettings: productInfoDefaults.settings,
  defaultBlocks: productInfoDefaults.blocks,
})

import { ProductMediaSection } from './components/product-media'
import { productMediaSettings, productMediaBlocks, productMediaDefaults } from './schemas/product-media'

registerSection({
  type: 'product-media',
  label: 'Product media',
  category: 'commerce',
  Component: ProductMediaSection,
  settingsSchema: productMediaSettings,
  blockTypes: productMediaBlocks,
  defaultSettings: productMediaDefaults.settings,
  defaultBlocks: productMediaDefaults.blocks,
})

import { CollectionGridSection } from './components/collection-grid'
import { collectionGridSettings, collectionGridBlocks, collectionGridDefaults } from './schemas/collection-grid'

registerSection({
  type: 'collection-grid',
  label: 'Collection grid',
  category: 'commerce',
  Component: CollectionGridSection,
  settingsSchema: collectionGridSettings,
  blockTypes: collectionGridBlocks,
  defaultSettings: collectionGridDefaults.settings,
  defaultBlocks: collectionGridDefaults.blocks,
})

import { CartItemsSection } from './components/cart-items'
import { cartItemsSettings, cartItemsBlocks, cartItemsDefaults } from './schemas/cart-items'

registerSection({
  type: 'cart-items',
  label: 'Cart items',
  category: 'commerce',
  Component: CartItemsSection,
  settingsSchema: cartItemsSettings,
  blockTypes: cartItemsBlocks,
  defaultSettings: cartItemsDefaults.settings,
  defaultBlocks: cartItemsDefaults.blocks,
})

import { HeroMockupSection } from './components/hero-mockup'
import { heroMockupSettings, heroMockupBlocks, heroMockupDefaults } from './schemas/hero-mockup'

registerSection({
  type: 'hero-mockup',
  label: 'Hero with app mockup',
  category: 'marketing',
  Component: HeroMockupSection,
  settingsSchema: heroMockupSettings,
  blockTypes: heroMockupBlocks,
  defaultSettings: heroMockupDefaults.settings,
  defaultBlocks: heroMockupDefaults.blocks,
})

import { LogoListSection } from './components/logo-list'
import { logoListSettings, logoListBlocks, logoListDefaults } from './schemas/logo-list'

registerSection({
  type: 'logo-list',
  label: 'Logo list',
  category: 'marketing',
  Component: LogoListSection,
  settingsSchema: logoListSettings,
  blockTypes: logoListBlocks,
  defaultSettings: logoListDefaults.settings,
  defaultBlocks: logoListDefaults.blocks,
})

import { IconFeaturesGridSection } from './components/icon-features-grid'
import { iconFeaturesGridSettings, iconFeaturesGridBlocks, iconFeaturesGridDefaults } from './schemas/icon-features-grid'

registerSection({
  type: 'icon-features-grid',
  label: 'Icon features grid',
  category: 'marketing',
  Component: IconFeaturesGridSection,
  settingsSchema: iconFeaturesGridSettings,
  blockTypes: iconFeaturesGridBlocks,
  defaultSettings: iconFeaturesGridDefaults.settings,
  defaultBlocks: iconFeaturesGridDefaults.blocks,
})

import { SplitWithChecksSection } from './components/split-with-checks'
import { splitWithChecksSettings, splitWithChecksBlocks, splitWithChecksDefaults } from './schemas/split-with-checks'

registerSection({
  type: 'split-with-checks',
  label: 'Split with checks',
  category: 'marketing',
  Component: SplitWithChecksSection,
  settingsSchema: splitWithChecksSettings,
  blockTypes: splitWithChecksBlocks,
  defaultSettings: splitWithChecksDefaults.settings,
  defaultBlocks: splitWithChecksDefaults.blocks,
})

import { StatsSection } from './components/stats'
import { statsSettings, statsBlocks, statsDefaults } from './schemas/stats'

registerSection({
  type: 'stats',
  label: 'Stats',
  category: 'marketing',
  Component: StatsSection,
  settingsSchema: statsSettings,
  blockTypes: statsBlocks,
  defaultSettings: statsDefaults.settings,
  defaultBlocks: statsDefaults.blocks,
})

import { PricingSection } from './components/pricing'
import { pricingSettings, pricingBlocks, pricingDefaults } from './schemas/pricing'

registerSection({
  type: 'pricing',
  label: 'Pricing',
  category: 'marketing',
  Component: PricingSection,
  settingsSchema: pricingSettings,
  blockTypes: pricingBlocks,
  defaultSettings: pricingDefaults.settings,
  defaultBlocks: pricingDefaults.blocks,
})

import { TestimonialsSection } from './components/testimonials'
import { testimonialsSettings, testimonialsBlocks, testimonialsDefaults } from './schemas/testimonials'

registerSection({
  type: 'testimonials',
  label: 'Testimonials',
  category: 'marketing',
  Component: TestimonialsSection,
  settingsSchema: testimonialsSettings,
  blockTypes: testimonialsBlocks,
  defaultSettings: testimonialsDefaults.settings,
  defaultBlocks: testimonialsDefaults.blocks,
})

import { CtaBannerSection } from './components/cta-banner'
import { ctaBannerSettings, ctaBannerBlocks, ctaBannerDefaults } from './schemas/cta-banner'

registerSection({
  type: 'cta-banner',
  label: 'CTA banner',
  category: 'marketing',
  Component: CtaBannerSection,
  settingsSchema: ctaBannerSettings,
  blockTypes: ctaBannerBlocks,
  defaultSettings: ctaBannerDefaults.settings,
  defaultBlocks: ctaBannerDefaults.blocks,
})

// --- Olea template sections ---

import { OleaAnnouncementSection } from './components/olea-announcement'
import { oleaAnnouncementSettings, oleaAnnouncementBlocks, oleaAnnouncementDefaults } from './schemas/olea-announcement'

registerSection({
  type: 'olea-announcement',
  label: 'Olea announcement',
  category: 'universal',
  Component: OleaAnnouncementSection,
  settingsSchema: oleaAnnouncementSettings,
  blockTypes: oleaAnnouncementBlocks,
  defaultSettings: oleaAnnouncementDefaults.settings,
  defaultBlocks: oleaAnnouncementDefaults.blocks,
})

import { OleaHeaderSection } from './components/olea-header'
import { oleaHeaderSettings, oleaHeaderBlocks, oleaHeaderDefaults } from './schemas/olea-header'

registerSection({
  type: 'olea-header',
  label: 'Olea header',
  category: 'universal',
  Component: OleaHeaderSection,
  settingsSchema: oleaHeaderSettings,
  blockTypes: oleaHeaderBlocks,
  defaultSettings: oleaHeaderDefaults.settings,
  defaultBlocks: oleaHeaderDefaults.blocks,
})

import { OleaHeroSection } from './components/olea-hero'
import { oleaHeroSettings, oleaHeroBlocks, oleaHeroDefaults } from './schemas/olea-hero'

registerSection({
  type: 'olea-hero',
  label: 'Olea hero',
  category: 'marketing',
  Component: OleaHeroSection,
  settingsSchema: oleaHeroSettings,
  blockTypes: oleaHeroBlocks,
  defaultSettings: oleaHeroDefaults.settings,
  defaultBlocks: oleaHeroDefaults.blocks,
})

import { OleaValuesSection } from './components/olea-values'
import { oleaValuesSettings, oleaValuesBlocks, oleaValuesDefaults } from './schemas/olea-values'

registerSection({
  type: 'olea-values',
  label: 'Olea values row',
  category: 'marketing',
  Component: OleaValuesSection,
  settingsSchema: oleaValuesSettings,
  blockTypes: oleaValuesBlocks,
  defaultSettings: oleaValuesDefaults.settings,
  defaultBlocks: oleaValuesDefaults.blocks,
})

import { OleaProductGridSection } from './components/olea-product-grid'
import { oleaProductGridSettings, oleaProductGridBlocks, oleaProductGridDefaults } from './schemas/olea-product-grid'

registerSection({
  type: 'olea-product-grid',
  label: 'Olea product grid',
  category: 'marketing',
  Component: OleaProductGridSection,
  settingsSchema: oleaProductGridSettings,
  blockTypes: oleaProductGridBlocks,
  defaultSettings: oleaProductGridDefaults.settings,
  defaultBlocks: oleaProductGridDefaults.blocks,
})

import { OleaRitualSection } from './components/olea-ritual'
import { oleaRitualSettings, oleaRitualBlocks, oleaRitualDefaults } from './schemas/olea-ritual'

registerSection({
  type: 'olea-ritual',
  label: 'Olea ritual',
  category: 'marketing',
  Component: OleaRitualSection,
  settingsSchema: oleaRitualSettings,
  blockTypes: oleaRitualBlocks,
  defaultSettings: oleaRitualDefaults.settings,
  defaultBlocks: oleaRitualDefaults.blocks,
})

import { OleaStoryQuoteSection } from './components/olea-story-quote'
import { oleaStoryQuoteSettings, oleaStoryQuoteBlocks, oleaStoryQuoteDefaults } from './schemas/olea-story-quote'

registerSection({
  type: 'olea-story-quote',
  label: 'Olea story quote',
  category: 'marketing',
  Component: OleaStoryQuoteSection,
  settingsSchema: oleaStoryQuoteSettings,
  blockTypes: oleaStoryQuoteBlocks,
  defaultSettings: oleaStoryQuoteDefaults.settings,
  defaultBlocks: oleaStoryQuoteDefaults.blocks,
})

import { OleaIngredientsSection } from './components/olea-ingredients'
import { oleaIngredientsSettings, oleaIngredientsBlocks, oleaIngredientsDefaults } from './schemas/olea-ingredients'

registerSection({
  type: 'olea-ingredients',
  label: 'Olea ingredients',
  category: 'marketing',
  Component: OleaIngredientsSection,
  settingsSchema: oleaIngredientsSettings,
  blockTypes: oleaIngredientsBlocks,
  defaultSettings: oleaIngredientsDefaults.settings,
  defaultBlocks: oleaIngredientsDefaults.blocks,
})

import { OleaNewsletterSection } from './components/olea-newsletter'
import { oleaNewsletterSettings, oleaNewsletterBlocks, oleaNewsletterDefaults } from './schemas/olea-newsletter'

registerSection({
  type: 'olea-newsletter',
  label: 'Olea newsletter',
  category: 'marketing',
  Component: OleaNewsletterSection,
  settingsSchema: oleaNewsletterSettings,
  blockTypes: oleaNewsletterBlocks,
  defaultSettings: oleaNewsletterDefaults.settings,
  defaultBlocks: oleaNewsletterDefaults.blocks,
})

import { OleaFooterMinimalSection } from './components/olea-footer-minimal'
import { oleaFooterMinimalSettings, oleaFooterMinimalBlocks, oleaFooterMinimalDefaults } from './schemas/olea-footer-minimal'

registerSection({
  type: 'olea-footer-minimal',
  label: 'Olea footer (minimal)',
  category: 'universal',
  Component: OleaFooterMinimalSection,
  settingsSchema: oleaFooterMinimalSettings,
  blockTypes: oleaFooterMinimalBlocks,
  defaultSettings: oleaFooterMinimalDefaults.settings,
  defaultBlocks: oleaFooterMinimalDefaults.blocks,
})

// --- Atlas template sections ---

import { AtlasRailNavSection } from './components/atlas-rail-nav'
import { atlasRailNavSettings, atlasRailNavBlocks, atlasRailNavDefaults } from './schemas/atlas-rail-nav'

registerSection({
  type: 'atlas-rail-nav',
  label: 'Atlas rail nav',
  category: 'universal',
  Component: AtlasRailNavSection,
  settingsSchema: atlasRailNavSettings,
  blockTypes: atlasRailNavBlocks,
  defaultSettings: atlasRailNavDefaults.settings,
  defaultBlocks: atlasRailNavDefaults.blocks,
})

import { AtlasHeroSection } from './components/atlas-hero'
import { atlasHeroSettings, atlasHeroBlocks, atlasHeroDefaults } from './schemas/atlas-hero'

registerSection({
  type: 'atlas-hero',
  label: 'Atlas hero',
  category: 'marketing',
  Component: AtlasHeroSection,
  settingsSchema: atlasHeroSettings,
  blockTypes: atlasHeroBlocks,
  defaultSettings: atlasHeroDefaults.settings,
  defaultBlocks: atlasHeroDefaults.blocks,
})

import { AtlasSectionHeaderSection } from './components/atlas-section-header'
import { atlasSectionHeaderSettings, atlasSectionHeaderBlocks, atlasSectionHeaderDefaults } from './schemas/atlas-section-header'

registerSection({
  type: 'atlas-section-header',
  label: 'Atlas section header',
  category: 'marketing',
  Component: AtlasSectionHeaderSection,
  settingsSchema: atlasSectionHeaderSettings,
  blockTypes: atlasSectionHeaderBlocks,
  defaultSettings: atlasSectionHeaderDefaults.settings,
  defaultBlocks: atlasSectionHeaderDefaults.blocks,
})

import { AtlasProjectGridSection } from './components/atlas-project-grid'
import { atlasProjectGridSettings, atlasProjectGridBlocks, atlasProjectGridDefaults } from './schemas/atlas-project-grid'

registerSection({
  type: 'atlas-project-grid',
  label: 'Atlas project grid',
  category: 'marketing',
  Component: AtlasProjectGridSection,
  settingsSchema: atlasProjectGridSettings,
  blockTypes: atlasProjectGridBlocks,
  defaultSettings: atlasProjectGridDefaults.settings,
  defaultBlocks: atlasProjectGridDefaults.blocks,
})

import { AtlasMethodSection } from './components/atlas-method'
import { atlasMethodSettings, atlasMethodBlocks, atlasMethodDefaults } from './schemas/atlas-method'

registerSection({
  type: 'atlas-method',
  label: 'Atlas method',
  category: 'marketing',
  Component: AtlasMethodSection,
  settingsSchema: atlasMethodSettings,
  blockTypes: atlasMethodBlocks,
  defaultSettings: atlasMethodDefaults.settings,
  defaultBlocks: atlasMethodDefaults.blocks,
})

import { AtlasStudioSection } from './components/atlas-studio'
import { atlasStudioSettings, atlasStudioBlocks, atlasStudioDefaults } from './schemas/atlas-studio'

registerSection({
  type: 'atlas-studio',
  label: 'Atlas studio',
  category: 'marketing',
  Component: AtlasStudioSection,
  settingsSchema: atlasStudioSettings,
  blockTypes: atlasStudioBlocks,
  defaultSettings: atlasStudioDefaults.settings,
  defaultBlocks: atlasStudioDefaults.blocks,
})

import { AtlasFinalCtaSection } from './components/atlas-final-cta'
import { atlasFinalCtaSettings, atlasFinalCtaBlocks, atlasFinalCtaDefaults } from './schemas/atlas-final-cta'

registerSection({
  type: 'atlas-final-cta',
  label: 'Atlas final CTA',
  category: 'marketing',
  Component: AtlasFinalCtaSection,
  settingsSchema: atlasFinalCtaSettings,
  blockTypes: atlasFinalCtaBlocks,
  defaultSettings: atlasFinalCtaDefaults.settings,
  defaultBlocks: atlasFinalCtaDefaults.blocks,
})

// --- Pulse commerce sections ---

import { PulsePageBannerSection } from './components/pulse-page-banner'
import { pulsePageBannerSettings, pulsePageBannerBlocks, pulsePageBannerDefaults } from './schemas/pulse-page-banner'

registerSection({
  type: 'pulse-page-banner',
  label: 'Pulse page banner',
  category: 'commerce',
  Component: PulsePageBannerSection,
  settingsSchema: pulsePageBannerSettings,
  blockTypes: pulsePageBannerBlocks,
  defaultSettings: pulsePageBannerDefaults.settings,
  defaultBlocks: pulsePageBannerDefaults.blocks,
})

import { PulseProductSection } from './components/pulse-product'
import { pulseProductSettings, pulseProductBlocks, pulseProductDefaults } from './schemas/pulse-product'

registerSection({
  type: 'pulse-product',
  label: 'Pulse product',
  category: 'commerce',
  Component: PulseProductSection,
  settingsSchema: pulseProductSettings,
  blockTypes: pulseProductBlocks,
  defaultSettings: pulseProductDefaults.settings,
  defaultBlocks: pulseProductDefaults.blocks,
})

import { PulseCollectionGridSection } from './components/pulse-collection-grid'
import { pulseCollectionGridSettings, pulseCollectionGridBlocks, pulseCollectionGridDefaults } from './schemas/pulse-collection-grid'

registerSection({
  type: 'pulse-collection-grid',
  label: 'Pulse collection grid',
  category: 'commerce',
  Component: PulseCollectionGridSection,
  settingsSchema: pulseCollectionGridSettings,
  blockTypes: pulseCollectionGridBlocks,
  defaultSettings: pulseCollectionGridDefaults.settings,
  defaultBlocks: pulseCollectionGridDefaults.blocks,
})

import { PulseCartSection } from './components/pulse-cart'
import { pulseCartSettings, pulseCartBlocks, pulseCartDefaults } from './schemas/pulse-cart'

registerSection({
  type: 'pulse-cart',
  label: 'Pulse cart',
  category: 'commerce',
  Component: PulseCartSection,
  settingsSchema: pulseCartSettings,
  blockTypes: pulseCartBlocks,
  defaultSettings: pulseCartDefaults.settings,
  defaultBlocks: pulseCartDefaults.blocks,
})

import { PulseSearchSection } from './components/pulse-search'
import { pulseSearchSettings, pulseSearchBlocks, pulseSearchDefaults } from './schemas/pulse-search'

registerSection({
  type: 'pulse-search',
  label: 'Pulse search',
  category: 'commerce',
  Component: PulseSearchSection,
  settingsSchema: pulseSearchSettings,
  blockTypes: pulseSearchBlocks,
  defaultSettings: pulseSearchDefaults.settings,
  defaultBlocks: pulseSearchDefaults.blocks,
})

// --- Olea commerce sections ---

import { OleaPageBannerSection } from './components/olea-page-banner'
import { oleaPageBannerSettings, oleaPageBannerBlocks, oleaPageBannerDefaults } from './schemas/olea-page-banner'

registerSection({
  type: 'olea-page-banner',
  label: 'Olea page banner',
  category: 'commerce',
  Component: OleaPageBannerSection,
  settingsSchema: oleaPageBannerSettings,
  blockTypes: oleaPageBannerBlocks,
  defaultSettings: oleaPageBannerDefaults.settings,
  defaultBlocks: oleaPageBannerDefaults.blocks,
})

import { OleaProductSection } from './components/olea-product'
import { oleaProductSettings, oleaProductBlocks, oleaProductDefaults } from './schemas/olea-product'

registerSection({
  type: 'olea-product',
  label: 'Olea product',
  category: 'commerce',
  Component: OleaProductSection,
  settingsSchema: oleaProductSettings,
  blockTypes: oleaProductBlocks,
  defaultSettings: oleaProductDefaults.settings,
  defaultBlocks: oleaProductDefaults.blocks,
})

import { OleaCollectionGridSection } from './components/olea-collection-grid'
import { oleaCollectionGridSettings, oleaCollectionGridBlocks, oleaCollectionGridDefaults } from './schemas/olea-collection-grid'

registerSection({
  type: 'olea-collection-grid',
  label: 'Olea collection grid',
  category: 'commerce',
  Component: OleaCollectionGridSection,
  settingsSchema: oleaCollectionGridSettings,
  blockTypes: oleaCollectionGridBlocks,
  defaultSettings: oleaCollectionGridDefaults.settings,
  defaultBlocks: oleaCollectionGridDefaults.blocks,
})

import { OleaCollectionListSection } from './components/olea-collection-list'
import { oleaCollectionListSettings, oleaCollectionListBlocks, oleaCollectionListDefaults } from './schemas/olea-collection-list'

registerSection({
  type: 'olea-collection-list',
  label: 'Olea collection list',
  category: 'commerce',
  Component: OleaCollectionListSection,
  settingsSchema: oleaCollectionListSettings,
  blockTypes: oleaCollectionListBlocks,
  defaultSettings: oleaCollectionListDefaults.settings,
  defaultBlocks: oleaCollectionListDefaults.blocks,
})

import { OleaCartSection } from './components/olea-cart'
import { oleaCartSettings, oleaCartBlocks, oleaCartDefaults } from './schemas/olea-cart'

registerSection({
  type: 'olea-cart',
  label: 'Olea cart',
  category: 'commerce',
  Component: OleaCartSection,
  settingsSchema: oleaCartSettings,
  blockTypes: oleaCartBlocks,
  defaultSettings: oleaCartDefaults.settings,
  defaultBlocks: oleaCartDefaults.blocks,
})

import { OleaSearchSection } from './components/olea-search'
import { oleaSearchSettings, oleaSearchBlocks, oleaSearchDefaults } from './schemas/olea-search'

registerSection({
  type: 'olea-search',
  label: 'Olea search',
  category: 'commerce',
  Component: OleaSearchSection,
  settingsSchema: oleaSearchSettings,
  blockTypes: oleaSearchBlocks,
  defaultSettings: oleaSearchDefaults.settings,
  defaultBlocks: oleaSearchDefaults.blocks,
})

// --- Atlas commerce sections ---

import { AtlasPageBannerSection } from './components/atlas-page-banner'
import { atlasPageBannerSettings, atlasPageBannerBlocks, atlasPageBannerDefaults } from './schemas/atlas-page-banner'

registerSection({
  type: 'atlas-page-banner',
  label: 'Atlas page banner',
  category: 'commerce',
  Component: AtlasPageBannerSection,
  settingsSchema: atlasPageBannerSettings,
  blockTypes: atlasPageBannerBlocks,
  defaultSettings: atlasPageBannerDefaults.settings,
  defaultBlocks: atlasPageBannerDefaults.blocks,
})

import { AtlasProductSection } from './components/atlas-product'
import { atlasProductSettings, atlasProductBlocks, atlasProductDefaults } from './schemas/atlas-product'

registerSection({
  type: 'atlas-product',
  label: 'Atlas product',
  category: 'commerce',
  Component: AtlasProductSection,
  settingsSchema: atlasProductSettings,
  blockTypes: atlasProductBlocks,
  defaultSettings: atlasProductDefaults.settings,
  defaultBlocks: atlasProductDefaults.blocks,
})

import { AtlasCollectionGridSection } from './components/atlas-collection-grid'
import { atlasCollectionGridSettings, atlasCollectionGridBlocks, atlasCollectionGridDefaults } from './schemas/atlas-collection-grid'

registerSection({
  type: 'atlas-collection-grid',
  label: 'Atlas collection grid',
  category: 'commerce',
  Component: AtlasCollectionGridSection,
  settingsSchema: atlasCollectionGridSettings,
  blockTypes: atlasCollectionGridBlocks,
  defaultSettings: atlasCollectionGridDefaults.settings,
  defaultBlocks: atlasCollectionGridDefaults.blocks,
})

import { AtlasCollectionListSection } from './components/atlas-collection-list'
import { atlasCollectionListSettings, atlasCollectionListBlocks, atlasCollectionListDefaults } from './schemas/atlas-collection-list'

registerSection({
  type: 'atlas-collection-list',
  label: 'Atlas collection list',
  category: 'commerce',
  Component: AtlasCollectionListSection,
  settingsSchema: atlasCollectionListSettings,
  blockTypes: atlasCollectionListBlocks,
  defaultSettings: atlasCollectionListDefaults.settings,
  defaultBlocks: atlasCollectionListDefaults.blocks,
})

import { AtlasCartSection } from './components/atlas-cart'
import { atlasCartSettings, atlasCartBlocks, atlasCartDefaults } from './schemas/atlas-cart'

registerSection({
  type: 'atlas-cart',
  label: 'Atlas cart',
  category: 'commerce',
  Component: AtlasCartSection,
  settingsSchema: atlasCartSettings,
  blockTypes: atlasCartBlocks,
  defaultSettings: atlasCartDefaults.settings,
  defaultBlocks: atlasCartDefaults.blocks,
})

import { AtlasSearchSection } from './components/atlas-search'
import { atlasSearchSettings, atlasSearchBlocks, atlasSearchDefaults } from './schemas/atlas-search'

registerSection({
  type: 'atlas-search',
  label: 'Atlas search',
  category: 'commerce',
  Component: AtlasSearchSection,
  settingsSchema: atlasSearchSettings,
  blockTypes: atlasSearchBlocks,
  defaultSettings: atlasSearchDefaults.settings,
  defaultBlocks: atlasSearchDefaults.blocks,
})
