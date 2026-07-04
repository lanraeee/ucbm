'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'About',      href: '/about' },
  { label: 'Faculties',  href: '/faculties' },
  { label: 'Courses',    href: '/courses' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Contact',    href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-ucbm-border shadow-header">
      <div className="max-w-ucbm mx-auto px-6 py-3.5 flex items-center gap-6 flex-wrap">
        {/* Logo */}
        <Link href="/" className="flex items-center no-underline" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logo.jpeg"
            alt="Universal College of Business and Management"
            width={155}
            height={73}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-1 flex-wrap ml-auto items-center">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-[14.5px] no-underline transition-colors duration-200 hover:text-ucbm-primary"
                style={{
                  fontWeight:   active ? 800 : 600,
                  color:        active ? '#3b1d5e' : '#55496b',
                  borderBottom: active ? '2px solid #c9a227' : '2px solid transparent',
                }}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/admissions"
            className="ml-2.5 bg-ucbm-gold text-ucbm-dark font-extrabold text-[14px] px-[22px] py-[11px] rounded-md no-underline transition-colors duration-200 hover:bg-ucbm-gold-hv"
          >
            Apply Now
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto flex flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className={`block w-6 h-0.5 bg-ucbm-primary transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ucbm-primary transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ucbm-primary transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-ucbm-border px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 text-[14.5px] no-underline rounded-lg transition-colors hover:bg-ucbm-light"
                style={{
                  fontWeight: active ? 800 : 600,
                  color:      active ? '#3b1d5e' : '#55496b',
                }}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/admissions"
            onClick={() => setMobileOpen(false)}
            className="mt-3 bg-ucbm-gold text-ucbm-dark font-extrabold text-[14px] px-6 py-3 rounded-md no-underline text-center hover:bg-ucbm-gold-hv transition-colors"
          >
            Apply Now
          </Link>
        </div>
      )}
    </header>
  )
}
