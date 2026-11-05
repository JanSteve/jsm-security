import type { Metadata } from 'next';
import { brandData } from '@/data/brand';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  geo?: {
    city: string;
    latitude: number;
    longitude: number;
    postalCode: string;
  };
}

export function constructMetadata({
  title,
  description,
  path,
  image = '/images/jsm_logo_black.png',
  keywords = [],
  type = 'website',
  geo,
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

  const city = geo?.city || 'Tiruchirappalli';
  const lat = geo?.latitude ?? 10.7905;
  const lng = geo?.longitude ?? 78.7047;
  const pin = geo?.postalCode || '620021';

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
      'geo.placename': `${city}, Tamil Nadu, India`,
      'geo.position': `${lat};${lng}`,
      'ICBM': `${lat}, ${lng}`,
      'business:contact_data:locality': city,
      'business:contact_data:region': 'Tamil Nadu',
      'business:contact_data:postal_code': pin,
      'business:contact_data:country_name': 'India',
    },
  };
}

/**
 * Deterministically clamps blog post meta title strictly to <= 58 characters
 * including brand anchor, bypassing the layout template to avoid truncation in Google SERP.
 */
export function formatBlogMetaTitle(title: string, brand = " | JSM"): string {
  if (!title) return `Commercial Security Intelligence${brand}`;
  const clean = title.replace(/\s*\|\s*JSM.*$/i, '').trim();
  const maxBase = 58 - brand.length;
  if (clean.length <= maxBase) {
    return `${clean}${brand}`;
  }
  const truncated = clean.slice(0, maxBase - 3).trim();
  return `${truncated}...${brand}`;
}

/**
 * Deterministically clamps meta description strictly to <= 155 characters (under 160 max SERP limit).
 */
export function formatMetaDescription(desc: string, max = 155): string {
  if (!desc) return '';
  const clean = desc.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 3).trim()}...`;
}

