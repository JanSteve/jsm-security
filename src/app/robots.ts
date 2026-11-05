import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const rawDomain = process.env.NEXT_PUBLIC_SITE_URL || 'https://jsmintegratedservices.com';
  const domain = rawDomain.replace('://www.', '://').replace(/\/+$/, '');
  const sitemapUrl = domain.includes('jsmintegratedservices.com')
    ? 'https://jsmintegratedservices.com/sitemap.xml'
    : `${domain}/sitemap.xml`;

  const publicAllowedPaths = [
    '/',
    '/blog/',
    '/services/',
    '/locations/',
    '/about',
    '/contact',
    '/case-studies/',
    '/get-quote',
    '/feed.xml',
    '/llms.txt',
    '/llms-full.txt'
  ];

  return {
    rules: [
      // Standard search engine crawlers — full access with explicit allows
      {
        userAgent: '*',
        allow: ['/', '/blog/', '/locations/', '/feed.xml'],
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // Google & Bing bots — full access with explicit allows
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot'],
        allow: publicAllowedPaths,
        disallow: ['/api/'],
      },
      // Generative AI & LLM Answer Engine Crawlers (AEO/GEO)
      // Powers Perplexity, ChatGPT Search, Claude, Google AI Overviews, Meta AI, Apple Intelligence
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
          'cohere-ai',
          'Bytespider',
          'YouBot',
          'PhindBot',
          'Meta-ExternalAgent',
          'Amazonbot'
        ],
        allow: publicAllowedPaths,
        disallow: ['/api/'],
      },
    ],
    sitemap: sitemapUrl,
  };
}
