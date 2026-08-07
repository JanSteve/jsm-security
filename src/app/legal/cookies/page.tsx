export const metadata = {
  title: "Cookie Policy | JSM Security",
  description: "Read the cookie policy outlining how JSM Security uses cookies to optimize your session.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl prose prose-zinc">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight leading-tight">Cookie Policy</h1>
        <p className="text-zinc-400 text-xs font-semibold mb-8">Last updated: August 2026</p>

        <section className="space-y-6 text-zinc-600 text-base leading-relaxed">
          <p>
            This Cookie Policy explains how JSM Security and Integrated Services uses cookies and similar tracking technologies to optimize your experience on our website and client portal.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">1. What are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you load web pages. They help remember configuration states, portal login sessions, and track traffic analysis.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">2. How JSM Uses Cookies</h2>
          <p>
            We use cookies to:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-medium text-zinc-500">
            <li>Keep you signed into the enterprise client portal (Session Cookies).</li>
            <li>Remember UI preferences like dark/light mode settings.</li>
            <li>Analyze web performance metrics to improve load speeds.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-8 tracking-tight">3. Managing Cookie Consent</h2>
          <p>
            You can modify your consent settings at any time using our bottom consent banner, or through your browser settings by blocking or deleting cookies. Note that disabling essential session cookies will prevent access to portal dashboard functions.
          </p>
        </section>
      </div>
    </main>
  );
}
