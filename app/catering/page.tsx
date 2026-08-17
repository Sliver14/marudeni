import type { Metadata } from 'next'
import CateringClient from './catering-client'

export const metadata: Metadata = {
  title: 'Premium Catering Services',
  description: 'Book Marudeni Foods for your wedding, birthday party, private dinner, or corporate office lunch in Lagos. Customize menus featuring our signature Nigerian delicacies.',
  alternates: {
    canonical: '/catering',
  },
}

export default function Page() {
  return <CateringClient />
}
