'use client'

import { useState } from 'react'
import Image from 'next/image'
import PageHeader from '@/components/PageHeader'

type ContactState = {
  name: string; email: string; reason: string; message: string
}
const empty: ContactState = { name: '', email: '', reason: '', message: '' }

export default function Contact() {
  const [form,      setForm]      = useState<ContactState>(empty)
  const [sent,      setSent]      = useState(false)
  const [error,     setError]     = useState('')
  const [sending,   setSending]   = useState(false)

  function field(name: keyof ContactState, value: string) {
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function send() {
    if (!form.name || !form.email || !form.reason) {
      setError('Please complete all required fields.')
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSending(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSent(true)
    } catch {
      setError('Could not send. Please email admissions@ucbm.co.uk directly.')
    } finally {
      setSending(false)
    }
  }

  const inputCls = 'form-input bg-white'
  const labelCls = 'form-label'

  return (
    <main>
      <PageHeader eyebrow="We Would Love to Hear From You" title="Contact Us" />

      <section className="py-12 md:py-[72px] px-6 bg-white">
        <div className="max-w-ucbm mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] items-start gap-10 lg:gap-14">
          {/* Left: contact info */}
          <div>
            <h2 className="font-marcellus text-[28px] font-normal text-ucbm-primary m-0 mb-5">Get in Touch</h2>
            <div className="flex flex-col gap-4.5">
              {[
                { icon: '✉', label: 'Email',  value: 'admissions@ucbm.co.uk', note: '' },
                { icon: '◎', label: 'Locations', value: 'United Kingdom', note: '' },
                { icon: '✆', label: 'Phone',  value: '0161399UCBM', note: 'You can now WhatsApp Us' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3.5 items-start">
                  <div className="w-[42px] h-[42px] rounded-[10px] bg-ucbm-gold-badge text-ucbm-gold-btx grid place-items-center text-[17px] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-extrabold text-ucbm-primary text-[14.5px]">{item.label}</div>
                    {item.value && <div className="text-[15px] text-ucbm-body">{item.value}</div>}
                    {item.note  && <div className="text-[13px] text-ucbm-faint">{item.note}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full rounded-xl overflow-hidden mt-7" style={{ height: 220 }}>
              <Image src="/manchester-city.png" alt="Manchester city centre" width={1376} height={768} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: enquiry form */}
          <div className="bg-ucbm-light rounded-2xl p-[34px] max-sm:p-5">
            {!sent ? (
              <>
                <h2 className="font-marcellus text-[26px] font-normal text-ucbm-primary m-0 mb-2">Send an Enquiry</h2>
                <p className="text-[14px] text-ucbm-muted m-0 mb-6">
                  Book a consultation, request a prospectus, or ask us anything.
                </p>
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <label className={labelCls}>Name *
                    <input className={inputCls} value={form.name} onChange={(e) => field('name', e.target.value)} />
                  </label>
                  <label className={labelCls}>Email *
                    <input type="email" className={inputCls} value={form.email} onChange={(e) => field('email', e.target.value)} />
                  </label>
                  <label className={`${labelCls} col-span-2 max-sm:col-span-1`}>I would like to… *
                    <select className={inputCls} value={form.reason} onChange={(e) => field('reason', e.target.value)}>
                      <option value="">Please select…</option>
                      <option>Book a consultation</option>
                      <option>Request a prospectus</option>
                      <option>Ask about a course</option>
                      <option>Something else</option>
                    </select>
                  </label>
                  <label className={`${labelCls} col-span-2 max-sm:col-span-1`}>Message
                    <textarea
                      className={`${inputCls} resize-y`}
                      rows={5}
                      value={form.message}
                      onChange={(e) => field('message', e.target.value)}
                    />
                  </label>
                </div>
                {error && (
                  <div className="mt-4 bg-ucbm-err-bg text-ucbm-err border border-ucbm-err-bd rounded-lg px-4 py-3 text-[14px]">
                    {error}
                  </div>
                )}
                <button
                  onClick={send}
                  disabled={sending}
                  className="mt-5 bg-ucbm-primary border-none text-white font-extrabold text-[15px] px-[34px] py-3.5 rounded-lg cursor-pointer hover:bg-ucbm-purple-hv transition-colors disabled:opacity-60"
                >
                  {sending ? 'Sending…' : 'Send Enquiry'}
                </button>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-ucbm-pill text-ucbm-primary text-[30px] grid place-items-center mx-auto mb-5">
                  ✓
                </div>
                <h3 className="font-marcellus text-[24px] font-normal text-ucbm-primary m-0 mb-2.5">Thank You</h3>
                <p className="text-[15px] text-ucbm-body m-0">
                  Your enquiry has been received. We will reply to you shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
