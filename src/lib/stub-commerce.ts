export interface StubProduct {
  id: string
  handle: string
  title: string
  price: number
  compare_at_price?: number
  description: string
  media: Array<{ url: string; alt: string }>
  variants: Array<{ id: string; title: string; price: number; available: boolean }>
}

export interface StubCollection {
  id: string
  handle: string
  title: string
  description: string
  image?: string
  products: StubProduct[]
}

export interface StubCart {
  id: string
  lines: Array<{ id: string; product: StubProduct; variant_id: string; quantity: number }>
  subtotal: number
  total: number
}

const PRODUCTS: StubProduct[] = [
  {
    id: 'p1',
    handle: 'classic-tee',
    title: 'Classic tee',
    price: 28,
    description: 'Soft cotton crewneck. Ethically made.',
    media: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', alt: 'Classic tee' }],
    variants: [
      { id: 'v1', title: 'S', price: 28, available: true },
      { id: 'v2', title: 'M', price: 28, available: true },
      { id: 'v3', title: 'L', price: 28, available: false },
    ],
  },
  {
    id: 'p2',
    handle: 'denim-jacket',
    title: 'Denim jacket',
    price: 145,
    description: 'Heavyweight 14oz selvedge denim.',
    media: [{ url: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800', alt: 'Denim jacket' }],
    variants: [
      { id: 'v1', title: 'S', price: 145, available: true },
      { id: 'v2', title: 'M', price: 145, available: true },
    ],
  },
  {
    id: 'p3',
    handle: 'wool-beanie',
    title: 'Wool beanie',
    price: 38,
    description: 'Merino wool, ribbed knit.',
    media: [{ url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', alt: 'Wool beanie' }],
    variants: [{ id: 'v1', title: 'One size', price: 38, available: true }],
  },
  {
    id: 'p4',
    handle: 'leather-belt',
    title: 'Leather belt',
    price: 65,
    description: 'Full-grain veg-tan leather, brass buckle.',
    media: [{ url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800', alt: 'Leather belt' }],
    variants: [
      { id: 'v1', title: '32', price: 65, available: true },
      { id: 'v2', title: '34', price: 65, available: true },
    ],
  },
  {
    id: 'p5',
    handle: 'canvas-tote',
    title: 'Canvas tote',
    price: 24,
    description: 'Heavy 16oz canvas, reinforced straps.',
    media: [{ url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800', alt: 'Canvas tote' }],
    variants: [
      { id: 'v1', title: 'Natural', price: 24, available: true },
      { id: 'v2', title: 'Black', price: 24, available: true },
    ],
  },
]

const COLLECTIONS: StubCollection[] = [
  {
    id: 'c1',
    handle: 'apparel',
    title: 'Apparel',
    description: 'Clothing essentials.',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1200',
    products: [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]],
  },
  {
    id: 'c2',
    handle: 'accessories',
    title: 'Accessories',
    description: 'Finishing touches.',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1200',
    products: [PRODUCTS[3], PRODUCTS[4]],
  },
]

const CART: StubCart = {
  id: 'cart1',
  lines: [
    { id: 'l1', product: PRODUCTS[0], variant_id: 'v2', quantity: 2 },
    { id: 'l2', product: PRODUCTS[2], variant_id: 'v1', quantity: 1 },
  ],
  subtotal: 28 * 2 + 38,
  total: 28 * 2 + 38,
}

export function getProducts(): StubProduct[] {
  return PRODUCTS
}

export function getProduct(handle?: string): StubProduct {
  return PRODUCTS.find((p) => p.handle === handle) ?? PRODUCTS[0]
}

export function getCollections(): StubCollection[] {
  return COLLECTIONS
}

export function getCollection(handle?: string): StubCollection {
  return COLLECTIONS.find((c) => c.handle === handle) ?? COLLECTIONS[0]
}

export function getCart(): StubCart {
  return CART
}
