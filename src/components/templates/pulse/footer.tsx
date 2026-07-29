import { Zap } from 'lucide-react'

const cols = [
  { h: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
  { h: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
  { h: 'Resources', links: ['Docs', 'API', 'Status', 'Community'] },
]

export function PulseFooter() {
  return (
    <footer className="p-footer">
      <div className="p-container">
        <div className="p-footer-top">
          <div className="p-footer-brand">
            <a href="#" className="p-brand"><span className="p-brand-mark"><Zap size={16} fill="currentColor" /></span> Pulse</a>
            <p>The all-in-one platform for modern teams to plan, build, and ship — faster than ever.</p>
          </div>
          {cols.map((c) => (
            <div key={c.h} className="p-footer-col">
              <h5>{c.h}</h5>
              {c.links.map((l) => <a key={l} href="#">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="p-footer-bottom">
          <span>© {new Date().getFullYear()} Pulse, Inc. · Built on Hyzr</span>
          <span>Privacy · Terms · Security</span>
        </div>
      </div>
    </footer>
  )
}
