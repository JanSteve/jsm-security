export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'JSM Security and Integrated Services',
    url: 'https://jsmsecurity.com',
    logo: 'https://jsmsecurity.com/logo.png',
    description: 'Premium security and integrated services provider.',
    contactPoint: { '@type': 'ContactPoint', telephone: '+44-20-7123-4567', contactType: 'customer service' },
    sameAs: ['https://linkedin.com/company/jsmsecurity', 'https://twitter.com/jsmsecurity'],
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'JSM Security and Integrated Services',
    address: { '@type': 'PostalAddress', streetAddress: '123 Security House, Canary Wharf', addressLocality: 'London', postalCode: 'E14 5AB', addressCountry: 'GB' },
    telephone: '+44-20-7123-4567',
    url: 'https://jsmsecurity.com',
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  };
}

export function serviceSchema(service: { title: string; description: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@type': 'Organization', name: 'JSM Security and Integrated Services' },
    url: `https://jsmsecurity.com/services/${service.slug}`,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
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
      item: item.url,
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'JSM Security and Integrated Services',
    url: 'https://jsmsecurity.com',
  };
}
