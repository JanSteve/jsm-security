export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export const navigationData: NavItem[] = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Security Agencies",
    href: "/security-agencies",
    badge: "DGR",
  },
  {
    title: "Careers",
    href: "/careers",
  },
  {
    title: "Work Opportunities",
    href: "/work-opportunities",
    badge: "Jobs",
  },
  {
    title: "Newsletter",
    href: "/newsletter",
  },
  {
    title: "What's New",
    href: "/whats-new",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

