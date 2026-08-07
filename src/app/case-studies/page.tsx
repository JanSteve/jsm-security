import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Case Studies | JSM Security & Integrated Services",
  description: "Read about our client success stories and how JSM protects, supports, and elevates international operations.",
};

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      client: "Global Finance HQ",
      industry: "Financial Services",
      challenge: "Required comprehensive, multi-layer physical and access control security for their European headquarters in London.",
      solution: "Deployed executive guarding details, installed biometric locks, and integrated all CCTV streams into our 24/7 Remote Monitoring Command Center.",
      result: "Zero security breaches, 99.9% uptime, and 15% reduction in security resource overheads.",
      metric: "0 Breaches",
    },
    {
      client: "Canary Wharf Real Estate",
      industry: "Commercial Property",
      challenge: "Managing facilities, cleaning, and maintenance operations for a complex of 3 office high-rises under separate vendors.",
      solution: "Unified facilities and maintenance operations under JSM Integrated Services, deploying a dedicated facilities coordinator team.",
      result: "Improved resolution time of building reports by 40% and simplified billing administration.",
      metric: "-40% Resolution Time",
    },
    {
      client: "Tech World 2024",
      industry: "Events Logistics",
      challenge: "Providing security oversight, crowd logistics, and medical standby details for an international event of 20,000+ attendees.",
      solution: "Deployed 150+ trained event officers, coordinate routes with local authorities, and utilized smart crowd-density software.",
      result: "Successful event completion with zero incidents, streamlined registration lines, and VIP client satisfaction.",
      metric: "20k Attendees Secured",
    },
    {
      client: "Bespoke Art Auctioneer",
      industry: "Luxury Auctions",
      challenge: "Secure transport, asset tracking, and close protection detail for a high-value auction catalog valued at $100M+.",
      solution: "Utilized JSM CIT secure transport armored vehicles and assigned a 6-officer white-glove security team for auction floor surveillance.",
      result: "Art pieces secured during transit and previews, safe load-out post-auction.",
      metric: "$100M+ Valuables Safe",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight leading-[1.05]">
            Client Success <span className="text-[#C5A880]">Stories</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 font-medium leading-relaxed">
            Real world examples of how JSM delivers security, integration, and operational excellence for top-tier clients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.client}
              className="bg-zinc-50 border border-zinc-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-[#C5A880]/30 transition-all duration-300 group shadow-sm"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider">{study.industry}</span>
                    <h3 className="text-2xl font-bold text-black mt-1 group-hover:text-[#C5A880] transition-colors">
                      {study.client}
                    </h3>
                  </div>
                  <div className="px-4 py-2 bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] text-sm font-bold rounded-xl">
                    {study.metric}
                  </div>
                </div>

                <div className="space-y-4 border-t border-zinc-200/60 pt-6">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">The Challenge</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{study.challenge}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Our Solution</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{study.solution}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">The Result</h4>
                    <p className="text-sm text-black leading-relaxed font-bold">{study.result}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-200/60">
                <Button asChild variant="link" className="text-[#3B82F6] hover:text-[#C5A880] p-0 h-auto inline-flex items-center gap-2 group-hover:gap-3 duration-300 rounded-xl">
                  <Link href="/contact">
                    Inquire About Similar Solutions <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
