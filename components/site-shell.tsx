'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingBag, X, ArrowUpRight, Home, Utensils, ChefHat, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navItems, syncWithDatabase } from '@/lib/marudeni-data'
import { CartModal } from '@/components/menu-components'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [cartOpen, setCartOpen] = useState(false)
  const [count, setCount] = useState(0)
  const [showEyeOpener, setShowEyeOpener] = useState(true)

  useEffect(() => {
    // Sync with database
    syncWithDatabase()

    const update = () => {
      setCount(Number(window.sessionStorage.getItem('marudeni-cart-count') || 0))
    }
    update()
    window.addEventListener('cart-updated', update)
    return () => window.removeEventListener('cart-updated', update)
  }, [])

  const isHome = pathname === '/'
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <div className="min-h-screen bg-background text-foreground">{children}</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
      {showEyeOpener && (
        <div className="fixed inset-0 z-[100] animate-eye-fade-out flex flex-col pointer-events-none">
          {/* Top eyelid panel */}
          <div className="flex-1 bg-primary w-full animate-slide-up origin-top relative flex items-end justify-center pb-8 border-b border-border/20">
            <div className="mb-[-30px] z-50 bg-primary p-2 rounded-full border border-border/20 flex items-center justify-center">
              <Image src="/logo.svg" alt="logo" width={48} height={48} className="opacity-80 animate-pulse duration-1000" />
            </div>
          </div>
          {/* Bottom eyelid panel */}
          <div className="flex-1 bg-primary w-full animate-slide-down origin-bottom" />
        </div>
      )}
      <header
        className={`z-40 w-full transition-all duration-300 ${isHome
            ? 'absolute top-0 bg-transparent border-b border-white/10'
            : 'sticky top-0 bg-secondary/95 border-b border-border/20 backdrop-blur-md shadow-sm'
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-serif text-2xl font-bold tracking-tight text-white transition-colors"
          >
            <Image src="/logo.svg" alt="Marudeni Foods Logo" width={38} height={38} className="object-contain" />
            <span>
              marudeni<span className="text-border">.</span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 p-1 rounded-full lg:flex bg-white/5 border border-white/10"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-full transition-all duration-300 ${pathname === item.href
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-white/80 hover:bg-white/10 hover:text-white hover:scale-[1.02]'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all border-white/20 text-white hover:bg-white/10"
              aria-label="Open your cart"
            >
              <ShoppingBag data-icon="inline-start" className="size-4 text-border" />
              <span className="hidden sm:inline">Your cart</span>
              {count > 0 && (
                <span
                  className="flex size-5 items-center justify-center rounded-full text-xs font-bold bg-white text-primary"
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {children}

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/20 bg-background/95 backdrop-blur-md lg:hidden px-4 py-2.5 shadow-lg">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          <Link
            href="/menu"
            className="flex flex-col items-center gap-1"
          >
            <div
              className={`rounded-full px-5 py-1 flex items-center justify-center transition-all duration-300 ${pathname === '/menu'
                  ? 'bg-secondary text-border border border-border/20 shadow-sm scale-105'
                  : 'bg-transparent text-primary/50 hover:bg-secondary/10'
                }`}
            >
              <Utensils className={`size-4 transition-colors ${pathname === '/menu' ? 'text-border' : 'text-primary/50'}`} />
            </div>
            <span
              className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${pathname === '/menu' ? 'text-primary font-black' : 'text-primary/50'
                }`}
            >
              Menu
            </span>
          </Link>

          <Link
            href="/catering"
            className="flex flex-col items-center gap-1"
          >
            <div
              className={`rounded-full px-5 py-1 flex items-center justify-center transition-all duration-300 ${pathname === '/catering'
                  ? 'bg-secondary text-border border border-border/20 shadow-sm scale-105'
                  : 'bg-transparent text-primary/50 hover:bg-secondary/10'
                }`}
            >
              <ChefHat className={`size-4 transition-colors ${pathname === '/catering' ? 'text-border' : 'text-primary/50'}`} />
            </div>
            <span
              className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${pathname === '/catering' ? 'text-primary font-black' : 'text-primary/50'
                }`}
            >
              Catering
            </span>
          </Link>

          <Link
            href="/contact"
            className="flex flex-col items-center gap-1"
          >
            <div
              className={`rounded-full px-5 py-1 flex items-center justify-center transition-all duration-300 ${pathname === '/contact'
                  ? 'bg-secondary text-border border border-border/20 shadow-sm scale-105'
                  : 'bg-transparent text-primary/50 hover:bg-secondary/10'
                }`}
            >
              <Phone className={`size-4 transition-colors ${pathname === '/contact' ? 'text-border' : 'text-primary/50'}`} />
            </div>
            <span
              className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${pathname === '/contact' ? 'text-primary font-black' : 'text-primary/50'
                }`}
            >
              Contact
            </span>
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="flex flex-col items-center gap-1"
          >
            <div className="rounded-full bg-transparent px-5 py-1 flex items-center justify-center hover:bg-secondary/10 relative transition-all duration-300">
              <ShoppingBag className="size-4 text-primary/50" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex size-3.5 items-center justify-center rounded-full bg-border text-[8px] font-bold text-primary">
                  {count}
                </span>
              )}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-primary/50">
              Cart
            </span>
          </button>
        </div>
      </nav>

      <footer className="hidden lg:block border-t border-border/20 bg-secondary py-12 text-white lg:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <Link href="/" className="flex items-center gap-3 font-serif text-3xl font-bold text-white">
              <Image
                src="/logo.svg"
                alt="Marudeni Foods Logo"
                width={48}
                height={48}
                className="object-contain bg-white/10 p-1 rounded-xl"
              />
              <span>
                marudeni<span className="text-border">.</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/80">
              Authentic Nigerian flavors crafted with the finest ingredients for unforgettable moments.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-border">
              <span className="inline-block size-2 rounded-full bg-[#008751]" />
              Proudly Nigerian
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/90">
            <Link href="/menu" className="hover:text-border">
              Menu
            </Link>
            <Link href="/catering" className="hover:text-border">
              Catering
            </Link>
            <Link href="/about" className="hover:text-border">
              Our story
            </Link>
            <Link href="/contact" className="hover:text-border">
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3 lg:items-end text-left lg:text-right">
            <div className="flex gap-4 lg:justify-end">
              <a
                href="https://www.facebook.com/marudenifoods"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-border hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/marudenifoods"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-border hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="size-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@marudeni.foods"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-border hover:scale-110 transition-all duration-300"
                aria-label="TikTok"
              >
                <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.99 2.07 1.68 3.39 1.95v3.91c-1.42-.01-2.81-.46-4.01-1.25-.26-.17-.5-.36-.73-.56-.03 2.92.01 5.84-.02 8.76-.08 1.4-.49 2.81-1.34 3.92-1.2 1.61-3.21 2.61-5.26 2.51-2.22-.05-4.42-1.34-5.32-3.37-1.12-2.38-.41-5.4 1.63-7.03 1.29-.98 2.94-1.38 4.54-1.13v3.98c-.89-.25-1.89-.04-2.58.58-.69.64-.94 1.65-.67 2.54.29.89 1.15 1.56 2.1 1.56 1.48.06 2.76-1.04 2.89-2.51.08-3.05.02-6.1.04-9.15.01-4.28-.02-8.56.03-12.84z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@marudenifoods"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-border hover:scale-110 transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-white/50">© 2026 Marudeni Foods. Premium experience.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
