'use client'

import Image from 'next/image'
import { MessageSquare } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
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

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        {/* Left Column: Details */}
        <div>
          <div className="flex flex-col gap-8 rounded-3xl border border-border/30 bg-card p-8 shadow-sm">
            <div>
              <strong className="text-primary text-lg font-bold block mb-2">Visit us</strong>
              <p className="text-sm leading-6 text-primary/80">20a Michael Akinola str<br />Mangoro, Ikeja, Lagos</p>
            </div>
            <div>
              <strong className="text-primary text-lg font-bold block mb-2">Hours</strong>
              <p className="text-sm leading-6 text-primary/80">Wednesday — Sunday<br />11:30am — 9:00pm</p>
            </div>
            <div>
              <strong className="text-primary text-lg font-bold block mb-2">Talk to us</strong>
              <p className="text-sm leading-6 text-primary/80">hello@marudeni.com<br />+234 803 383 3205</p>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <form onSubmit={(e) => { e.preventDefault(); alert('Thanks for reaching out — this demo form is ready to connect.') }} className="flex flex-col gap-4 rounded-3xl border border-border/30 bg-card p-8 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-primary border-b border-border/20 pb-3">Send a note</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Name" className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
            <input required type="email" placeholder="Email" className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
          </div>
          <textarea required placeholder="How can we help?" className="min-h-40 rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
          <button className="self-start rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground hover:scale-105 transition-all">Send message</button>
        </form>
      </div>
    </main>
  )
}
