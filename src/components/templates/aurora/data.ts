export interface AuroraProduct {
  handle: string
  name: string
  category: string
  price: number
  was?: number
  img: string // css class for faux imagery
  tag?: string
}

export const products: AuroraProduct[] = [
  { handle: 'cloud-knit-sweater', name: 'Cloud Knit Sweater', category: 'Knitwear', price: 148, img: 'a-img-1', tag: 'New' },
  { handle: 'ember-wool-coat', name: 'Ember Wool Coat', category: 'Outerwear', price: 320, was: 380, img: 'a-img-2', tag: 'Sale' },
  { handle: 'tide-oxford-shirt', name: 'Tide Oxford Shirt', category: 'Shirting', price: 96, img: 'a-img-3' },
  { handle: 'meadow-linen-trouser', name: 'Meadow Linen Trouser', category: 'Trousers', price: 124, img: 'a-img-4', tag: 'New' },
  { handle: 'orchid-silk-scarf', name: 'Orchid Silk Scarf', category: 'Accessories', price: 64, img: 'a-img-5' },
  { handle: 'rose-cashmere-beanie', name: 'Rose Cashmere Beanie', category: 'Accessories', price: 58, img: 'a-img-6' },
]

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle) ?? products[0]
}

export const faqs = [
  { q: 'What is your shipping policy?', a: 'We offer complimentary carbon-neutral shipping on all orders over $75. Standard orders arrive within 3–5 business days, and express options are available at checkout. Every parcel ships in recyclable, plastic-free packaging.' },
  { q: 'How do returns and exchanges work?', a: 'You have 30 days from delivery to return or exchange any unworn item with tags attached. Initiate a return from your account and we’ll email a prepaid label. Refunds are issued to your original payment method within 5 business days of us receiving the item.' },
  { q: 'How should I choose my size?', a: 'Each product page includes a detailed size guide with garment measurements. Our pieces are designed for a relaxed, true-to-size fit. If you’re between sizes, we recommend sizing down for a tailored look or up for extra ease.' },
  { q: 'What materials do you use?', a: 'We work exclusively with natural and responsibly-sourced fibers — organic cotton, traceable merino wool, European linen, and GRS-certified cashmere. Each material is chosen for longevity, comfort, and a lower environmental footprint.' },
  { q: 'Do you ship internationally?', a: 'Yes. We ship to over 60 countries. Duties and taxes are calculated at checkout for a transparent, all-in price with no surprises on delivery.' },
  { q: 'How do I care for my pieces?', a: 'Care instructions are printed on every garment and detailed on each product page. As a rule, cold-wash gently, lay flat to dry, and store knitwear folded. Treated well, these pieces are made to last for years.' },
]

export const testimonials = [
  { quote: 'The quality is genuinely exceptional. The wool coat has become the most-worn thing in my closet.', name: 'Maya Lindgren', role: 'Verified buyer', av: 'a-img-1' },
  { quote: 'Finally a brand that gets fit right. Considered details, beautiful fabric, and it arrived in two days.', name: 'Theo Park', role: 'Verified buyer', av: 'a-img-3' },
  { quote: 'Sustainable without compromise. You can feel the craftsmanship the moment you open the box.', name: 'Ada Okonkwo', role: 'Verified buyer', av: 'a-img-5' },
]
