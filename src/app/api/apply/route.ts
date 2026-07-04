import { NextRequest, NextResponse } from 'next/server'
import { sendMail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, contactTime, course, mode, background, city, message } = body

    if (!firstName || !lastName || !email || !phone || !course || !city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const html = `
      <h2>New Application — UCBM Website</h2>
      <table>
        <tr><td><strong>Name</strong></td><td>${firstName} ${lastName}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Best contact time</strong></td><td>${contactTime}</td></tr>
        <tr><td><strong>Course</strong></td><td>${course}</td></tr>
        <tr><td><strong>Study mode</strong></td><td>${mode}</td></tr>
        <tr><td><strong>Background</strong></td><td>${background}</td></tr>
        <tr><td><strong>Location</strong></td><td>${city}</td></tr>
        <tr><td><strong>Message</strong></td><td>${message || '—'}</td></tr>
      </table>
    `

    await sendMail(`New Application: ${firstName} ${lastName} — ${course}`, html)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[apply]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
