'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import CourseCard from '@/components/CourseCard'
import { allCourses, LEVELS } from '@/data/courses'
import { facultyFullNames } from '@/data/faculties'

const facultyOptions = ['All Faculties', ...facultyFullNames]
const levelOptions   = ['All Levels', ...LEVELS]
const inputClass     = 'px-4 py-3 rounded-lg border-none text-[14.5px] text-ucbm-primary font-semibold focus:outline-none'

function CoursesContent() {
  const params = useSearchParams()
  const [search,  setSearch]  = useState('')
  const [faculty, setFaculty] = useState('All Faculties')
  const [level,   setLevel]   = useState('All Levels')

  useEffect(() => {
    const fParam = params.get('faculty')
    if (fParam) setFaculty(decodeURIComponent(fParam))
  }, [params])

  const q = search.toLowerCase()
  const filtered = allCourses.filter(
    (c) =>
      (faculty === 'All Faculties' || c.facultyFull === faculty) &&
      (level   === 'All Levels'   || c.level      === level)   &&
      (!q || c.title.toLowerCase().includes(q) || c.level.toLowerCase().includes(q)),
  )

  return (
    <main>
      {/* Page header with filters */}
      <section
        className="text-white px-6 py-12 md:py-16"
        style={{ background: 'linear-gradient(135deg, #2a1440, #3b1d5e)' }}
      >
        <div className="max-w-ucbm mx-auto">
          <p className="eyebrow mb-2.5">Certificate to Professional Doctorate</p>
          <h1 className="font-marcellus text-[34px] md:text-[44px] font-normal m-0 mb-5">Our Courses</h1>
          <div className="flex gap-3 flex-wrap items-center">
            <input
              type="search"
              placeholder="Search courses…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${inputClass} w-full sm:w-[300px]`}
            />
            <select value={faculty} onChange={(e) => setFaculty(e.target.value)} className={`${inputClass} w-full sm:w-auto`}>
              {facultyOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className={`${inputClass} w-full sm:w-auto`}>
              {levelOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <span className="text-ucbm-ondark text-[14px]">
              {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      </section>

      {/* Results grid */}
      <section className="py-12 md:py-14 px-6 bg-ucbm-light min-h-[400px]">
        <div className="max-w-ucbm mx-auto">
          {filtered.length === 0 ? (
            <p className="text-ucbm-muted text-center py-20 text-[16px]">
              No courses match your filters. Try adjusting your search.
            </p>
          ) : (
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))' }}>
              {filtered.map((c) => <CourseCard key={c.title} course={c} />)}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default function CoursesPage() {
  return (
    <Suspense>
      <CoursesContent />
    </Suspense>
  )
}
