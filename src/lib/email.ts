import nodemailer from 'nodemailer'

function getTransporter() {
  const port   = Number(process.env.SMTP_PORT ?? 587)
  const secure = port === 465
  return nodemailer.createTransport({
    host:       process.env.SMTP_HOST,
    port,
    secure,
    requireTLS: !secure,   // force STARTTLS on port 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },  // allow self-signed certs on shared hosts
  })
}

export async function sendMail(subject: string, html: string) {
  if (!process.env.SMTP_HOST) {
    console.log('[email] SMTP not configured — would send:', subject)
    return
  }
  const transporter = getTransporter()
  try {
    const info = await transporter.sendMail({
      from:    process.env.SMTP_FROM ?? 'UCBM Website <admissions@ucbm.co.uk>',
      to:      process.env.SMTP_TO   ?? 'admissions@ucbm.co.uk',
      subject,
      html,
    })
    console.log('[email] sent ok — messageId:', info.messageId)
  } catch (err: unknown) {
    const e = err as { message?: string; code?: string; command?: string }
    console.error('[email] SMTP error — code:', e.code, '| command:', e.command, '| message:', e.message)
    throw err
  }
}
