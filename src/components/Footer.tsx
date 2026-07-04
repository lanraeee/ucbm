'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const emailRef = useRef<HTMLInputElement>(null)
  const [newsMsg, setNewsMsg] = useState('')

  async function subscribe() {
    const v = emailRef.current?.value.trim() ?? ''
    if (!v || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
      setNewsMsg('Please enter a valid email address.')
      return
    }
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: v }),
      })
      if (emailRef.current) emailRef.current.value = ''
      setNewsMsg("Thank you — you're subscribed!")
    } catch {
      setNewsMsg('Something went wrong. Please try again.')
    }
  }

  return (
    <footer className="bg-ucbm-footer text-ucbm-ftext pt-16 pb-0">
      <div className="max-w-ucbm mx-auto px-6">
        {/* 4-col → 2-col → 1-col via .footer-grid CSS class */}
        <div className="footer-grid pb-12 border-b border-white/10">
          {/* Brand block */}
          <div>
            <div className="mb-[18px]">
              <div className="inline-block bg-white rounded-lg p-2">
                <Image
                  src="/logo.jpeg"
                  alt="Universal College of Business and Management"
                  width={160}
                  height={68}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-[13.5px] leading-[1.7] mb-5">
              Academic, professional and short courses — Full-Time, Part-Time, ODL and Online — from Certificate to Professional Doctorate.
            </p>
            <div className="text-[13.5px]">✉ admissions@ucbm.co.uk · Manchester, UK</div>
          </div>

          {/* The College */}
          <div>
            <h4 className="text-ucbm-gold text-[13px] tracking-[2px] uppercase font-extrabold m-0 mb-4">The College</h4>
            <div className="flex flex-col gap-2.5 text-[14px]">
              {[
                { label: 'About Us',  href: '/about' },
                { label: 'Faculties', href: '/faculties' },
                { label: 'Courses',   href: '/courses' },
                { label: 'Contact',   href: '/contact' },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  className="text-ucbm-ftext no-underline hover:text-white transition-colors duration-200 min-h-[44px] flex items-center">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Study */}
          <div>
            <h4 className="text-ucbm-gold text-[13px] tracking-[2px] uppercase font-extrabold m-0 mb-4">Study</h4>
            <div className="flex flex-col gap-2.5 text-[14px]">
              {[
                { label: 'How to Apply',       href: '/admissions' },
                { label: 'Entry Routes',        href: '/admissions' },
                { label: 'Short Courses & CPD', href: '/courses' },
              ].map((l) => (
                <Link key={l.label} href={l.href}
                  className="text-ucbm-ftext no-underline hover:text-white transition-colors duration-200 min-h-[44px] flex items-center">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-ucbm-gold text-[13px] tracking-[2px] uppercase font-extrabold m-0 mb-4">Newsletter</h4>
            <p className="text-[13.5px] leading-[1.6] mb-3.5">
              Join our newsletter for course news, intake dates and guidance.
            </p>
            <div className="flex gap-2">
              <input
                ref={emailRef}
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 px-3.5 py-[11px] rounded-md border-none text-[14px] text-ucbm-text focus:outline-none"
              />
              <button
                onClick={subscribe}
                className="bg-ucbm-gold border-none text-ucbm-dark font-extrabold text-[14px] px-[18px] py-[11px] rounded-md cursor-pointer hover:bg-ucbm-gold-hv transition-colors duration-200 min-h-[44px]"
              >
                Subscribe
              </button>
            </div>
            {newsMsg && <p className="mt-2.5 text-[13px] text-ucbm-gold-lt">{newsMsg}</p>}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between flex-wrap gap-3 py-5 text-[13px]">
          <span>© 2026 Universal College of Business and Management. All rights reserved.</span>
          <span>Privacy Policy · Cookies Policy</span>
        </div>
      </div>
    </footer>
  )
}
