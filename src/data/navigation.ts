export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export const navigationData: NavItem[] = [
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Airport Operations",
    href: "/case-studies/trichy-international-airport",
    badge: "AAI Client",
  },
  {
    title: "Leadership & About",
    href: "/about",
  },
  {
    title: "Contact & Quote",
    href: "/contact",
  },
];

