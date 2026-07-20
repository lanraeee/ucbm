import type { Metadata } from 'next'
import { Marcellus, Mulish } from 'next/font/google'
import './globals.css'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marcellus',
  display: 'swap',
})
const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-mulish',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ucbm.co.uk'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Universal College of Business and Management | United Kingdom',
    template: '%s | UCBM',
  },
  description:
    'Universal College of Business and Management — Full-Time, Part-Time, ODL and Online academic, professional and short courses in the United Kingdom.',
  keywords: [
    'business college UK',
    'management courses UK',
    'professional development',
    'leadership courses',
    'health care courses',
    'hospitality management',
    'online MBA',
    'part time degree UK',
    'UCBM',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Universal College of Business and Management',
    locale: 'en_GB',
    url: siteUrl,
    title: 'Universal College of Business and Management | United Kingdom',
    description:
      'Shape your future with Full-Time, Part-Time, ODL and Online programmes in Business, Leadership, Health Care, Hospitality and Entrepreneurship — study in the UK.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universal College of Business and Management | United Kingdom',
    description:
      'Shape your future with Full-Time, Part-Time, ODL and Online programmes in Business, Leadership & Health Care — study in the UK.',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${marcellus.variable} ${mulish.variable}`}>
      <body className="min-w-[320px]">
        <TopBar />
        <Header />
        {children}
        <Footer />
        <Chatbot />
      </body>
    </html>
  )
}
