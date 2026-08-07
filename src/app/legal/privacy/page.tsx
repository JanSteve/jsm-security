export const metadata = {
  title: "Privacy Policy | JSM Security",
  description: "Learn how JSM Security and Integrated Services collects, uses, and secures client data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl prose prose-zinc">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight leading-tight">Privacy Policy</h1>
        <p className="text-zinc-400 text-xs font-semibold mb-8">Last updated: August 2026</p>

        <section className="space-y-6 text-zinc-600 text-base leading-relaxed">
          <p>
            At JSM Security and Integrated Services, we prioritize the confidentiality and safety of our clients' information. This Privacy Policy details our practices concerning data collection, transmission, and protection.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">1. Information Collection</h2>
          <p>
            We collect personal identification details (name, email, phone number, company) when you fill out contact forms or sign up for portal access. Additionally, for operational security details, we may collect licensing and identity verification credentials.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">2. Use of Information</h2>
          <p>
            The information collected is used solely to:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-medium text-zinc-500">
            <li>Coordinate and deploy manned guarding or facilities details.</li>
            <li>Maintain, manage, and optimize your client portal session.</li>
            <li>Send billing invoices, contract updates, and security alert notifications.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">3. Data Security</h2>
          <p>
            All data transmitted through our web services and client portal is protected using 256-bit Secure Socket Layer (SSL) encryption. Security audits are performed quarterly to maintain integrity and prevent unauthorized access.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">4. Your Rights</h2>
          <p>
            Under standard regulations, clients have the right to request access to their data, request deletion, or restrict processing. Contact JSM Corporate Communications at info@jsmsecurity.com to execute these rights.
          </p>
        </section>
      </div>
    </main>
  );
}
