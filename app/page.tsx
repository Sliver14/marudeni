import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Heart,
  ChefHat,
  ShieldCheck,
  Award,
  Utensils,
  MessageSquare,
  Star,
  Clock,
  MapPin,
  Phone
} from 'lucide-react'
import type { Metadata } from 'next'
import { FeaturedMenu } from '@/components/menu-components'

export const metadata: Metadata = {
  title: 'Marudeni Foods — Premium Nigerian Delicacies & Catering',
  description: 'Authentic Nigerian and West African flavors crafted with custom spices and passion in Lagos. Order our signature party Jollof rice, Egusi soup, Ofada, stews, and sides online.',
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-secondary min-h-[90vh] flex items-center pt-24 pb-16 px-5 lg:px-8 border-b border-border/20">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url('/hero_bg_pattern.png')" }}
        />
        {/* Radial Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B2117]/30 to-[#0B2117] pointer-events-none" />

        <div className="mx-auto max-w-7xl w-full grid gap-12 lg:grid-cols-12 lg:items-center relative z-10">
          {/* Hero Content (Left) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-border mb-6">
              <span className="flex size-2 rounded-full bg-[#008751] animate-pulse" />
              Proudly Nigerian
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Premium Delicacies<span className="text-border">.</span><br />
              Exceptional <span className="text-border">Experience.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/85 max-w-xl leading-relaxed">
              Authentic Nigerian flavors crafted with the finest ingredients and custom spice blends for unforgettable dining moments.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/menu"
                className="w-full sm:w-auto text-center rounded-full bg-border border-2 border-border px-8 py-4 font-bold text-primary hover:bg-white hover:border-white hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                Order Online
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/catering"
                className="w-full sm:w-auto text-center rounded-full border-2 border-white/20 px-8 py-4 font-bold text-white hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                Catering Enquiry
              </Link>
            </div>

            {/* Quick stats / trust points */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-8 w-full">
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-border" />
                <span className="text-xs sm:text-sm font-semibold text-white/80">Fresh Daily Prep</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-border" />
                <span className="text-xs sm:text-sm font-semibold text-white/80">Mangoro, Ikeja, Lagos</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="size-5 text-border fill-border" />
                <span className="text-xs sm:text-sm font-semibold text-white/80">Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Image Showcase (Right) */}
          <div className="lg:col-span-5 relative w-full h-[420px] sm:h-[500px] flex items-center justify-center lg:justify-end mt-12 lg:mt-0 p-4">
            {/* Layered Back Image Card */}
            <div className="absolute left-6 lg:left-auto lg:right-24 top-6 w-[65%] max-w-[260px] aspect-[3/4] overflow-hidden rounded-[2rem] border border-border/20 bg-secondary/50 p-2 shadow-xl -rotate-6 transform transition-all duration-500 hover:rotate-0 hover:z-20 hover:scale-105">
              <Image
                src="/menu/1e15dd4f78c14b17082781c679fc29ce.png"
                alt="Marudeni Foods Premium Delicacy"
                fill
                className="object-cover rounded-[1.8rem]"
              />
            </div>

            {/* Layered Front Image Card */}
            <div className="relative w-[70%] max-w-[280px] aspect-[3/4] overflow-hidden rounded-[2.2rem] border-2 border-border/30 bg-[#173B2A] p-2.5 shadow-2xl rotate-3 transform transition-all duration-500 hover:rotate-0 hover:scale-105 z-10 hover:border-border">
              <Image
                src="/gallery/WhatsApp Image 2026-08-19 at 12.00.24 PM (2).jpeg"
                alt="Marudeni Foods Premium Showcase"
                fill
                className="object-cover rounded-[2rem]"
                priority
              />
            </div>

            {/* Ambient gold glow decoration */}
            <div className="absolute -z-10 -bottom-6 -right-6 size-48 bg-border/20 rounded-full blur-3xl opacity-60 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* WHY MARUDENI - VALUES GRID */}
      <section className="bg-background py-20 px-5 lg:px-8 border-b border-border/10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-primary mb-4 leading-tight">
              Good Food. Great Memories.<br />The Marudeni Way.
            </h2>
            <p className="text-sm sm:text-base text-primary/75 leading-relaxed">
              Every dish we cook, every order we deliver, and every event we cater is backed by our promise of culinary integrity, pure hygiene, and deep passion.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Premium Ingredients */}
            <div className="flex flex-col gap-4 p-8 rounded-[1.8rem] border border-border/20 bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-350">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary border border-border/30 shadow-sm shrink-0">
                <ChefHat className="size-6 text-border" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">Premium Ingredients</h3>
              <p className="text-sm text-primary/75 leading-relaxed">
                We source only the freshest red bell peppers, stone-ground local melon seeds, and premium cuts of meats to maintain uncompromised quality in every container.
              </p>
            </div>

            {/* Card 2: Expertly Prepared */}
            <div className="flex flex-col gap-4 p-8 rounded-[1.8rem] border border-border/20 bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-350">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary border border-border/30 shadow-sm shrink-0">
                <Award className="size-6 text-border" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">Expertly Prepared</h3>
              <p className="text-sm text-primary/75 leading-relaxed">
                Our base stews are slow-simmered, and our Jollof is crafted to smoky party perfection, respecting the authentic culinary methods passed down for generations.
              </p>
            </div>

            {/* Card 3: Hygienic & Safe */}
            <div className="flex flex-col gap-4 p-8 rounded-[1.8rem] border border-border/20 bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-350">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary border border-border/30 shadow-sm shrink-0">
                <ShieldCheck className="size-6 text-border" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">Hygienic & Safe</h3>
              <p className="text-sm text-primary/75 leading-relaxed">
                Every meal is prepped and packaged under strict sanitary standards in a pristine kitchen, ensuring safe and uncompromised food handling.
              </p>
            </div>

            {/* Card 4: Made with Love */}
            <div className="flex flex-col gap-4 p-8 rounded-[1.8rem] border border-border/20 bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-350">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary border border-border/30 shadow-sm shrink-0">
                <Heart className="size-6 text-border" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">Made with Love</h3>
              <p className="text-sm text-primary/75 leading-relaxed">
                Food is how we welcome. We pour our heart and culinary pride into every container, making sure you receive an exceptional dining experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED MENU SECTION */}
      <section className="bg-card py-20 px-5 lg:px-8 border-b border-border/10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest font-black text-border mb-2 block">Our Guests' Favorites</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-primary">Featured Signature Dishes</h2>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-sm font-bold text-border hover:text-primary transition-colors group"
            >
              View Full Ordering Menu
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <FeaturedMenu />
        </div>
      </section>

      {/* FOOD EXPERIENCE - EDITORIAL STORY */}
      <section className="bg-background py-20 px-5 lg:px-8 border-b border-border/10">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Text Story Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-black text-border block">Crafted in Mangoro, Ikeja</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-primary leading-tight">
              An Authentic Culinary Legacy
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-primary/95 font-medium">
              At Marudeni Foods, we believe that cooking isn't just about preparing ingredients; it's about sharing culture, creating memories, and honoring tradition.
            </p>
            <div className="space-y-4 text-sm sm:text-base text-primary/80 leading-relaxed">
              <p>
                Our signature green pepper Ayamase, smoky parboiled Jollof rice, and rich slow-simmered Egusi soup are crafted using time-tested recipes. We don't take shortcuts; our stews are allowed to slowly reduce to extract deep, robust flavors that evoke a nostalgic feeling of home-cooked meals.
              </p>
              <p>
                Every single plate is cooked fresh daily in our sanitised Lagos kitchen, using premium meats, locally sourced vegetables, and unique house-blended seasonings.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/about"
                className="rounded-full bg-secondary border border-border/30 px-6 py-3 text-sm font-bold text-white hover:bg-primary hover:border-border transition-all inline-flex items-center gap-2 group"
              >
                Learn Our Story
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Visual Showcase Grid - Animated Vertical Gallery */}
          <div className="lg:col-span-6 h-[480px] overflow-hidden relative grid grid-cols-2 gap-4 hover-pause rounded-3xl">
            {/* Top and Bottom Fade Gradient Mask to blend with the warm cream background */}
            {/* <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#EFE7DC] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#EFE7DC] to-transparent z-10 pointer-events-none" /> */}

            {/* Left Column (Scrolling Up) */}
            <div className="flex flex-col gap-4 animate-marquee-up">
              {/* Original Set */}
              {[
                "/gallery/WhatsApp Image 2026-08-19 at 11.59.57 AM (1).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 11.59.57 AM.jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.07 PM.jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.10 PM.jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (1).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (2).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (3).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (4).jpeg"
              ].map((src, i) => (
                <div key={`left-orig-${i}`} className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-border/25 bg-secondary/5 shadow-md shrink-0">
                  <Image
                    src={src}
                    alt="Marudeni Delicacy"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-1000"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
              {/* Duplicated Set */}
              {[
                "/gallery/WhatsApp Image 2026-08-19 at 11.59.57 AM (1).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 11.59.57 AM.jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.07 PM.jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.10 PM.jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (1).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (2).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (3).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM (4).jpeg"
              ].map((src, i) => (
                <div key={`left-dup-${i}`} className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-border/25 bg-secondary/5 shadow-md shrink-0">
                  <Image
                    src={src}
                    alt="Marudeni Delicacy"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-800"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>

            {/* Right Column (Scrolling Down) */}
            <div className="flex flex-col gap-4 animate-marquee-down">
              {/* Original Set */}
              {[
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM.jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.23 PM (1).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.23 PM (2).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.23 PM (3).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.23 PM.jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.24 PM (1).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.24 PM (2).jpeg"
              ].map((src, i) => (
                <div key={`right-orig-${i}`} className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-border/25 bg-secondary/5 shadow-md shrink-0">
                  <Image
                    src={src}
                    alt="Marudeni Delicacy"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
              {/* Duplicated Set */}
              {[
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.22 PM.jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.23 PM (1).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.23 PM (2).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.23 PM (3).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.23 PM.jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.24 PM (1).jpeg",
                "/gallery/WhatsApp Image 2026-08-19 at 12.00.24 PM (2).jpeg"
              ].map((src, i) => (
                <div key={`right-dup-${i}`} className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-border/25 bg-secondary/5 shadow-md shrink-0">
                  <Image
                    src={src}
                    alt="Marudeni Delicacy"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATERING SHOWCASE SECTION */}
      <section className="bg-secondary text-white py-20 px-5 lg:px-8 border-b border-border/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none" />

        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 lg:items-center relative z-10">
          {/* Catering Info (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-border border border-white/10">
              <Utensils className="size-4 text-border" />
              Event Services
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              Host Unforgettable Moments With Premium Catering
            </h2>

            <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              From intimate private dinners and corporate meetings to elaborate weddings, we bring custom menus, exceptional presentation, and uncompromised food safety to your tables.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 text-sm">
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="size-1.5 rounded-full bg-border mt-2 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Tailored Menus</h4>
                  <p className="text-white/70 text-xs mt-1">Nigerian classics, small chops, and customized packages.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="size-1.5 rounded-full bg-border mt-2 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Full-Service Event Setup</h4>
                  <p className="text-white/70 text-xs mt-1">Buffet coordination, professional servers, and layout options.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/catering"
                className="w-full sm:w-auto text-center rounded-full bg-border border-2 border-border px-8 py-3.5 font-bold text-primary hover:bg-white hover:border-white hover:scale-105 transition-all inline-flex items-center justify-center gap-2 shadow-md group"
              >
                Catering Quote Request
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Catering Visual (Right) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 p-2 shadow-2xl">
              <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden">
                <Image
                  src="/menu/3d8e73880268c8f3bfe3770c94083df4.png"
                  alt="Marudeni Catering Platter"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section className="bg-background py-20 px-5 lg:px-8 border-b border-border/10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-black text-border mb-2 block">Customer Stories</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-primary">Good Food. Great Memories.</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-card border border-border/20 p-8 rounded-3xl flex flex-col gap-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-border text-border" />
                ))}
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-primary/85 flex-1 font-medium italic">
                "The smoky party Jollof is absolute perfection. Reminds me of home every single time. The delivery was fast, and the packaging is very premium."
              </p>
              <div className="border-t border-border/15 pt-4">
                <h4 className="font-serif text-base font-bold text-primary">Tunde O.</h4>
                <span className="text-xs text-primary/50 font-semibold tracking-wider uppercase">Ikeja, Lagos</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-card border border-border/20 p-8 rounded-3xl flex flex-col gap-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-border text-border" />
                ))}
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-primary/85 flex-1 font-medium italic">
                "We hired Marudeni Foods for our corporate end-of-year launch event. The Ofada rice with green pepper Ayamase was a showstopper. Highly professional staff!"
              </p>
              <div className="border-t border-border/15 pt-4">
                <h4 className="font-serif text-base font-bold text-primary">Chioma A.</h4>
                <span className="text-xs text-primary/50 font-semibold tracking-wider uppercase">Victoria Island</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-card border border-border/20 p-8 rounded-3xl flex flex-col gap-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-border text-border" />
                ))}
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-primary/85 flex-1 font-medium italic">
                "Pure hygiene. I am very particular about how my food is prepared, and Marudeni's pristine kitchen standards show in every single container. Egusi is incredibly rich."
              </p>
              <div className="border-t border-border/15 pt-4">
                <h4 className="font-serif text-base font-bold text-primary">Funmi Y.</h4>
                <span className="text-xs text-primary/50 font-semibold tracking-wider uppercase">Mangoro, Lagos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA BLOCK */}
      <section className="bg-card py-16 px-5 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-secondary border border-border/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-radial-gradient from-white/[0.03] to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="flex size-14 items-center justify-center rounded-full bg-white/5 border border-white/10 mx-auto text-border">
              <MessageSquare className="size-7" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
              Order directly on WhatsApp
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Prefer to order via chat? Build your cart online and send it straight to our line, or click below to message our customer support team directly for fast assistance.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <a
                href="https://wa.me/2349079979744"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center rounded-full bg-border border-2 border-border px-8 py-4 font-bold text-primary hover:bg-white hover:border-white hover:scale-105 transition-all inline-flex items-center justify-center gap-2 shadow-md"
              >
                <Phone className="size-4" />
                Chat with Us on WhatsApp
              </a>
              <Link
                href="/menu"
                className="w-full sm:w-auto text-center rounded-full border-2 border-white/20 px-8 py-3.5 font-bold text-white hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all inline-flex items-center justify-center"
              >
                Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
