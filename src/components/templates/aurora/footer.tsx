import Link from 'next/link'

const cols = [
  { h: 'Shop', links: ['New arrivals', 'Knitwear', 'Outerwear', 'Accessories'] },
  { h: 'Company', links: ['Our story', 'Sustainability', 'Careers', 'Press'] },
  { h: 'Support', links: ['Shipping', 'Returns', 'Size guide', 'Contact'] },
]

export function AuroraFooter() {
  return (
    <footer className="a-footer">
      <div className="a-container">
        <div className="a-footer-top">
          <div className="a-footer-brand">
            <Link href="/preview/aurora" className="a-brand"><span className="a-brand-mark">A</span> Aurora</Link>
            <p>Considered clothing, made to last. Natural fibers, honest craft, and a lower footprint — designed in studio, worn for years.</p>
          </div>
          {cols.map((c) => (
            <div key={c.h} className="a-footer-col">
              <h5>{c.h}</h5>
              {c.links.map((l) => <Link key={l} href="/preview/aurora/products">{l}</Link>)}
            </div>
          ))}
        </div>
        <div className="a-footer-word">aurora</div>
        <div className="a-footer-bottom">
          <span>© {new Date().getFullYear()} Aurora Studio · Built on Hyzr</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  )
}
