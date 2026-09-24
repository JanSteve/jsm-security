import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jsmintegratedservices.com';
  
  return {
    rules: [
      // Standard search engine crawlers — full access
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // Google & Bing bots — full access with explicit allows
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot'],
        allow: ['/', '/llms.txt', '/llms-full.txt', '/services/', '/industries/', '/about', '/careers', '/contact', '/blog/', '/get-quote', '/security-agencies', '/work-opportunities', '/newsletter', '/whats-new'],
        disallow: ['/api/'],
      },
      // Generative AI & LLM Answer Engine Crawlers (AEO/GEO)
      // These bots power Perplexity, ChatGPT Search, Claude, Google AI Overviews
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
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
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt', '/services/', '/industries/', '/about', '/careers', '/contact', '/blog/', '/get-quote', '/security-agencies', '/work-opportunities', '/newsletter', '/whats-new'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
  };
}
