'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MessageSquare, Calendar, Users, MapPin, Sparkles, ShieldAlert } from 'lucide-react'

export default function CateringPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState('')
  const [location, setLocation] = useState('')
  const [eventType, setEventType] = useState('Private dinner')
  const [details, setDetails] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    
    // Construct pre-filled WhatsApp message
    const message = `Hello Marudeni Foods!
I would like to request a catering quote.

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Event Type:* ${eventType}
*Event Date:* ${date}
*Estimated Guests:* ${guests}
*Location:* ${location}

*Additional Details / Food Preferences:*
${details}`

    // Open WhatsApp in a new tab
    const url = `https://wa.me/2348033833205?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-secondary border border-border/30 p-6 sm:p-8 md:p-10 relative overflow-hidden mb-8 shadow-md">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-[0.03] pointer-events-none">
          <Image src="/logo.svg" alt="watermark" width={200} height={200} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-border border border-white/10 mb-3">
            <Users className="size-3" />
            Gather around
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            Catering for Your Special Moments
          </h1>
          <p className="mt-2.5 max-w-2xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
            From corporate banquets and board lunches to weddings, birthdays, and intimate private dinners, we craft bespoke culinary experiences. Marudeni brings signature Nigerian delicacies and exceptional service to your guests.
          </p>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {/* Left Column: Catering info */}
        <div className="space-y-8">

          {/* Value Propositions */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-4 items-start p-5 rounded-2xl bg-card border border-border/20 shadow-sm">
              <Sparkles className="size-6 text-border shrink-0" />
              <div>
                <h3 className="font-bold text-primary text-md">Bespoke Menus</h3>
                <p className="text-sm text-primary/75 mt-1 leading-relaxed">Customize your menu options with our signature Jollof Rice, pastries, and main courses.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-5 rounded-2xl bg-card border border-border/20 shadow-sm">
              <Users className="size-6 text-border shrink-0" />
              <div>
                <h3 className="font-bold text-primary text-md">Scale with Ease</h3>
                <p className="text-sm text-primary/75 mt-1 leading-relaxed">We cater for groups from 10 to 500+ guests with seamless culinary execution.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-5 rounded-2xl bg-card border border-border/20 shadow-sm">
              <MapPin className="size-6 text-border shrink-0" />
              <div>
                <h3 className="font-bold text-primary text-md">All-inclusive Service</h3>
                <p className="text-sm text-primary/75 mt-1 leading-relaxed">Full buffet setups, chaffing dishes, professional servers, and cleanups.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-5 rounded-2xl bg-card border border-border/20 shadow-sm">
              <ShieldAlert className="size-6 text-border shrink-0" />
              <div>
                <h3 className="font-bold text-primary text-md">Hygienic Execution</h3>
                <p className="text-sm text-primary/75 mt-1 leading-relaxed">Our staff adheres to strict sanitation and safety measures throughout the event.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Form */}
        <div className="rounded-[2rem] bg-secondary border border-border/30 p-6 md:p-8 shadow-md">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="inline-flex size-14 items-center justify-center rounded-full bg-border/20 text-border">
                <MessageSquare className="size-7" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">Redirection to WhatsApp...</h2>
              <p className="text-white/80 max-w-sm mx-auto text-xs sm:text-sm leading-relaxed">
                We've prepared your catering details. If WhatsApp did not open automatically, click the button below to connect with us.
              </p>
              <button 
                onClick={handleSubmit} 
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white shadow-md hover:scale-105"
              >
                <MessageSquare className="size-4" /> Open WhatsApp Chat
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">Request a quote</h2>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Submit event details to receive a customized estimate.</p>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <input required placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
                <input required placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
              </div>
              
              <input required type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
              
              <div className="grid gap-3 sm:grid-cols-3">
                <input required type="date" placeholder="Event Date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium col-span-2" />
                <input required type="number" placeholder="Guests" value={guests} onChange={(e) => setGuests(e.target.value)} className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
              </div>

              <input required placeholder="Event Location / Venue Address" value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />

              <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-semibold">
                <option value="Private dinner">Private dinner / Family reunion</option>
                <option value="Office lunch">Office lunch / Corporate meeting</option>
                <option value="Wedding / Celebration">Wedding / Large celebration</option>
                <option value="Birthday party">Birthday party</option>
              </select>
              
              <textarea required placeholder="Tell us more about your ideas, menu preferences, or custom requirements..." value={details} onChange={(e) => setDetails(e.target.value)} className="min-h-28 rounded-xl border border-border/40 bg-background px-4 py-3 text-sm focus:outline-none focus:border-border text-primary font-medium" />
              
              <button className="flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-bold text-primary-foreground hover:scale-[1.02] transition-all shadow-md mt-2">
                <MessageSquare className="size-4 text-border" /> Submit and Chat on WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
