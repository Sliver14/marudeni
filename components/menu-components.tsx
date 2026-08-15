'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ArrowRight, X, ShoppingBag, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CartLine, categories, findItem, menuItems, money, getStoredMenu, getStoredCategories } from '@/lib/marudeni-data'

function updateCart(id: string, delta: number) {
  const currentMenu = getStoredMenu()
  const cart: CartLine[] = JSON.parse(window.sessionStorage.getItem('marudeni-cart') || '[]')
  const next = [...cart]
  const line = next.find((item) => item.id === id)
  if (line) {
    line.quantity += delta
  } else if (delta > 0) {
    next.push({ id, quantity: delta })
  }
  const cleaned = next.filter((item) => item.quantity > 0 && currentMenu.some((m) => m.id === item.id))
  window.sessionStorage.setItem('marudeni-cart', JSON.stringify(cleaned))
  window.sessionStorage.setItem('marudeni-cart-count', String(cleaned.reduce((sum, item) => sum + item.quantity, 0)))
  window.dispatchEvent(new Event('cart-updated'))
}

export function AddButton({ id }: { id: string }) {
  const [added, setAdded] = useState(false)

  return (
    <button
      onClick={() => {
        updateCart(id, 1)
        setAdded(true)
        setTimeout(() => setAdded(false), 1200)
      }}
      className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground border border-border/40 hover:bg-primary/95 hover:border-border transition-all hover:scale-105"
    >
      {added ? '✓ Added' : 'Add to cart'}
    </button>
  )
}

export function MenuCard({ item }: { item: (typeof menuItems)[number] }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-border/30 bg-card shadow-sm hover:shadow-md transition-all duration-350">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-border border border-border/30 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-xl font-bold text-primary leading-tight">{item.name}</h3>
          <span className="font-bold text-border shrink-0">{money(item.price)}</span>
        </div>
        <p className="flex-1 text-sm leading-6 text-primary/75">{item.description}</p>
        <div className="pt-2">
          <AddButton id={item.id} />
        </div>
      </div>
    </article>
  )
}

export function MenuGrid() {
  const [items, setItems] = useState<any[]>([])
  const [cats, setCats] = useState<string[]>(['All'])
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setItems(getStoredMenu())
    setCats(['All', ...getStoredCategories()])

    const update = () => setItems(getStoredMenu())
    const updateCats = () => setCats(['All', ...getStoredCategories()])

    window.addEventListener('menu-updated', update)
    window.addEventListener('categories-updated', updateCats)

    return () => {
      window.removeEventListener('menu-updated', update)
      window.removeEventListener('categories-updated', updateCats)
    }
  }, [])

  const visible = items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 size-5" />
          <input
            type="text"
            placeholder="Search Jollof, stews, sides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-border/40 bg-card text-primary placeholder-primary/50 text-sm focus:outline-none focus:border-border font-medium shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="mb-8 flex gap-2.5 overflow-x-auto pb-3 scrollbar-none">
        {cats.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              category === item
                ? 'bg-primary text-border shadow-sm'
                : 'border border-border/40 hover:bg-secondary text-primary hover:text-border'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-12 rounded-3xl border-2 border-dashed border-border/30">
          <p className="font-serif text-xl font-bold text-primary">No delicacies found</p>
          <p className="text-sm text-primary/70 mt-1">Try resetting your search filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export function CartModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [count, setCount] = useState(0)

  const clearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      window.sessionStorage.setItem('marudeni-cart', '[]')
      window.sessionStorage.setItem('marudeni-cart-count', '0')
      window.dispatchEvent(new Event('cart-updated'))
    }
  }

  useEffect(() => {
    if (!open) return
    const update = () => {
      const currentMenu = getStoredMenu()
      const rawCart = JSON.parse(window.sessionStorage.getItem('marudeni-cart') || '[]')
      // Remove any items that no longer exist in the menu data
      const cleaned = rawCart.filter((item: any) => currentMenu.some((m) => m.id === item.id))
      
      if (cleaned.length !== rawCart.length) {
        window.sessionStorage.setItem('marudeni-cart', JSON.stringify(cleaned))
        window.sessionStorage.setItem('marudeni-cart-count', String(cleaned.reduce((sum: number, item: any) => sum + item.quantity, 0)))
      }

      setCount(cleaned.reduce((sum: number, item: any) => sum + item.quantity, 0))
    }
    update()
    window.addEventListener('cart-updated', update)
    return () => window.removeEventListener('cart-updated', update)
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-[4px] animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Your cart"
    >
      <button className="absolute inset-0 cursor-default" aria-label="Close cart" onClick={onClose} />
      <aside className="fixed inset-y-0 right-0 z-10 flex h-full w-full max-w-lg flex-col bg-background shadow-2xl transition-all duration-300 rounded-none border-l border-l-border/20">
        <div className="flex items-start justify-between border-b border-border/20 px-5 py-5 sm:px-8">
          <div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] text-border">Marudeni Foods</p>
            <h2 className="mt-1 font-serif text-xl sm:text-2xl md:text-3xl font-black text-primary leading-tight">
              Your cart {count > 0 && `(${count})`}
            </h2>
            <p className="mt-1 text-[10px] sm:text-xs text-primary/70">A little taste of home, ready when you are.</p>
          </div>
          <div className="flex items-center gap-3">
            {count > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors px-3 py-1.5 rounded-full hover:bg-red-500/10"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/40 hover:bg-secondary text-primary hover:text-white transition-all"
              aria-label="Close cart"
            >
              <X className="size-4 sm:size-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-none px-5 py-5 sm:px-8">
          <CartView isModal onClose={onClose} />
        </div>
      </aside>
    </div>
  )
}

export function CartView({ isModal = false, onClose }: { isModal?: boolean; onClose?: () => void }) {
  const [cart, setCart] = useState<CartLine[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const currentMenu = getStoredMenu()
    const rawCart: CartLine[] = JSON.parse(window.sessionStorage.getItem('marudeni-cart') || '[]')
    const cleaned = rawCart.filter((item) => currentMenu.some((m) => m.id === item.id))
    
    if (cleaned.length !== rawCart.length) {
      window.sessionStorage.setItem('marudeni-cart', JSON.stringify(cleaned))
      window.sessionStorage.setItem('marudeni-cart-count', String(cleaned.reduce((sum, item) => sum + item.quantity, 0)))
      window.dispatchEvent(new Event('cart-updated'))
    }

    setCart(cleaned)
    setReady(true)
  }, [])

  const sync = (id: string, delta: number) => {
    updateCart(id, delta)
    setCart(JSON.parse(window.sessionStorage.getItem('marudeni-cart') || '[]'))
  }

  if (!ready) return null

  if (!cart.length) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-border/40 p-8 sm:p-12 text-center my-6 sm:my-8">
        <ShoppingBag className="mx-auto size-10 sm:size-12 text-border/70 mb-4" />
        <p className="font-serif text-xl sm:text-2xl font-bold text-primary">Your cart is empty.</p>
        <p className="mt-2 text-xs sm:text-sm text-primary/70">Fill it with something delicious.</p>
        <Link
          href="/menu"
          onClick={onClose}
          className="mt-5 sm:mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-xs sm:text-sm font-bold text-primary-foreground hover:scale-105"
        >
          Browse the menu <ArrowRight className="ml-2 size-3.5 sm:size-4" />
        </Link>
      </div>
    )
  }

  const subtotal = cart.reduce((sum, line) => sum + (findItem(line.id)?.price ?? 0) * line.quantity, 0)

  return (
    <div className={`grid gap-8 ${isModal ? 'grid-cols-1' : 'lg:grid-cols-[1fr_360px]'}`}>
      <div className="flex flex-col gap-4">
        {cart.map((line) => {
          const item = findItem(line.id)
          if (!item) return null
          return (
            <div key={line.id} className="flex gap-3 sm:gap-4 rounded-2xl border border-border/30 bg-card p-3 sm:p-4 shadow-sm">
              <div className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-xl border border-border/20">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-3">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-primary leading-tight">{item.name}</h3>
                  <span className="font-bold text-border text-xs sm:text-sm">{money(item.price * line.quantity)}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <button
                    onClick={() => sync(line.id, -1)}
                    className="flex size-6 sm:size-7 items-center justify-center rounded-full border border-border/40 hover:bg-secondary text-primary hover:text-white font-bold transition-all"
                  >
                    <Minus className="size-2.5 sm:size-3" />
                  </button>
                  <span className="font-bold text-primary text-xs sm:text-sm w-4 text-center">{line.quantity}</span>
                  <button
                    onClick={() => sync(line.id, 1)}
                    className="flex size-6 sm:size-7 items-center justify-center rounded-full border border-border/40 hover:bg-secondary text-primary hover:text-white font-bold transition-all"
                  >
                    <Plus className="size-2.5 sm:size-3" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <aside className="h-fit rounded-3xl bg-secondary border border-border/30 p-5 sm:p-6 text-white">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-white">Order summary</h2>
        <div className="mt-4 sm:mt-6 flex justify-between text-xs sm:text-sm font-semibold text-white/90">
          <span>Subtotal</span>
          <span>{money(subtotal)}</span>
        </div>
        <div className="mt-2.5 sm:mt-3 flex justify-between text-xs sm:text-sm text-white/70">
          <span>Delivery</span>
          <span>Calculated next</span>
        </div>
        <div className="my-4 sm:my-6 border-t border-border/30" />
        <div className="flex justify-between font-bold text-base sm:text-lg text-white">
          <span>Total</span>
          <span>{money(subtotal)}</span>
        </div>
        <Link
          href="/checkout"
          onClick={onClose}
          className="mt-5 sm:mt-6 flex items-center justify-center gap-2 rounded-full bg-border px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-primary hover:bg-[#C99A3D]/90 hover:scale-[1.02] transition-all shadow-md"
        >
          Continue to checkout <ArrowRight className="size-3.5 sm:size-4" />
        </Link>
      </aside>
    </div>
  )
}
