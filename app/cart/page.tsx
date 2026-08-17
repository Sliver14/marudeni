import { CartView } from '@/components/menu-components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Bag / Shopping Cart',
  description: 'Review your selected Nigerian delicacies in your shopping bag before proceeding to checkout at Marudeni Foods.',
  robots: {
    index: false, // Don't index cart pages
    follow: false,
  },
  alternates: {
    canonical: '/cart',
  },
}

export default function CartPage() { 
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Your order</p>
      <h1 className="mt-4 font-serif text-6xl leading-none">Your bag</h1>
      <div className="mt-12">
        <CartView />
      </div>
    </main>
  )
}
