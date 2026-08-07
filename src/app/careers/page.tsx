import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Briefcase, MapPin, Clock } from "lucide-react";

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
    <main className="min-h-screen bg-[#0A1128] pt-24 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8F9FA] mb-6 tracking-tight">
            Join the <span className="text-[#D4AF37]">JSM Team</span>
          </h1>
          <p className="text-lg md:text-xl text-[#94A3B8]">
            We recruit, train, and deploy elite talents across security, digital, facility, and property operations.
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-[#F8F9FA] mb-8 text-center">Benefits of Partnering with JSM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((ben) => (
              <div key={ben.title} className="p-6 bg-[#121C3B]/30 border border-[#1A264D] rounded-2xl space-y-2">
                <h3 className="font-bold text-[#F8F9FA] text-lg">{ben.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{ben.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Job Listings */}
        <section>
          <h2 className="text-2xl font-bold text-[#F8F9FA] mb-8">Active Opportunities</h2>
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="bg-[#121C3B]/30 border border-[#1A264D] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[#D4AF37]/30 transition-all duration-300 group"
              >
                <div className="space-y-4 max-w-2xl">
                  <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 rounded-full px-3">
                    {job.dept}
                  </Badge>
                  <h3 className="text-2xl font-bold text-[#F8F9FA] group-hover:text-[#D4AF37] transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {job.desc}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {job.type}</span>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <Button asChild className="w-full md:w-auto bg-[#D4AF37] text-[#0A1128] hover:bg-[#C9A227] font-semibold rounded-full px-6 h-12">
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
