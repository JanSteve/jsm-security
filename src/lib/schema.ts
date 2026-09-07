import { brandData } from "@/data/brand";

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brandData.name,
    alternateName: ['JSM', 'JSMMANPOWER', 'JSM Integrated Services Tamil Nadu', 'JSM Security Trichy'],
    url: brandData.domain,
    logo: `${brandData.domain}/images/jsm_logo_transparent.png`,
    description: brandData.subTagline,
    email: brandData.contact.email,
    telephone: brandData.contact.phone,
    founder: {
      '@type': 'Person',
      name: 'Sweety J',
      jobTitle: 'Proprietor & Managing Director'
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Major AR Devadoss (Army-Veteran)',
        jobTitle: 'Head of Operations'
      },
      {
        '@type': 'Person',
        name: 'R Jan Steve Daniel',
        jobTitle: 'Chief Technical Officer & Audit'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: brandData.contact.address,
      addressLocality: brandData.contact.primaryCity,
      addressRegion: brandData.contact.state,
      postalCode: brandData.contact.pinCode,
      addressCountry: 'IN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: brandData.contact.phone,
      contactType: 'customer service',
      areaServed: ['IN-TN', 'IN'],
      availableLanguage: ['English', 'Tamil']
    },
    sameAs: [
      'https://www.linkedin.com/company/jsmintegratedservices',
      'https://www.instagram.com/jsmintegratedservices',
      'https://www.facebook.com/jsmintegratedservices',
      'https://x.com/jsmintegrated'
    ]
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SecurityService', 'EmploymentAgency'],
    name: brandData.name,
    image: `${brandData.domain}/images/real_jsm_airport_terminal_platoon.jpg`,
    '@id': brandData.domain,
    url: brandData.domain,
    telephone: brandData.contact.phone,
    email: brandData.contact.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: brandData.contact.address,
      addressLocality: brandData.contact.primaryCity,
      addressRegion: brandData.contact.state,
      postalCode: brandData.contact.pinCode,
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.7850,
      longitude: 78.6940
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Integrated Enterprise Services',
      itemListElement: brandData.sixCoreVerticals.map((v, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${v.code}: ${v.name}`,
          description: v.gstDescription
        }
      }))
    }
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brandData.name,
    url: brandData.domain,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${brandData.domain}/services?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function articleSchema(article: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author || 'Sweety J',
      url: `${brandData.domain}/about`
    },
    publisher: {
      '@type': 'Organization',
      name: brandData.name,
      logo: {
        '@type': 'ImageObject',
        url: `${brandData.domain}/images/jsm_logo_transparent.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${brandData.domain}/blog/${article.slug}`
    },
    image: article.image || `${brandData.domain}/images/real_jsm_airport_terminal_platoon.jpg`
  };
}

export function serviceSchema(service: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: brandData.name,
      telephone: brandData.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: brandData.contact.address,
        addressLocality: brandData.contact.primaryCity,
        addressRegion: brandData.contact.state,
        postalCode: brandData.contact.pinCode,
        addressCountry: 'IN'
      }
    },
    areaServed: {
      '@type': 'State',
      name: 'Tamil Nadu'
    },
    url: `${brandData.domain}/services/${service.slug}`
  };
}
