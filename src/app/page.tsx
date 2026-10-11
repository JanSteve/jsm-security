import { 
  HeroSection, 
  TrustBar, 
  ServicesOverview, 
  ProofSection,
  StatsSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  ExecutiveLeadershipSection
} from "@/components/sections";
import { InteractiveShowcase } from "@/components/widgets/interactive-showcase";
import { SecurityVideoShowcase } from "@/components/widgets/security-video-showcase";
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
import { AmbientMagneticCursor, KineticTypography } from "@/components/motion";

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
    <div className="relative bg-white text-[#14181F] min-h-screen">
      {/* Ambient Military Gold Magnetic Cursor */}
      <AmbientMagneticCursor />

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

      {/* 3a. Official Security Brand Commercial & Tactical Video Theater */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-2 text-left">
            <div className="text-xs font-semibold text-[#9C7A3C]">
              Operational Excellence on Film
            </div>
            <KineticTypography
              as="h2"
              text="Tactical Security Deployment & Ground Turnout in Action"
              className="font-serif text-2xl sm:text-3xl lg:text-[38px] leading-[1.18] text-[#14181F] font-semibold tracking-[-0.01em]"
            />
            <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed">
              Ex-Servicemen drill inspections, rapid mobilization protocols, and live airport security operations recorded on ground.
            </p>
          </div>
          <SecurityVideoShowcase />
        </div>
      </section>

      {/* 3b. Interactive Operations & Digital Automation Showcase */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F6F7F9] border-y border-[#E4E7EC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveShowcase />
        </div>
      </section>

      {/* 4. Operational Proof Case Study (Trichy International Airport) */}
      <ProofSection />

      {/* 4b. Executive Leadership & Operational Command */}
      <ExecutiveLeadershipSection />

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
