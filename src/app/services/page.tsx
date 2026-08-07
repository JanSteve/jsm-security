import { servicesData, serviceCategories } from '@/data/services';
import { ServiceFilter } from '@/components/services/service-filter';

export const metadata = {
  title: 'Our Services | JSM Security & Integrated Services',
  description: 'Explore our comprehensive range of security, facilities, digital, and event management services tailored for corporate excellence.',
};

export default function ServicesHubPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight">
            Our Professional <span className="text-[#C5A880]">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 font-medium">
            Integrated Solutions, Unified Excellence. Discover our full spectrum of elite services designed to protect, coordinate, and optimize your operations.
          </p>
        </div>

        <ServiceFilter categories={serviceCategories} services={servicesData} />
      </div>
    </main>
  );
}
