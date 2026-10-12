import { brandData } from "@/data/brand";

/**
 * Returns the unified canonical Knowledge Graph for JSM Integrated Services.
 * Links Organization, LocalBusiness, and WebSite with disambiguation for "JSM".
 */
export function getUnifiedKnowledgeGraph() {
  const domain = brandData.domain;
  const orgId = `${domain}/#organization`;
  const localBusinessId = `${domain}/#localbusiness`;
  const websiteId = `${domain}/#website`;

  const activeCities = [
    { name: "Tiruchirappalli", role: "Headquarters & Central Command" },
    { name: "Chennai", role: "OMR IT Corridor & Commercial Division" },
    { name: "Coimbatore", role: "Industrial Manufacturing Outpost" },
    { name: "Hosur", role: "Automotive & Electronics SEZ Division" },
    { name: "Salem", role: "Heavy Engineering & Steel Corridor" },
    { name: "Erode", role: "Textile & Processing SEZ" },
    { name: "Madurai", role: "Southern Regional Operations" },
    { name: "Tirunelveli", role: "Renewable Energy & IT SEZ" }
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Core Corporate Organization Entity
      {
        "@type": "Organization",
        "@id": orgId,
        "name": brandData.name,
        "legalName": "JSM Integrated Services",
        "alternateName": [
          "JSM",
          "JSM Security",
          "JSM Manpower",
          "JSMMANPOWER",
          "JSM Integrated Services Tamil Nadu",
          "JSM Security Trichy",
          "JSM Facility Services"
        ],
        "disambiguatingDescription": "JSM Integrated Services (widely searched as JSM, JSM Security, or JSM Manpower) is a premier Indian enterprise security guarding, contract industrial staffing, and commercial facility management organization headquartered in Tiruchirappalli, Tamil Nadu, India. Differentiated from unrelated hospitality, software, or accounting entities, JSM is led by Indian Armed Forces veterans and holds verified institutional civil aviation security concourse credentials with the Airports Authority of India (AAI).",
        "url": domain,
        "logo": {
          "@type": "ImageObject",
          "url": `${domain}/images/jsm_logo_transparent.png`,
          "width": 512,
          "height": 512
        },
        "description": "Ex-Servicemen led security guarding, 100% EPF/ESIC contract manpower staffing, and facility management across Tamil Nadu.",
        "email": brandData.contact.email,
        "telephone": brandData.contact.phone,
        "foundingDate": "2024",
        "award": "Airports Authority of India (AAI) Civil Aviation Security Concourse Operations (2024)",
        "knowsAbout": [
          "Civil Aviation Concourse Security",
          "Ex-Servicemen Security Guarding",
          "Industrial Contract Labour Staffing",
          "Mechanized Commercial Housekeeping",
          "PSARA 2005 Compliance",
          "100% EPF and ESIC Statutory Compliance",
          "WhatsApp Business API Customer Automation",
          "Smart NFC Google Review Reputation Gatekeepers"
        ],
        "founder": {
          "@type": "Person",
          "name": "Sweety J",
          "jobTitle": "Proprietor & Managing Director",
          "image": `${domain}/images/leadership/sweety-j.jpg`,
          "worksFor": { "@id": orgId }
        },
        "employee": [
          {
            "@type": "Person",
            "name": "Major AR Devadoss (Army-Veteran)",
            "jobTitle": "Head of Operations & Audit",
            "image": `${domain}/images/leadership/major-ar-devadoss.jpg`,
            "worksFor": { "@id": orgId }
          },
          {
            "@type": "Person",
            "name": "R Jan Steve Daniel",
            "jobTitle": "Chief Technical Officer",
            "image": `${domain}/images/leadership/r-jan-steve-daniel.jpg`,
            "worksFor": { "@id": orgId }
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": brandData.contact.address,
          "addressLocality": brandData.contact.primaryCity,
          "addressRegion": brandData.contact.state,
          "postalCode": brandData.contact.pinCode,
          "addressCountry": "IN"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": brandData.contact.phone,
            "contactType": "customer service",
            "areaServed": ["IN-TN", "IN"],
            "availableLanguage": ["English", "Tamil"]
          },
          {
            "@type": "ContactPoint",
            "telephone": brandData.contact.phone,
            "contactType": "emergency",
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            }
          }
        ],
        "sameAs": [
          "https://www.linkedin.com/company/jsmintegratedservices",
          "https://www.instagram.com/jsmintegratedservices",
          "https://www.youtube.com/@jsmintegratedservices",
          "https://www.facebook.com/jsmintegratedservices",
          "https://x.com/jsmintegrated",
          "https://maps.google.com/?q=JSM+Integrated+Services+Plot+112+Gandhi+Nagar+RVS+Nagar+Kottapattu+Trichy"
        ]
      },

      // 2. Local Business Headquarters Entity
      {
        "@type": ["LocalBusiness", "SecurityService", "EmploymentAgency", "ProfessionalService"],
        "@id": localBusinessId,
        "name": brandData.name,
        "alternateName": [
          "JSM",
          "JSM Security",
          "JSM Manpower",
          "JSMMANPOWER",
          "JSM Integrated Services Tamil Nadu",
          "JSM Security Trichy",
          "JSM Facility Services"
        ],
        "disambiguatingDescription": "Headquarters of JSM Integrated Services in Tiruchirappalli, Tamil Nadu, executing disciplined security guarding, contract industrial staffing, and mechanized housekeeping.",
        "parentOrganization": { "@id": orgId },
        "url": domain,
        "logo": `${domain}/images/jsm_logo_black.png`,
        "image": `${domain}/images/real_jsm_airport_terminal_platoon.jpg`,
        "telephone": brandData.contact.phone,
        "email": brandData.contact.email,
        "priceRange": "₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer, UPI, Cheque",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "D.No. 87, Plot No. 112, Gandhi Nagar, Kottapattu Block - R.V.S. Nagar 2nd Cross Road",
          "addressLocality": "Tiruchirappalli",
          "addressRegion": "Tamil Nadu",
          "postalCode": "620021",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 10.7905,
          "longitude": 78.7047
        },
        "areaServed": activeCities.map((city) => ({
          "@type": "City",
          "name": city.name,
          "containedInPlace": {
            "@type": "State",
            "name": "Tamil Nadu"
          }
        })),
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      },

      // 3. Official WebSite Entity
      {
        "@type": "WebSite",
        "@id": websiteId,
        "name": brandData.name,
        "alternateName": [
          "JSM",
          "JSM Security",
          "JSM Manpower",
          "JSMMANPOWER",
          "JSM Integrated Services Tamil Nadu",
          "JSM Security Trichy",
          "JSM Facility Services"
        ],
        "url": domain,
        "publisher": { "@id": orgId },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${domain}/services?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };
}

export function organizationSchema() {
  return getUnifiedKnowledgeGraph();
}

export function localBusinessSchema() {
  return getUnifiedKnowledgeGraph();
}

export function websiteSchema() {
  return getUnifiedKnowledgeGraph();
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function serviceSchema(service: {
  title: string;
  description: string;
  slug: string;
}) {
  const domain = brandData.domain;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${domain}/services/${service.slug}#service`,
    "name": service.title,
    "description": service.description,
    "provider": {
      "@id": `${domain}/#localbusiness`
    },
    "areaServed": {
      "@type": "State",
      "name": "Tamil Nadu"
    },
    "url": `${domain}/services/${service.slug}`,
    "termsOfService": `${domain}/legal/terms`
  };
}

export function speakableSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".hero-title", ".service-description", ".faq-answer", "p.lead"]
    }
  };
}

export function howToSchema(service: { title: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to engage JSM for ${service.title}`,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Contact JSM via 24/7 hotline or website",
        "text": "Call +91 90808 63448 or request an online site assessment.",
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "On-Site Vulnerability & Manpower Audit",
        "text": "Operations supervisors assess security perimeter, post vacancies, or staffing requirements.",
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "Statutory Transparent Proposal Formulation",
        "text": "Receive clear commercial breakdown with 100% EPF, ESIC, and minimum wages compliance.",
        "position": 3
      },
      {
        "@type": "HowToStep",
        "name": "Deployment of Verified Personnel within 48-72 Hours",
        "text": "Ex-Servicemen supervisors or verified guards deployed with digital muster integration.",
        "position": 4
      },
      {
        "@type": "HowToStep",
        "name": "Ongoing 2:00 AM Night Audits & 2-Hour Relief SLA",
        "text": "Continuous quality assurance backed by unannounced night patrols.",
        "position": 5
      }
    ]
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
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": article.author || "Sweety J",
      "url": `${brandData.domain}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": brandData.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${brandData.domain}/images/jsm_logo_transparent.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${brandData.domain}/blog/${article.slug}`
    },
    "image": article.image || `${brandData.domain}/images/real_jsm_airport_terminal_platoon.jpg`
  };
}

export function jobPostingSchema(job: {
  title: string;
  description: string;
  location: string;
  salary: string;
  type: string;
  datePosted: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.datePosted,
    "employmentType": job.type,
    "hiringOrganization": {
      "@type": "Organization",
      "name": brandData.name,
      "sameAs": brandData.domain,
      "logo": `${brandData.domain}/images/jsm_logo_transparent.png`
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location,
        "addressRegion": brandData.contact.state,
        "addressCountry": "IN"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary,
        "unitText": "MONTH"
      }
    }
  };
}

export function reviewSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${brandData.domain}/#organization`,
    "name": brandData.name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5"
    }
  };
}

export function siteLinksSearchBoxSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${brandData.domain}/#website`,
    "url": brandData.domain,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${brandData.domain}/services?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function geoTargetSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 10.7905,
      "longitude": 78.7047
    },
    "geoRadius": "500000"
  };
}
