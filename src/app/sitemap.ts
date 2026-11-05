import { MetadataRoute } from 'next';
import { servicesData } from '@/data/services';
import { locationsData } from '@/data/locations';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jsmintegratedservices.com';
  const baseUrl = rawBaseUrl.replace('://www.', '://').replace(/\/+$/, '');
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  // 1. Published Blog Posts (Filter drafts and future scheduled posts)
  const allPosts = getAllPosts();
  const publishedPosts = allPosts.filter((post) => {
    if (post.published === false) return false;
    if (!post.date) return false;
    const postDateStr = post.date.split('T')[0];
    if (postDateStr > todayStr) return false;
    if (post.scheduledDate) {
      const scheduledStr = post.scheduledDate.split('T')[0];
      if (scheduledStr > todayStr) return false;
    }
    const postDate = new Date(post.date);
    return !isNaN(postDate.getTime());
  });

  const sortedPosts = [...publishedPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latestPostDate = sortedPosts.length > 0
    ? new Date(sortedPosts[0].lastModified || sortedPosts[0].date)
    : now;

  // 2. Static Core Pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/locations`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/blog`, lastModified: latestPostDate, changeFrequency: 'daily', priority: 0.90 },
    { url: `${baseUrl}/case-studies/trichy-international-airport`, lastModified: new Date('2026-01-15T00:00:00.000Z'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${baseUrl}/about`, lastModified: new Date('2026-02-01T00:00:00.000Z'), changeFrequency: 'monthly', priority: 0.90 },
    { url: `${baseUrl}/contact`, lastModified: new Date('2026-02-01T00:00:00.000Z'), changeFrequency: 'monthly', priority: 0.90 },
    { url: `${baseUrl}/get-quote`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/legal/privacy`, lastModified: new Date('2026-01-01T00:00:00.000Z'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/legal/terms`, lastModified: new Date('2026-01-01T00:00:00.000Z'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/legal/cookies`, lastModified: new Date('2026-01-01T00:00:00.000Z'), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // 3. Service Pages (21)
  const servicePages: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date('2026-03-01T00:00:00.000Z'),
    changeFrequency: 'weekly',
    priority: 0.90,
  }));

  // 4. Regional Hub Location Pages (8)
  const locationPages: MetadataRoute.Sitemap = locationsData.map((l) => ({
    url: `${baseUrl}/locations/${l.slug}`,
    lastModified: new Date('2026-03-01T00:00:00.000Z'),
    changeFrequency: 'weekly',
    priority: 0.90,
  }));

  // 5. Dynamic Blog Pages
  const blogPages: MetadataRoute.Sitemap = sortedPosts.map((p) => {
    const d = new Date(p.lastModified || p.date);
    const validDate = isNaN(d.getTime()) ? now : d;
    return {
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: validDate,
      changeFrequency: 'weekly',
      priority: p.isFlagship ? 0.85 : 0.80,
    };
  });

  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...blogPages,
  ];
}
