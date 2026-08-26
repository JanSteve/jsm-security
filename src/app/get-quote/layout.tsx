import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Instant Quote | JSM Integrated Services",
  description: "Generate an instant commercial proposal for security, housekeeping, and facility management services.",
};

export default function GetQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
