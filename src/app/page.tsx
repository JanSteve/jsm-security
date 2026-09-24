import { 
  HeroSection, 
  TrustBar, 
  ServicesOverview, 
  ProofSection,
  StatsSection,
  TestimonialsSection,
  FAQSection,
  CTASection
} from "@/components/sections";
import { 
  organizationSchema, 
  localBusinessSchema, 
  websiteSchema, 
  faqSchema, 
  speakableSchema, 
  reviewSchema, 
  siteLinksSearchBoxSchema, 
  geoTargetSchema 
} from "@/lib/schema";
import { brandData } from "@/data/brand";

export const metadata = {
  title: {
    absolute: "JSM Integrated Services | PSARA Security, Manpower & Facility Management",
  },
  description: "PSARA-licensed Ex-Servicemen & Private Security, 100% EPF/ESIC Manpower Staffing, and Commercial Facility Management across Tamil Nadu.",
  alternates: {
    canonical: brandData.domain,
  },
  openGraph: {
    title: "JSM Integrated Services | PSARA Security, Manpower & Facility Management",
    description: "PSARA-licensed Ex-Servicemen & Private Security, 100% EPF/ESIC Manpower Staffing, and Commercial Facility Management across Tamil Nadu.",
    url: brandData.domain,
    siteName: brandData.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${brandData.domain}/images/jsm_logo_black.png`,
        width: 1200,
        height: 630,
        alt: "JSM Integrated Services - Security, Manpower & Facility Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSM Integrated Services | PSARA Security, Manpower & Facility Management",
    description: "PSARA-licensed Ex-Servicemen & Private Security, 100% EPF/ESIC Manpower Staffing, and Commercial Facility Management across Tamil Nadu.",
    images: [`${brandData.domain}/images/jsm_logo_black.png`],
  },
};

const homeFAQs = [
  {
    question: "What integrated facility and manpower services does JSM provide in India?",
    answer: "JSM Integrated Services delivers disciplined Private Security guarding (PSARA compliant), Commercial Housekeeping & Facility Management, and Contractual Industrial Manpower under a single accountable partner across Tamil Nadu."
  },
  {
    question: "Is JSM Integrated Services compliant with PSARA and statutory labour laws?",
    answer: "Yes. JSM operates strictly within the Private Security Agencies Regulation Act (PSARA 2005) under the Home Department of Tamil Nadu with 100% EPF, ESIC, and minimum wage compliance."
  },
  {
    question: "What is JSM's guaranteed replacement SLA for absent personnel?",
    answer: "JSM maintains a contractually binding 2-Hour Relief Replacement SLA where any absent personnel is replaced by a verified roving reserve staff member within 120 minutes."
  },
  {
    question: "Which regions and cities are served by JSM Integrated Services?",
    answer: "JSM operates across Tamil Nadu (Tiruchirappalli HQ, Chennai OMR Tech Corridor, Coimbatore, Hosur, Madurai, Salem, Erode, Tirunelveli) and provides scalable integrated facility operations throughout South India."
  }
];

export default function Home() {
  const orgSchema = organizationSchema();
  const localSchema = localBusinessSchema();
  const webSchema = websiteSchema();
  const faqsJsonLd = faqSchema(homeFAQs);
  const speakable = speakableSchema();
  const review = reviewSchema();
  const siteLinks = siteLinksSearchBoxSchema();
  const geoTarget = geoTargetSchema();

  return (
    <div className="relative bg-white text-[#14181F] min-h-screen">
      {/* Schema.org Structured Data — SEO / AEO / GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakable) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(review) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLinks) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(geoTarget) }}
      />

      {/* 1. Hero Section with Real Operational Photography */}
      <HeroSection />

      {/* 2. Static Trust Credentials Bar */}
      <TrustBar />

      {/* 3. Three-Tier Integrated Operations Model */}
      <ServicesOverview />

      {/* 4. Operational Proof Case Study (Trichy International Airport) */}
      <ProofSection />

      {/* 5. Single Clean Operational SLAs & Metrics Module */}
      <StatsSection />

      {/* 6. Sector Deployment Standards & Experience */}
      <TestimonialsSection />

      {/* 7. Direct Answer FAQ Accordion */}
      <FAQSection />

      {/* 8. High-Contrast Closing Conversion CTA */}
      <CTASection />
    </div>
  );
}
