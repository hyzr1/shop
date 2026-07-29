import {
  BarChart3, Search, Mail, MessageSquare, Send, ShoppingCart,
  Calendar, PenLine, Image, Share2, Lock, Code2, Puzzle, type LucideIcon,
} from 'lucide-react'

export const pluginIcons: Record<string, LucideIcon> = {
  analytics: BarChart3,
  'seo-tools': Search,
  'contact-form': Mail,
  'live-chat': MessageSquare,
  'email-marketing': Send,
  ecommerce: ShoppingCart,
  booking: Calendar,
  blog: PenLine,
  gallery: Image,
  'social-feed': Share2,
  'password-protect': Lock,
  'custom-code': Code2,
}

export function pluginIcon(slug: string): LucideIcon {
  return pluginIcons[slug] ?? Puzzle
}

export const categoryColors: Record<string, string> = {
  Analytics: 'from-blue-500 to-cyan-500',
  Marketing: 'from-pink-500 to-rose-500',
  Communication: 'from-violet-500 to-purple-500',
  Commerce: 'from-emerald-500 to-teal-500',
  Content: 'from-amber-500 to-orange-500',
  Social: 'from-sky-500 to-indigo-500',
  Security: 'from-red-500 to-rose-500',
  Developer: 'from-slate-500 to-gray-600',
}
