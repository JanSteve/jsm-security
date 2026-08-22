import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Users, Target, HeartHandshake, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "About Us | Founder Story & Operating Philosophy",
  description: "Learn how JSM Integrated Services was founded under Sweety R, originating as JSMMANPOWER and proven by our landmark 2024 Trichy International Airport assignment.",
};

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "About Us", url: `${brandData.domain}/about` },
  ]);

  const values = [
    {
      title: "Discipline Shift by Shift",
      desc: "Turnout inspection, punctuality, and post alertness are non-negotiable standards across all our deployments."
    },
    {
      title: "Radical Transparency",
      desc: "We share verified daily attendance logs, shift incident reports, and clear billing without hidden charges."
    },
    {
      title: "People-First Culture",
      desc: "Our people are our product. We ensure prompt monthly salary disbursement on the 1st, full safety gear, and dignity for every worker."
    },
    {
      title: "Systematic SOPs",
      desc: "Service is not a promise; it is a process. We design site-specific standing orders and the 5-step hygiene operating cycle."
    },
    {
      title: "Founder-Led Responsiveness",
      desc: "Executive accessibility. Our Managing Director and operations chiefs actively review client sites and resolve escalations directly."
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero Header */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-5xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-bold">
          <Sparkles size={13} className="text-[#C5A880]" />
          <span>OUR STORY & OPERATING PHILOSOPHY</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-tight">
          There is no shortcut to trust.<br className="hidden sm:inline" />
          <span className="text-zinc-600">
            It is earned shift by shift.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-zinc-600 font-medium max-w-3xl mx-auto leading-relaxed">
          Founded under Managing Director <strong>Sweety R</strong>, JSM Integrated Services originated from the practical staffing foundation of <strong>JSMMANPOWER</strong> and grew into a unified operational partner managing security, facilities, and manpower across Tamil Nadu.
        </p>
      </section>

      {/* Origin & Landmark Milestone Section */}
      <section className="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
        <div className="bg-zinc-900 text-white rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center border border-zinc-800 shadow-2xl">
          <div className="space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A880]">
              The Inaugural Milestone (2024)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Tested at Trichy International Airport.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              In 2024, our team secured and executed the landmark contract for security and operational support at <strong>Trichy International Airport</strong>.
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              Civil aviation infrastructure leaves zero margin for error. Managing passenger flow, gate screening, and round-the-clock terminal coordination forged the high-discipline operating standards that define JSM today.
            </p>
            <div className="pt-2">
              <Button asChild size="sm" className="bg-[#C5A880] hover:bg-[#b59870] text-black font-bold rounded-full text-xs">
                <Link href="/case-studies">
                  Read Trichy Airport Case Study <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-zinc-700/60 shadow-lg">
            <Image
              src="/images/hero_operations.jpg"
              alt="JSM Operations Team Deployment"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <p className="text-xs font-bold text-white">
                "Our experience in aviation logistics set the benchmark for our industrial and corporate standards."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
            Executive Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
            Founder-led with direct accountability.
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-2xl mx-auto">
            You don’t deal with faceless call centers. Our leadership team actively reviews operational quality and responds swiftly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brandData.leadership.map((leader, i) => (
            <div
              key={leader.name}
              className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-7 space-y-4 shadow-sm hover:border-black transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-base">
                {leader.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-black text-black">{leader.name}</h3>
                <p className="text-xs font-bold text-[#C5A880] uppercase tracking-wider">{leader.role}</p>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl border-t border-zinc-200/80 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
            Our Core Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
            What guides our everyday decisions.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, idx) => (
            <div key={idx} className="p-6 bg-white border border-zinc-200/80 rounded-3xl space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 text-black flex items-center justify-center font-bold text-xs">
                0{idx + 1}
              </div>
              <h4 className="text-base font-bold text-black">{v.title}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 md:px-6 pt-12 max-w-4xl text-center space-y-6">
        <div className="p-8 md:p-12 bg-zinc-50 border border-zinc-200/80 rounded-3xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Let’s discuss your operational requirement.
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto font-medium">
            Contact our Managing Director's office to schedule a site walkthrough or requirement mapping session.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild className="bg-black hover:bg-zinc-800 text-white rounded-full px-6 h-11 text-xs font-bold">
              <Link href="/contact">Request a Site Assessment</Link>
            </Button>
            <Button asChild variant="outline" className="border-zinc-200 rounded-full px-6 h-11 text-xs font-bold text-zinc-800">
              <Link href="/trust-center">Explore Trust Center</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
