import { MenuGrid } from '@/components/menu-components'
import { Utensils } from 'lucide-react'
import Image from 'next/image'

export default function MenuPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-secondary border border-border/30 p-6 sm:p-8 md:p-10 relative overflow-hidden mb-8 shadow-md">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-[0.03] pointer-events-none">
          <Image src="/logo.svg" alt="watermark" width={200} height={200} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-border border border-white/10 mb-3">
            <Utensils className="size-3" />
            Freshly Prepared Daily
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            Our delicacies
          </h1>
          <p className="mt-2.5 max-w-2xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
            Authentic Nigerian flavors crafted with custom spices, fresh ingredients, and absolute passion. Order online and pay via bank transfer to confirm on WhatsApp.
          </p>
        </div>
      </div>
      <div>
        <MenuGrid />
      </div>
    </main>
  )
}
