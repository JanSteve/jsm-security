export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  children?: NavItem[];
}

export const navigationData: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "Security",
        href: "/services/security",
        children: [
          {
            title: "Manned Guarding",
            href: "/services/security/manned-guarding",
            description: "Professional security personnel for your premises.",
            icon: "Shield",
          },
          {
            title: "CCTV Surveillance",
            href: "/services/security/cctv",
            description: "24/7 monitoring and recording systems.",
            icon: "Camera",
          },
          {
            title: "Access Control",
            href: "/services/security/access-control",
            description: "Manage who enters your facilities.",
            icon: "Key",
          },
          {
            title: "Cybersecurity",
            href: "/services/security/cybersecurity",
            description: "Protect your digital assets and infrastructure.",
            icon: "Lock",
          },
        ],
      },
      {
        title: "Facilities",
        href: "/services/facilities",
        children: [
          {
            title: "Cleaning Services",
            href: "/services/facilities/cleaning",
            description: "Commercial cleaning and hygiene solutions.",
            icon: "Sparkles",
          },
          {
            title: "Maintenance",
            href: "/services/facilities/maintenance",
            description: "Preventative and reactive property maintenance.",
            icon: "Wrench",
          },
          {
            title: "Waste Management",
            href: "/services/facilities/waste",
            description: "Sustainable waste disposal and recycling.",
            icon: "Trash2",
          },
        ],
      },
      {
        title: "Digital & Creative",
        href: "/services/digital-creative",
        children: [
          {
            title: "Web Development",
            href: "/services/digital-creative/web",
            description: "Custom websites and applications.",
            icon: "Monitor",
          },
          {
            title: "Branding",
            href: "/services/digital-creative/branding",
            description: "Corporate identity and brand strategy.",
            icon: "Palette",
          },
          {
            title: "Digital Marketing",
            href: "/services/digital-creative/marketing",
            description: "SEO, PPC, and social media management.",
            icon: "TrendingUp",
          },
        ],
      },
      {
        title: "Events & Property",
        href: "/services/events-property",
        children: [
          {
            title: "Event Security",
            href: "/services/events-property/event-security",
            description: "Crowd control and VIP protection.",
            icon: "Users",
          },
          {
            title: "Property Management",
            href: "/services/events-property/management",
            description: "Comprehensive real estate management.",
            icon: "Building",
          },
          {
            title: "Concierge Services",
            href: "/services/events-property/concierge",
            description: "Premium front-of-house services.",
            icon: "ConciergeBell",
          },
        ],
      },
    ],
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Insights",
    href: "/insights",
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
