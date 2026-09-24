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
    title: "About",
    href: "/about",
  },
  {
    title: "Compliance & DGR",
    href: "/security-agencies",
  },
  {
    title: "Careers",
    href: "/careers",
  },
  {
    title: "Dispatches",
    href: "/newsletter",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
