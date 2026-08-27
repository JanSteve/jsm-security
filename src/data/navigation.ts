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
    title: "Trust Center",
    href: "/trust-center",
    badge: "PSARA",
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    badge: "AIRPORT",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
