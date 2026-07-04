import nodemailer from 'nodemailer'

function getTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function sendMail(subject: string, html: string) {
  if (!process.env.SMTP_HOST) {
    console.log('[email] SMTP not configured — would send:', subject)
    return
  }
  const transporter = getTransporter()
  await transporter.sendMail({
    from:    process.env.SMTP_FROM ?? 'UCBM Website <noreply@ucbm.co.uk>',
    to:      process.env.SMTP_TO   ?? 'info@ucbm.co.uk',
    subject,
    html,
  })
}
