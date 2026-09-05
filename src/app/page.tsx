import { 
  HeroSection, 
  TrustBar, 
  Scroll3DShowcase,
  ServicesOverview, 
  OperationalCalculator,
  ROICalculator,
  WhyJSM, 
  TestimonialsSection,
  RegionalCoverage,
  CTASection 
} from "@/components/sections";
import { VisualTransformationGallery } from "@/components/sections/visual-transformation-gallery";
import { InteractiveCostSimulator } from "@/components/calculator/interactive-cost-simulator";
import { RegionalCommandMap } from "@/components/sections/regional-command-map";
import { ComplianceMatrix } from "@/components/sections/compliance-matrix";
import { organizationSchema, localBusinessSchema, websiteSchema, faqSchema } from "@/lib/schema";
import { brandData } from "@/data/brand";

export const metadata = {
  title: `${brandData.name} | ${brandData.tagline}`,
  description: `${brandData.name} delivers disciplined Private Security, Housekeeping & Facility Management, Contractual Manpower, and Integrated Operations across Tamil Nadu & India.`,
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
    answer: "JSM operates across Tamil Nadu (Trichy, Chennai, Coimbatore, Madurai, Salem, Hosur, Erode, Tirunelveli) and provides scalable integrated facility operations throughout South India."
  }
];

export default function Home() {
  const orgSchema = organizationSchema();
  const localSchema = localBusinessSchema();
  const webSchema = websiteSchema();
  const faqsJsonLd = faqSchema(homeFAQs);

  return (
    <div className="relative bg-white overflow-hidden">
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

      {/* Enterprise Visual & Operational Flow */}
      <HeroSection />
      <TrustBar />
      <Scroll3DShowcase />
      <VisualTransformationGallery />
      <ServicesOverview />
      <InteractiveCostSimulator />
      <RegionalCommandMap />
      <WhyJSM />
      <ComplianceMatrix />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
