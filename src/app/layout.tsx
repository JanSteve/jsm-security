import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileDock } from "@/components/layout/mobile-dock";
import CookieBanner from "@/components/shared/cookie-banner";
import { AIReceptionist } from "@/components/chat/ai-receptionist";
import { EmergencyReliefModal } from "@/components/ui/emergency-relief-modal";
import { Analytics } from "@vercel/analytics/react";
import { brandData } from "@/data/brand";
import { cn } from "@/lib/utils";

import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
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
    "Human Resources Agency Tamil Nadu",
    "Manpower Supply Agency Tamil Nadu",
    "Manpower Agency in Chennai",
    "Manpower Suppliers in Coimbatore",
    "Security Guard Agency in Trichy",
    "Security Services Chennai",
    "PSARA Licensed Security Agency Tamil Nadu",
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
      <head>
        <link rel="icon" href="/favicon.ico?v=4" sizes="any" />
        <link rel="icon" href="/icon.png?v=4" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=4" sizes="180x180" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased text-[#14181A] selection:bg-[#0B3D2E]/15 selection:text-black",
          inter.variable,
          displayFont.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <CookieBanner />
          </div>
        </Providers>
      </body>
    </html>
  );
}
