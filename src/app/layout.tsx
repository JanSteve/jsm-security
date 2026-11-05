import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { brandData } from "@/data/brand";
import { getUnifiedKnowledgeGraph } from "@/lib/schema";
import { cn } from "@/lib/utils";

import { Fraunces, Inter } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "500",
  style: "normal",
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: "normal",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brandData.domain),
  title: {
    template: `%s | JSM Integrated Services`,
    default: `JSM Integrated Services | Executive Recruitment & Leadership Talent Acquisition`,
  },
  description: `Executive recruitment and senior contingency talent acquisition across Tamil Nadu, Karnataka, Maharashtra, Delhi, Madhya Pradesh, and Gujarat. ₹12 LPA to ₹1 Cr leadership roles on a 100% success-based fee model.`,
  keywords: [
    "JSM Integrated Services",
    "Executive Recruitment India",
    "Senior Talent Acquisition",
    "Executive Search Tamil Nadu",
    "Leadership Hiring Karnataka",
    "Executive Search Maharashtra",
    "Leadership Recruitment Delhi",
    "Executive Staffing Gujarat",
    "Senior Hiring Madhya Pradesh",
    "Contingency Recruitment Fee Model"
  ],
  authors: [
    { name: "JSM Integrated Services Executive Search Desk" }
  ],
  creator: brandData.name,
  publisher: brandData.name,
  openGraph: {
    title: `JSM Integrated Services | Executive Recruitment & Senior Talent Acquisition`,
    description: `Connecting employers hiring ₹12 LPA to ₹1 Cr roles with verified senior talent across 6 states on a 100% success-based fee model.`,
    url: brandData.domain,
    siteName: brandData.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${brandData.domain}/images/jsm_logo_black.png`,
        width: 1200,
        height: 630,
        alt: "JSM Integrated Services - Executive Recruitment & Talent Acquisition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `JSM Integrated Services | Executive Recruitment & Senior Talent Acquisition`,
    description: `Connecting employers hiring ₹12 LPA to ₹1 Cr roles with verified senior talent across 6 states on a 100% success-based fee model.`,
    site: "@jsmintegrated",
    creator: "@jsmintegrated",
    images: [`${brandData.domain}/images/jsm_logo_black.png`],
  },
  alternates: {
    canonical: brandData.domain,
    types: {
      'application/rss+xml': `${brandData.domain}/feed.xml`,
    },
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
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        {/* RSS 2.0 Feed Autodiscovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="JSM Integrated Services Blog RSS Feed"
          href="/feed.xml"
        />
        {/* Authoritative Global Schema.org Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalKnowledgeGraph) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-[#F6F3EE] font-body text-[#0E1116] antialiased selection:bg-[#C8553D]/20 selection:text-[#0E1116] overflow-x-hidden max-w-full",
          fraunces.variable,
          inter.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden w-full max-w-full">
            <Header />
            <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
