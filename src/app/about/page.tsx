import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Sparkles, 
  Users, 
  Award, 
  Target, 
  Eye, 
  Radio, 
  MessageCircle, 
  FileCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OperationalProofSlideshow } from "@/components/about/operational-proof-slideshow";

export const metadata = {
  title: "About JSM — Sovereign Security & Facility Architecture",
  description: "Learn how JSM Integrated Services operates under Proprietor & MD Sweety J, CTO R Jan Steve Daniel, and Head of Operations & Audit Major AR Devadoss (Army-Veteran) with proven Trichy International Airport operations.",
};

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "About Us", url: `${brandData.domain}/about` },
  ]);

  return (
    <main className="bg-white text-[#1d1d1f] min-h-screen pt-52 sm:pt-60 md:pt-64 lg:pt-72 pb-24 selection:bg-[#0071e3]/15 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-black/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-9 space-y-4">
              <span className="text-xs font-semibold tracking-wider text-[#0071e3] uppercase block">
                Foundational Philosophy &bull; Sovereign Security
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-[#1d1d1f] tracking-tight leading-tight text-balance">
                The architecture<br />of excellence.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#86868b] max-w-3xl font-normal leading-relaxed text-pretty">
                We engineer operational resilience. Discover the military-grade framework that powers our disciplined approach to security guarding, Ex-Servicemen resettlement, and integrated facility management across South India.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-16 md:py-20 border-b border-black/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#f5f5f7] border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#0071e3] flex items-center justify-center border border-black/[0.08] shadow-xs">
                <Eye size={24} />
              </div>
              <span className="text-xs font-bold text-[#0071e3] uppercase tracking-wider block">Our Vision</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">
                To be India&apos;s most trusted sovereign security &amp; facility partner.
              </h2>
              <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
                Establishing an uncompromised standard of physical protection and facility operations where military discipline, Ex-Servicemen valor, and digital accountability converge to protect national infrastructure and private enterprise.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-[#f5f5f7] border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center border border-black/[0.08] shadow-xs">
                <Target size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Our Mission</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">
                Zero client liability through 100% statutory precision.
              </h2>
              <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
                To guarantee our corporate and institutional clients absolute legal indemnity via transparent EPF/ESIC compliance, 2-hour relief SLAs, continuous officer-led field audits, and honorable, dignified livelihood creation for armed forces veterans.
              </p>
            </div>
          </div>
        </section>

        {/* Section 01: Our Origin & Civil Aviation Landmark */}
        <section className="py-20 md:py-28 border-b border-black/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 space-y-5">
              <span className="text-2xl font-semibold text-[#0071e3] block tabular-nums">01</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight leading-tight text-balance">
                Our origin &amp; aviation milestone
              </h2>
              <p className="text-sm sm:text-base text-[#515154] leading-relaxed font-normal text-pretty">
                A vision for disciplined service. Born from a recognition that traditional security and facility management lacked systematic rigor, JSM was founded under Proprietor &amp; Managing Director <strong className="text-[#1d1d1f]">Sweety J</strong>, originally established as <strong className="text-[#1d1d1f]">JSMMANPOWER</strong>, to bring engineering precision to human-centric operations.
              </p>
              <p className="text-sm sm:text-base text-[#515154] leading-relaxed font-normal text-pretty">
                In <strong className="text-[#1d1d1f] tabular-nums">2024</strong>, our operational framework was tested and proven at scale through our landmark operations contract at <strong className="text-[#1d1d1f]">Trichy International Airport (Tiruchirappalli)</strong>. Managing civil aviation passenger flows, gate access control, and 24/7 commercial terminal coordination forged the zero-compromise standards that define JSM today.
              </p>
              <div className="pt-2">
                <Link
                  href="/services/private-security"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline min-h-[44px] transition-colors"
                >
                  Explore aviation &amp; facility security protocols <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="aspect-square bg-[#f5f5f7] rounded-[28px] overflow-hidden border border-black/[0.08] shadow-sm relative p-3">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/real_jsm_airport_terminal_platoon.jpg"
                    alt="Managing Director Sweety J seated with full JSM Guard Platoon at Trichy International Airport"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wider mb-1">
                      Authentic on-site field archive (2024)
                    </span>
                    <p className="text-xs font-medium text-white leading-relaxed text-pretty">
                      &quot;There is no shortcut to trust — it is earned shift by shift, report by report, client by client.&quot;
                    </p>
                    <span className="text-[10px] text-white/75 mt-1">
                      Trichy International Airport &bull; MD Sweety J &amp; Security Platoon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real Field Operational Archive Gallery */}
          <div className="mt-14 pt-10 border-t border-black/[0.08] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold text-[#0071e3] uppercase tracking-wider block">
                  Ground zero proof
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight text-balance">
                  Field operations &amp; turnout discipline
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#86868b]">
                100% real personnel photos
              </span>
            </div>

            <OperationalProofSlideshow />
          </div>
        </section>

        {/* Section: What is DGR & PSARA Compliance? */}
        <section className="py-20 md:py-28 border-b border-black/[0.08]">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Institutional Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
              Understanding DGR Alignment &amp; PSARA 2005
            </h2>
            <p className="text-sm text-[#86868b] leading-relaxed">
              Why government institutions and multinational corporations demand DGR-oriented and PSARA-certified security contractors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.08] space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
                  <Shield size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#1d1d1f]">What is DGR?</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
                The <strong>Directorate General Resettlement (DGR)</strong> is an apex organization under the Department of Ex-Servicemen Welfare, Ministry of Defence, Government of India. DGR formulates policies and schemes to resettle retiring armed forces personnel into secondary careers. JSM aligns with DGR guidelines, employing Ex-Officers, JCOs, and Jawans to guarantee military rigor in enterprise security.
              </p>
              <div className="pt-2">
                <Link href="/security-agencies" className="text-xs font-semibold text-[#0071e3] hover:underline inline-flex items-center gap-1">
                  <span>View DGR Schemes &amp; Forms</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.08] space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0071e3] text-white">
                  <FileCheck size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#1d1d1f]">What is PSARA 2005?</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
                The <strong>Private Security Agencies (Regulation) Act 2005</strong> is the federal statute governing all security guarding in India. Operating without a valid PSARA license from the State Home Department is a non-bailable offense. JSM Integrated Services is fully licensed by the Home Department of Tamil Nadu with 100% police background verification and biometric audits.
              </p>
              <div className="pt-2">
                <Link href="/services/private-security" className="text-xs font-semibold text-[#0071e3] hover:underline inline-flex items-center gap-1">
                  <span>Review PSARA Compliance Standards</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The JSM Blueprint */}
        <section className="py-20 md:py-28 border-b border-black/[0.08]">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-2xl font-semibold text-[#0071e3] block tabular-nums">02</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight leading-tight text-balance">
              The JSM blueprint
            </h2>
            <p className="text-base text-[#86868b] font-normal text-pretty">
              Our methodology is systematic, repeatable, and relentlessly optimized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-8 bg-[#f5f5f7] border border-black/[0.06] rounded-[28px] hover:border-black/[0.12] transition-all space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full border border-black/[0.08] flex items-center justify-center font-semibold text-sm bg-white text-[#1d1d1f] tabular-nums shadow-sm">
                1
              </div>
              <h3 className="text-base font-semibold text-[#1d1d1f]">Understand</h3>
              <p className="text-xs sm:text-sm text-[#515154] leading-relaxed font-normal text-pretty">
                Deep-dive analysis of your operational context, vulnerabilities, shift rotations, and statutory compliance needs before any solution is drafted.
              </p>
            </div>

            <div className="p-8 bg-[#f5f5f7] border border-black/[0.06] rounded-[28px] hover:border-black/[0.12] transition-all space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full border border-black/[0.08] flex items-center justify-center font-semibold text-sm bg-white text-[#1d1d1f] tabular-nums shadow-sm">
                2
              </div>
              <h3 className="text-base font-semibold text-[#1d1d1f]">Assess</h3>
              <p className="text-xs sm:text-sm text-[#515154] leading-relaxed font-normal text-pretty">
                Rigorous stress-testing of current protocols against our high-tier operational standards to identify critical perimeter and hygiene gaps.
              </p>
            </div>

            <div className="p-8 bg-[#f5f5f7] border border-black/[0.06] rounded-[28px] hover:border-black/[0.12] transition-all space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full border border-black/[0.08] flex items-center justify-center font-semibold text-sm bg-white text-[#1d1d1f] tabular-nums shadow-sm">
                3
              </div>
              <h3 className="text-base font-semibold text-[#1d1d1f]">Plan &amp; Mobilize</h3>
              <p className="text-xs sm:text-sm text-[#515154] leading-relaxed font-normal text-pretty">
                Deployment of a customized service architecture with our guaranteed 2-hour relief replacement SLA and 100% EPF/ESIC statutory indemnification.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03: Command, Control & Communications (C³) */}
        <section className="py-20 md:py-28 bg-[#f5f5f7] text-[#1d1d1f] rounded-[28px] p-8 md:p-14 my-12 border border-black/[0.08] shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-[#0071e3] bg-white px-4 py-1 rounded-2xl border border-black/10 shadow-xs">
                  C³
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#86868b]">
                  Command &bull; Control &bull; Communications
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight leading-tight text-balance">
                Executive leadership &amp; operational commanders
              </h2>
              <p className="text-xs sm:text-sm text-[#86868b] max-w-2xl font-normal leading-relaxed text-pretty">
                Guided by seasoned operational commanders, our executive team ensures that the JSM standard is executed flawlessly at every post and shift across South India.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <div className="p-4 bg-white rounded-2xl border border-black/[0.08] text-xs space-y-1 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>C³ Operations Cell Active</span>
                </div>
                <p className="text-[#86868b]">24/7 Roving Supervisor Patrols &amp; Night Van Spot-Audits</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brandData.leadership.map((leader) => (
              <div key={leader.name} className="group bg-white border border-black/[0.06] rounded-2xl p-7 space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center font-semibold text-base border border-black/[0.08]">
                    {leader.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#1d1d1f]">{leader.name}</h4>
                    <p className="text-xs font-semibold text-[#0071e3] tracking-wider uppercase mt-0.5">{leader.role}</p>
                  </div>
                  <p className="text-xs text-[#515154] leading-relaxed font-normal text-pretty">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Assessment CTA */}
        <section className="py-16 text-center space-y-5">
          <h3 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight text-balance">Initiate a sovereign assessment</h3>
          <p className="text-xs sm:text-sm text-[#86868b] max-w-xl mx-auto font-normal text-pretty">
            Engage our operations commanders to evaluate your facility vulnerabilities and design a bespoke service architecture.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-[#1d1d1f] hover:bg-black text-white font-semibold text-xs px-8 h-12 rounded-full shadow-sm min-h-[44px]">
              <Link href="/contact">
                Request a site assessment <ArrowRight size={14} className="ml-1.5 text-white" />
              </Link>
            </Button>
            <a
              href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20we%20wish%20to%20consult%20on%20facility%20and%20security%20deployment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              <MessageCircle size={14} />
              <span>Direct WhatsApp Inquiry</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
