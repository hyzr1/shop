export interface TemplateContent {
  brandName: string
  headline: string
  subhead: string
  ctaText: string
}

export interface Template {
  id: string
  name: string
  tagline: string
  category: string
  accent: string
  /** which preview design to render */
  style: 'editorial' | 'academy' | 'minimal' | 'market' | 'gallery' | 'menu' | 'landing'
  popular?: boolean
  /** has a full, real multi-section site at /preview/<id> */
  live?: boolean
  content: TemplateContent
}

/** Route to the live demo for a template, or null if not built yet. */
export function liveDemo(id: string): string | null {
  return templates.find((t) => t.id === id)?.live ? `/preview/${id}` : null
}

export const templates: Template[] = [
  {
    id: 'atlas', name: 'Atlas', tagline: 'Cinematic architecture studio portfolio',
    category: 'Creative', accent: '#a65e40', style: 'gallery', popular: true, live: true,
    content: { brandName: 'ATLAS', headline: 'Buildings that listen to the land.', subhead: 'Quiet spaces shaped by material, light, and landscape.', ctaText: 'View work' },
  },
  {
    id: 'olea', name: 'Olea', tagline: 'Editorial botanical skincare storefront',
    category: 'E-commerce', accent: '#58624a', style: 'editorial', popular: true, live: true,
    content: { brandName: 'OLÉA', headline: 'Skin, returned to rhythm.', subhead: 'High-performance botanical skin rituals.', ctaText: 'Discover the collection' },
  },
  {
    id: 'arbor', name: 'Arbor', tagline: 'Cinematic AI infrastructure and research studio',
    category: 'Technology', accent: '#ff4f3d', style: 'landing', popular: true, live: true,
    content: { brandName: 'ARBOR', headline: 'Intelligence that compounds.', subhead: 'Adaptive infrastructure for reliable agent systems.', ctaText: 'Explore the system' },
  },
  {
    id: 'halcyon', name: 'Halcyon', tagline: 'Remote coastal retreat and booking site',
    category: 'Business', accent: '#6e8589', style: 'gallery', popular: true, live: true,
    content: { brandName: 'HALCYON', headline: 'Stay where the morning slows.', subhead: 'A quiet coastal retreat for salt air and unstructured days.', ctaText: 'Reserve a cabin' },
  },
  {
    id: 'aurora', name: 'Aurora', tagline: 'Editorial storefront for fashion & apparel',
    category: 'E-commerce', accent: '#7c3aed', style: 'editorial', popular: true, live: true,
    content: { brandName: 'AURORA', headline: 'The new season, defined.', subhead: 'Considered pieces, made to last.', ctaText: 'Shop collection' },
  },
  {
    id: 'lucent', name: 'Lucent', tagline: 'Luminous orchestration platform for AI agents',
    category: 'Technology', accent: '#5d5cff', style: 'landing', popular: true, live: true,
    content: { brandName: 'LUCENT', headline: 'Build agents that move in concert.', subhead: 'One operating system for intelligent work.', ctaText: 'Start building' },
  },
  {
    id: 'forge', name: 'Forge', tagline: 'Cohort academy for practical, project-led courses',
    category: 'Education', accent: '#d9ff65', style: 'academy', popular: true, live: true,
    content: { brandName: 'FORGE', headline: 'Build proof, not just a portfolio.', subhead: 'A hands-on learning studio for ambitious digital makers.', ctaText: 'Explore the cohort' },
  },
  {
    id: 'pulse', name: 'Pulse', tagline: 'Conversion-focused SaaS landing page',
    category: 'Startup', accent: '#6366f1', style: 'landing', popular: true, live: true,
    content: { brandName: 'Pulse', headline: 'Ship faster than ever.', subhead: 'The all-in-one platform for modern teams.', ctaText: 'Get started free' },
  },
  {
    id: 'mono', name: 'Mono', tagline: 'Minimal portfolio that lets work speak',
    category: 'Portfolio', accent: '#111111', style: 'minimal', popular: true,
    content: { brandName: 'Jordan Reye', headline: 'Designer & developer building thoughtful products.', subhead: 'Currently open to new work.', ctaText: 'View projects' },
  },
  {
    id: 'bazaar', name: 'Bazaar', tagline: 'Vibrant marketplace for many products',
    category: 'E-commerce', accent: '#ea580c', style: 'market',
    content: { brandName: 'Bazaar', headline: 'Everything you love, in one place.', subhead: 'Free shipping on orders over $50.', ctaText: 'Start shopping' },
  },
  {
    id: 'frame', name: 'Frame', tagline: 'Full-bleed galleries for photographers',
    category: 'Creative', accent: '#0ea5e9', style: 'gallery',
    content: { brandName: 'FRAME', headline: 'Light, captured.', subhead: 'Selected work, 2021 — 2026.', ctaText: 'View gallery' },
  },
  {
    id: 'plate', name: 'Plate', tagline: 'Menus & reservations for restaurants',
    category: 'Business', accent: '#16a34a', style: 'menu',
    content: { brandName: 'Plate', headline: 'Seasonal plates, made daily.', subhead: 'Open Tue–Sun · 5pm til late.', ctaText: 'Book a table' },
  },
]

export function getTemplate(id: string) {
  return templates.find((t) => t.id === id) ?? templates[0]
}
