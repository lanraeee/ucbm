import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { sendMail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()
    if (!name?.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 })
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const timestamp = new Date().toISOString()
    const slug = email.replace(/[^a-z0-9]/gi, '_')

    await Promise.all([
      put(
        `subscribers/new/${timestamp}_${slug}.json`,
        JSON.stringify({ name: name.trim(), email, subscribedAt: timestamp }),
        { access: 'public', addRandomSuffix: false, token: process.env.BLOB_READ_WRITE_TOKEN }
      ),
      sendMail(
        `Newsletter Subscription: ${name.trim()} <${email}>`,
        `<p><strong>${name.trim()}</strong> subscribed to the newsletter.</p><p>Email: ${email}</p><p>At: ${timestamp}</p>`
      ),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[newsletter]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
