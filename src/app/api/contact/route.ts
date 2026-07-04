import { NextRequest, NextResponse } from 'next/server'
import { sendMail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, reason, message } = body

    if (!name || !email || !reason) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const html = `
      <h2>New Enquiry — UCBM Website</h2>
      <table>
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Reason</strong></td><td>${reason}</td></tr>
        <tr><td><strong>Message</strong></td><td>${message || '—'}</td></tr>
      </table>
    `

    const subject = `Enquiry [${reason}] from ${name}`
    await sendMail(subject, html)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
