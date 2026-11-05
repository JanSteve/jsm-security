import { NextResponse } from 'next/server';
import { brandData } from '@/data/brand';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';
export const revalidate = 3600;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const rawDomain = process.env.NEXT_PUBLIC_SITE_URL || brandData.domain || 'https://jsmintegratedservices.com';
  const domain = rawDomain.replace('://www.', '://').replace(/\/+$/, '');
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const allPosts = getAllPosts();
  const publishedPosts = allPosts
    .filter((post) => {
      if (post.published === false) return false;
      if (!post.date) return false;
      const postDateStr = post.date.split('T')[0];
      if (postDateStr > todayStr) return false;
      if (post.scheduledDate && post.scheduledDate.split('T')[0] > todayStr) return false;
      const d = new Date(post.date);
      return !isNaN(d.getTime());
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const itemsXml = publishedPosts
    .map((post) => {
      const postUrl = `${domain}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const authorName = post.author?.name || 'Sweety J';
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category><![CDATA[${post.category}]]></category>
      <dc:creator><![CDATA[${authorName}]]></dc:creator>
    </item>`;
    })
    .join('\n');

  const feedXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(brandData.name)} | Official Blog</title>
    <link>${domain}/blog</link>
    <description>${escapeXml(brandData.subTagline)}</description>
    <language>en-in</language>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
    <atom:link href="${domain}/feed.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(feedXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
