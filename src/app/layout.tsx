import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileDock } from "@/components/layout/mobile-dock";
import CookieBanner from "@/components/shared/cookie-banner";
import { AIReceptionist } from "@/components/chat/ai-receptionist";
import { brandData } from "@/data/brand";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brandData.domain),
  title: {
    template: `%s | ${brandData.name}`,
    default: `${brandData.name} | ${brandData.tagline}`,
  },
  description: `${brandData.name} delivers disciplined Private Security, Housekeeping & Facility Management, Contractual Manpower, and Integrated Business Solutions across Tamil Nadu and India.`,
  keywords: [
    "JSM Integrated Services",
    "JSMMANPOWER",
    "Integrated Facility Management Tamil Nadu",
    "Security Services Trichy",
    "Security Guard Agency Chennai",
    "Manpower Supply Agency Coimbatore",
    "Housekeeping Services Madurai",
    "Contractual Staffing Tamil Nadu",
    "Trichy Airport Security Contractor",
    "One Partner Every Solution"
  ],
  authors: [{ name: "Sweety R (Managing Director)" }, { name: "JSM Operations Team" }],
  creator: brandData.name,
  publisher: brandData.name,
  openGraph: {
    title: `${brandData.name} | ${brandData.tagline}`,
    description: brandData.subTagline,
    url: brandData.domain,
    siteName: brandData.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandData.name} | ${brandData.tagline}`,
    description: brandData.subTagline,
  },
  alternates: {
    canonical: brandData.domain,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased text-zinc-900 selection:bg-[#C5A880]/30 selection:text-black",
          inter.variable,
          plusJakartaSans.variable,
          "pb-16 md:pb-0"
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <MobileDock />
            <CookieBanner />
            <AIReceptionist />
          </div>
        </Providers>
      </body>
    </html>
  );
}
