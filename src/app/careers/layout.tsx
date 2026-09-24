import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Careers, Recruitment & ESM Enrolment",
  description: "Join JSM Integrated Services. Explore careers for Ex-Servicemen supervisors, security officers, facility marshals, and administrative staff across Tamil Nadu.",
  path: "/careers",
  keywords: [
    "Security Guard Jobs Tamil Nadu",
    "Ex-Servicemen Security Recruitment",
    "Facility Management Careers Trichy Chennai",
    "Security Supervisor Vacancies"
  ]
});

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
