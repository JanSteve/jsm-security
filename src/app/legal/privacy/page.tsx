import { brandData } from "@/data/brand";

export const metadata = {
  title: "Privacy Policy | JSM Integrated Services",
  description: "Learn how JSM Integrated Services collects, uses, and secures client data in accordance with applicable Indian regulations.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl prose prose-zinc">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight leading-tight">Privacy Policy</h1>
        <p className="text-zinc-400 text-xs font-semibold mb-8">Official Policy • Registered Domain: {brandData.domain.replace('https://', '')}</p>

        <section className="space-y-6 text-zinc-600 text-base leading-relaxed">
          <p>
            At <strong>{brandData.name}</strong>, we prioritize the confidentiality, integrity, and safety of our clients' and employees' information. This Privacy Policy details our practices concerning data collection, transmission, and operational privacy.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">1. Information We Collect</h2>
          <p>
            We collect contact and operational requirement details (such as full name, business email, property address, and workforce headcount) when you submit inquiries, request site assessments, apply for job positions, or engage our AI Receptionist. Additionally, for operational deployment, candidate background verification documents (Aadhaar, address proof, police verification records) are collected with strict consent.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">2. Use of Information</h2>
          <p>
            The information collected is used solely to:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-medium text-zinc-600">
            <li>Coordinate and deploy on-site private security, housekeeping, or manpower teams.</li>
            <li>Conduct on-site vulnerability audits and submit custom commercial proposals.</li>
            <li>Process candidate employment applications and background verification checks.</li>
            <li>Send billing invoices, shift rosters, and service review documentation.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">3. Data Confidentiality & Non-Disclosure</h2>
          <p>
            We strictly treat all client site layouts, visitor logs, and operational specifications as confidential information. We do not sell, rent, or trade client or candidate data to third-party marketing entities.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">4. Contact & Inquiries</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to update your records, please contact our administrative desk at <strong>{brandData.contact.email}</strong>.
          </p>
        </section>
      </div>
    </main>
  );
}
