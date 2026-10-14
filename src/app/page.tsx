import { 
  HeroSection, 
  TrustBar, 
  ServicesOverview, 
  StatsSection, 
  FAQSection, 
  CTASection, 
  ExecutiveLeadershipSection,
  ReviewsShowcase 
} from "@/components/sections";
import { AirportOperationsSlideshow } from "@/components/widgets/airport-slideshow";
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
    absolute: "JSM Integrated Services | Private Security, Manpower Staffing, Facility Operations & Digital Automation",
  },
  description: "JSM Integrated Services delivers disciplined Ex-Servicemen & Private Security Guarding, 100% EPF/ESIC Contract Manpower Staffing, Mechanized Facility Management, and Enterprise Digital & WhatsApp Automation across Tamil Nadu.",
  alternates: {
    canonical: brandData.domain,
  },
  openGraph: {
    title: "JSM Integrated Services | Private Security, Manpower Staffing, Facility Operations & Digital Automation",
    description: "JSM Integrated Services delivers disciplined Ex-Servicemen & Private Security Guarding, 100% EPF/ESIC Contract Manpower Staffing, Mechanized Facility Management, and Enterprise Digital & WhatsApp Automation across Tamil Nadu.",
    url: brandData.domain,
    siteName: brandData.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${brandData.domain}/images/jsm_logo_black.png`,
        width: 1200,
        height: 630,
        alt: "JSM Integrated Services - Private Security, Manpower Staffing, Facility Operations & Digital Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSM Integrated Services | Private Security, Manpower Staffing, Facility Operations & Digital Automation",
    description: "JSM Integrated Services delivers disciplined Ex-Servicemen & Private Security Guarding, 100% EPF/ESIC Contract Manpower Staffing, Mechanized Facility Management, and Enterprise Digital & WhatsApp Automation across Tamil Nadu.",
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
    <div className="relative bg-[#030712] text-white min-h-screen overflow-x-hidden w-full max-w-full">

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

      {/* 1. Hero Section: Mobile-first video reel + punchy copy */}
      <HeroSection />

      {/* 2. Plain Flat Trust Credentials Strip (with ClientLogoMarquee) */}
      <TrustBar />

      {/* 3. High-Velocity Operations Showcase (3.0s Auto-Crossfade) */}
      <AirportOperationsSlideshow />

      {/* 4. Core Four-Pillar Operations Matrix */}
      <ServicesOverview />

      {/* 5. Executive Leadership & Operational Command */}
      <ExecutiveLeadershipSection />

      {/* 6. Audited Operational SLAs & Metrics Module */}
      <StatsSection />

      {/* 7. Verified Customer Reviews & Google Maps Social Proof */}
      <ReviewsShowcase />

      {/* 8. Direct Quotable FAQ Accordion */}
      <FAQSection />

      {/* 9. High-Conversion Space Black Closing CTA Band */}
      <CTASection />
    </div>
  );
}
