import { brandData } from "@/data/brand";

export const metadata = {
  title: "Terms of Service | JSM Integrated Services",
  description: "Read the terms and operational conditions governing the use of JSM Integrated Services web platforms and proposals.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl prose prose-zinc">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight leading-tight">Terms of Service</h1>
        <p className="text-zinc-400 text-xs font-semibold mb-8">Official Terms • Registered Domain: {brandData.domain.replace('https://', '')}</p>

        <section className="space-y-6 text-zinc-600 text-base leading-relaxed">
          <p>
            Welcome to the official website of <strong>{brandData.name}</strong> ({brandData.domain.replace('https://', '')}). By accessing our site or submitting assessment requests, you agree to comply with the terms detailed below.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">1. Scope of Commercial Proposals</h2>
          <p>
            All online quotations, assessments, and scope recommendations generated through our website, AI Receptionist, or initial email consultations are estimates subject to formal physical site inspection and execution of a signed Service Level Agreement (SLA).
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">2. Operational Governance & SLAs</h2>
          <p>
            On-site guarding, housekeeping, manpower, and logistics operations are governed by individual client Service Level Agreements defining exact shifts, post orders, replacement commitments, and statutory terms.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">3. Intellectual Property & Brand Protection</h2>
          <p>
            The branding, content, checklists, and operating methodologies published on this website are the intellectual property of {brandData.name}. Unauthorized scraping or reproduction is strictly prohibited.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">4. Governing Jurisdiction</h2>
          <p>
            Any disputes arising from the use of this website or service agreements shall be governed by and construed in accordance with the laws of India, subject to the jurisdiction of courts in Tamil Nadu.
          </p>
        </section>
      </div>
    </main>
  );
}
