import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Business Development Executive Internships (Remote & Field) | JSM Integrated Services",
  description: "Apply for 3–6 month Business Development Executive (BDE) internships at JSM Integrated Services. Remote inside sales and on-ground field merchant acquisition roles in Chennai and Trichy with deal incentives, LOR, and PPO.",
  path: "/careers",
  keywords: [
    "Business Development Intern Chennai",
    "BDE Internship Trichy",
    "Remote Inside Sales Internship Tamil Nadu",
    "Field Sales Intern Chennai Trichy",
    "Unpaid Internship With Commission PPO",
    "B2B Sales Internship Tamil Nadu",
    "JSM Integrated Services Careers"
  ]
});

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
