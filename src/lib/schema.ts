import { brandData } from "@/data/brand";

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brandData.name,
    alternateName: ['JSM', 'JSMMANPOWER', 'JSM Integrated Services Tamil Nadu'],
    url: brandData.domain,
    logo: `${brandData.domain}/images/logo.png`,
    description: brandData.subTagline,
    email: brandData.contact.email,
    founder: {
      '@type': 'Person',
      name: 'Sweety R',
      jobTitle: 'Managing Director'
    },
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
      contactType: 'customer service',
      areaServed: ['IN-TN', 'IN'],
      availableLanguage: ['English', 'Tamil']
    }
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: brandData.name,
    image: `${brandData.domain}/images/real_jsm_airport_drill.jpg`,
    '@id': brandData.domain,
    url: brandData.domain,
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
      latitude: 10.7905,
      longitude: 78.7047
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    areaServed: brandData.contact.operatingCities.map(city => ({
      '@type': 'City',
      name: city
    }))
  };
}

export function serviceSchema(service: { title: string; description: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: brandData.name,
      url: brandData.domain
    },
    areaServed: {
      '@type': 'State',
      name: 'Tamil Nadu'
    },
    url: `${brandData.domain}/services/${service.slug}`
  };
}

export function articleSchema(post: { title: string; excerpt: string; slug: string; date: string; author: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: brandData.name,
      url: brandData.domain
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${brandData.domain}/blog/${post.slug}`
    }
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url
    }))
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
