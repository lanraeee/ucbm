import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import ImageSlot from '@/components/ImageSlot'
import { faculties } from '@/data/faculties'

export const metadata: Metadata = {
  title: 'Our Faculties',
  description:
    'Five faculties, nine qualification levels. Discover the Faculty of Business, Leadership, Health & Social Care, Hospitality and Entrepreneurship at UCBM.',
  openGraph: { title: 'UCBM Faculties', url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ucbm.co.uk'}/faculties` },
}

export default function Faculties() {
  return (
    <main>
      <PageHeader eyebrow="Five Faculties · Nine Qualification Levels" title="Our Faculties" />

      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-ucbm mx-auto flex flex-col gap-7">
          {faculties.map((f) => (
            <div
              key={f.key}
              className="grid grid-cols-1 md:grid-cols-[300px_1fr] items-center gap-8 bg-ucbm-light border border-ucbm-border rounded-[14px] p-7"
            >
              <ImageSlot
                placeholder="Faculty photo"
                style={{ height: 200, borderRadius: 10 }}
                className="w-full"
              />
              <div>
                <h2 className="font-marcellus text-[26px] font-normal text-ucbm-primary m-0 mb-3 max-sm:text-[22px]">
                  Faculty of {f.key}
                </h2>
                <p className="text-[15px] leading-[1.75] text-ucbm-body m-0 mb-4">{f.detail}</p>
                <div className="flex gap-2.5 flex-wrap mb-4.5">
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
          ))}
        </div>
      </section>
    </main>
  )
}
