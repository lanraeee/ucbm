import type { MetadataRoute } from 'next'

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ucbm.co.uk'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base,                    lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/about`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/faculties`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/courses`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/admissions`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
