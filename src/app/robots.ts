import { MetadataRoute } from 'next';
import { brandData } from '@/data/brand';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
    ],
    sitemap: `${brandData.domain}/sitemap.xml`,
  };
}
