import type { Metadata } from 'next'
import GalleryClient from './gallery-client'

export const metadata: Metadata = {
  title: 'Culinary Gallery & Social Proof',
  description: 'See the cleanliness, event buffet setups, behind-the-scenes cooking clips, and premium Nigerian catering delicacies prepared by Marudeni Foods in Lagos.',
  alternates: {
    canonical: '/gallery',
  },
}

export default function Page() {
  return <GalleryClient />
}
