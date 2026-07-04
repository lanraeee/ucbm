import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ImageSlot from '@/components/ImageSlot'
import CourseFinderSection from '@/components/CourseFinderSection'
import JsonLd from '@/components/JsonLd'
import { faculties } from '@/data/faculties'
import { stats, studyModes, valuesData, testimonials } from '@/data/content'

export const metadata: Metadata = {
  title: 'Universal College of Business and Management | United Kingdom',
  description:
    'Full-Time, Part-Time, ODL and Online programmes from Certificate to Professional Doctorate — in Business, Leadership, Health Care, Hospitality and Entrepreneurship.',
  openGraph: {
    title: 'Universal College of Business and Management',
    description: 'Shape Your Future in Business, Leadership & Management and Health & Social Care. Study in UK.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ucbm.co.uk',
  },
}

const collegeSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollegeOrUniversity',
  name: 'Universal College of Business and Management',
  alternateName: 'UCBM',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ucbm.co.uk',
  address: { '@type': 'PostalAddress', addressLocality: 'UnitedKingdom', addressCountry: 'GB' },
  email: 'admissions@ucbm.co.uk',
  description: 'Full-Time, Part-Time, ODL and Online programmes from Certificate to Professional Doctorate.',
}

export default function Home() {
  return (
    <>
      <JsonLd data={collegeSchema} />

      {/* ── Hero ── */}
      <section
        className="text-white px-6 py-12 md:py-[72px] md:pb-20"
        style={{ background: 'linear-gradient(135deg, #2a1440 0%, #3b1d5e 60%, #4a2673 100%)' }}
      >
        {/* 1-col on mobile, 1.1fr/1fr on ≥lg */}
        <div className="max-w-ucbm mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center gap-10 lg:gap-14">
          <div>
            <div className="inline-block border border-ucbm-gold text-ucbm-gold-lt text-[13px] tracking-[2px] uppercase px-3.5 py-1.5 rounded-full mb-5">
            · United Kingdom
            </div>
            <h1 className="font-marcellus font-normal m-0 mb-5 leading-[1.12] text-[36px] sm:text-[44px] md:text-[52px]">
              Shape Your Future in Business, Leadership & Management and Health & Social Care
            </h1>
            <p className="text-[16px] md:text-[18px] leading-[1.65] text-ucbm-ondark m-0 mb-8 max-w-[560px]">
              From Certificate to Professional Doctorate — study Full-Time, Part-Time, by Open &amp; Distance Learning
              or fully Online, with personalised support at every step of your journey.
            </p>
            <div className="flex gap-3.5 flex-wrap">
              <Link href="/courses" className="btn-gold px-6 py-3.5 md:px-7 md:py-[15px] text-[15px] md:text-[16px]">
                View Our Courses
              </Link>
              <Link href="/contact"
                className="btn-gold-outline px-6 py-3.5 md:px-7 md:py-[15px] text-[15px] md:text-[16px] hover:bg-white/10 transition-all duration-200"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
          {/* Hero image */}
          <div className="w-full rounded-2xl overflow-hidden" style={{ minHeight: 280 }}>
            <Image
              src="/campus-students.png"
              alt="Diverse UCBM students studying together in Manchester city centre"
              width={1376}
              height={768}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-ucbm-gold px-6 py-6 md:py-7">
        <div className="max-w-ucbm mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-marcellus text-[32px] md:text-[40px] text-ucbm-dark">{s.n}</div>
              <div className="text-[12px] md:text-[14px] font-bold text-ucbm-primary uppercase tracking-[1px]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Faculties overview ── */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="max-w-ucbm mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <p className="eyebrow">Our Five Faculties</p>
            <h2 className="font-marcellus text-[28px] md:text-[38px] font-normal text-ucbm-primary m-0">
              Where Will You Belong?
            </h2>
          </div>
          {/* min(220px,100%) collapses cards to 1-col on narrow screens */}
          <div className="grid gap-4 md:gap-5"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))' }}>
            {faculties.map((f) => (
              <Link
                key={f.key}
                href="/faculties"
                className="no-underline bg-ucbm-light border border-ucbm-border rounded-xl p-6 md:p-7 transition-all duration-200 hover:shadow-card-hv hover:-translate-y-0.5 block"
              >
                <div className="w-12 h-12 rounded-lg bg-ucbm-primary text-ucbm-gold grid place-items-center font-marcellus text-[18px] mb-4">
                  {f.initials}
                </div>
                <h3 className="font-marcellus text-[18px] md:text-[19px] font-normal text-ucbm-primary m-0 mb-2 leading-[1.3]">
                  Faculty of {f.key}
                </h3>
                <p className="text-[13px] md:text-[13.5px] leading-[1.6] text-ucbm-muted m-0">{f.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course finder (client component) ── */}
      <CourseFinderSection />

      {/* ── Study modes ── */}
      <section className="py-12 md:py-20 px-6 bg-ucbm-dark text-white">
        <div className="max-w-ucbm mx-auto">
          <div className="text-center mb-10 md:mb-11">
            <p className="eyebrow">Study Your Way, At Your Pace</p>
            <h2 className="font-marcellus text-[28px] md:text-[38px] font-normal m-0">
              Four Flexible Ways to Study
            </h2>
          </div>
          <div className="grid gap-4 md:gap-5"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))' }}>
            {studyModes.map((m) => (
              <div
                key={m.name}
                className="rounded-xl p-6 md:p-7 border"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(201,162,39,0.35)' }}
              >
                <div className="font-marcellus text-[28px] md:text-[30px] text-ucbm-gold mb-3">{m.num}</div>
                <h3 className="font-marcellus text-[18px] md:text-[20px] font-normal m-0 mb-2.5">{m.name}</h3>
                <p className="text-[14px] leading-[1.65] text-ucbm-ondark m-0">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core values (compact) ── */}
      <section className="py-12 md:py-20 px-6 bg-white">
        {/* 1-col → 1fr/1.6fr at lg */}
        <div className="max-w-ucbm mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] items-start gap-10 lg:gap-14">
          <div>
            <p className="eyebrow">What Guides Us</p>
            <h2 className="font-marcellus text-[28px] md:text-[38px] font-normal text-ucbm-primary m-0 mb-4 leading-[1.2]">
              Our Core Values
            </h2>
            <p className="text-[15px] md:text-[15.5px] leading-[1.7] text-ucbm-muted m-0 mb-6">
              Our core values underpin everything we do — from the way we teach and lead to the way we engage
              with our students, partners, and the wider community.
            </p>
            <Link href="/about" className="text-ucbm-purple-mid font-extrabold text-[15px] no-underline hover:underline">
              Read more about the College →
            </Link>
          </div>
          <div className="grid gap-3"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(230px, 100%), 1fr))' }}>
            {valuesData.map((v) => (
              <div key={v.name} className="flex gap-3 items-start bg-ucbm-light rounded-[10px] px-4 py-3.5">
                <div className="w-2 h-2 rounded-full bg-ucbm-gold mt-[7px] flex-shrink-0" />
                <div className="text-[14px] md:text-[14.5px] font-bold text-ucbm-primary leading-[1.45]">{v.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission teaser ── */}
      <section className="py-12 md:py-20 px-6 bg-ucbm-light">
        {/* 1-col → 1fr/1fr at lg */}
        <div className="max-w-ucbm mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
          <ImageSlot placeholder="Teaching / campus photo"
            style={{ height: 280, borderRadius: 16 }}
            className="w-full md:h-[360px]"
          />
          <div>
            <p className="eyebrow">Our Mission</p>
            <h2 className="font-marcellus text-[28px] md:text-[36px] font-normal text-ucbm-primary m-0 mb-4 leading-[1.25]">
              We Define Challenges and Shape Solutions
            </h2>
            <p className="text-[15px] md:text-[16px] leading-[1.75] text-ucbm-body m-0 mb-6">
              Our mission is to produce the best, most forward-thinking business leaders, managers and scholars,
              and to prepare exceptional graduates to apply innovative ideas and professional expertise in serving
              organisations, industries, communities and the nation.
            </p>
            <Link href="/about" className="btn-purple-outline px-6 py-3 text-[15px] no-underline min-h-[44px] inline-flex items-center">
              Our Mission &amp; Goals
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="max-w-ucbm mx-auto">
          <div className="text-center mb-10 md:mb-11">
            <p className="eyebrow">Student Stories</p>
            <h2 className="font-marcellus text-[28px] md:text-[38px] font-normal text-ucbm-primary m-0">
              Inspiring Testimonials
            </h2>
          </div>
          <div className="grid gap-4 md:gap-5"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))' }}>
            {testimonials.map((t) => (
              <div key={t.name} className="bg-ucbm-light rounded-xl p-6 md:p-7 flex flex-col gap-4">
                <div className="font-marcellus text-[42px] text-ucbm-gold leading-[0.6] mt-2.5">"</div>
                <p className="text-[14px] md:text-[15px] leading-[1.7] text-ucbm-body m-0 flex-1">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-ucbm-pill border-2 border-ucbm-border flex-shrink-0 grid place-items-center text-ucbm-primary font-extrabold text-[13px]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-extrabold text-ucbm-primary text-[14px] md:text-[14.5px]">{t.name}</div>
                    <div className="text-[13px] text-ucbm-faint">{t.programme}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners strip ── */}
      <section className="py-12 md:py-[70px] px-6 bg-ucbm-light">
        <div className="max-w-ucbm mx-auto text-center">
          <p className="eyebrow">Academic &amp; Professional Quality</p>
          <h2 className="font-marcellus text-[26px] md:text-[32px] font-normal text-ucbm-primary m-0 mb-3">
            Our Partners &amp; Awarding Bodies
          </h2>
          <p className="text-[14px] md:text-[15px] text-ucbm-muted max-w-[680px] mx-auto mb-8 leading-[1.7]">
            The College partners with educational institutions, awarding bodies and corporate organisations so its
            programmes are recognised and approved around the world.
          </p>
          <div className="grid gap-3 md:gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ImageSlot key={i} placeholder="Partner logo" style={{ height: 84, borderRadius: 8 }} className="w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section
        className="text-white px-6 py-12 md:py-[72px] text-center"
        style={{ background: 'linear-gradient(135deg, #3b1d5e, #2a1440)' }}
      >
        <div className="max-w-[760px] mx-auto">
          <h2 className="font-marcellus text-[28px] md:text-[40px] font-normal m-0 mb-4">
            Begin Your Student Journey Today
          </h2>
          <p className="text-[15px] md:text-[16.5px] leading-[1.7] text-ucbm-ondark m-0 mb-8">
            Complete an application, book a consultation, or request a prospectus — our admissions team will guide
            you every step of the way.
          </p>
          <div className="flex gap-3 md:gap-3.5 justify-center flex-wrap">
            <Link href="/admissions" className="btn-gold px-6 py-3.5 md:px-7 md:py-[15px] text-[15px] md:text-[16px]">Apply Now</Link>
            <Link href="/contact" className="btn-gold-outline px-6 py-3.5 md:px-7 md:py-[15px] text-[15px] md:text-[16px] hover:bg-white/10 transition-all duration-200">
              Book a Consultation
            </Link>
            <Link href="/contact" className="btn-white-outline px-6 py-3.5 md:px-7 md:py-[15px] text-[15px] md:text-[16px]">
              Request a Prospectus
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
