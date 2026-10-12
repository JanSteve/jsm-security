import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileDock } from "@/components/layout/mobile-dock";
import CookieBanner from "@/components/shared/cookie-banner";
import { brandData } from "@/data/brand";
import { getUnifiedKnowledgeGraph } from "@/lib/schema";
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
    template: `%s | JSM Integrated Services`,
    default: `JSM | JSM Integrated Services | Ex-Servicemen Security, Manpower & Facility Operations`,
  },
  description: `${brandData.name} (formerly JSMMANPOWER) delivers disciplined Private Security, Housekeeping & Facility Management, Contractual Manpower Staffing, and Integrated Business Solutions across Tamil Nadu.`,
  keywords: [
    "JSM",
    "JSM Integrated Services",
    "JSM Security",
    "JSM Manpower",
    "JSMMANPOWER",
    "JSM Security Services",
    "JSM Security Trichy",
    "Security Guard Agency in Trichy",
    "Security Services Chennai",
    "Manpower Supply Agency Tamil Nadu",
    "Manpower Agency in Chennai",
    "Manpower Suppliers in Coimbatore",
    "Industrial Labour Contractors Hosur",
    "Factory Workforce Supplier Salem",
    "Commercial Housekeeping Services Chennai",
    "Integrated Facility Management Tamil Nadu",
    "Trichy International Airport Operations Contractor",
    "Ex-Servicemen Security Guard Agency"
  ],
  authors: [
    { name: "Sweety J (Proprietor & Managing Director)" },
    { name: "Major AR Devadoss (Head of Operations)" },
    { name: "R Jan Steve Daniel (CTO)" }
  ],
  creator: brandData.name,
  publisher: brandData.name,
  openGraph: {
    title: `JSM Integrated Services | ${brandData.tagline}`,
    description: brandData.subTagline,
    url: brandData.domain,
    siteName: brandData.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${brandData.domain}/images/jsm_logo_black.png`,
        width: 1200,
        height: 630,
        alt: "JSM Integrated Services - Security Guarding & Manpower Staffing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `JSM Integrated Services | ${brandData.tagline}`,
    description: brandData.subTagline,
    site: "@jsmintegrated",
    creator: "@jsmintegrated",
    images: [`${brandData.domain}/images/jsm_logo_black.png`],
  },
  alternates: {
    canonical: brandData.domain,
  },
  verification: {
    google: "QtF7HUSz_UrTPnpL5WByxS66elp-pyZyRMU-5Tes0go",
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Tiruchirappalli, Tamil Nadu, India",
    "geo.position": "10.7905;78.7047",
    "ICBM": "10.7905, 78.7047",
    "business:contact_data:locality": "Tiruchirappalli",
    "business:contact_data:region": "Tamil Nadu",
    "business:contact_data:postal_code": "620021",
    "business:contact_data:country_name": "India",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
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
  const globalKnowledgeGraph = getUnifiedKnowledgeGraph();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Authoritative Global Schema.org Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalKnowledgeGraph) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-black font-sans antialiased text-white selection:bg-white/20 selection:text-white",
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
