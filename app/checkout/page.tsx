import type { Metadata } from 'next'
import CheckoutClient from './checkout-client'

export const metadata: Metadata = {
  title: 'Secure Checkout / Payment Information',
  description: 'Complete your order checkout with Marudeni Foods. Confirm pickup or delivery options in Lagos and proceed with direct bank transfer payment.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/checkout',
  },
}

export default function Page() {
  return <CheckoutClient />
}
