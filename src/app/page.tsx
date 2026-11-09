import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { 
  Send,
  CheckCircle2, 
  Phone, 
  Mail 
} from "lucide-react";
import { brandData } from "@/data/brand";

import { HeroSection } from "@/components/home/hero-section";
import { ProcessSection } from "@/components/home/process-section";
import { RoleBandsSection } from "@/components/home/role-bands";
import { ContactBand } from "@/components/home/contact-band";

// -----------------------------------------------------------------------------
// Dynamically imported below-the-fold components (Hydration & TBT Optimization)
// -----------------------------------------------------------------------------

const ClarityExplainerSection = dynamic(
  () => import("@/components/home/clarity-explainer-section").then((mod) => mod.ClarityExplainerSection),
  {
    loading: () => (
      <div 
        className="py-16 sm:py-24 bg-[#F6F3EE] border-b border-[#0E1116]/10 min-h-[400px] flex items-center justify-center"
        aria-busy="true"
        aria-label="Loading clarity blueprint"
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#1F4E5F] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const ConnectedPipelineSection = dynamic(
  () => import("@/components/home/connected-pipeline-section").then((mod) => mod.ConnectedPipelineSection),
  {
    loading: () => (
      <div 
        className="py-16 sm:py-24 bg-white border-b border-[#0E1116]/10 min-h-[450px] flex items-center justify-center"
        aria-busy="true"
        aria-label="Loading connected pipeline visualizer"
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#1F4E5F] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const FeeSection = dynamic(
  () => import("@/components/home/fee-section").then((mod) => mod.FeeSection),
  {
    loading: () => (
      <div 
        className="py-16 md:py-24 bg-[#F6F3EE] border-t border-[#0E1116]/10 min-h-[600px] flex items-center justify-center"
        aria-busy="true"
        aria-label="Loading fee model section"
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#1F4E5F] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const ServicesSection = dynamic(
  () => import("@/components/home/services-section").then((mod) => mod.ServicesSection),
  {
    loading: () => (
      <div 
        className="py-16 md:py-24 bg-white border-t border-[#0E1116]/10 min-h-[500px] flex items-center justify-center"
        aria-busy="true"
        aria-label="Loading services section"
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#1F4E5F] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const InteractiveRoleMatcher = dynamic(
  () => import("@/components/home/interactive-role-matcher").then((mod) => mod.InteractiveRoleMatcher),
  {
    loading: () => (
      <div 
        className="py-16 sm:py-24 bg-white border-b border-[#0E1116]/10 min-h-[550px] flex items-center justify-center"
        aria-busy="true"
        aria-label="Loading talent radar visualizer"
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#1F4E5F] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const ModelComparisonMatrix = dynamic(
  () => import("@/components/home/model-comparison-matrix").then((mod) => mod.ModelComparisonMatrix),
  {
    loading: () => (
      <div 
        className="py-16 sm:py-24 bg-[#F6F3EE] border-b border-[#0E1116]/10 min-h-[500px] flex items-center justify-center"
        aria-busy="true"
        aria-label="Loading market model comparison"
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#1F4E5F] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const MandateVelocitySimulator = dynamic(
  () => import("@/components/home/mandate-velocity-simulator").then((mod) => mod.MandateVelocitySimulator),
  {
    loading: () => (
      <div 
        className="py-16 sm:py-24 bg-[#F6F3EE] border-b border-[#0E1116]/10 min-h-[480px] flex items-center justify-center"
        aria-busy="true"
        aria-label="Loading mandate velocity simulator"
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#1F4E5F] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const IndustrialCorridorMarquee = dynamic(
  () => import("@/components/home/industrial-corridor-marquee").then((mod) => mod.IndustrialCorridorMarquee),
  {
    loading: () => (
      <div 
        className="py-14 sm:py-20 bg-[#F6F3EE] border-b border-[#0E1116]/10 min-h-[220px] flex items-center justify-center"
        aria-busy="true"
        aria-label="Loading industrial corridor marquee"
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#1F4E5F] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const ExecutiveFAQSection = dynamic(
  () => import("@/components/home/executive-faq").then((mod) => mod.ExecutiveFAQSection),
  {
    loading: () => (
      <div 
        className="py-16 sm:py-24 bg-white border-b border-[#0E1116]/10 min-h-[500px] flex items-center justify-center"
        aria-busy="true"
        aria-label="Loading executive FAQ section"
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#1F4E5F] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const EnquiryForm = dynamic(
  () => import("@/components/home/enquiry-form").then((mod) => mod.EnquiryForm),
  {
    loading: () => (
      <div 
        className="min-h-[440px] bg-white border border-[#0E1116]/10 rounded-2xl md:rounded-3xl p-6 sm:p-8 flex items-center justify-center"
        aria-busy="true"
        aria-label="Loading enquiry intake form"
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#1F4E5F] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "JSM Integrated Services | Executive Recruitment & Senior Talent Acquisition",
  description: "Connecting employers with proven senior leadership (₹12 LPA to ₹1 Cr) across Tamil Nadu, Karnataka, Maharashtra, Delhi, Madhya Pradesh, and Gujarat. 100% contingency success fee model.",
  alternates: {
    canonical: brandData.domain,
  },
  openGraph: {
    title: "JSM Integrated Services | Executive Recruitment & Senior Talent Acquisition",
    description: "Contingency senior talent acquisition & executive recruitment across 6 focus states in India. Zero upfront fees, 90-day replacement assurance.",
    url: brandData.domain,
    siteName: brandData.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${brandData.domain}/images/jsm_logo_black.png`,
        width: 1200,
        height: 630,
        alt: "JSM Integrated Services - Executive Recruitment & Talent Acquisition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSM Integrated Services | Executive Recruitment & Senior Talent Acquisition",
    description: "Contingency senior talent acquisition & executive recruitment across 6 focus states in India. Zero upfront fees, 90-day replacement assurance.",
    images: [`${brandData.domain}/images/jsm_logo_black.png`],
  },
  keywords: [
    "JSM Integrated Services",
    "Executive Recruitment India",
    "Senior Talent Acquisition",
    "Leadership Hiring Tamil Nadu",
    "Executive Search Karnataka",
    "Senior Sourcing Maharashtra",
    "Executive Recruitment Delhi",
    "Senior Staffing Gujarat",
    "Leadership Sourcing Madhya Pradesh",
    "Contingency Recruitment Fee Model"
  ],
};

/**
 * JSON-LD Knowledge Graph for Executive Recruitment Organization
 * Details organizational identity, service catalog, and geographic coverage across 6 focus states.
 */
function generateStructuredData() {
  const domain = brandData.domain;
  const orgId = `${domain}/#organization`;
  const agencyId = `${domain}/#recruitment-agency`;
  const websiteId = `${domain}/#website`;
  const webpageId = `${domain}/#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EmploymentAgency",
        "@id": agencyId,
        "name": brandData.name,
        "legalName": "JSM Integrated Services",
        "url": domain,
        "logo": {
          "@type": "ImageObject",
          "url": `${domain}/images/jsm_logo_transparent.png`,
          "width": 512,
          "height": 512,
        },
        "image": `${domain}/images/jsm_logo_black.png`,
        "description": "Executive recruitment and senior contingency talent acquisition firm specializing in ₹12 LPA to ₹1 Cr leadership mandates across 6 focus states in India.",
        "telephone": "+91 90808 63448",
        "email": "contact@jsmintegratedservices.com",
        "priceRange": "Contingency 8.33% [CONFIRM: fee %]",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Bank Transfer, Commercial Invoice",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Door No.: 87, Plot No: 112, Gandhi Nagar, Kottapattu",
          "addressLocality": "Tiruchirappalli",
          "addressRegion": "Tamil Nadu",
          "postalCode": "620021",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 10.7905,
          "longitude": 78.7047,
        },
        "areaServed": [
          {
            "@type": "AdministrativeArea",
            "name": "Tamil Nadu",
            "identifier": "IN-TN",
          },
          {
            "@type": "AdministrativeArea",
            "name": "Karnataka",
            "identifier": "IN-KA",
          },
          {
            "@type": "AdministrativeArea",
            "name": "Maharashtra",
            "identifier": "IN-MH",
          },
          {
            "@type": "AdministrativeArea",
            "name": "Delhi",
            "identifier": "IN-DL",
          },
          {
            "@type": "AdministrativeArea",
            "name": "Madhya Pradesh",
            "identifier": "IN-MP",
          },
          {
            "@type": "AdministrativeArea",
            "name": "Gujarat",
            "identifier": "IN-GJ",
          },
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            "opens": "09:00",
            "closes": "19:00",
          },
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Executive Talent Acquisition & Recruitment Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Senior Talent Acquisition & Leadership Recruitment",
                "description": "Contingency recruitment for mid-senior and leadership roles between ₹12 LPA and ₹1 Cr.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Executive Search & Board Advisory",
                "description": "Confidential C-suite and board director search mandates across national corporate centers.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Bulk & Specialized Technical Hiring",
                "description": "Scaled recruitment campaigns for engineering, manufacturing, and specialized industrial squads.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Campus & Lateral Fast-Track Programmes",
                "description": "Structured institutional pipelines linking engineering and management talent directly to corporate growth programs.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Strategic HR & Compensation Advisory",
                "description": "Executive compensation benchmarking, retention structures, and leadership governance design.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        "url": domain,
        "name": brandData.name,
        "description": "Executive Recruitment & Senior Talent Acquisition across India",
        "publisher": { "@id": agencyId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        "url": domain,
        "name": "JSM Integrated Services | Executive Recruitment & Senior Talent Acquisition",
        "isPartOf": { "@id": websiteId },
        "about": { "@id": agencyId },
        "inLanguage": "en-IN",
      },
      {
        "@type": "FAQPage",
        "@id": `${domain}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is JSM's contingency recruitment fee structure, and when is invoice settlement triggered?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our standard contingency placement fee is 8.33% of the candidate's first-year annual fixed Cost-to-Company (CTC) [CONFIRM: fee %]. Crucially, we charge zero upfront retainers and zero commencement fees. The recruitment fee becomes payable strictly after the selected candidate has formally reported to duty and onboarded at your organization."
            }
          },
          {
            "@type": "Question",
            "name": "How does the contractually binding 90-day replacement assurance operate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every executive placement between ₹12 LPA and ₹1 Cr is safeguarded by our formal 90-day replacement guarantee [CONFIRM: fee %]. If a placed executive departs or fails to complete 90 calendar days due to voluntary resignation or performance mismatch, our senior search desk initiates an immediate, prioritized replacement sprint at zero additional recruitment fee."
            }
          },
          {
            "@type": "Question",
            "name": "Why does JSM specifically concentrate on the ₹12 LPA to ₹1 Cr leadership compensation band?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mid-to-senior leadership roles carry the highest operational impact and organizational risk. Our focused band enables rigorous 4-stage technical and reference vetting while maintaining speed and capital efficiency."
            }
          },
          {
            "@type": "Question",
            "name": "Which industrial manufacturing clusters and corporate hubs are covered by your practice?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We maintain active sourcing networks and candidate talent pools across 6 primary states: Tamil Nadu, Karnataka, Maharashtra, Delhi NCR, Gujarat, and Madhya Pradesh."
            }
          },
          {
            "@type": "Question",
            "name": "How does JSM protect candidate discretion and prevent current employer exposure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Candidate confidentiality is paramount. Profiles are shared strictly as Anonymized Blind Dossiers until explicit mutual consent is established."
            }
          }
        ]
      }
    ],
  };
}

export default function Home() {
  const jsonLdData = generateStructuredData();

  return (
    <div className="bg-[#F6F3EE] text-[#0E1116] min-h-screen w-full max-w-full">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* 1. Hero Section: 6 Focus States, Single <h1>, Slow Looping Sector Ticker, Dual CTAs */}
      <HeroSection />

      {/* 1b. The Clarity Blueprint: Closer-style Dual Audience Switcher & Direct Model Contrast */}
      <ClarityExplainerSection />

      {/* 1c. Connected Pipeline Visualizer: 3-Stage Visual Mediation Engine inspired by usecloser.ai */}
      <ConnectedPipelineSection />

      {/* 2. 3-Step Hiring Process: Precision Scoping, Discrete Sourcing, Joining Assurance */}
      <ProcessSection />

      {/* 2b. Interactive Talent Radar: Live Filterable Leadership Dossier Preview (Closer.ai Style) */}
      <InteractiveRoleMatcher />

      {/* 3. Roles by Band Overview: ₹12L–₹25L, ₹25L–₹50L, ₹50L–₹1Cr + 6 Focus States */}
      <RoleBandsSection />

      {/* 3b. Direct Model Comparison Matrix: Retained Search vs Portals vs JSM Contingency */}
      <ModelComparisonMatrix />

      {/* 3c. Operational Velocity Simulator: Real-Time Vacancy Drag vs 7-Day Sprint */}
      <MandateVelocitySimulator />

      {/* 4. Success-Based Fee Model & Interactive Fee Calculator (Deferred Hydration) */}
      <FeeSection />

      {/* 4b. Active Leadership Corridors Across India (Industrial Practice Footprint) */}
      <IndustrialCorridorMarquee />

      {/* 5. Core & Secondary Services Matrix (Deferred Hydration) */}
      <ServicesSection />

      {/* 5b. Operational Executive FAQs: Categorized Accordion with Spring Physics */}
      <ExecutiveFAQSection />

      {/* 6. High-Contrast Deep Teal Contact Band */}
      <ContactBand />

      {/* ==================================================================
          7. Enquiry Section Container (Deferred Hydration for EnquiryForm)
          ================================================================== */}
      {/* Anchor for both #contact and #enquiry navigation links across header and footer */}
      <div id="contact" className="scroll-mt-20" aria-hidden="true" />
      <section
        id="enquiry"
        className="py-20 md:py-28 bg-[#F6F3EE] border-t border-[#0E1116]/10 overflow-hidden w-full max-w-full"
        aria-labelledby="enquiry-heading"
      >
        <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0E1116]/10 text-xs font-semibold uppercase tracking-wider text-[#1F4E5F] mb-4 shadow-2xs">
              <Send className="w-3.5 h-3.5 text-[#1F4E5F]" aria-hidden="true" />
              <span>Mandate Intake</span>
            </div>

            <h2
              id="enquiry-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[#0E1116] leading-[1.12] mb-4 text-balance"
            >
              Initiate Executive Mandate or Senior Staffing Brief
            </h2>

            <p className="text-base sm:text-lg font-sans text-[#4A5568] leading-relaxed max-w-2xl text-pretty">
              Submit your leadership requirement or senior talent specification directly to our executive recruitment desk. We calibrate mandate parameters and respond within 24 business hours.
            </p>
          </div>

          {/* Prepared Intake Card Container */}
          <div
            id="enquiry-form-container"
            data-enquiry-form-container="true"
            className="bg-white border border-[#0E1116]/10 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" data-grid-container="true">
              {/* Left Column (5 cols): Operational Guarantees & Intake Protocol */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1F4E5F] block mb-1">
                    Engagement Standard
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#0E1116]">
                    Contingency Executive Search Terms
                  </h3>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm font-sans text-[#4A5568]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1F4E5F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span><strong>Zero Advance Retainer:</strong> We begin sourcing immediately with zero upfront commitment.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1F4E5F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span><strong>100% Success-Based:</strong> Placement fee (8.33% [CONFIRM: fee %]) is invoiced strictly after candidate onboarding.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1F4E5F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span><strong>90-Day Replacement Assurance:</strong> Protected by our formal replacement guarantee [CONFIRM: fee %].</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1F4E5F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span><strong>Target Geography:</strong> Active searches across Tamil Nadu, Karnataka, Maharashtra, Delhi, Madhya Pradesh, Gujarat.</span>
                  </li>
                </ul>

                {/* Direct Hotline Callout */}
                <div className="pt-4 border-t border-[#0E1116]/10 bg-[#F6F3EE] p-4 rounded-xl border border-[#0E1116]/8">
                  <span className="text-xs text-[#525866] block mb-1">Urgent or Confidential CXO Mandate?</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <a
                      href="tel:+919080863448"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E1116] hover:text-[#C8553D] transition-colors tabular-nums"
                    >
                      <Phone className="w-4 h-4 text-[#1F4E5F]" aria-hidden="true" />
                      <span>+91 90808 63448</span>
                    </a>
                    <a
                      href="mailto:contact@jsmintegratedservices.com"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E1116] hover:text-[#C8553D] transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 text-[#1F4E5F]" aria-hidden="true" />
                      <span>contact@jsmintegratedservices.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols): Dynamically Loaded Mandate Intake Form */}
              <div className="lg:col-span-7">
                <EnquiryForm className="h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
