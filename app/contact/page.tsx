import type { Metadata } from 'next'
import ContactClient from './contact-client'

export const metadata: Metadata = {
  title: 'Contact Us / Location & Hours',
  description: 'Have questions? Get in touch with Marudeni Foods in Mangoro, Ikeja, Lagos. Check our opening hours (Mon-Sat 9am-9pm), phone number, email, and get map directions.',
  alternates: {
    canonical: '/contact',
  },
}

export default function Page() {
  return <ContactClient />
}
