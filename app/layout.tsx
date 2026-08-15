import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, DM_Serif_Display } from 'next/font/google'
import { SiteShell } from '@/components/site-shell'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-dm-serif' })
export const metadata: Metadata = { title: 'Marudeni Foods — A taste of home', description: 'East African food for people who believe every meal should have a story.', generator: 'v0.app' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f5f0e7' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className="bg-background"><body className={`${geist.variable} ${dmSerif.variable} antialiased`}><SiteShell>{children}</SiteShell>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
