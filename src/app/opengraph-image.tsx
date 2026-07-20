import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const alt = 'Universal College of Business and Management — Study in the UK'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const logoData = await readFile(join(process.cwd(), 'public/logo-footer.png'))
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#1e0e30',
          padding: '64px 72px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Top row: logo + gold accent */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="UCBM" width={160} height={76} style={{ objectFit: 'contain' }} />
          <div style={{ flex: 1, height: 2, background: 'rgba(201,168,76,0.35)', display: 'flex' }} />
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
              maxWidth: 920,
              display: 'flex',
            }}
          >
            Universal College of Business and Management
          </div>
          <div
            style={{
              fontSize: 25,
              color: '#c9a84c',
              letterSpacing: '0.5px',
              display: 'flex',
            }}
          >
            Business · Leadership · Health Care · Hospitality · Entrepreneurship
          </div>
          <div
            style={{
              fontSize: 21,
              color: 'rgba(255,255,255,0.65)',
              marginTop: 4,
              display: 'flex',
            }}
          >
            Full-Time, Part-Time, ODL and Online Programmes — United Kingdom
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              fontSize: 19,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            ucbm.co.uk
          </div>
          <div
            style={{
              background: '#c9a84c',
              color: '#1e0e30',
              fontSize: 18,
              fontWeight: 700,
              padding: '12px 28px',
              borderRadius: 6,
              letterSpacing: '0.5px',
              display: 'flex',
            }}
          >
            Enrol Today
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
