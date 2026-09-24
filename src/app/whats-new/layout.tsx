import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Field Bulletins & Operational Notices",
  description: "Official operational announcements, district deployment expansions, and statutory updates from JSM Integrated Services.",
  path: "/whats-new",
});

export default function WhatsNewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
