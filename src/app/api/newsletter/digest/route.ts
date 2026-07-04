import { NextRequest, NextResponse } from 'next/server'
import { list, del, put } from '@vercel/blob'
import { sendMail } from '@/lib/email'

// Called by Vercel Cron — secured with CRON_SECRET
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { blobs } = await list({
    prefix: 'subscribers/new/',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })

  if (blobs.length === 0) {
    return NextResponse.json({ ok: true, message: 'No new subscribers' })
  }

  // Fetch each subscriber record
  const subscribers = await Promise.all(
    blobs.map(async (b) => {
      const res = await fetch(b.url, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      })
      return res.json() as Promise<{ name: string; email: string; subscribedAt: string }>
    })
  )

  // Build digest email
  const rows = subscribers
    .map((s) => `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee">${s.name}</td><td style="padding:6px 12px;border-bottom:1px solid #eee">${s.email}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#888">${new Date(s.subscribedAt).toLocaleString('en-GB')}</td></tr>`)
    .join('')

  await sendMail(
    `UCBM Newsletter — ${blobs.length} new subscriber${blobs.length > 1 ? 's' : ''}`,
    `<h2 style="font-family:sans-serif">New Newsletter Subscribers</h2>
     <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%">
       <thead><tr style="background:#3b1d5e;color:#fff">
         <th style="padding:8px 12px;text-align:left">Name</th>
         <th style="padding:8px 12px;text-align:left">Email</th>
         <th style="padding:8px 12px;text-align:left">Subscribed</th>
       </tr></thead>
       <tbody>${rows}</tbody>
     </table>`
  )

  // Move processed blobs from new/ → done/
  await Promise.all(
    blobs.map(async (b, i) => {
      const slug = b.pathname.replace('subscribers/new/', '')
      await put(
        `subscribers/done/${slug}`,
        JSON.stringify({ ...subscribers[i], processedAt: new Date().toISOString() }),
        { access: 'private', addRandomSuffix: false, token: process.env.BLOB_READ_WRITE_TOKEN }
      )
      await del(b.url, { token: process.env.BLOB_READ_WRITE_TOKEN })
    })
  )

  return NextResponse.json({ ok: true, processed: blobs.length })
}
