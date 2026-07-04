import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHeader from '@/components/PageHeader'
import { faculties } from '@/data/faculties'

export const metadata: Metadata = {
  title: 'Our Faculties',
  description:
    'Five faculties, nine qualification levels. Discover the Faculty of Business, Leadership, Health & Social Care, Hospitality and Entrepreneurship at UCBM.',
  openGraph: { title: 'UCBM Faculties', url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ucbm.co.uk'}/faculties` },
}

const facultyImages: Record<string, { src: string; alt: string }> = {
  'Business and Management':                  { src: '/faculty-business.png',       alt: 'Business and Management students in seminar room' },
  'Leadership and Organisational Development':{ src: '/faculty-leadership.png',     alt: 'Leadership workshop with diverse students' },
  'Health and Social Care Management':        { src: '/faculty-health.png',         alt: 'Health and Social Care students in clinical lab' },
  'Hospitality and Tourism Management':       { src: '/faculty-hospitality.png',    alt: 'Hospitality students in hotel training restaurant' },
  'Entrepreneurship and Innovation':          { src: '/faculty-entrepreneurship.png', alt: 'Entrepreneurship students in innovation lab' },
}

export default function Faculties() {
  return (
    <main>
      <PageHeader eyebrow="Five Faculties · Nine Qualification Levels" title="Our Faculties" />

      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-ucbm mx-auto flex flex-col gap-7">
          {faculties.map((f) => {
            const img = facultyImages[f.key]
            return (
              <div
                key={f.key}
                className="grid grid-cols-1 md:grid-cols-[300px_1fr] items-center gap-8 bg-ucbm-light border border-ucbm-border rounded-[14px] overflow-hidden"
              >
                <div className="w-full h-[200px] md:h-full min-h-[200px]">
                  {img ? (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1264}
                      height={848}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-ucbm-pill flex items-center justify-center text-ucbm-muted text-[13px]">
                      {f.key}
                    </div>
                  )}
                </div>
                <div className="p-7">
                  <h2 className="font-marcellus text-[26px] font-normal text-ucbm-primary m-0 mb-3 max-sm:text-[22px]">
                    Faculty of {f.key}
                  </h2>
                  <p className="text-[15px] leading-[1.75] text-ucbm-body m-0 mb-4">{f.detail}</p>
                  <div className="flex gap-2.5 flex-wrap mb-5">
                    {f.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-ucbm-pill text-ucbm-purple-mid text-[12.5px] font-bold px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/courses?faculty=${encodeURIComponent('Faculty of ' + f.key)}`}
                    className="text-ucbm-purple-mid font-extrabold text-[14.5px] no-underline hover:underline"
                  >
                    View courses in this faculty →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
