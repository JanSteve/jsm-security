export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export const navigationData: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Client Portal",
    href: "/portal",
    badge: "LIVE DEMO",
  },
  {
    title: "Risk Audit",
    href: "/vulnerability-audit",
    badge: "DIAGNOSTIC",
  },
  {
    title: "RFP Builder",
    href: "/rfp-generator",
    badge: "TENDER",
  },
  {
    title: "Verify Badge",
    href: "/verify",
    badge: "TRUST",
  },
  {
    title: "Trust Center",
    href: "/trust-center",
    badge: "PSARA",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
