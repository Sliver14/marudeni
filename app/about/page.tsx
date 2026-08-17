import Image from 'next/image'
import Link from 'next/link'
import { Heart, ChefHat, Award, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story & Culinary Heritage',
  description: 'Learn about the legacy of Marudeni Foods. Handcrafting uncompromised premium Nigerian delicacies in Mangoro, Ikeja, Lagos with passion, hygiene, and authentic slow-cooked techniques.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      {/* Header Banner */}
      <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-secondary border border-border/30 p-8 sm:p-10 relative overflow-hidden mb-12 shadow-md">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-[0.03] pointer-events-none">
          <Image src="/logo.svg" alt="watermark" width={240} height={240} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-border border border-white/10 mb-4">
            <Heart className="size-3 text-border" />
            Our story
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Food is how we remember, and how we welcome.
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
            At Marudeni, we believe that authentic Nigerian flavors are not a relic of the past, but a living, vibrant experience crafted with passion for today's table.
          </p>
        </div>
      </div>

      {/* Narrative & Visual Showcase */}
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start mb-16">
        {/* Narrative text */}
        <div className="space-y-6 text-primary">
          <h2 className="font-serif text-2xl sm:text-3xl font-black tracking-tight border-b border-border/20 pb-4">
            A Legacy of Flavor, Cooked with Pride
          </h2>
          <p className="text-base sm:text-lg leading-8 font-medium">
            Marudeni Foods was born from a simple desire: to bring uncompromised, authentic Nigerian delicacies to food lovers who appreciate rich tradition and exceptional quality. 
          </p>
          <div className="space-y-4 text-sm sm:text-base leading-7 text-primary/80">
            <p>
              Our culinary journey began around family tables, where the kitchen was the heartbeat of the home. We learned that the secret to the perfect Jollof rice is patience—letting the spiced tomato-pepper base slow-cook to release its smoky depth. We learned that a great soup requires stone-ground melon seeds, fresh leafy spinach, and the finest selection of premium spices.
            </p>
            <p>
              Today, we carry these lessons into our kitchen in <strong>Mangoro, Ikeja, Lagos</strong>. We prepare our dishes fresh daily, combining time-tested cooking methods with absolute cleanliness. We don't believe in shortcuts; we believe in the magic of slow-simmered stews, rich spice blends, and the satisfying texture of perfectly prepared swallows.
            </p>
            <p>
              Whether you are ordering a quick lunch, celebrating a milestone, or hosting an event with our catering services, you are tasting a legacy. We invite you to sit at our table, savor the rich flavors of Nigeria, and make some great memories with us.
            </p>
          </div>
        </div>

        {/* Visual Flyer Frame */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[3/4] max-h-[520px] overflow-hidden rounded-[2rem] border-2 border-border/30 bg-secondary/10 p-2.5 shadow-2xl transition-all duration-500 hover:scale-[1.01]">
            <Image 
              src="/marudeni-flyer.jpeg" 
              alt="Marudeni Foods Flyer" 
              fill 
              className="object-cover rounded-[1.8rem]" 
            />
          </div>
          <span className="text-center text-xs text-primary/60 font-semibold tracking-wider uppercase">
            Official Marudeni Foods Menu Flyer
          </span>
        </div>
      </div>

      {/* Values Grid */}
      <div className="border-t border-border/25 pt-12 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary mb-3">
            The Values That Guide Our Kitchen
          </h2>
          <p className="text-sm sm:text-base text-primary/70">
            Every plate we prepare, every order we deliver, and every event we cater is guided by our core brand promise:
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Premium Ingredients */}
          <div className="flex flex-col gap-3 p-6 rounded-2xl border border-border/20 bg-card hover:shadow-md transition-all duration-300">
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary border border-border/30">
              <ChefHat className="size-5 text-border" />
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">Premium Ingredients</h3>
            <p className="text-xs sm:text-sm text-primary/75 leading-relaxed">
              We source only the freshest red bell peppers, locust beans, stone-ground melon seeds, and premium cuts of meat to deliver uncompromised quality in every bite.
            </p>
          </div>

          {/* Card 2: Expertly Prepared */}
          <div className="flex flex-col gap-3 p-6 rounded-2xl border border-border/20 bg-card hover:shadow-md transition-all duration-300">
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary border border-border/30">
              <Award className="size-5 text-border" />
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">Expertly Prepared</h3>
            <p className="text-xs sm:text-sm text-primary/75 leading-relaxed">
              Our stews are slow-simmered and our signature Jollof is cooked to smoky party perfection, honoring authentic techniques passed down through generations.
            </p>
          </div>

          {/* Card 3: Hygienic & Safe */}
          <div className="flex flex-col gap-3 p-6 rounded-2xl border border-border/20 bg-card hover:shadow-md transition-all duration-300">
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary border border-border/30">
              <ShieldCheck className="size-5 text-border" />
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">Hygienic & Safe</h3>
            <p className="text-xs sm:text-sm text-primary/75 leading-relaxed">
              Every single meal is prepped and packaged in a pristine, state-of-the-art kitchen adhering to the highest standards of sanitation and food handling.
            </p>
          </div>

          {/* Card 4: Made with Love */}
          <div className="flex flex-col gap-3 p-6 rounded-2xl border border-border/20 bg-card hover:shadow-md transition-all duration-300">
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary border border-border/30">
              <Heart className="size-5 text-border" />
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">Made with Love</h3>
            <p className="text-xs sm:text-sm text-primary/75 leading-relaxed">
              Cooking is our way of welcoming you. We put heart, dedication, and culinary pride into every container, making sure you leave happy.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-secondary border border-border/30 p-8 sm:p-10 text-center relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-radial-gradient from-white/[0.03] to-transparent pointer-events-none" />
        <h2 className="font-serif text-2xl sm:text-3xl font-black text-white mb-3">Ready to Taste the Tradition?</h2>
        <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-6">
          Order our premium delicacies for pickup or delivery, or let us bring the ultimate dining experience to your next special event.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/menu" 
            className="rounded-full bg-border px-8 py-3.5 font-bold text-primary hover:bg-white hover:scale-105 transition-all shadow-sm"
          >
            Explore our menu
          </Link>
          <Link 
            href="/catering" 
            className="rounded-full border-2 border-white/20 px-8 py-3 font-bold text-white hover:bg-white/10 hover:scale-105 transition-all"
          >
            Catering quote
          </Link>
        </div>
      </div>
    </main>
  )
}
