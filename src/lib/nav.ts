import {
  LayoutDashboard, Globe, Puzzle, LayoutTemplate,
  CreditCard, Settings, BarChart3, type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

export const navSections: { heading?: string; items: NavItem[] }[] = [
  {
    items: [
      { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
      { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    heading: 'Build',
    items: [
      { href: '/dashboard/sites', label: 'Sites', icon: Globe },
      { href: '/dashboard/templates', label: 'Templates', icon: LayoutTemplate },
      { href: '/dashboard/plugins', label: 'Plugins', icon: Puzzle },
    ],
  },
  {
    heading: 'Account',
    items: [
      { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
      { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ],
  },
]
