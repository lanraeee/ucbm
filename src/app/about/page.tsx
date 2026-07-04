import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import ImageSlot from '@/components/ImageSlot'
import { valuesData, goalsData } from '@/data/content'

export const metadata: Metadata = {
  title: 'About The College',
  description:
    'Learn about Universal College of Business and Management — our mission, core values, strategic goals and commitment to academic and professional quality.',
  openGraph: { title: 'About UCBM', url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ucbm.co.uk'}/about` },
}

export default function About() {
  return (
    <main>
      <PageHeader eyebrow="About UCBM" title="About The College" />

      {/* Intro */}
      <section className="py-[72px] px-6 bg-white">
        <div className="max-w-ucbm mx-auto grid items-start gap-14 max-lg:grid-cols-1"
          style={{ gridTemplateColumns: '1.2fr 1fr' }}
        >
          <div className="text-[16px] leading-[1.8] text-ucbm-body">
            <p className="m-0 mb-4.5">
              Universal College of Business and Management is established to provide Full-Time, Part-Time, ODL
              (Open &amp; Distance Learning) and Online academic, professional, and short courses, along with
              well-structured CPD (Continuing Professional Development), Lifelong Learning and Research.
            </p>
            <p className="m-0 mb-4.5">
              The College has five Faculties — the Faculty of Business and Management, Faculty of Leadership and
              Organisational Development, Faculty of Health and Social Care Management, Faculty of Hospitality and
              Tourism Management, and the Faculty of Entrepreneurship and Innovation — offering qualifications ranging
              from Certificate, Diploma, Advanced Diploma, Higher Diploma, Degree, Postgraduate Diploma, Graduate
              Diploma, Professional Masters and Professional Doctorates. Our programmes blend rigorous academic and
              professional theories with real-world practice to enhance the career development of students.
            </p>
            <p className="m-0">
              The College also provides skill-enhancing and professional training for individuals seeking employment
              or currently in employment, generating capabilities in its students and staff for the advancement of
              businesses, organisations, and the wider global community.
            </p>
          </div>
          <ImageSlot placeholder="College photo" style={{ height: 340, borderRadius: 16 }} className="w-full" />
        </div>
      </section>

      {/* Core values */}
      <section className="py-[72px] px-6 bg-ucbm-light">
        <div className="max-w-ucbm mx-auto">
          <h2 className="font-marcellus text-[34px] font-normal text-ucbm-primary m-0 mb-3.5 text-center max-sm:text-[26px]">
            The College Core Values
          </h2>
          <p className="text-center text-[15.5px] text-ucbm-muted max-w-[720px] mx-auto mb-11 leading-[1.7]">
            Our core values underpin everything we do, from the way we teach and lead to the way we engage with our
            students, partners, and the wider community.
          </p>
          <div className="grid gap-4.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {valuesData.map((v, i) => (
              <div key={v.name} className="bg-white border border-ucbm-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-[34px] h-[34px] rounded-lg bg-ucbm-primary text-ucbm-gold grid place-items-center font-marcellus text-[15px] flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-marcellus text-[18px] font-normal text-ucbm-primary m-0 leading-[1.3]">
                    {v.name}
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.7] text-ucbm-muted m-0">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission band */}
      <section className="py-[72px] px-6 bg-ucbm-dark text-white">
        <div className="max-w-[1000px] mx-auto text-center">
          <p className="eyebrow mb-2.5">Our Mission</p>
          <p className="font-marcellus text-[28px] leading-[1.5] m-0 max-sm:text-[20px]">
            "Universal College of Business and Management defines challenges and shapes solutions — producing
            forward-thinking business leaders, managers and scholars, and preparing exceptional graduates to serve
            organisations, industries, communities and the nation."
          </p>
        </div>
      </section>

      {/* Strategic goals */}
      <section className="py-[72px] px-6 bg-white">
        <div className="max-w-ucbm mx-auto grid items-start gap-14 max-lg:grid-cols-1"
          style={{ gridTemplateColumns: '1fr 1.5fr' }}
        >
          <div>
            <p className="eyebrow">Strategic Goals</p>
            <h2 className="font-marcellus text-[34px] font-normal text-ucbm-primary m-0 mb-4 leading-[1.25] max-sm:text-[26px]">
              Enhancing Our National and International Stature
            </h2>
            <p className="text-[15.5px] leading-[1.7] text-ucbm-muted m-0">
              Seven strategic goals guide everything from the student experience to community impact.
            </p>
          </div>
          <div className="flex flex-col gap-3.5">
            {goalsData.map((text, i) => (
              <div key={i} className="flex gap-4 items-start bg-ucbm-light rounded-[10px] px-5 py-4.5">
                <div className="font-marcellus text-[22px] text-ucbm-gold flex-shrink-0 w-[34px]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-[14.5px] leading-[1.7] text-ucbm-body m-0">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-[72px] px-6 bg-ucbm-light">
        <div className="max-w-ucbm mx-auto grid items-center gap-14 max-lg:grid-cols-1"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          <div>
            <p className="eyebrow">Partnerships</p>
            <h2 className="font-marcellus text-[34px] font-normal text-ucbm-primary m-0 mb-4 leading-[1.25] max-sm:text-[26px]">
              Academic and Professional Quality
            </h2>
            <p className="text-[15.5px] leading-[1.75] text-ucbm-body m-0 mb-4">
              For its qualifications to be internationally recognised, the College partners with other educational
              institutions, awarding bodies and corporate organisations — ensuring its programmes and courses are
              recognised and approved by accrediting and awarding bodies in countries around the world.
            </p>
            <p className="text-[15.5px] leading-[1.75] text-ucbm-body m-0">
              The professionalism and creativity of our faculty make a vital contribution to teaching and learning
              — from the individual attention given to each student, to the development of new disciplines.
            </p>
          </div>
          <ImageSlot placeholder="Graduation / partnership photo" style={{ height: 340, borderRadius: 16 }} className="w-full" />
        </div>
      </section>
    </main>
  )
}
