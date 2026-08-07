import { HeroSection } from "@/components/sections/hero-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhyJSM } from "@/components/sections/why-jsm";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/sections/cta-section";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata = {
  title: "JSM Security & Integrated Services | Premium Corporate Website",
  description: "Elite security guarding, facilities management, digital software, and event logistics unified under JSM operational standards.",
};

export default function Home() {
  const orgSchema = organizationSchema();
  const webSchema = websiteSchema();

  return (
    <main className="relative bg-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSchema) }}
      />
      <HeroSection />
      <TrustBar />
      <ServicesOverview />
      <WhyJSM />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
