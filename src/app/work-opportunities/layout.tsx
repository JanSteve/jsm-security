import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Field Deployment & Work Opportunities",
  description: "Browse open field deployments for security personnel, housekeeping supervisors, and industrial manpower across Tamil Nadu districts.",
  path: "/work-opportunities",
});

export default function WorkOpportunitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
