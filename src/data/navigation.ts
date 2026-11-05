export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export const navigationData: NavItem[] = [
  {
    title: "Services",
    href: "/#services",
  },
  {
    title: "How It Works",
    href: "/#how-it-works",
  },
  {
    title: "Role Bands",
    href: "/#role-bands",
  },
  {
    title: "Fee Model",
    href: "/#fee-model",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
];
