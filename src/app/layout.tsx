import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileDock } from "@/components/layout/mobile-dock";
import CookieBanner from "@/components/shared/cookie-banner";
import { brandData } from "@/data/brand";
import { cn } from "@/lib/utils";

import { Public_Sans, Source_Serif_4 } from "next/font/google";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brandData.domain),
  title: {
    template: `%s | ${brandData.name}`,
    default: `${brandData.name} — 100% EPF & ESIC Compliant Security, Manpower & Facility Operations`,
  },
  description: `${brandData.name} delivers disciplined Private Security, Housekeeping & Facility Management, Contractual Manpower, and Integrated Business Solutions across Tamil Nadu and India.`,
  keywords: [
    "Human Resources Agency Tamil Nadu",
    "Manpower Supply Agency Tamil Nadu",
    "Manpower Agency in Chennai",
    "Manpower Suppliers in Coimbatore",
    "Security Guard Agency in Trichy",
    "Security Services Chennai",
    "Ex-Servicemen Led & DGR Aligned Security Agency Tamil Nadu",
    "Commercial Housekeeping Services Chennai",
    "Industrial Labour Contractors Hosur",
    "Factory Workforce Supplier Salem",
    "Integrated Facility Management Tamil Nadu",
    "Trichy International Airport Operations Contractor",
    "JSMMANPOWER",
    "JSM Integrated Services",
    "DGR Security Agency Tamil Nadu",
    "Ex-Servicemen Security Guard Agency"
  ],
  authors: [{ name: "Sweety J (Proprietor & Managing Director)" }, { name: "JSM Operations Team" }],
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
  verification: {
    google: "QtF7HUSz_UrTPnpL5WByxS66elp-pyZyRMU-5Tes0go",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=4", sizes: "any" },
      { url: "/icon.png?v=4", type: "image/png", sizes: "512x512" },
      { url: "/icon-192.png?v=4", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png?v=4", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=4",
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
          "min-h-screen bg-white font-sans antialiased text-[#14181F] selection:bg-[#0F2A47]/10 selection:text-[#0F2A47]",
          publicSans.variable,
          sourceSerif.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 w-full pb-20 md:pb-0">{children}</main>
            <Footer />
            <MobileDock />
            <CookieBanner />
          </div>
        </Providers>
      </body>
    </html>
  );
}
