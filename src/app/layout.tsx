import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileDock } from "@/components/layout/mobile-dock";
import CookieBanner from "@/components/shared/cookie-banner";
import { TimedPopup } from "@/components/shared/timed-popup";
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
  title: {
    template: "%s | JSM Security",
    default: "JSM Security | Premium Corporate Security & Integrated Services",
  },
  description: "Secure. Integrated. Elevated. Premium corporate security and integrated facility services tailored for modern enterprises.",
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
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          plusJakartaSans.variable,
          "pb-16 md:pb-0" // padding for mobile dock
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <MobileDock />
            <CookieBanner />
            <TimedPopup />
          </div>
        </Providers>
      </body>
    </html>
  );
}
