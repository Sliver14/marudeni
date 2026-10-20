'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, X, Camera, Film, Eye } from 'lucide-react'

type GalleryItem = {
  id: string
  type: 'image' | 'video'
  src: string
  thumbnail?: string
  title: string
  category: 'Catering' | 'BTS' | 'Dishes' | 'Videos'
  description: string
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 11.59.57 AM.jpeg',
    title: 'Wedding Buffet Setup',
    category: 'Catering',
    description: 'Bespoke corporate buffet table decoration and warming stations in Victoria Island.'
  },
  {
    id: '2',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.07 PM.jpeg',
    title: 'Outdoor Catering Layout',
    category: 'Catering',
    description: 'Perfectly aligned chafing dishes and professional server setup for a birthday party.'
  },
  {
    id: '3',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.10 PM.jpeg',
    title: 'Premium Food Presentation',
    category: 'Catering',
    description: 'Warm colors and fresh garnishing on Jollof rice containers ready for serving.'
  },
  {
    id: '4',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (1).jpeg',
    title: 'Smoky Jollof Rice Platter',
    category: 'Dishes',
    description: 'Our signature firewood Jollof rice garnished with fried plantains and sliced peppers.'
  },
  {
    id: '5',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (2).jpeg',
    title: 'Traditional Egusi Soup',
    category: 'Dishes',
    description: 'Rich, slow-simmered Egusi soup loaded with assorted beef, tripe, and stockfish.'
  },
  {
    id: '6',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (3).jpeg',
    title: 'Spicy Ayamase Stew',
    category: 'Dishes',
    description: 'Green pepper Ayamase stew prepared with palm oil, locust beans, and boiled eggs.'
  },
  {
    id: '7',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (4).jpeg',
    title: 'Assorted Meat Platter',
    category: 'Dishes',
    description: 'Slow-cooked assorted meats drenched in our signature peppered Buka sauce.'
  },
  {
    id: '8',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM.jpeg',
    title: 'Kitchen Prep Station',
    category: 'BTS',
    description: 'Clean, sanitized prep counter demonstrating our commitment to hygiene and quality.'
  },
  {
    id: '9',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.23 PM (1).jpeg',
    title: 'House-Blended Spices',
    category: 'BTS',
    description: 'Freshly grounded Nigerian spices ready to enrich our signature sauces.'
  },
  {
    id: '10',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.23 PM (2).jpeg',
    title: 'Daily Fresh Veggies',
    category: 'BTS',
    description: 'Sourcing fresh vegetables daily from local markets in Lagos.'
  },
  {
    id: '11',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.23 PM (3).jpeg',
    title: 'Corporate Boxed Lunches',
    category: 'Catering',
    description: 'Neatly packaged premium boxed lunches prepared for corporate executives.'
  },
  {
    id: '12',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.23 PM.jpeg',
    title: 'Beef Suya Skewers',
    category: 'Dishes',
    description: 'Tender beef skewers marinated in authentic yaji spice and charred to perfection.'
  },
  {
    id: '13',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.24 PM (1).jpeg',
    title: 'Quality Temp Checks',
    category: 'BTS',
    description: 'Chef inspecting cooking temperature to ensure uniform texture in Jollof rice batches.'
  },
  {
    id: '14',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.24 PM (2).jpeg',
    title: 'Anniversary Private Catering',
    category: 'Catering',
    description: 'Candlelit dining service for a private anniversary celebration in Lekki Phase 1.'
  },
  {
    id: '15',
    type: 'image',
    src: '/gallery/WhatsApp Image 2026-08-19 at 12.00.24 PM.jpeg',
    title: 'Ofada Rice & Sauce',
    category: 'Dishes',
    description: 'Local unpolished Ofada rice wrapped in sweet Uma leaves, served with spicy pepper stew.'
  },
  {
    id: '16',
    type: 'video',
    src: '/gallery/video1.mp4',
    thumbnail: '/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (1).jpeg',
    title: 'Chef Preparing Ayamase Sauce (BTS)',
    category: 'Videos',
    description: 'Watch the step-by-step slow reduction of our authentic green pepper stew (Ayamase).'
  },
  {
    id: '17',
    type: 'video',
    src: '/gallery/video2.mp4',
    thumbnail: '/gallery/WhatsApp Image 2026-08-19 at 11.59.57 AM.jpeg',
    title: 'Lekki Wedding Buffet Setup (Vlog)',
    category: 'Videos',
    description: 'A walkthrough of our premium buffet presentation, guest servers, and food setups.'
  },
  {
    id: '18',
    type: 'video',
    src: '/spot/charcoal-chicken-grill.mp4',
    thumbnail: '/spot/charcoal-chicken.jpg',
    title: 'Live Charcoal BBQ Chicken (Grill Spot)',
    category: 'Videos',
    description: 'Juicy, marinated chicken grilled slow over smoking hot coals at our Ikeja Airport Bus Stop grill spot.'
  },
  {
    id: '19',
    type: 'video',
    src: '/spot/wok-spaghetti-sizzle.mp4',
    thumbnail: '/spot/wok-spaghetti.jpg',
    title: 'Spaghetti Tossed in Live Wok',
    category: 'Videos',
    description: 'Watch our signature seasoned spaghetti tossed with fresh bell peppers and savory sausages.'
  },
  {
    id: '20',
    type: 'image',
    src: '/spot/storefront.jpg',
    title: 'Ikeja Physical Grill Spot (Airport Bus Stop)',
    category: 'BTS',
    description: 'Number A1, Minimah Estate, Beside First Bank, Airport Bus Stop, Ikeja.'
  },
  {
    id: '21',
    type: 'image',
    src: '/spot/charcoal-chicken.jpg',
    title: 'Flame-Kissed Charcoal Chicken',
    category: 'Dishes',
    description: 'Tender chicken drumsticks and wings grilled with authentic spices over open coals.'
  },
  {
    id: '22',
    type: 'image',
    src: '/spot/chef-wok.jpg',
    title: 'Chef Stir-Frying at the Station',
    category: 'BTS',
    description: 'Fresh street food prep in our clean Ikeja kitchen station.'
  },
  {
    id: '23',
    type: 'image',
    src: '/spot/banner.jpg',
    title: 'Delicious Spaghetti & Grills Special',
    category: 'Dishes',
    description: 'Our physical spot signature plate: rich seasoned spaghetti paired with a seasoned grilled chicken quarter.'
  }
]

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Catering' | 'BTS' | 'Dishes' | 'Videos'>('All')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  )

  const categoriesList: { value: typeof activeCategory; label: string }[] = [
    { value: 'All', label: 'Show All' },
    { value: 'Catering', label: 'Event Catering' },
    { value: 'BTS', label: 'Behind the Scenes' },
    { value: 'Dishes', label: 'Signature Dishes' },
    { value: 'Videos', label: 'Video Showcase' }
  ]

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      {/* Lightbox / Video Modal */}
      {lightboxItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setLightboxItem(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#11241A] rounded-[2rem] border-2 border-border/30 overflow-hidden shadow-2xl p-2 sm:p-4 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setLightboxItem(null)}
              className="absolute right-4 top-4 z-50 flex size-10 items-center justify-center rounded-full bg-black/60 border border-white/25 text-white hover:bg-white hover:text-primary transition-all cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black">
              {lightboxItem.type === 'video' ? (
                <video 
                  src={lightboxItem.src} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image 
                  src={lightboxItem.src} 
                  alt={lightboxItem.title} 
                  fill 
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-secondary border border-border/30 p-6 sm:p-8 md:p-10 relative overflow-hidden mb-8 shadow-md">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-[0.03] pointer-events-none">
          <Image src="/logo.svg" alt="watermark" width={200} height={200} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-border border border-white/10 mb-3">
            <Camera className="size-3" />
            Visual Proof
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            Our Culinary Gallery & Social Proof
          </h1>
          <p className="mt-2.5 max-w-2xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
            See the love, clean execution, and vibrant events that make Marudeni Foods Lagos' favorite premium catering service. Explore our behind-the-scenes preparation and client setups.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto scrollbar-none gap-2 pb-6 border-b border-border/10 mb-8">
        {categoriesList.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === cat.value
                ? 'bg-primary text-border shadow-sm border border-primary'
                : 'border border-border/40 hover:bg-secondary text-primary hover:text-border'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredItems.map((item) => (
          <article 
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="group relative overflow-hidden rounded-[1.5rem] border border-border/30 bg-card shadow-sm hover:shadow-md transition-all duration-350 cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
              {item.type === 'video' ? (
                <video
                  src={`${item.src}#t=0.5`}
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  muted
                  playsInline
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              )}
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {item.type === 'video' ? (
                  <div className="flex size-14 items-center justify-center rounded-full bg-white text-primary shadow-lg border border-border/10 scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="size-6 fill-primary" />
                  </div>
                ) : (
                  <div className="flex size-14 items-center justify-center rounded-full bg-white text-primary shadow-lg border border-border/10 scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="size-6" />
                  </div>
                )}
              </div>

              {/* Tag indicator */}
              <div className="absolute left-3 top-3 z-10 flex gap-2">
                <span className="rounded-full bg-secondary/80 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-border border border-border/30 shadow-sm flex items-center gap-1">
                  {item.type === 'video' ? <Film className="size-3" /> : <Camera className="size-3" />}
                  {item.category}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
