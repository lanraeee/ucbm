import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { sendMail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const timestamp = new Date().toISOString()

    await Promise.all([
      // Store subscriber as a blob entry — list blobs to export the full list
      put(
        `subscribers/${timestamp}_${email}.json`,
        JSON.stringify({ email, subscribedAt: timestamp }),
        { access: 'public', addRandomSuffix: false, token: process.env.BLOB_READ_WRITE_TOKEN }
      ),
      sendMail(
        `Newsletter Subscription: ${email}`,
        `<p>New newsletter subscriber: <strong>${email}</strong></p><p>Subscribed at: ${timestamp}</p>`
      ),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[newsletter]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
