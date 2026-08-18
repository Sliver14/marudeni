import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, DM_Serif_Display } from 'next/font/google'
import { SiteShell } from '@/components/site-shell'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-dm-serif' })
export const metadata: Metadata = {
  title: {
    default: 'Marudeni Foods — Premium Nigerian Delicacies & Catering',
    template: '%s | Marudeni Foods'
  },
  description: 'Authentic Nigerian and West African flavors crafted with custom spices and passion in Lagos. Order our signature party Jollof rice, Egusi soup, Ofada, stews, and sides online.',
  keywords: ['Nigerian Food Lagos', 'West African Delicacies Ikeja', 'Jollof Rice delivery Ikeja', 'Egusi Soup Lagos', 'Marudeni Foods catering', 'authentic Nigerian stews', 'Mangoro Ikeja food delivery', 'Nigerian party catering'],
  generator: 'insightnovatech.com',
  metadataBase: new URL('https://marudenifoods.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Marudeni Foods — Premium Nigerian Delicacies & Catering',
    description: 'Authentic Nigerian and West African flavors crafted with custom spices and passion in Lagos. Order our signature party Jollof rice, Egusi soup, Ofada, stews, and sides online.',
    url: 'https://marudenifoods.com',
    siteName: 'Marudeni Foods',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: '/marudeni-logo.jpeg',
        width: 800,
        height: 800,
        alt: 'Marudeni Foods Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marudeni Foods — Premium Nigerian Delicacies',
    description: 'Authentic Nigerian and West African flavors crafted with custom spices and passion in Lagos.',
    images: ['/marudeni-logo.jpeg'],
  },
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#0B2117' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className="bg-background"><body className={`${geist.variable} ${dmSerif.variable} antialiased`}><SiteShell>{children}</SiteShell>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
