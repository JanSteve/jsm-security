import { 
  HeroSection, 
  TrustBar, 
  ProblemSection, 
  ServicesOverview, 
  WhyJSM, 
  HowWeWork, 
  SOPSection, 
  IndustriesSection, 
  PeopleSection, 
  CTASection 
} from "@/components/sections";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";
import { brandData } from "@/data/brand";

export const metadata = {
  title: `${brandData.name} | ${brandData.tagline}`,
  description: `${brandData.name} delivers disciplined Private Security, Housekeeping & Facility Management, Contractual Manpower, and Integrated Operations across Tamil Nadu & India.`,
};

export default function Home() {
  const orgSchema = organizationSchema();
  const localSchema = localBusinessSchema();
  const webSchema = websiteSchema();

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

      {/* 10-Section Storytelling Journey */}
      <HeroSection />
      <TrustBar />
      <ProblemSection />
      <ServicesOverview />
      <WhyJSM />
      <HowWeWork />
      <SOPSection />
      <IndustriesSection />
      <PeopleSection />
      <CTASection />
    </div>
  );
}
