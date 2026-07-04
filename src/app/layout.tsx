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

export const metadata: Metadata = {
  title: {
    default: 'Universal College of Business and Management | United Kingdom',
    template: '%s | UCBM',
  },
  description:
    'Universal College of Business and Management — Full-Time, Part-Time, ODL and Online academic, professional and short courses in United Kingdom.',
  openGraph: {
    type: 'website',
    siteName: 'Universal College of Business and Management',
    locale: 'en_GB',
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
