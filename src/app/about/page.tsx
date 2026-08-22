import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Shield, Sparkles, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About JSM — The Architecture of Excellence",
  description: "Learn how JSM Integrated Services was founded under Sweety R, originating as JSMMANPOWER and proven by our landmark 2024 Trichy International Airport assignment.",
};

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "About Us", url: `${brandData.domain}/about` },
  ]);

  return (
    <main className="bg-[#fbf9f4] text-zinc-900 min-h-screen pt-28 pb-24 selection:bg-[#ffdea5] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        {/* Hero Section from Stitch */}
        <section className="py-16 md:py-24 border-b border-zinc-200/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-6">
              <span className="text-[11px] md:text-[12px] font-bold tracking-[0.1em] text-[#C5A880] uppercase block">
                FOUNDATIONAL PHILOSOPHY
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-black tracking-tight leading-tight uppercase">
                The Architecture<br />of Excellence.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl font-normal leading-relaxed">
                We don't just provide services; we engineer operational resilience. Discover the framework that powers our disciplined approach to facility and security management.
              </p>
            </div>
          </div>
        </section>

        {/* Section 01: Our Origin from Stitch */}
        <section className="py-20 md:py-28 border-b border-zinc-200/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 space-y-5">
              <span className="text-2xl font-bold text-[#C5A880] font-mono block">01</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
                Our Origin
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                A vision for disciplined service. Born from a recognition that traditional security and facility management lacked systematic rigor, JSM was founded under Managing Director <strong>Sweety R</strong>, originally established as <strong>JSMMANPOWER</strong>, to bring engineering precision to human-centric services.
              </p>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                In <strong>2024</strong>, our operational framework was tested and proven at scale through our landmark operations contract at <strong>Trichy International Airport (Tiruchirappalli)</strong>. Managing civil aviation passenger flows, gate access control, and 24/7 terminal coordination forged the zero-compromise standards that define JSM today.
              </p>
              <div className="pt-2">
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline"
                >
                  Read Trichy Airport Case Study <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-md relative p-3">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/hero_operations.jpg"
                    alt="JSM Operations Team"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <p className="text-xs font-bold text-white leading-relaxed">
                      "There is no shortcut to trust — it is earned shift by shift, report by report, client by client."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The JSM Blueprint from Stitch */}
        <section className="py-20 md:py-28 border-b border-zinc-200/80">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-2xl font-bold text-[#C5A880] font-mono block">02</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
              The JSM Blueprint
            </h2>
            <p className="text-base text-zinc-600 font-normal">
              Our methodology is systematic, repeatable, and relentlessly optimized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-8 bg-white border border-zinc-200/80 rounded-2xl hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center font-bold text-sm bg-black text-white">
                1
              </div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-black">Understand</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Deep-dive analysis of your operational context, vulnerabilities, and strategic objectives before any solution is drafted.
              </p>
            </div>

            <div className="p-8 bg-white border border-zinc-200/80 rounded-2xl hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-zinc-300 flex items-center justify-center font-bold text-sm text-black">
                2
              </div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-black">Assess</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Rigorous stress-testing of current protocols against our high-tier operational standards to identify critical gaps.
              </p>
            </div>

            <div className="p-8 bg-white border border-zinc-200/80 rounded-2xl hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-zinc-300 flex items-center justify-center font-bold text-sm text-black">
                3
              </div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-black">Plan</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Deployment of a customized, engineered service architecture designed for absolute resilience and seamless integration.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03: Command & Control (Leadership from Stitch) */}
        <section className="py-20 md:py-28 bg-black text-white rounded-3xl p-8 md:p-16 my-12 border border-zinc-800 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-8 space-y-3">
              <span className="text-2xl font-bold text-[#C5A880] font-mono block">03</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Command &amp; Control
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed">
                Guided by seasoned operational leaders, our executive team ensures that the JSM standard is executed flawlessly at every echelon.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brandData.leadership.map((leader, i) => (
              <div key={leader.name} className="group bg-zinc-900/90 border border-zinc-800 rounded-2xl p-7 space-y-4 hover:border-[#C5A880] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 text-[#C5A880] flex items-center justify-center font-black text-base border border-zinc-700">
                  {leader.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-black text-white">{leader.name}</h4>
                  <p className="text-xs font-bold text-[#C5A880] tracking-wider uppercase mt-0.5">{leader.role}</p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Assessment CTA matching Stitch */}
        <section className="py-16 text-center space-y-6">
          <h3 className="text-3xl font-black text-black tracking-tight">Initiate an Assessment</h3>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto font-normal">
            Engage our consultants to evaluate your current operational vulnerabilities and design a bespoke service architecture.
          </p>
          <div className="pt-2">
            <Button asChild size="lg" className="bg-black hover:bg-zinc-800 text-white font-bold text-xs px-8 h-12 rounded-sm border-b-2 border-[#C5A880] shadow-md">
              <Link href="/contact">
                REQUEST A SITE ASSESSMENT <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
