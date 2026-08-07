import { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { blogPosts } from '@/data/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jsmsecurity.com';
  const staticRoutes = ['', '/about', '/services', '/contact', '/blog', '/careers', '/case-studies', '/legal/privacy', '/legal/terms', '/legal/cookies'];
  const serviceRoutes = services.map((s) => `/services/${s.slug}`);
  const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`);
  return [...staticRoutes, ...serviceRoutes, ...blogRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly' as const,
    priority: route === '' ? 1 : route.startsWith('/services/') ? 0.8 : 0.6,
  }));
}
