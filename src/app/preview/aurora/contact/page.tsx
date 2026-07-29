'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useReveal } from '@/components/templates/aurora/use-reveal'
import { Magnetic } from '@/components/templates/aurora/magnetic'
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react'

export default function AuroraContact() {
  const ref = useReveal<HTMLDivElement>()
  const [sent, setSent] = useState(false)

  return (
    <div ref={ref}>
      <div className="a-page-head a-container">
        <div className="a-crumb" style={{ justifyContent: 'center' }}>
          <Link href="/preview/aurora">Home</Link> <span>/</span> <span>Contact</span>
        </div>
        <h1><span className="a-mask"><span>Let’s <em className="a-display">talk</em></span></span></h1>
        <p className="a-lede">Questions about an order, fit, or fabric? We’d love to help.</p>
      </div>

      <section className="a-section a-container" style={{ paddingTop: 'clamp(40px,5vw,72px)' }}>
        <div className="a-contact">
          <div className="a-contact-side" data-reveal>
            <h2 className="a-h2" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
              Reach the <em className="a-display">studio</em>.
            </h2>
            <p className="a-lede">We read every message and reply within one business day. For order issues, include your order number for a faster response.</p>
            <div className="a-contact-methods" data-reveal-stagger>
              {[
                { icon: Mail, h: 'Email', p: 'hello@aurora.studio' },
                { icon: Phone, h: 'Phone', p: '+1 (415) 555-0117 · Mon–Fri, 9–5 PT' },
                { icon: MapPin, h: 'Studio', p: '244 Valencia St, San Francisco, CA' },
              ].map((m) => (
                <div className="a-contact-method" key={m.h}>
                  <span className="ico"><m.icon size={19} /></span>
                  <div><h4>{m.h}</h4><p>{m.p}</p></div>
                </div>
              ))}
            </div>
          </div>

          <form className="a-form" data-reveal onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={44} color="var(--accent-deep)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Message sent</h3>
                <p className="a-lede" style={{ marginTop: 8 }}>Thanks for reaching out — we’ll be in touch shortly.</p>
              </div>
            ) : (
              <>
                <div className="a-form-row">
                  <div className="a-field"><label>First name</label><input placeholder="Jane" required /></div>
                  <div className="a-field"><label>Last name</label><input placeholder="Cooper" required /></div>
                </div>
                <div className="a-field"><label>Email</label><input type="email" placeholder="you@email.com" required /></div>
                <div className="a-field"><label>Order number (optional)</label><input placeholder="#AUR-00000" /></div>
                <div className="a-field"><label>Message</label><textarea placeholder="How can we help?" required /></div>
                <Magnetic strength={0.15}>
                  <button className="a-btn a-btn-primary a-btn-lg" type="submit" data-cursor style={{ width: '100%', justifyContent: 'center' }}>
                    <Send size={16} /> Send message
                  </button>
                </Magnetic>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
