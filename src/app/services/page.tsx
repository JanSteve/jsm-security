import { servicesData, serviceCategories } from '@/data/services';
import { ServiceFilter } from '@/components/services/service-filter';

export const metadata = {
  title: 'Our Services | JSM Security & Integrated Services',
  description: 'Explore our comprehensive range of security, facilities, digital, and event management services tailored for corporate excellence.',
};

export default function ServicesHubPage() {
  return (
    <main className="min-h-screen bg-[#0A1128] pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8F9FA] mb-6 tracking-tight">
            Our <span className="text-[#D4AF37]">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-[#94A3B8]">
            Integrated Solutions, Unified Excellence. Discover our full spectrum of professional services designed to protect, maintain, and optimize your operations.
          </p>
        </div>

        <ServiceFilter categories={serviceCategories} services={servicesData} />
      </div>
    </main>
  );
}
