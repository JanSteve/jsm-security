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
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
