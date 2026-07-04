'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CourseCard from './CourseCard'
import { allCourses, type CourseVM } from '@/data/courses'
import { facultyFullNames } from '@/data/faculties'
import Link from 'next/link'

const chips = ['All Faculties', ...facultyFullNames.map((f) => f.replace('Faculty of ', ''))]
const chipKeys = ['All Faculties', ...facultyFullNames]

export default function CourseFinderSection() {
  const [activeFaculty, setActiveFaculty] = useState('All Faculties')
  const router = useRouter()

  const filtered: CourseVM[] = activeFaculty === 'All Faculties'
    ? allCourses
    : allCourses.filter((c) => c.facultyFull === activeFaculty)

  const displayed = filtered.slice(0, 6)

  return (
    <section className="py-20 px-6 bg-ucbm-light">
      <div className="max-w-ucbm mx-auto">
        <div className="text-center mb-9">
          <p className="eyebrow">Start Learning Today</p>
          <h2 className="font-marcellus text-[38px] font-normal text-ucbm-primary m-0 max-sm:text-[28px]">
            Find Your Course
          </h2>
        </div>

        {/* Faculty filter chips */}
        <div className="flex gap-2.5 flex-wrap justify-center mb-8">
          {chips.map((label, i) => {
            const key = chipKeys[i]
            const active = activeFaculty === key
            return (
              <button
                key={key}
                onClick={() => setActiveFaculty(key)}
                className="cursor-pointer font-bold text-[13.5px] px-[18px] py-[9px] rounded-full border-[1.5px] transition-colors duration-200"
                style={{
                  background:   active ? '#3b1d5e' : '#ffffff',
                  color:        active ? '#ffffff' : '#55496b',
                  borderColor:  active ? '#3b1d5e' : '#d9d0e8',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Course grid */}
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
          {displayed.map((c) => (
            <CourseCard key={c.title} course={c} />
          ))}
        </div>

        <div className="text-center mt-9">
          <Link
            href={activeFaculty === 'All Faculties'
              ? '/courses'
              : `/courses?faculty=${encodeURIComponent(activeFaculty)}`}
            className="inline-block bg-ucbm-primary text-white font-extrabold px-8 py-3.5 rounded-md text-[15px] no-underline hover:bg-ucbm-purple-hv transition-colors duration-200"
          >
            See All Courses
          </Link>
        </div>
      </div>
    </section>
  )
}
