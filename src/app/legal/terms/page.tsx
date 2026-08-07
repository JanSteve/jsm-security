export const metadata = {
  title: "Terms of Service | JSM Security",
  description: "Read the terms and conditions governing the use of JSM Security web applications and services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#0A1128] pt-24 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl prose prose-invert">
        <h1 className="text-4xl font-bold text-[#F8F9FA] mb-6">Terms of Service</h1>
        <p className="text-white/60 text-sm mb-8">Last updated: August 2026</p>

        <section className="space-y-6 text-[#94A3B8] leading-relaxed">
          <p>
            Welcome to the JSM Security and Integrated Services website. By accessing or using our client portal or services, you agree to comply with the terms and conditions detailed below.
          </p>

          <h2 className="text-2xl font-bold text-[#F8F9FA] mt-8">1. License & Portal Access</h2>
          <p>
            Authorized clients are granted a limited, non-exclusive, non-transferable license to access the JSM Enterprise Client Portal for review of contract documentation, invoices, and service dispatch operations. Access credentials must not be shared.
          </p>

          <h2 className="text-2xl font-bold text-[#F8F9FA] mt-8">2. Acceptable Use Policy</h2>
          <p>
            You agree not to utilize the portal or web application to transmit malicious files, bypass security boundaries, or collect data through scraping without prior written authorization from JSM Corporate Communications.
          </p>

          <h2 className="text-2xl font-bold text-[#F8F9FA] mt-8">3. Limitation of Liability</h2>
          <p>
            JSM Security and Integrated Services coordinates security operations to mitigate risk. However, JSM cannot guarantee absolute prevention of all security incidents. Our liability is restricted in accordance with individual Service Level Agreements (SLAs).
          </p>

          <h2 className="text-2xl font-bold text-[#F8F9FA] mt-8">4. Govering Law</h2>
          <p>
            These Terms of Service and any dispute arising from the use of our web application or services are governed by and construed in accordance with the laws of the United Kingdom.
          </p>
        </section>
      </div>
    </main>
  );
}
