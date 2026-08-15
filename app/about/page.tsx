import Image from 'next/image'
import { Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-secondary border border-border/30 p-6 sm:p-8 md:p-10 relative overflow-hidden mb-8 shadow-md">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-[0.03] pointer-events-none">
          <Image src="/logo.svg" alt="watermark" width={200} height={200} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-border border border-white/10 mb-3">
            <Heart className="size-3 text-border" />
            Our story
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            Food is how we remember, and how we welcome.
          </h1>
          <p className="mt-2.5 max-w-2xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
            Marudeni started with a family table, a well-loved spice blend, and a belief that the best recipes are never really finished.
          </p>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[3/4] max-h-[500px] overflow-hidden rounded-[2rem] border border-border/30 bg-secondary/5 shadow-lg">
          <Image 
            src="/marudeni-flyer.jpeg" 
            alt="Marudeni Foods Flyer" 
            fill 
            className="object-contain" 
          />
        </div>
        <div className="text-lg leading-8 text-primary/90 space-y-6">
          <p className="font-semibold text-primary">
            We bring together the authentic flavors of Nigeria — not as a museum piece, but as living, vibrant food made for today.
          </p>
          <p className="text-primary/80">
            Every dish we serve follows the flyer values we hold dear: *Premium Ingredients*, *Expertly Prepared*, *Hygienic & Safe*, and *Made with Love*. From our signature party Jollof rice to our stew selections, we cook fresh daily in Brooklyn.
          </p>
        </div>
      </div>
    </main>
  )
}
