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
import { homeFAQs } from "@/data/faqs";
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
    absolute: "JSM Integrated Services — PSARA Security, Manpower & Facility Operations",
  },
  description: "PSARA-licensed Ex-Servicemen & Private Security, 100% EPF/ESIC Manpower Staffing, and Commercial Facility Management across Tamil Nadu.",
  alternates: {
    canonical: brandData.domain,
  },
  openGraph: {
    title: "JSM Integrated Services — PSARA Security, Manpower & Facility Operations",
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
    title: "JSM Integrated Services — PSARA Security, Manpower & Facility Operations",
    description: "PSARA-licensed Ex-Servicemen & Private Security, 100% EPF/ESIC Manpower Staffing, and Commercial Facility Management across Tamil Nadu.",
    images: [`${brandData.domain}/images/jsm_logo_black.png`],
  },
};

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

      {/* 1. Hero Section: Mobile-first text + primary CTA above fold */}
      <HeroSection />

      {/* 2. Plain Flat Trust Credentials Strip */}
      <TrustBar />

      {/* 3. Divided List Three-Tier Operations Model */}
      <ServicesOverview />

      {/* 4. Operational Proof Case Study (Trichy International Airport) */}
      <ProofSection />

      {/* 5. Audited Operational SLAs & Metrics Module */}
      <StatsSection />

      {/* 6. Industry Deployment Profiles */}
      <TestimonialsSection />

      {/* 7. Direct Quotable FAQ Accordion */}
      <FAQSection />

      {/* 8. Solid Navy Closing Conversion CTA Band */}
      <CTASection />
    </div>
  );
}
