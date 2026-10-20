'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import {
  MapPin,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Flame,
  Clock,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Maximize2,
  X
} from 'lucide-react'

type SpotMedia = {
  id: string
  title: string
  badge: string
  description: string
  type: 'video' | 'image'
  videoSrc?: string
  imageSrc: string
}

const spotMediaList: SpotMedia[] = [
  {
    id: 'charcoal-chicken',
    title: 'Live Charcoal BBQ Chicken',
    badge: 'Fresh Off The Coals',
    description: 'Juicy, marinated chicken grilled slow over smoking hot coals for deep, rustic Nigerian flavor.',
    type: 'video',
    videoSrc: '/spot/charcoal-chicken-grill.mp4',
    imageSrc: '/spot/charcoal-chicken.jpg'
  },
  {
    id: 'wok-spaghetti',
    title: 'Stir-Fried Spaghetti Live Sizzle',
    badge: 'Tossed in Wok',
    description: 'Our signature seasoned spaghetti cooked to order with fresh peppers, vegetables, and savory proteins.',
    type: 'video',
    videoSrc: '/spot/wok-spaghetti-sizzle.mp4',
    imageSrc: '/spot/wok-spaghetti.jpg'
  },
  {
    id: 'storefront',
    title: 'Airport Bus Stop Grill Spot Kiosk',
    badge: 'Walk-In Spot',
    description: 'Easy-to-find physical outlet at Minimah Estate gate, right beside First Bank at Airport Bus Stop.',
    type: 'image',
    imageSrc: '/spot/storefront.jpg'
  },
  {
    id: 'banner',
    title: 'Spaghetti & Grills Menu & Vibes',
    badge: 'Spot Special',
    description: 'Generous portions, smoky grills, chilled drinks, and great street food vibes.',
    type: 'image',
    imageSrc: '/spot/banner.jpg'
  },
  {
    id: 'chef-wok',
    title: 'Chef Preparing Fresh Orders',
    badge: 'Hygienic Prep',
    description: 'Skilled kitchen staff cooking every single plate with clean utensils, passion, and care.',
    type: 'image',
    imageSrc: '/spot/chef-wok.jpg'
  }
]

export function GrillSpotSection() {
  const [selectedMedia, setSelectedMedia] = useState<SpotMedia>(spotMediaList[0])
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMediaSelect = (item: SpotMedia) => {
    setSelectedMedia(item)
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const addressText = 'Number A1, Minimah Estate, Beside First Bank, Airport Bus Stop, Ikeja, Lagos'
  const mapsUrl = 'https://maps.google.com/?q=Minimah+Estate,+Airport+Bus+Stop,+Ikeja,+Lagos'
  const whatsappPickupUrl = `https://wa.me/2348033833205?text=${encodeURIComponent(
    'Hello Marudeni Foods, I want to place an order for pickup at your Grill Spot (Airport Bus Stop, Ikeja).'
  )}`

  return (
    <section className="relative bg-secondary py-20 px-5 lg:px-8 border-b border-border/25 text-white overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-white/[0.03] to-transparent pointer-events-none" />
      <div className="absolute -top-32 -right-32 size-96 bg-border/10 rounded-full blur-3xl pointer-events-none" />

      {/* Lightbox for full-size viewing */}
      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <button
            onClick={() => setLightboxSrc(null)}
            className="absolute top-5 right-5 z-20 size-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="size-6" />
          </button>
          <div className="relative w-full max-w-4xl max-h-[85vh] aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <Image
              src={lightboxSrc}
              alt="Grill Spot Preview"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-border mb-3">
              <Flame className="size-3.5 text-border fill-border" />
              Live Grill & Spaghetti Spot
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              Visit Our Physical Grill Spot in Ikeja
            </h2>
            <p className="mt-3 text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
              Craving smoky charcoal chicken and live stir-fried spaghetti? Drop by our physical outlet for sizzling walk-in orders, takeout, and fresh street-side delicacies.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-border border-2 border-border px-6 py-3 text-xs sm:text-sm font-bold text-primary hover:bg-white hover:border-white hover:scale-105 transition-all inline-flex items-center gap-2 shadow-md"
            >
              <MapPin className="size-4" />
              Get Map Directions
              <ExternalLink className="size-3.5 opacity-75" />
            </a>
            <a
              href={whatsappPickupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white/20 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all inline-flex items-center gap-2"
            >
              <MessageCircle className="size-4 text-border" />
              Order For Pickup
            </a>
          </div>
        </div>

        {/* Main Grid: Player on Left, Address & Thumbnails on Right */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Main Visual Player (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-[2rem] overflow-hidden border-2 border-border/30 bg-black/60 shadow-2xl group">
              {selectedMedia.type === 'video' && selectedMedia.videoSrc ? (
                <>
                  <video
                    ref={videoRef}
                    key={selectedMedia.videoSrc}
                    src={selectedMedia.videoSrc}
                    poster={selectedMedia.imageSrc}
                    playsInline
                    autoPlay
                    loop
                    muted={isMuted}
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* Video Control Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Bar with Media Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                    <span className="rounded-full bg-secondary/90 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-border border border-border/40 shadow">
                      {selectedMedia.badge}
                    </span>
                    <button
                      onClick={toggleMute}
                      className="size-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/90 hover:scale-105 transition-all cursor-pointer"
                      title={isMuted ? 'Unmute video' : 'Mute video'}
                      aria-label="Toggle audio"
                    >
                      {isMuted ? <VolumeX className="size-4 text-white/80" /> : <Volume2 className="size-4 text-border" />}
                    </button>
                  </div>

                  {/* Play / Pause Center Click */}
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer pointer-events-auto"
                  >
                    {!isPlaying && (
                      <div className="size-16 rounded-full bg-border text-primary flex items-center justify-center shadow-xl animate-scale-in">
                        <Play className="size-8 fill-primary ml-1" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Video Details */}
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white drop-shadow">
                          {selectedMedia.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/85 line-clamp-2 max-w-lg mt-0.5">
                          {selectedMedia.description}
                        </p>
                      </div>
                      <button
                        onClick={togglePlay}
                        className="pointer-events-auto size-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-all shrink-0"
                        title={isPlaying ? 'Pause' : 'Play'}
                        aria-label="Toggle playback"
                      >
                        {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 fill-white ml-0.5" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={selectedMedia.imageSrc}
                    alt={selectedMedia.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                  {/* Top Bar with Badge & Zoom */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                    <span className="rounded-full bg-secondary/90 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-border border border-border/40 shadow">
                      {selectedMedia.badge}
                    </span>
                    <button
                      onClick={() => setLightboxSrc(selectedMedia.imageSrc)}
                      className="size-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/90 hover:scale-105 transition-all cursor-pointer"
                      title="Enlarge photo"
                      aria-label="Zoom image"
                    >
                      <Maximize2 className="size-4 text-border" />
                    </button>
                  </div>

                  {/* Bottom Details */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white drop-shadow">
                      {selectedMedia.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/85 line-clamp-2 max-w-lg mt-0.5">
                      {selectedMedia.description}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Media Selector Strip */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {spotMediaList.map((item) => {
                const isSelected = selectedMedia.id === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMediaSelect(item)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer group text-left ${
                      isSelected
                        ? 'border-border ring-2 ring-border/50 scale-[1.02]'
                        : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />

                    {/* Media Type Icon */}
                    <div className="absolute bottom-1 right-1 size-5 rounded-full bg-black/70 backdrop-blur flex items-center justify-center text-white">
                      {item.type === 'video' ? (
                        <Play className="size-2.5 fill-border text-border ml-0.5" />
                      ) : (
                        <Sparkles className="size-2.5 text-border" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Location & Info Card (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Primary Address Card */}
            <div className="rounded-[2rem] border-2 border-border/30 bg-[#173B2A] p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 size-36 bg-border/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary border border-border/40 shadow-sm shrink-0">
                  <MapPin className="size-6 text-border" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-border block">Official Location</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-white leading-tight">Airport Bus Stop, Ikeja</h3>
                </div>
              </div>

              {/* Exact Address Highlight */}
              <div className="bg-secondary/70 border border-border/25 rounded-2xl p-4.5 mb-5 space-y-2">
                <span className="text-xs font-semibold text-white/60 block">Full Physical Address:</span>
                <p className="font-serif text-base sm:text-lg font-bold text-white leading-snug">
                  {addressText}
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-border font-medium">
                  <span className="size-1.5 rounded-full bg-border" />
                  Beside First Bank • Landmark: Airport Bus Stop
                </div>
              </div>

              {/* Spot Highlights */}
              <div className="space-y-3 mb-6 text-xs sm:text-sm text-white/85">
                <div className="flex items-center gap-3">
                  <Clock className="size-4 text-border shrink-0" />
                  <span>
                    <strong className="text-white">Opening Hours:</strong> Monday – Saturday, 10:00 AM – 10:00 PM
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Flame className="size-4 text-border shrink-0" />
                  <span>
                    <strong className="text-white">Live Cooking:</strong> Charcoal Chicken & Spicy Wok Spaghetti
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="size-4 text-border shrink-0" />
                  <span>
                    <strong className="text-white">Call / WhatsApp:</strong>{' '}
                    <a href="tel:+2348033833205" className="text-border hover:underline font-bold">
                      0803 383 3205
                    </a>
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center rounded-full bg-border border border-border py-3 px-5 text-xs sm:text-sm font-bold text-primary hover:bg-white hover:border-white transition-all shadow inline-flex items-center justify-center gap-2"
                >
                  <MapPin className="size-4" />
                  Open in Google Maps
                </a>
                <a
                  href={whatsappPickupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center rounded-full border border-white/20 py-3 px-5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="size-4 text-border" />
                  WhatsApp Pickup
                </a>
              </div>
            </div>

            {/* Quick Banner Mini Promo */}
            <div
              onClick={() => setLightboxSrc('/spot/banner.jpg')}
              className="rounded-2xl border border-border/20 bg-secondary/40 p-4 flex items-center justify-between gap-4 hover:border-border/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative size-14 rounded-xl overflow-hidden border border-border/30 shrink-0">
                  <Image
                    src="/spot/banner.jpg"
                    alt="Spaghetti & Grills Menu"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white group-hover:text-border transition-colors">
                    Delicious Spaghetti & Grills Menu
                  </h4>
                  <p className="text-xs text-white/70">
                    Perfect balance of herbs, pepper sauce & smoky chicken. Click to view banner.
                  </p>
                </div>
              </div>
              <Maximize2 className="size-4 text-border shrink-0 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
