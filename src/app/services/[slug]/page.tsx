import { servicesData } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/components/services/icon-map";
import { FeatureGrid } from "@/components/services/feature-grid";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { ServiceFAQ } from "@/components/services/service-faq";
import { StatsBar } from "@/components/services/stats-bar";
import { RelatedServices } from "@/components/services/related-services";
import { serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | JSM Security`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) notFound();

  const IconComponent = getIcon(service.icon);
  const related = servicesData.filter((s) => s.slug !== service.slug).slice(0, 3);

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((q: { question: string; answer: string }) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-zinc-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8 border-b border-zinc-200/80 relative overflow-hidden bg-zinc-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <Badge className="bg-[#C5A880]/10 text-[#C5A880] border-[#C5A880]/20 mb-6 py-1.5 px-4 rounded-full font-bold uppercase tracking-widest text-xs">
            {service.category}
          </Badge>
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="flex-1 max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-[1.05] tracking-tight">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-zinc-500 font-medium leading-relaxed">
                {service.description}
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm flex-shrink-0">
              <IconComponent className="text-[#C5A880] w-16 h-16" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 md:px-8 bg-white border-b border-zinc-200/80">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4 tracking-tight">Core Capabilities</h2>
            <p className="text-zinc-500 font-medium max-w-2xl mx-auto">Discover the key features and advantages of our {service.title.toLowerCase()} offering.</p>
          </div>
          <FeatureGrid features={service.features} />
          
          <div className="mt-16">
            <StatsBar />
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 px-4 md:px-8 bg-zinc-50 border-b border-zinc-200/80">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4 tracking-tight">Our Approach</h2>
            <p className="text-zinc-500 font-medium max-w-2xl mx-auto">A systematic, proven methodology to ensure optimal results.</p>
          </div>
          <ProcessTimeline steps={service.process} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-4 md:px-8 bg-white border-b border-zinc-200/80">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4 tracking-tight">Frequently Asked Questions</h2>
          </div>
          <ServiceFAQ faqs={service.faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-br from-zinc-50 to-white border-b border-zinc-200/80">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">Ready to secure your operations?</h2>
          <p className="text-lg md:text-xl text-zinc-500 font-medium mb-10">Get a tailored quote for our {service.title} services today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-black text-white hover:bg-zinc-800 font-semibold h-14 px-8 rounded-full shadow-lg">
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-zinc-300 text-zinc-800 hover:bg-zinc-50 font-semibold h-14 px-8 rounded-full">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl font-bold text-black mb-10 tracking-tight">More from our portfolio</h3>
          <RelatedServices services={related} />
        </div>
      </section>
    </main>
  );
}
