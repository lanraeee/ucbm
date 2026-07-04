import type { Metadata } from 'next'
import Link from 'next/link'
import ImageSlot from '@/components/ImageSlot'
import CourseFinderSection from '@/components/CourseFinderSection'
import JsonLd from '@/components/JsonLd'
import { faculties } from '@/data/faculties'
import { stats, studyModes, valuesData, testimonials } from '@/data/content'

export const metadata: Metadata = {
  title: 'Universal College of Business and Management | Manchester, UK',
  description:
    'Full-Time, Part-Time, ODL and Online programmes from Certificate to Professional Doctorate — in Business, Leadership, Health Care, Hospitality and Entrepreneurship.',
  openGraph: {
    title: 'Universal College of Business and Management',
    description: 'Shape Your Future in Business, Leadership and Care. Study in Manchester, UK.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ucbm.co.uk',
  },
}

const collegeSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollegeOrUniversity',
  name: 'Universal College of Business and Management',
  alternateName: 'UCBM',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ucbm.co.uk',
  address: { '@type': 'PostalAddress', addressLocality: 'Manchester', addressCountry: 'GB' },
  email: 'info@ucbm.co.uk',
  description: 'Full-Time, Part-Time, ODL and Online programmes from Certificate to Professional Doctorate.',
}

export default function Home() {
  return (
    <>
      <JsonLd data={collegeSchema} />

      {/* ── Hero ── */}
      <section
        className="text-white px-6 py-[72px] pb-20"
        style={{ background: 'linear-gradient(135deg, #2a1440 0%, #3b1d5e 60%, #4a2673 100%)' }}
      >
        <div className="max-w-ucbm mx-auto grid items-center gap-14 max-lg:grid-cols-1"
          style={{ gridTemplateColumns: '1.1fr 1fr' }}
        >
          <div>
            <div className="inline-block border border-ucbm-gold text-ucbm-gold-lt text-[13px] tracking-[2px] uppercase px-3.5 py-1.5 rounded-full mb-5">
              Manchester · United Kingdom
            </div>
            <h1 className="font-marcellus font-normal m-0 mb-5 leading-[1.12] max-md:text-[34px]"
              style={{ fontSize: 52 }}
            >
              Shape Your Future in Business, Leadership and Care
            </h1>
            <p className="text-[18px] leading-[1.65] text-ucbm-ondark m-0 mb-8 max-w-[560px]">
              From Certificate to Professional Doctorate — study Full-Time, Part-Time, by Open &amp; Distance Learning
              or fully Online, with personalised support at every step of your journey.
            </p>
            <div className="flex gap-3.5 flex-wrap">
              <Link href="/courses" className="btn-gold px-7 py-[15px] text-[16px]">
                View Our Courses
              </Link>
              <Link href="/contact"
                className="btn-gold-outline px-7 py-[15px] text-[16px] hover:bg-white/10 transition-all duration-200"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
          <ImageSlot
            placeholder="Campus / students photo"
            className="w-full max-lg:hidden"
            style={{ height: 420, borderRadius: 16 }}
          />
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-ucbm-gold px-6 py-7">
        <div className="max-w-ucbm mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-marcellus text-[40px] text-ucbm-dark">{s.n}</div>
              <div className="text-[14px] font-bold text-ucbm-primary uppercase tracking-[1px]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Faculties overview ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-ucbm mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow">Our Five Faculties</p>
            <h2 className="font-marcellus text-[38px] font-normal text-ucbm-primary m-0 max-sm:text-[28px]">
              Where Will You Belong?
            </h2>
          </div>
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {faculties.map((f) => (
              <Link
                key={f.key}
                href="/faculties"
                className="no-underline bg-ucbm-light border border-ucbm-border rounded-xl p-7 transition-all duration-200 hover:shadow-card-hv hover:-translate-y-0.5 block"
              >
                <div className="w-12 h-12 rounded-lg bg-ucbm-primary text-ucbm-gold grid place-items-center font-marcellus text-[18px] mb-4.5">
                  {f.initials}
                </div>
                <h3 className="font-marcellus text-[19px] font-normal text-ucbm-primary m-0 mb-2.5 leading-[1.3]">
                  Faculty of {f.key}
                </h3>
                <p className="text-[13.5px] leading-[1.6] text-ucbm-muted m-0">{f.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course finder (client component) ── */}
      <CourseFinderSection />

      {/* ── Study modes ── */}
      <section className="py-20 px-6 bg-ucbm-dark text-white">
        <div className="max-w-ucbm mx-auto">
          <div className="text-center mb-11">
            <p className="eyebrow">Study Your Way, At Your Pace</p>
            <h2 className="font-marcellus text-[38px] font-normal m-0 max-sm:text-[28px]">
              Four Flexible Ways to Study
            </h2>
          </div>
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {studyModes.map((m) => (
              <div
                key={m.name}
                className="rounded-xl p-7 border"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(201,162,39,0.35)' }}
              >
                <div className="font-marcellus text-[30px] text-ucbm-gold mb-3">{m.num}</div>
                <h3 className="font-marcellus text-[20px] font-normal m-0 mb-2.5">{m.name}</h3>
                <p className="text-[14px] leading-[1.65] text-ucbm-ondark m-0">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core values (compact) ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-ucbm mx-auto grid items-start gap-14 max-lg:grid-cols-1"
          style={{ gridTemplateColumns: '1fr 1.6fr' }}
        >
          <div>
            <p className="eyebrow">What Guides Us</p>
            <h2 className="font-marcellus text-[38px] font-normal text-ucbm-primary m-0 mb-4 leading-[1.2] max-sm:text-[28px]">
              Our Core Values
            </h2>
            <p className="text-[15.5px] leading-[1.7] text-ucbm-muted m-0 mb-6">
              Our core values underpin everything we do — from the way we teach and lead to the way we engage
              with our students, partners, and the wider community.
            </p>
            <Link href="/about" className="text-ucbm-purple-mid font-extrabold text-[15px] no-underline hover:underline">
              Read more about the College →
            </Link>
          </div>
          <div className="grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
            {valuesData.map((v) => (
              <div key={v.name} className="flex gap-3 items-start bg-ucbm-light rounded-[10px] px-4.5 py-4">
                <div className="w-2 h-2 rounded-full bg-ucbm-gold mt-[7px] flex-shrink-0" />
                <div className="text-[14.5px] font-bold text-ucbm-primary leading-[1.45]">{v.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission teaser ── */}
      <section className="py-20 px-6 bg-ucbm-light">
        <div className="max-w-ucbm mx-auto grid items-center gap-14 max-lg:grid-cols-1"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          <ImageSlot placeholder="Teaching / campus photo" style={{ height: 360, borderRadius: 16 }} className="w-full" />
          <div>
            <p className="eyebrow">Our Mission</p>
            <h2 className="font-marcellus text-[36px] font-normal text-ucbm-primary m-0 mb-4 leading-[1.25] max-sm:text-[28px]">
              We Define Challenges and Shape Solutions
            </h2>
            <p className="text-[16px] leading-[1.75] text-ucbm-body m-0 mb-6">
              Our mission is to produce the best, most forward-thinking business leaders, managers and scholars,
              and to prepare exceptional graduates to apply innovative ideas and professional expertise in serving
              organisations, industries, communities and the nation.
            </p>
            <Link
              href="/about"
              className="btn-purple-outline px-6 py-3 text-[15px] no-underline"
            >
              Our Mission &amp; Goals
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-ucbm mx-auto">
          <div className="text-center mb-11">
            <p className="eyebrow">Student Stories</p>
            <h2 className="font-marcellus text-[38px] font-normal text-ucbm-primary m-0 max-sm:text-[28px]">
              Inspiring Testimonials
            </h2>
          </div>
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {testimonials.map((t) => (
              <div key={t.name} className="bg-ucbm-light rounded-xl p-7 flex flex-col gap-4">
                <div className="font-marcellus text-[42px] text-ucbm-gold leading-[0.6] mt-2.5">"</div>
                <p className="text-[15px] leading-[1.7] text-ucbm-body m-0 flex-1">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-ucbm-pill border-2 border-ucbm-border flex-shrink-0 grid place-items-center text-ucbm-primary font-extrabold text-[13px]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-extrabold text-ucbm-primary text-[14.5px]">{t.name}</div>
                    <div className="text-[13px] text-ucbm-faint">{t.programme}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners strip ── */}
      <section className="py-[70px] px-6 bg-ucbm-light">
        <div className="max-w-ucbm mx-auto text-center">
          <p className="eyebrow">Academic &amp; Professional Quality</p>
          <h2 className="font-marcellus text-[32px] font-normal text-ucbm-primary m-0 mb-3.5 max-sm:text-[26px]">
            Our Partners &amp; Awarding Bodies
          </h2>
          <p className="text-[15px] text-ucbm-muted max-w-[680px] mx-auto mb-9 leading-[1.7]">
            The College partners with educational institutions, awarding bodies and corporate organisations so its
            programmes are recognised and approved around the world.
          </p>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ImageSlot key={i} placeholder="Partner logo" style={{ height: 84, borderRadius: 8 }} className="w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section
        className="text-white px-6 py-[72px] text-center"
        style={{ background: 'linear-gradient(135deg, #3b1d5e, #2a1440)' }}
      >
        <div className="max-w-[760px] mx-auto">
          <h2 className="font-marcellus text-[40px] font-normal m-0 mb-4 max-sm:text-[28px]">
            Begin Your Student Journey Today
          </h2>
          <p className="text-[16.5px] leading-[1.7] text-ucbm-ondark m-0 mb-8">
            Complete an application, book a consultation, or request a prospectus — our admissions team will guide
            you every step of the way.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <Link href="/admissions" className="btn-gold px-7 py-[15px] text-[16px]">Apply Now</Link>
            <Link href="/contact" className="btn-gold-outline px-7 py-[15px] text-[16px] hover:bg-white/10 transition-all duration-200">
              Book a Consultation
            </Link>
            <Link href="/contact" className="btn-white-outline px-7 py-[15px] text-[16px]">
              Request a Prospectus
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
