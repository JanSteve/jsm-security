import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jsmintegratedservices.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // Generative AI & LLM Search Engine Crawlers
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
          'cohere-ai'
        ],
        allow: ['/', '/llms.txt', '/services/', '/industries/', '/about', '/careers', '/contact', '/blog/', '/get-quote'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
  };
}
