'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MessageSquare, MapPin, Clock, Phone, Mail, ArrowUpRight } from 'lucide-react'

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    const checkIsOpen = () => {
      const now = new Date()
      const day = now.getDay() // 0 = Sunday, 1 = Monday, ..., 3 = Wednesday, ..., 6 = Saturday
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const currentTime = hours * 60 + minutes

      // Monday (1) to Saturday (6)
      const isOpenDay = day >= 1 && day <= 6
      
      // 9:00 am = 9 * 60 = 540
      // 9:00 pm = 21 * 60 = 1260
      const isOpenTime = currentTime >= 540 && currentTime < 1260

      setIsOpen(isOpenDay && isOpenTime)
    }

    checkIsOpen()
    const interval = setInterval(checkIsOpen, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      {/* Hero Banner */}
      <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-secondary border border-border/30 p-6 sm:p-8 md:p-10 relative overflow-hidden mb-8 shadow-md">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-[0.03] pointer-events-none">
          <Image src="/logo.svg" alt="watermark" width={200} height={200} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-border border border-white/10 mb-3">
            <MessageSquare className="size-3" />
            Say hello
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            Come hungry. Leave happy.
          </h1>
          <p className="mt-2.5 max-w-2xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
            We love to hear from you. Reach out for bookings, queries, or just to say hello. Visit our location or send us a message below.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        {/* Left Column: Details */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-border/30 bg-card p-6 sm:p-8 shadow-sm flex flex-col gap-8">
            <h2 className="font-serif text-2xl font-bold text-primary border-b border-border/20 pb-3">Contact Information</h2>
            
            {/* Visit Us */}
            <div className="flex gap-4 items-start group">
              <div className="p-3.5 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                <MapPin className="size-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-primary text-base font-bold mb-1">Visit us</h3>
                <p className="text-sm leading-relaxed text-primary/80 mb-2">
                  20a Michael Akinola str<br />Mangoro, Ikeja, Lagos
                </p>
                <a 
                  href="https://maps.google.com/?q=20a+Michael+Akinola+str,+Mangoro,+Ikeja,+Lagos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline group/link"
                >
                  Get Directions
                  <ArrowUpRight className="size-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4 items-start group">
              <div className="p-3.5 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                <Clock className="size-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-primary text-base font-bold">Hours</h3>
                  {isOpen !== null && (
                    isOpen ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        ● Open Now
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        ● Closed
                      </span>
                    )
                  )}
                </div>
                <p className="text-sm leading-relaxed text-primary/80">
                  <span className="font-semibold text-primary/95">Monday — Saturday</span><br />
                  9:00am — 9:00pm
                </p>
                <p className="text-xs text-primary/60 mt-1">Closed Sunday</p>
              </div>
            </div>

            {/* Talk to Us */}
            <div className="flex gap-4 items-start group">
              <div className="p-3.5 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                <Phone className="size-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-primary text-base font-bold mb-1">Talk to us</h3>
                <div className="flex flex-col gap-1.5">
                  <a 
                    href="mailto:hello@marudeni.com" 
                    className="text-sm text-primary/80 hover:text-secondary hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="size-3.5 text-primary/45" />
                    hello@marudeni.com
                  </a>
                  <a 
                    href="tel:+2348033833205" 
                    className="text-sm text-primary/80 hover:text-secondary hover:underline flex items-center gap-1.5"
                  >
                    <Phone className="size-3.5 text-primary/45" />
                    +234 803 383 3205
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <form onSubmit={(e) => { e.preventDefault(); alert('Thanks for reaching out — this demo form is ready to connect.') }} className="flex flex-col gap-4 rounded-3xl border border-border/30 bg-card p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-primary border-b border-border/20 pb-3">Send a note</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Name" className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium w-full" />
            <input required type="email" placeholder="Email" className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium w-full" />
          </div>
          <textarea required placeholder="How can we help?" className="min-h-40 rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium w-full resize-none" />
          <button className="self-start rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground hover:scale-105 transition-all">Send message</button>
        </form>
      </div>
    </main>
  )
}

