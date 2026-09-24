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
    title: "Locations",
    href: "/locations",
  },
  {
    title: "Knowledge Hub",
    href: "/knowledge",
  },
  {
    title: "Compliance & DGR",
    href: "/security-agencies",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Careers",
    href: "/careers",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
