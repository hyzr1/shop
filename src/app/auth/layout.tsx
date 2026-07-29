import { Logo } from '@/components/ui/logo'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <header className="relative z-10 flex items-center justify-between px-6 py-5">
        <Link href="/" aria-label="Hyzr home"><Logo size={20} /></Link>
      </header>
      <main className="relative z-10 flex flex-1 items-start justify-center px-6 pt-[8vh] pb-24">
        <div className="w-full max-w-[380px] animate-in">{children}</div>
      </main>
    </div>
  )
}
