import { MetadataRoute } from 'next';
import { servicesData } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jsmintegratedservices.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/case-studies/trichy-international-airport`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.90 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.90 },
    { url: `${baseUrl}/get-quote`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/legal/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/legal/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/legal/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [
    ...staticPages, 
    ...servicePages,
  ];
}
