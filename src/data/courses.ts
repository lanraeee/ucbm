import { faculties } from './faculties'

export interface Course {
  title: string
  fac: number
  level: string
  duration: string
  modes: string
  intakes: string
}

export const LEVELS = [
  'Certificate',
  'Diploma',
  'Advanced Diploma',
  'Higher Diploma',
  'Graduate Diploma',
  'Postgraduate Diploma',
  'Professional Masters',
  'Professional Doctorate',
] as const

export const courses: Course[] = [
  { title: 'Certificate in Business and Management',           fac: 0, level: 'Certificate',          duration: '6 months',  modes: 'Full-Time, Part-Time, Online',        intakes: 'Jan, May, Sep' },
  { title: 'Diploma in Business Management',                  fac: 0, level: 'Diploma',               duration: '1 year',    modes: 'Full-Time, Part-Time, ODL, Online',   intakes: 'Jan, May, Sep' },
  { title: 'Advanced Diploma in Business Management',         fac: 0, level: 'Advanced Diploma',      duration: '1 year',    modes: 'Full-Time, Part-Time, Online',        intakes: 'Jan, Sep' },
  { title: 'Higher Diploma in Business Administration',       fac: 0, level: 'Higher Diploma',        duration: '18 months', modes: 'Full-Time, Part-Time, ODL',           intakes: 'Jan, Sep' },
  { title: 'Postgraduate Diploma in International Business',  fac: 0, level: 'Postgraduate Diploma',  duration: '1 year',    modes: 'Part-Time, Online',                   intakes: 'Jan, May, Sep' },
  { title: 'Professional Master in Business Administration',  fac: 0, level: 'Professional Masters',  duration: '18 months', modes: 'Part-Time, ODL, Online',              intakes: 'Jan, Sep' },
  { title: 'Professional Doctorate in Business Administration', fac: 0, level: 'Professional Doctorate', duration: '3 years', modes: 'Part-Time, ODL',                    intakes: 'Jan, Sep' },
  { title: 'Certificate in Leadership Essentials',            fac: 1, level: 'Certificate',           duration: '6 months',  modes: 'Part-Time, Online',                   intakes: 'Jan, May, Sep' },
  { title: 'Diploma in Leadership and Management',            fac: 1, level: 'Diploma',               duration: '1 year',    modes: 'Full-Time, Part-Time, Online',        intakes: 'Jan, May, Sep' },
  { title: 'Graduate Diploma in Organisational Development',  fac: 1, level: 'Graduate Diploma',      duration: '1 year',    modes: 'Part-Time, ODL, Online',              intakes: 'Jan, Sep' },
  { title: 'Professional Master in Strategic Leadership',     fac: 1, level: 'Professional Masters',  duration: '18 months', modes: 'Part-Time, ODL, Online',              intakes: 'Jan, Sep' },
  { title: 'Certificate in Health and Social Care',           fac: 2, level: 'Certificate',           duration: '6 months',  modes: 'Full-Time, Part-Time, Online',        intakes: 'Jan, May, Sep' },
  { title: 'Diploma in Health and Social Care Management',    fac: 2, level: 'Diploma',               duration: '1 year',    modes: 'Full-Time, Part-Time, ODL, Online',   intakes: 'Jan, May, Sep' },
  { title: 'Higher Diploma in Health Services Management',    fac: 2, level: 'Higher Diploma',        duration: '18 months', modes: 'Full-Time, Part-Time, ODL',           intakes: 'Jan, Sep' },
  { title: 'Professional Master in Health and Social Care Leadership', fac: 2, level: 'Professional Masters', duration: '18 months', modes: 'Part-Time, ODL, Online',   intakes: 'Jan, Sep' },
  { title: 'Diploma in Hospitality Management',               fac: 3, level: 'Diploma',               duration: '1 year',    modes: 'Full-Time, Part-Time, Online',        intakes: 'Jan, May, Sep' },
  { title: 'Advanced Diploma in Tourism and Events Management', fac: 3, level: 'Advanced Diploma',    duration: '1 year',    modes: 'Full-Time, Part-Time, Online',        intakes: 'Jan, Sep' },
  { title: 'Professional Master in International Hospitality Management', fac: 3, level: 'Professional Masters', duration: '18 months', modes: 'Part-Time, ODL, Online', intakes: 'Jan, Sep' },
  { title: 'Certificate in Entrepreneurship',                 fac: 4, level: 'Certificate',           duration: '6 months',  modes: 'Part-Time, Online',                   intakes: 'Jan, May, Sep' },
  { title: 'Diploma in Innovation and Enterprise Management', fac: 4, level: 'Diploma',               duration: '1 year',    modes: 'Full-Time, Part-Time, Online',        intakes: 'Jan, May, Sep' },
  { title: 'Professional Master in Entrepreneurship and Innovation', fac: 4, level: 'Professional Masters', duration: '18 months', modes: 'Part-Time, ODL, Online',    intakes: 'Jan, Sep' },
]

export interface CourseVM extends Course {
  facultyShort: string
  facultyFull: string
}

export function enrichCourses(raw: Course[]): CourseVM[] {
  return raw.map((c) => ({
    ...c,
    facultyShort: faculties[c.fac].short,
    facultyFull: 'Faculty of ' + faculties[c.fac].key,
  }))
}

export const allCourses: CourseVM[] = enrichCourses(courses)
