import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Operations Dispatches & Compliance Updates",
  description: "Subscribe to monthly operational dispatches, statutory compliance briefs, and security updates from JSM Integrated Services leadership.",
  path: "/newsletter",
});

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
