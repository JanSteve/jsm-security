import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Request a Proposal",
  description: "Generate an instant commercial proposal for security, housekeeping, and facility management services across Tamil Nadu.",
  path: "/get-quote",
});

export default function GetQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
