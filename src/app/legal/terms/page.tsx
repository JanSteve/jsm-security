export const metadata = {
  title: "Terms of Service | JSM Security",
  description: "Read the terms and conditions governing the use of JSM Security web applications and services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl prose prose-zinc">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight leading-tight">Terms of Service</h1>
        <p className="text-zinc-400 text-xs font-semibold mb-8">Last updated: August 2026</p>

        <section className="space-y-6 text-zinc-600 text-base leading-relaxed">
          <p>
            Welcome to the JSM Security and Integrated Services website. By accessing or using our client portal or services, you agree to comply with the terms and conditions detailed below.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">1. License & Portal Access</h2>
          <p>
            Authorized clients are granted a limited, non-exclusive, non-transferable license to access the JSM Enterprise Client Portal for review of contract documentation, invoices, and service dispatch operations. Access credentials must not be shared.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">2. Acceptable Use Policy</h2>
          <p>
            You agree not to utilize the portal or web application to transmit malicious files, bypass security boundaries, or collect data through scraping without prior written authorization from JSM Corporate Communications.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">3. Limitation of Liability</h2>
          <p>
            JSM Security and Integrated Services coordinates security operations to mitigate risk. However, JSM cannot guarantee absolute prevention of all security incidents. Our liability is restricted in accordance with individual Service Level Agreements (SLAs).
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">4. Governing Law</h2>
          <p>
            These Terms of Service and any dispute arising from the use of our web application or services are governed by and construed in accordance with the laws of the United Kingdom.
          </p>
        </section>
      </div>
    </main>
  );
}
