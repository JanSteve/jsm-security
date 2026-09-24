import type { Metadata } from 'next';
import { brandData } from '@/data/brand';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article';
}

export function constructMetadata({
  title,
  description,
  path,
  image = '/images/jsm_logo_black.png',
  keywords = [],
  type = 'website',
}: PageMetadataOptions): Metadata {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${brandData.domain}${cleanPath}`;
  const fullTitle = `${title} | ${brandData.name}`;
  const absoluteImageUrl = image.startsWith('http') ? image : `${brandData.domain}${image}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: brandData.name,
      locale: 'en_IN',
      type,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${brandData.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteImageUrl],
    },
  };
}
