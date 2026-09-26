import { 
  HeroSection, 
  TrustBar, 
  ServicesOverview, 
  ProofSection,
  StatsSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  CostComparisonSection
} from "@/components/sections";
import { SmartCostCalculator } from "@/components/calculator/smart-cost-calculator";
import { QuickQualifierModal } from "@/components/shared/quick-qualifier-modal";
import { FloatingWhatsApp } from "@/components/shared/floating-whatsapp";
import { LiveAvailabilityBadge } from "@/components/shared/live-availability-badge";
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
    absolute: "JSM Integrated Services — Security. Staffing. Housekeeping. One Partner.",
  },
  description: "PSARA-licensed Ex-Servicemen & Private Security, 100% EPF/ESIC Manpower Staffing, and Commercial Facility Management across Tamil Nadu. Contractual 2-Hour Relief SLA.",
  alternates: {
    canonical: brandData.domain,
  },
  openGraph: {
    title: "JSM Integrated Services — Security. Staffing. Housekeeping. One Partner.",
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
        alt: "JSM Integrated Services — Security, Manpower & Facility Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSM Integrated Services — Security. Staffing. Housekeeping. One Partner.",
    description: "PSARA-licensed Ex-Servicemen & Private Security, 100% EPF/ESIC Manpower Staffing, and Commercial Facility Management across Tamil Nadu.",
    images: [`${brandData.domain}/images/jsm_logo_black.png`],
  },
};

const homeFAQs = [
  {
    question: "What integrated facility and manpower services does JSM provide in India?",
    answer: "JSM Integrated Services delivers PSARA-compliant Private Security guarding, Commercial Housekeeping & Facility Management, and Contractual Industrial Staffing under a single accountable partner across Tamil Nadu."
  },
  {
    question: "Is JSM Integrated Services compliant with PSARA and statutory labour laws?",
    answer: "Yes, JSM operates under the Private Security Agencies Regulation Act (PSARA 2005) with 100% statutory EPF, ESIC, and Minimum Wages Act compliance verified through monthly ECR challans."
  },
  {
    question: "What is JSM's guaranteed replacement SLA for absent personnel?",
    answer: "JSM guarantees a contractually binding 2-Hour Relief Replacement SLA, deploying verified reserve marshals within 120 minutes of any reported post vacancy."
  },
  {
    question: "Which regions and cities are served by JSM Integrated Services?",
    answer: "JSM operates across Tamil Nadu with hubs in Tiruchirappalli (HQ), Chennai OMR Corridor, Coimbatore, Hosur, Salem, Erode, Madurai, and Tirunelveli."
  },
  {
    question: "How are security personnel vetted and trained prior to deployment?",
    answer: "Every personnel undergoes mandatory biometric Aadhaar authentication, local police background clearance, and a structured 5-day pre-deployment syllabus covering access barrier regulation and fire response."
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
    <div className="relative bg-white text-[#1A1F2E] min-h-screen">
      {/* Schema.org Structured Data */}
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

      {/* 1. Live Capacity & Operational Status Bar */}
      <LiveAvailabilityBadge />

      {/* 2. Hero Section: Active-Voice CTAs & 3-Column Trust Row */}
      <HeroSection />

      {/* 3. Credentials & Authority Strip */}
      <TrustBar />

      {/* 4. Three Integrated Tiers (With Inline Pricing) */}
      <ServicesOverview />

      {/* 5. 60-Second Interactive Cost Calculator */}
      <SmartCostCalculator />

      {/* 6. In-House vs. Outsourced Financial Comparison */}
      <CostComparisonSection />

      {/* 7. Operational Proof Benchmark (Trichy International Airport) */}
      <ProofSection />

      {/* 8. Audited Operational SLAs & Metrics Module */}
      <StatsSection />

      {/* 9. Sector Deployment Profiles */}
      <TestimonialsSection />

      {/* 10. Direct Quotable FAQ Accordion */}
      <FAQSection />

      {/* 11. Closing Conversion CTA Band */}
      <CTASection />

      {/* 12. Smart Quick Qualifier Modal */}
      <QuickQualifierModal />

      {/* 13. Floating WhatsApp Consultation Widget */}
      <FloatingWhatsApp />
    </div>
  );
}
