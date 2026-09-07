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
    title: "Industries",
    href: "/industries",
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
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

