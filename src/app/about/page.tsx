import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Shield, Sparkles, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About JSM — The Architecture of Excellence",
  description: "Learn how JSM Integrated Services was founded under Sweety J, originating as JSMMANPOWER and proven by our landmark 2024 Trichy International Airport assignment.",
};

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "About Us", url: `${brandData.domain}/about` },
  ]);

  return (
    <main className="bg-[#07090E] text-zinc-100 min-h-screen pt-28 pb-24 selection:bg-[#C5A880]/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        {/* Hero Section from Stitch */}
        <section className="py-16 md:py-24 border-b border-zinc-800/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-6">
              <span className="text-[11px] md:text-[12px] font-bold tracking-[0.1em] text-[#C5A880] uppercase block">
                Foundational philosophy
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-tight uppercase text-balance">
                The architecture<br />of excellence.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed text-pretty">
                We don't just provide services; we engineer operational resilience. Discover the framework that powers our disciplined approach to facility and security management.
              </p>
            </div>
          </div>
        </section>

        {/* Section 01: Our Origin from Stitch */}
        <section className="py-20 md:py-28 border-b border-zinc-800/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 space-y-5">
              <span className="text-2xl font-bold text-[#C5A880] font-mono block tabular-nums">01</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight text-balance">
                Our origin
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal text-pretty">
                A vision for disciplined service. Born from a recognition that traditional security and facility management lacked systematic rigor, JSM was founded under Proprietor &amp; Managing Director <strong className="text-white">Sweety J</strong>, originally established as <strong className="text-white">JSMMANPOWER</strong>, to bring engineering precision to human-centric services.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal text-pretty">
                In <strong className="text-white tabular-nums">2024</strong>, our operational framework was tested and proven at scale through our landmark operations contract at <strong className="text-white">Trichy International Airport (Tiruchirappalli)</strong>. Managing civil aviation passenger flows, gate access control, and 24/7 terminal coordination forged the zero-compromise standards that define JSM today.
              </p>
              <div className="pt-2">
                <Link
                  href="/services/private-security"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A880] hover:text-white hover:underline min-h-[44px] transition-colors"
                >
                  Explore aviation &amp; facility security protocols <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="aspect-square bg-[#0B0F17] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl relative p-3">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/real_jsm_airport_terminal_platoon.jpg"
                    alt="Managing Director Sweety J seated with full JSM Guard Platoon at Trichy International Airport"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090E]/95 via-[#07090E]/30 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase tracking-wider mb-1">
                      Authentic on-site field archive (2024)
                    </span>
                    <p className="text-xs font-bold text-white leading-relaxed text-pretty">
                      "There is no shortcut to trust — it is earned shift by shift, report by report, client by client."
                    </p>
                    <span className="text-[10px] text-zinc-400 mt-1 font-mono">
                      Trichy International Airport • MD Sweety J &amp; Security Platoon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real Field Operational Archive Gallery */}
          <div className="mt-14 pt-10 border-t border-zinc-800/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase tracking-widest block">
                  Ground zero proof
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight text-balance">
                  Field operations &amp; turnout discipline
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-zinc-400">
                100% real personnel photos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Photo 1: Airport Terminal Concourse Platoon */}
              <div className="bg-[#0B0F17] p-3 rounded-2xl border border-zinc-800 shadow-xs space-y-2.5 group hover:border-[#C5A880]/50 transition-colors">
                <div className="relative h-52 w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/real_jsm_airport_terminal_platoon.jpg"
                    alt="Managing Director Sweety J with Security Platoon at Trichy Airport"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#07090E]/90 border border-zinc-800 text-[#C5A880] text-[9px] font-mono font-bold uppercase">
                    Trichy Airport
                  </div>
                </div>
                <div className="p-1">
                  <h4 className="text-xs font-black text-white">Airport concourse platoon</h4>
                  <p className="text-[11px] text-zinc-400 font-medium leading-relaxed text-pretty">MD Sweety J seated with full uniformed security platoon at Trichy Airport.</p>
                </div>
              </div>

              {/* Photo 2: Heritage Landmark Chariot Platoon */}
              <div className="bg-[#0B0F17] p-3 rounded-2xl border border-zinc-800 shadow-xs space-y-2.5 group hover:border-[#C5A880]/50 transition-colors">
                <div className="relative h-52 w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/real_jsm_chariot_platoon.jpg"
                    alt="JSM Guard Platoon and Sweety J at Heritage Monument Chariot Mural"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#07090E]/90 border border-zinc-800 text-[#C5A880] text-[9px] font-mono font-bold uppercase">
                    Heritage sector
                  </div>
                </div>
                <div className="p-1">
                  <h4 className="text-xs font-black text-white">Platoon honor guard</h4>
                  <p className="text-[11px] text-zinc-400 font-medium leading-relaxed text-pretty">Uniformed guard squad in full ceremonial turnout under monument chariot mural.</p>
                </div>
              </div>

              {/* Photo 3: Official Printed Business Card Proof */}
              <div className="bg-[#0B0F17] p-3 rounded-2xl border border-zinc-800 shadow-xs space-y-2.5 group hover:border-[#C5A880]/50 transition-colors">
                <div className="relative h-52 w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/real_jsm_printed_card.jpg"
                    alt="Authentic Printed Business Card of JSM Integrated Services"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#07090E]/90 border border-zinc-800 text-[#C5A880] text-[9px] font-mono font-bold uppercase">
                    Official proof
                  </div>
                </div>
                <div className="p-1">
                  <h4 className="text-xs font-black text-white">Corporate card proof</h4>
                  <p className="text-[11px] text-zinc-400 font-medium leading-relaxed text-pretty">Official printed cards of Sweety J (Proprietor &amp; MD) and Major AR Devadoss.</p>
                </div>
              </div>

              {/* Photo 4: Fabrication Industry Hiring */}
              <div className="bg-[#0B0F17] p-3 rounded-2xl border border-zinc-800 shadow-xs space-y-2.5 group hover:border-[#C5A880]/50 transition-colors">
                <div className="relative h-52 w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/real_jsm_fabrication_hiring.jpg"
                    alt="JSM Fabrication Industry Recruitment Flyer"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#07090E]/90 border border-zinc-800 text-emerald-400 text-[9px] font-mono font-bold uppercase">
                    Manpower supply
                  </div>
                </div>
                <div className="p-1">
                  <h4 className="text-xs font-black text-white">Fabrication industry staffing</h4>
                  <p className="text-[11px] text-zinc-400 font-medium leading-relaxed text-pretty">Active staffing for Block &amp; Pipe fabrication with 100% EPF/ESI legal indemnity.</p>
                </div>
              </div>

              {/* Photo 5: Shift Muster */}
              <div className="bg-[#0B0F17] p-3 rounded-2xl border border-zinc-800 shadow-xs space-y-2.5 group hover:border-[#C5A880]/50 transition-colors">
                <div className="relative h-52 w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/real_jsm_shift_muster_day.jpg"
                    alt="Daytime Shift Briefing and Roll Call"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#07090E]/90 border border-zinc-800 text-[#C5A880] text-[9px] font-mono font-bold uppercase">
                    Field protocol
                  </div>
                </div>
                <div className="p-1">
                  <h4 className="text-xs font-black text-white">Daily shift briefing</h4>
                  <p className="text-[11px] text-zinc-400 font-medium leading-relaxed text-pretty">Pre-shift muster, radio communications check, and duty post allocation.</p>
                </div>
              </div>

              {/* Photo 6: Terminal Entry Salute */}
              <div className="bg-[#0B0F17] p-3 rounded-2xl border border-zinc-800 shadow-xs space-y-2.5 group hover:border-[#C5A880]/50 transition-colors">
                <div className="relative h-52 w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/real_jsm_terminal_entry_salute.jpg"
                    alt="Terminal Gate D6 Access Control"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#07090E]/90 border border-zinc-800 text-[#C5A880] text-[9px] font-mono font-bold uppercase">
                    Access control
                  </div>
                </div>
                <div className="p-1">
                  <h4 className="text-xs font-black text-white">Terminal access control</h4>
                  <p className="text-[11px] text-zinc-400 font-medium leading-relaxed text-pretty">Passenger gate D6 verification standing orders and protocol compliance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The JSM Blueprint from Stitch */}
        <section className="py-20 md:py-28 border-b border-zinc-800/80">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-2xl font-bold text-[#C5A880] font-mono block tabular-nums">02</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight text-balance">
              The JSM blueprint
            </h2>
            <p className="text-base text-zinc-400 font-normal text-pretty">
              Our methodology is systematic, repeatable, and relentlessly optimized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-8 bg-[#0B0F17] border border-zinc-800 rounded-2xl hover:border-[#C5A880]/60 transition-all space-y-4">
              <div className="w-12 h-12 rounded-full border border-[#C5A880]/40 flex items-center justify-center font-bold text-sm bg-[#121824] text-[#C5A880] tabular-nums">
                1
              </div>
              <h3 className="text-sm font-bold text-white">Understand</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal text-pretty">
                Deep-dive analysis of your operational context, vulnerabilities, and strategic objectives before any solution is drafted.
              </p>
            </div>

            <div className="p-8 bg-[#0B0F17] border border-zinc-800 rounded-2xl hover:border-[#C5A880]/60 transition-all space-y-4">
              <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center font-bold text-sm bg-[#121824] text-zinc-300 tabular-nums">
                2
              </div>
              <h3 className="text-sm font-bold text-white">Assess</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal text-pretty">
                Rigorous stress-testing of current protocols against our high-tier operational standards to identify critical gaps.
              </p>
            </div>

            <div className="p-8 bg-[#0B0F17] border border-zinc-800 rounded-2xl hover:border-[#C5A880]/60 transition-all space-y-4">
              <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center font-bold text-sm bg-[#121824] text-zinc-300 tabular-nums">
                3
              </div>
              <h3 className="text-sm font-bold text-white">Plan</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal text-pretty">
                Deployment of a customized, engineered service architecture designed for absolute resilience and seamless integration.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03: Command & Control (Leadership from Stitch) */}
        <section className="py-20 md:py-28 bg-[#0B0F17] text-white rounded-3xl p-8 md:p-16 my-12 border border-zinc-800 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-8 space-y-3">
              <span className="text-2xl font-bold text-[#C5A880] font-mono block tabular-nums">03</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight text-balance">
                Command &amp; control
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed text-pretty">
                Guided by seasoned operational leaders, our executive team ensures that the JSM standard is executed flawlessly at every echelon.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brandData.leadership.map((leader, i) => (
              <div key={leader.name} className="group bg-[#121824] border border-zinc-800/80 rounded-2xl p-7 space-y-4 hover:border-[#C5A880] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#0B0F17] text-[#C5A880] flex items-center justify-center font-black text-base border border-zinc-800">
                  {leader.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-black text-white">{leader.name}</h4>
                  <p className="text-xs font-bold text-[#C5A880] tracking-wider uppercase mt-0.5">{leader.role}</p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal text-pretty">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Assessment CTA matching Stitch */}
        <section className="py-16 text-center space-y-6">
          <h3 className="text-3xl font-black text-white tracking-tight text-balance">Initiate an assessment</h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-normal text-pretty">
            Engage our consultants to evaluate your current operational vulnerabilities and design a bespoke service architecture.
          </p>
          <div className="pt-2">
            <Button asChild size="lg" className="bg-white hover:bg-zinc-200 text-black font-bold text-xs px-8 h-12 rounded-full border border-[#C5A880] shadow-lg press-scale min-h-[44px]">
              <Link href="/contact">
                Request a site assessment <ArrowRight size={14} className="ml-1.5 text-black" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
