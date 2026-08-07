import { notFound } from 'next/navigation';
import { servicesData } from '@/data/services';
import { getIcon } from '@/components/services/icon-map';
import { FeatureGrid } from '@/components/services/feature-grid';
import { ProcessTimeline } from '@/components/services/process-timeline';
import { StatsBar } from '@/components/services/stats-bar';
import { ServiceFAQ } from '@/components/services/service-faq';
import { RelatedServices } from '@/components/services/related-services';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };
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
  const related = servicesData.filter(s => s.slug !== service.slug).slice(0, 3);

  // Generate FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((q: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#0A1128]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8 border-b border-[#1A264D] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#121C3B] to-transparent opacity-50 z-0" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 mb-6 py-1.5 px-4 rounded-full font-medium">
            {service.category}
          </Badge>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8F9FA] mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-[#94A3B8] leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>
            <div className="p-6 bg-[#1A264D]/50 rounded-2xl border border-[#1A264D]">
              <IconComponent className="text-[#D4AF37] w-24 h-24" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#F8F9FA] mb-4">Core Capabilities</h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">Discover the key features and advantages of our {service.title.toLowerCase()} offering.</p>
          </div>
          <FeatureGrid features={service.features} />
          
          <StatsBar />
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 px-4 md:px-8 bg-[#121C3B]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#F8F9FA] mb-4">Our Approach</h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">A systematic, proven methodology to ensure optimal results.</p>
          </div>
          <ProcessTimeline steps={service.process} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#F8F9FA] mb-4">Frequently Asked Questions</h2>
          </div>
          <ServiceFAQ faqs={service.faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-br from-[#121C3B] to-[#0A1128] border-y border-[#1A264D]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#F8F9FA] mb-6">Ready to secure your operations?</h2>
          <p className="text-xl text-[#94A3B8] mb-10">Get a tailored quote for our {service.title} services today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#D4AF37] text-[#0A1128] hover:bg-[#C9A227] font-bold text-lg px-8 py-6 rounded-full">
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#1A264D] text-[#F8F9FA] hover:bg-[#1A264D] text-lg px-8 py-6 rounded-full">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl font-bold text-[#F8F9FA] mb-10">More from our portfolio</h3>
          <RelatedServices services={related} />
        </div>
      </section>
    </main>
  );
}
