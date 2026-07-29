'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useReveal } from '@/components/templates/aurora/use-reveal'
import { Magnetic } from '@/components/templates/aurora/magnetic'
import { faqs } from '@/components/templates/aurora/data'
import { Plus, MessageCircle } from 'lucide-react'

export default function AuroraFAQ() {
  const ref = useReveal<HTMLDivElement>()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div ref={ref}>
      <div className="a-page-head a-container">
        <div className="a-crumb" style={{ justifyContent: 'center' }}>
          <Link href="/preview/aurora">Home</Link> <span>/</span> <span>FAQ</span>
        </div>
        <h1><span className="a-mask"><span>Questions, <em className="a-display">answered</em></span></span></h1>
        <p className="a-lede">Everything you need to know about ordering, shipping, and caring for your Aurora pieces.</p>
      </div>

      <section className="a-section a-container" style={{ paddingTop: 'clamp(40px,5vw,72px)' }}>
        <div className="a-faq" data-reveal-stagger>
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>

        {/* still need help */}
        <div className="a-cta" style={{ marginTop: 72 }}>
          <div className="a-cta-glow" />
          <div className="a-cta-inner">
            <span className="a-eyebrow" style={{ color: 'var(--spark)' }}>Still curious?</span>
            <h2 className="a-h2" style={{ marginTop: 18 }}><span className="a-display">We’re here</span> to help.</h2>
            <p className="a-cta-note" style={{ marginTop: 16, fontSize: 15, maxWidth: 420 }}>
              Our team replies within one business day — usually much sooner.
            </p>
            <div style={{ marginTop: 28 }}>
              <Magnetic><Link href="/preview/aurora/contact" className="a-btn a-btn-lg" data-cursor style={{ background: 'var(--bg)', color: 'var(--ink)' }}>
                <MessageCircle size={16} /> Contact support
              </Link></Magnetic>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`a-faq-item ${open ? 'open' : ''}`}>
      <button className="a-faq-q" onClick={onToggle} data-cursor>
        {q}
        <span className="a-faq-ico"><Plus size={15} /></span>
      </button>
      <div className="a-faq-a" style={{ maxHeight: open ? '20rem' : 0 }}>
        <div className="a-faq-a-inner">{a}</div>
      </div>
    </div>
  )
}
