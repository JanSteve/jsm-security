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

  const defaultKeywords = [
    "JSM",
    "JSM Security",
    "JSM Manpower",
    "JSM Integrated Services",
    "JSMMANPOWER",
    "Security Guard Agency Trichy",
    "Manpower Supply Agency Tamil Nadu",
    "Integrated Facility Management Tamil Nadu"
  ];

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : defaultKeywords,
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
      site: '@jsmintegrated',
      creator: '@jsmintegrated',
      images: [absoluteImageUrl],
    },
    other: {
      'geo.region': 'IN-TN',
      'geo.placename': 'Tiruchirappalli, Tamil Nadu, India',
      'geo.position': '10.7905;78.7047',
      'ICBM': '10.7905, 78.7047',
      'business:contact_data:locality': 'Tiruchirappalli',
      'business:contact_data:region': 'Tamil Nadu',
      'business:contact_data:postal_code': '620021',
      'business:contact_data:country_name': 'India',
    },
  };
}
