import { MetadataRoute } from 'next';
import { brandData } from '@/data/brand';

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jsmintegratedservices.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
  };
}
