import { brandData } from "@/data/brand";

export const metadata = {
  title: "Cookie Policy | JSM Integrated Services",
  description: "Read the cookie policy outlining how JSM Integrated Services optimizes your browsing and form sessions.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl prose prose-zinc">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight leading-tight">Cookie Policy</h1>
        <p className="text-zinc-400 text-xs font-semibold mb-8">Official Policy • Registered Domain: {brandData.domain.replace('https://', '')}</p>

        <section className="space-y-6 text-zinc-600 text-base leading-relaxed">
          <p>
            This Cookie Policy explains how <strong>{brandData.name}</strong> uses essential cookies and local storage tokens to optimize your browsing experience, remember form progress, and ensure secure interactions on {brandData.domain.replace('https://', '')}.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">1. What are Cookies?</h2>
          <p>
            Cookies and local storage tokens are lightweight data elements stored on your device that allow our web application to recognize your session and retain user preferences.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">2. How JSM Uses Session Storage</h2>
          <p>
            We use storage tokens to:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-medium text-zinc-600">
            <li>Remember cookie banner consent status.</li>
            <li>Retain conversational context within the 24/7 AI Receptionist widget during your active session.</li>
            <li>Optimize site rendering speed and prevent repetitive popups.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">3. Managing Preferences</h2>
          <p>
            You can clear your local browser storage or modify cookie settings directly in your browser preferences at any time.
          </p>
        </section>
      </div>
    </main>
  );
}
