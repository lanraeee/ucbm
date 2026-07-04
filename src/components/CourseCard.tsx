import Link from 'next/link'
import type { CourseVM } from '@/data/courses'

interface CourseCardProps {
  course: CourseVM
}

export default function CourseCard({ course }: CourseCardProps) {
  const applyHref = `/admissions?course=${encodeURIComponent(course.title)}`
  return (
    <div className="course-card">
      <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #c9a227, #3b1d5e)' }} />
      <div className="p-[22px] flex flex-col gap-3 flex-1">
        <div className="flex gap-2 flex-wrap">
          <span className="bg-ucbm-gold-badge text-ucbm-gold-btx text-[11.5px] font-extrabold px-2.5 py-1 rounded-full tracking-[0.5px] uppercase">
            {course.level}
          </span>
          <span className="bg-ucbm-pill text-ucbm-purple-mid text-[11.5px] font-bold px-2.5 py-1 rounded-full">
            {course.facultyShort}
          </span>
        </div>
        <h3 className="font-marcellus text-[19px] font-normal text-ucbm-text m-0 leading-[1.35] flex-1">
          {course.title}
        </h3>
        <div className="grid grid-cols-2 gap-2 text-[13px] text-ucbm-muted border-t border-ucbm-light pt-3">
          <div><strong className="text-ucbm-primary">Duration:</strong> {course.duration}</div>
          <div><strong className="text-ucbm-primary">Intakes:</strong> {course.intakes}</div>
          <div className="col-span-2"><strong className="text-ucbm-primary">Study modes:</strong> {course.modes}</div>
        </div>
        <Link
          href={applyHref}
          className="text-ucbm-purple-mid font-extrabold text-[14px] no-underline hover:underline"
        >
          Apply for this course →
        </Link>
      </div>
    </div>
  )
}
