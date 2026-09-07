import { 
  HeroSection, 
  TrustBar, 
  ServicesOverview, 
  FlagshipBentoGrid,
  TestimonialsSection,
  FAQSection,
  CTASection,
  StockGrowthChart,
  BulletinTicker,
  DistrictHubsSlideshow,
  ContinuousNewsletterStream
} from "@/components/sections";
import { organizationSchema, localBusinessSchema, websiteSchema, faqSchema } from "@/lib/schema";
import { brandData } from "@/data/brand";

export const metadata = {
  title: `${brandData.name} | Security, Manpower & Integrated Facility Management`,
  description: `${brandData.name} delivers disciplined Ex-Servicemen & Private Security, Multi-Skill Corporate Manpower, and Integrated Facility Management across Tamil Nadu and Pan-India.`,
};

const homeFAQs = [
  {
    question: "What integrated facility and manpower services does JSM provide in India?",
    answer: "JSM Integrated Services delivers disciplined Private Security guarding (PSARA compliant), Commercial Housekeeping & Facility Management, and Contractual Industrial Manpower under a single accountable partner."
  },
  {
    question: "Is JSM Integrated Services compliant with PSARA and statutory labour laws?",
    answer: "Yes, JSM operates strictly within the Private Security Agencies Regulation Act (PSARA 2005) under the Home Department of Tamil Nadu with 100% EPF, ESIC, and minimum wage compliance."
  },
  {
    question: "What is JSM's guaranteed replacement SLA for absent personnel?",
    answer: "JSM guarantees a 2-Hour Relief Replacement SLA where any absent personnel is replaced by a verified roving reserve staff member within 120 minutes."
  },
  {
    question: "Which regions and cities are served by JSM Integrated Services?",
    answer: "JSM operates across Tamil Nadu (Trichy, Chennai with OMR Tech Corridor, Coimbatore, Hosur, Madurai, Salem, Erode, Tirunelveli) and provides scalable integrated facility operations throughout South India."
  }
];

export default function Home() {
  const orgSchema = organizationSchema();
  const localSchema = localBusinessSchema();
  const webSchema = websiteSchema();
  const faqsJsonLd = faqSchema(homeFAQs);

  return (
    <div className="relative bg-white text-[#1d1d1f] min-h-screen selection:bg-[#0071e3]/15 selection:text-black overflow-hidden">
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

      {/* DGR-Aligned Sovereign Executive Architecture */}
      <HeroSection />
      
      {/* Continuous Newsletter Stream Running Directly into Site */}
      <ContinuousNewsletterStream label="INTELLIGENCE &amp; OPERATIONS STREAM" />

      <BulletinTicker />
      <TrustBar />
      <StockGrowthChart />
      <ServicesOverview />
      <DistrictHubsSlideshow />
      <FlagshipBentoGrid />

      {/* Recurring Continuous Newsletter Stream Running Again */}
      <ContinuousNewsletterStream label="REGULATORY GAZETTE &amp; VACANCY STREAM" />

      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
