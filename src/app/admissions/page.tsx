'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
import { admissionRoutes, applySteps } from '@/data/content'
import { allCourses } from '@/data/courses'

type AppState = {
  firstName: string; lastName: string; email: string; phone: string; contactTime: string
  course: string; mode: string; background: string
  city: string; message: string; agree: boolean
}

const empty: AppState = {
  firstName: '', lastName: '', email: '', phone: '', contactTime: '',
  course: '', mode: '', background: '',
  city: '', message: '', agree: false,
}

const stepLabels  = ['Your Details', 'Your Course', 'Finish']
const courseTitles = allCourses.map((c) => c.title)

function AdmissionsForm() {
  const params = useSearchParams()
  const [step,       setStep]       = useState(0)
  const [app,        setApp]        = useState<AppState>(empty)
  const [error,      setError]      = useState('')
  const [submitted,  setSubmitted]  = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const c = params.get('course')
    if (c) setApp((a) => ({ ...a, course: decodeURIComponent(c) }))
  }, [params])

  function field(name: keyof AppState, value: string | boolean) {
    setApp((a) => ({ ...a, [name]: value }))
  }

  function validate(): string {
    if (step === 0) {
      if (!app.firstName || !app.lastName || !app.email || !app.phone || !app.contactTime)
        return 'Please complete all required fields before continuing.'
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(app.email))
        return 'Please enter a valid email address.'
    }
    if (step === 1) {
      if (!app.course || !app.mode || !app.background)
        return 'Please complete all required fields before continuing.'
    }
    if (step === 2) {
      if (!app.city) return 'Please tell us your city or country of residence.'
      if (!app.agree) return 'Please agree to the terms & conditions to submit.'
    }
    return ''
  }

  async function next() {
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    if (step < 2) { setStep((s) => s + 1); return }
    setSubmitting(true)
    try {
      await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(app),
      })
      setSubmitted(true)
    } catch {
      setError('Submission failed. Please try again or email info@ucbm.co.uk.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls = 'form-input'
  const labelCls = 'form-label'

  return (
    <div className="bg-white rounded-2xl p-9 shadow-modal max-sm:p-6">
      {!submitted ? (
        <>
          {/* Progress bar */}
          <div className="flex gap-2 mb-7">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex-1 text-center">
                <div className="h-[5px] rounded-full mb-2" style={{ background: i <= step ? '#c9a227' : '#ece6f4' }} />
                <div className="text-[12.5px] font-extrabold" style={{ color: i <= step ? '#3b1d5e' : '#b0a6c4' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Step 1 */}
          {step === 0 && (
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <label className={labelCls}>First Name *
                <input className={inputCls} value={app.firstName} onChange={(e) => field('firstName', e.target.value)} />
              </label>
              <label className={labelCls}>Last Name *
                <input className={inputCls} value={app.lastName} onChange={(e) => field('lastName', e.target.value)} />
              </label>
              <label className={labelCls}>Email *
                <input type="email" className={inputCls} value={app.email} onChange={(e) => field('email', e.target.value)} />
              </label>
              <label className={labelCls}>Phone Number *
                <input type="tel" className={inputCls} value={app.phone} onChange={(e) => field('phone', e.target.value)} />
              </label>
              <label className={`${labelCls} col-span-2 max-sm:col-span-1`}>Best time to contact you *
                <select className={inputCls} value={app.contactTime} onChange={(e) => field('contactTime', e.target.value)}>
                  <option value="">Please select…</option>
                  <option>Morning (9 AM – 12 PM)</option>
                  <option>Afternoon (12 PM – 4 PM)</option>
                  <option>Evening (4 PM – 7 PM)</option>
                  <option>Anytime</option>
                </select>
              </label>
            </div>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <label className={labelCls}>Which course do you want to study? *
                <select className={inputCls} value={app.course} onChange={(e) => field('course', e.target.value)}>
                  <option value="">Please select…</option>
                  {courseTitles.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className={labelCls}>Preferred study mode *
                <select className={inputCls} value={app.mode} onChange={(e) => field('mode', e.target.value)}>
                  <option value="">Please select…</option>
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>ODL (Open &amp; Distance Learning)</option>
                  <option>Online</option>
                </select>
              </label>
              <label className={labelCls}>Your highest qualification / experience *
                <select className={inputCls} value={app.background} onChange={(e) => field('background', e.target.value)}>
                  <option value="">Please select…</option>
                  <option>No formal qualifications</option>
                  <option>Work experience</option>
                  <option>Secondary / high school</option>
                  <option>Certificate or Diploma</option>
                  <option>Undergraduate degree</option>
                  <option>Postgraduate degree</option>
                </select>
              </label>
            </div>
          )}

          {/* Step 3 */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <label className={labelCls}>City / Country of residence *
                <input className={inputCls} value={app.city} onChange={(e) => field('city', e.target.value)} />
              </label>
              <label className={labelCls}>Message (optional)
                <textarea className={`${inputCls} resize-y`} rows={4} value={app.message}
                  onChange={(e) => field('message', e.target.value)} />
              </label>
              <label className="flex gap-2.5 items-start text-[14px] text-ucbm-body font-normal cursor-pointer">
                <input type="checkbox" className="mt-[3px]" checked={app.agree}
                  onChange={(e) => field('agree', e.target.checked)} />
                <span>I agree to the terms &amp; conditions and consent to being contacted about my application. *</span>
              </label>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 bg-ucbm-err-bg text-ucbm-err border border-ucbm-err-bd rounded-lg px-4 py-3 text-[14px]">
              {error}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-7">
            {step > 0 ? (
              <button onClick={() => { setStep((s) => s - 1); setError('') }}
                className="bg-transparent border-[1.5px] border-ucbm-input text-ucbm-body font-extrabold text-[14.5px] px-6 py-3 rounded-lg cursor-pointer hover:border-ucbm-primary transition-colors">
                ← Back
              </button>
            ) : <div />}
            <button onClick={next} disabled={submitting}
              className="bg-ucbm-gold border-none text-ucbm-dark font-extrabold text-[15px] px-8 py-3 rounded-lg cursor-pointer hover:bg-ucbm-gold-hv transition-colors disabled:opacity-60">
              {submitting ? 'Submitting…' : step === 2 ? 'Submit Application' : 'Continue →'}
            </button>
          </div>
        </>
      ) : (
        /* Success */
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-ucbm-pill text-ucbm-primary text-[30px] grid place-items-center mx-auto mb-5">✓</div>
          <h3 className="font-marcellus text-[26px] font-normal text-ucbm-primary m-0 mb-3">Application Received</h3>
          <p className="text-[15px] leading-[1.7] text-ucbm-body m-0 mb-6">
            Thank you, {app.firstName}. Our admissions team will contact you at {app.email} within two working days.
          </p>
          <button onClick={() => { setSubmitted(false); setStep(0); setApp(empty); setError('') }}
            className="bg-transparent border-[1.5px] border-ucbm-primary text-ucbm-primary font-extrabold text-[14.5px] px-6 py-3 rounded-lg cursor-pointer hover:bg-ucbm-primary hover:text-white transition-all">
            Submit another application
          </button>
        </div>
      )}
    </div>
  )
}

export default function Admissions() {
  return (
    <main>
      <PageHeader eyebrow="Fast Track Your Admission" title="Admissions & How to Apply" />

      {/* Entry routes */}
      <section className="py-[72px] px-6 bg-white">
        <div className="max-w-ucbm mx-auto">
          <h2 className="font-marcellus text-[32px] font-normal text-ucbm-primary m-0 mb-10 text-center max-sm:text-[26px]">
            Whatever Your Starting Point, There Is a Route for You
          </h2>
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {admissionRoutes.map((r) => (
              <div key={r.title} className="bg-ucbm-light border-t-4 border-ucbm-gold rounded-xl p-7">
                <h3 className="font-marcellus text-[21px] font-normal text-ucbm-primary m-0 mb-3">{r.title}</h3>
                <p className="text-[14.5px] leading-[1.7] text-ucbm-body m-0">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to apply steps */}
      <section className="py-[72px] px-6 bg-ucbm-light">
        <div className="max-w-ucbm mx-auto">
          <h2 className="font-marcellus text-[32px] font-normal text-ucbm-primary m-0 mb-10 text-center max-sm:text-[26px]">
            How to Apply in Four Steps
          </h2>
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
            {applySteps.map((s) => (
              <div key={s.n} className="bg-white border border-ucbm-border rounded-xl p-7">
                <div className="font-marcellus text-[34px] text-ucbm-gold mb-3">{s.n}</div>
                <h3 className="font-marcellus text-[19px] font-normal text-ucbm-primary m-0 mb-2.5">{s.title}</h3>
                <p className="text-[14px] leading-[1.65] text-ucbm-muted m-0">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-[72px] px-6 bg-ucbm-dark">
        <div className="max-w-[760px] mx-auto">
          <div className="text-center mb-9">
            <p className="eyebrow mb-2.5">Ready to Apply?</p>
            <h2 className="font-marcellus text-[34px] font-normal text-white m-0 max-sm:text-[26px]">
              Start Your Application
            </h2>
          </div>
          <Suspense>
            <AdmissionsForm />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
