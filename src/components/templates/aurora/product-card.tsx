import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { AuroraProduct } from './data'

export function ProductCard({ product }: { product: AuroraProduct }) {
  return (
    <Link href={`/preview/aurora/products/${product.handle}`} className="a-card" data-reveal>
      <div className="a-card-media">
        <div className={product.img} />
        {product.tag && <span className="a-card-fly">{product.tag}</span>}
        <span className="a-card-add"><Plus size={18} strokeWidth={2} /></span>
      </div>
      <div className="a-card-foot">
        <div>
          <div className="a-card-name">{product.name}</div>
          <div className="a-card-meta">{product.category}</div>
        </div>
        <div className="a-card-price">${product.price}</div>
      </div>
    </Link>
  )
}
