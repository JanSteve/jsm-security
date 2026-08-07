import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Careers | JSM Security & Integrated Services",
  description: "Join the elite JSM team. Explore career opportunities in security operations, facility coordination, digital media, and engineering.",
};

export default function CareersPage() {
  const jobs = [
    {
      title: "Security Operations Manager",
      dept: "Security Operations",
      location: "London, UK",
      type: "Full-Time",
      desc: "Oversee close protection details and manned guarding deployments across Canary Wharf clients. Requires extensive operational management experience.",
    },
    {
      title: "Senior Software Engineer",
      dept: "Digital Solutions",
      location: "Remote (UK)",
      type: "Full-Time",
      desc: "Help build and scale the Next-Gen enterprise client portal and integrations with smart IoT security sensors.",
    },
    {
      title: "Facilities Coordinator",
      dept: "Facilities Management",
      location: "London, UK",
      type: "Full-Time",
      desc: "Manage building cleaning, maintenance, and space planning operations for prime commercial real estate.",
    },
    {
      title: "Executive Protection Agent",
      dept: "Elite Security",
      location: "London & International Travel",
      type: "Contract",
      desc: "Provide close protection and secure transport logistics for HNW individuals and corporate executives.",
    },
  ];

  const benefits = [
    { title: "Competitive Salary", desc: "Top-tier compensation packages matching industry leading standards." },
    { title: "Health & Medical", desc: "Comprehensive health, dental, and vision insurance coverage." },
    { title: "Training & Growth", desc: "Dedicated budgets for certification training, weapons course, and tech bootcamps." },
    { title: "Flexible Working", desc: "Remote and hybrid setups where operational mandates allow." },
    { title: "Elite Equipment", desc: "Access to state of the art software, vehicles, and tactical equipment." },
    { title: "Team Events", desc: "Regular corporate dinners, team building outings, and operational drills." },
  ];

  return (
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight leading-[1.05]">
            Join the <span className="text-[#C5A880]">JSM Team</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 font-medium leading-relaxed">
            We recruit, train, and deploy elite talents across security, digital, facility, and property operations.
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-black mb-8 text-center tracking-tight">Benefits of Partnering with JSM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((ben) => (
              <div key={ben.title} className="p-6 bg-zinc-50 border border-zinc-200/60 rounded-3xl space-y-2 shadow-sm">
                <h3 className="font-bold text-black text-lg">{ben.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{ben.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Job Listings */}
        <section>
          <h2 className="text-2xl font-bold text-black mb-8 tracking-tight">Active Opportunities</h2>
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="bg-zinc-50 border border-zinc-200/60 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[#C5A880]/30 transition-all duration-300 group shadow-sm"
              >
                <div className="space-y-4 max-w-2xl">
                  <Badge className="bg-[#C5A880]/10 text-[#C5A880] border-[#C5A880]/20 rounded-full px-3 uppercase tracking-widest text-[10px] font-bold">
                    {job.dept}
                  </Badge>
                  <h3 className="text-2xl font-bold text-black group-hover:text-[#C5A880] transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {job.desc}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-zinc-400 font-semibold">
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {job.type}</span>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <Button asChild className="w-full md:w-auto bg-black text-white hover:bg-zinc-800 font-semibold rounded-full px-8 h-12 shadow-md">
                    <Link href="/contact">Apply Now</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
