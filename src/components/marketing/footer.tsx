import Link from 'next/link'
import { Logo } from '@/components/ui/logo'

const cols = [
  {
    h: 'Product',
    links: [
      ['Templates', '#templates'],
      ['Features', '#features'],
      ['Pricing', '#pricing'],
      ['Plugins', '/dashboard/plugins'],
      ["What's new", '#'],
    ],
  },
  {
    h: 'Company',
    links: [
      ['About', '#'],
      ['Customers', '#customers'],
      ['Blog', '#'],
      ['Careers', '#'],
      ['Contact', '#'],
    ],
  },
  {
    h: 'Resources',
    links: [
      ['Docs', '#'],
      ['Help center', '#'],
      ['Community', '#'],
      ['Changelog', '#'],
      ['Status', '#'],
    ],
  },
]

/** Inline X logo (Lucide v1.18 has no Twitter icon). */
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.34 8.39L23 22h-6.828l-5.345-6.987L4.5 22H1.243l7.854-8.974L1 2h6.99l4.828 6.385L18.244 2Zm-1.196 18h1.84L7.04 4h-1.97l11.978 16Z" />
    </svg>
  )
}

/** Inline LinkedIn logo. */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

/** Inline GitHub logo. */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.69-3.87-1.39-3.87-1.39-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.48 3.15-1.17 3.15-1.17.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.05.78 2.12v3.14c0 .31.21.68.8.56C20.21 21.38 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

export function MarketingFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer-top">
          <div className="lp-footer-brand">
            <Logo size={20} />
            <p>
              The platform to build, host, and grow your brand on your own corner of hyzr.ai.
              A site for every field — fully yours.
            </p>
            <div className="lp-footer-social" aria-label="Social media">
              <a href="#" aria-label="Hyzr on X / Twitter"><XIcon className="h-[14px] w-[14px]" /></a>
              <a href="#" aria-label="Hyzr on LinkedIn"><LinkedInIcon className="h-[14px] w-[14px]" /></a>
              <a href="#" aria-label="Hyzr on GitHub"><GitHubIcon className="h-[14px] w-[14px]" /></a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h} className="lp-footer-col">
              <h5>{c.h}</h5>
              {c.links.map(([label, href]) => (
                <Link key={label} href={href}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="lp-footer-bottom">
          <span>© {new Date().getFullYear()} Hyzr Labs, Inc. All rights reserved.</span>
          <div className="lp-footer-legal">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Security</Link>
            <Link href="#">Status</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
