'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CartLine, findItem, money } from '@/lib/marudeni-data'
import { MessageSquare, ArrowLeft, Copy, Check } from 'lucide-react'

export default function CheckoutClient() {
  const [cart, setCart] = useState<CartLine[]>([])
  const [ready, setReady] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [method, setMethod] = useState<'pickup' | 'delivery'>('pickup')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [orderRef, setOrderRef] = useState('')
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCart(JSON.parse(window.sessionStorage.getItem('marudeni-cart') || '[]'))
    setReady(true)
    
    // Generate a random order reference code
    const rand = Math.floor(1000 + Math.random() * 9000)
    setOrderRef(`MRD-2026-${rand}`)
  }, [])

  const subtotal = cart.reduce((sum, line) => sum + (findItem(line.id)?.price ?? 0) * line.quantity, 0)
  const deliveryFee = method === 'delivery' ? 2500 : 0
  const total = subtotal + deliveryFee

  const handleCopy = () => {
    navigator.clipboard.writeText("6587573273")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getWhatsAppLink = () => {
    const itemsText = cart
      .map((line) => {
        const item = findItem(line.id)
        return `- ${line.quantity}x ${item?.name} (${money((item?.price ?? 0) * line.quantity)})`
      })
      .join('\n')

    const message = `Hello Marudeni Foods!
I would like to place an order.

*Order Reference:* ${orderRef}
*Customer Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Method:* ${method === 'pickup' ? 'Pickup (Free)' : 'Delivery (₦2,500)'}
${method === 'delivery' ? `*Delivery Address:* ${address}` : ''}

*Order Details:*
${itemsText}

*Subtotal:* ${money(subtotal)}
*Delivery Fee:* ${money(deliveryFee)}
*Total Amount:* ${money(total)}

${notes ? `*Notes:* ${notes}` : ''}

I am sending my proof of payment for ${money(total)} next.`

    return `https://wa.me/2348033833205?text=${encodeURIComponent(message)}`
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: orderRef,
          name,
          email,
          phone,
          method,
          address: method === 'delivery' ? address : '',
          notes,
          total
        })
      })
    } catch (err) {
      console.error('Failed to log order to Neon database:', err)
    }

    setDone(true)
  }

  const handleFinish = () => {
    window.sessionStorage.removeItem('marudeni-cart')
    window.sessionStorage.setItem('marudeni-cart-count', '0')
    window.dispatchEvent(new Event('cart-updated'))
  }

  if (!ready) return null

  if (done) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-20 text-center">
        <div className="inline-flex size-16 items-center justify-center rounded-full bg-border/20 text-border mb-6">
          <MessageSquare className="size-8" />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-border">Step 2: Confirmation</p>
        <h1 className="mt-2 font-serif text-5xl font-black text-primary leading-tight">Proceed to WhatsApp</h1>
        
        <div className="mt-8 rounded-3xl border border-border/30 bg-card p-6 text-left space-y-4">
          <h2 className="font-serif text-xl font-bold text-primary border-b border-border/20 pb-3">Bank Transfer Details</h2>
          <p className="text-sm text-primary/80">Please make a transfer of <strong className="text-border text-lg font-black">{money(total)}</strong> to the account below:</p>
          
          <div className="rounded-2xl bg-secondary/60 p-5 space-y-2 border border-border/20">
            <div className="flex justify-between text-sm">
              <span className="text-primary/60 font-semibold">Bank Name:</span>
              <span className="font-bold text-primary">OPay</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-primary/60 font-semibold">Account Name:</span>
              <span className="font-bold text-primary">Marudeni Foods</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-primary/60 font-semibold">Account Number:</span>
              <div className="flex items-center gap-1.5 font-bold text-primary">
                <span>6587573273</span>
                <button onClick={handleCopy} className="p-1 hover:bg-secondary rounded text-border" title="Copy Account Number">
                  {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border-l-4 border-border bg-border/5 p-4 text-xs text-primary/75">
            <strong>Important:</strong> After transferring the funds, click the button below to confirm your order and send your proof of transfer on WhatsApp.
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href={getWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={handleFinish} 
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg hover:scale-105"
          >
            <MessageSquare className="size-5" /> Confirm on WhatsApp
          </a>
          <Link href="/" onClick={handleFinish} className="flex items-center justify-center rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground hover:scale-105">
            Back to home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
      <Link href="/menu" className="inline-flex items-center gap-2 text-sm font-semibold text-border hover:underline mb-6">
        <ArrowLeft className="size-4" /> Back to menu
      </Link>
      
      <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-border">Checkout</p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-black text-primary">Place your order</h1>
 
      {cart.length === 0 ? (
        <div className="mt-12 text-center rounded-3xl border-2 border-dashed border-border/40 p-12">
          <p className="font-serif text-2xl font-bold">Your cart is empty.</p>
          <Link href="/menu" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
            Explore the Menu
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border/30 bg-card p-6 md:p-8 space-y-5">
              <h2 className="font-serif text-2xl font-bold text-primary border-b border-border/20 pb-3">1. Contact Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
                <input required type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
              </div>
              <input required placeholder="WhatsApp Phone Number (e.g. +234...)" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
            </div>

            <div className="rounded-3xl border border-border/30 bg-card p-6 md:p-8 space-y-5">
              <h2 className="font-serif text-2xl font-bold text-primary border-b border-border/20 pb-3">2. Order Method</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${method === 'pickup' ? 'border-border bg-secondary/50 font-bold' : 'border-border/30'}`}>
                  <input type="radio" name="method" checked={method === 'pickup'} onChange={() => setMethod('pickup')} className="accent-border" />
                  <div>
                    <p className="text-sm font-semibold text-primary">Pickup</p>
                    <p className="text-xs text-primary/60">Collect from 20a Michael Akinola str Mangoro, Ikeja, Lagos</p>
                  </div>
                  <span className="ml-auto text-sm text-border font-bold">Free</span>
                </label>
                <label className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${method === 'delivery' ? 'border-border bg-secondary/50 font-bold' : 'border-border/30'}`}>
                  <input type="radio" name="method" checked={method === 'delivery'} onChange={() => setMethod('delivery')} className="accent-border" />
                  <div>
                    <p className="text-sm font-semibold text-primary">Delivery</p>
                    <p className="text-xs text-primary/60">Delivered to your door</p>
                  </div>
                  <span className="ml-auto text-sm text-border font-bold">₦2,500</span>
                </label>
              </div>
              {method === 'delivery' && (
                <textarea required placeholder="Delivery Address (Street, City, State)" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full min-h-24 rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
              )}
            </div>

            <div className="rounded-3xl border border-border/30 bg-card p-6 md:p-8 space-y-5">
              <h2 className="font-serif text-2xl font-bold text-primary border-b border-border/20 pb-3">3. Order Note</h2>
              <textarea placeholder="Any special cooking instructions or allergen notes?" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full min-h-24 rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
            </div>
            
          </div>

          <aside className="h-fit rounded-3xl bg-secondary border border-border/30 p-6 space-y-6 text-white">
            <h2 className="font-serif text-2xl font-bold text-white">Your order</h2>
            <div className="divide-y divide-border/20 max-h-60 overflow-y-auto pr-1">
              {cart.map((line) => {
                const item = findItem(line.id)
                if (!item) return null
                return (
                  <div key={line.id} className="py-3 flex justify-between gap-3 text-sm">
                    <span className="text-white/80 font-medium">
                      {line.quantity}x {item.name}
                    </span>
                    <span className="font-semibold text-white">{money(item.price * line.quantity)}</span>
                  </div>
                )
              })}
            </div>
            
            <div className="border-t border-border/20 pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-white/80">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Delivery</span>
                <span>{method === 'delivery' ? money(2500) : 'Free'}</span>
              </div>
              <div className="border-t border-border/20 pt-3 flex justify-between font-bold text-lg text-white">
                <span>Total</span>
                <span>{money(total)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-white/60 leading-relaxed text-center">
                Review your details above. Tapping the button below will lock in your order details and show bank transfer options.
              </div>
              <button type="submit" className="w-full rounded-full bg-border py-3.5 font-bold text-primary hover:bg-[#C99A3D]/90 hover:scale-[1.02] transition-all shadow-md">
                Proceed to Bank Transfer
              </button>
            </div>
          </aside>
        </form>
      )}
    </main>
  )
}
