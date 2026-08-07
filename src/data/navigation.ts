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
        href: "/services",
        children: [
          {
            title: "Private Security",
            href: "/services/private-security",
            description: "Elite personal and corporate security details.",
            icon: "Shield",
          },
          {
            title: "CCTV Monitoring",
            href: "/services/cctv-monitoring",
            description: "24/7 proactive remote monitoring.",
            icon: "Camera",
          },
          {
            title: "Cash-in-Transit",
            href: "/services/cash-in-transit",
            description: "Secure cash logistics and transit details.",
            icon: "Lock",
          },
          {
            title: "Risk Assessment",
            href: "/services/risk-assessment",
            description: "Comprehensive audits and risk profiling.",
            icon: "Key",
          },
          {
            title: "Manpower Solutions",
            href: "/services/manpower",
            description: "Elite security recruitment and vetting.",
            icon: "Users",
          },
        ],
      },
      {
        title: "Facilities",
        href: "/services",
        children: [
          {
            title: "Housekeeping",
            href: "/services/housekeeping",
            description: "Commercial cleaning and workspace hygiene.",
            icon: "Sparkles",
          },
        ],
      },
      {
        title: "Digital & Creative",
        href: "/services",
        children: [
          {
            title: "Software Solutions",
            href: "/services/software-solutions",
            description: "Tailored portal and API web applications.",
            icon: "Monitor",
          },
          {
            title: "Creative Media",
            href: "/services/creative-media",
            description: "Enterprise branding and design services.",
            icon: "Palette",
          },
        ],
      },
      {
        title: "Events & Property",
        href: "/services",
        children: [
          {
            title: "Event Security",
            href: "/services/event-security",
            description: "Crowd logistics and event perimeter protection.",
            icon: "ShieldAlert",
          },
          {
            title: "Event Management",
            href: "/services/event-management",
            description: "Full-scale corporate event planning.",
            icon: "Clock",
          },
          {
            title: "Wedding Planning",
            href: "/services/wedding-planning",
            description: "Premium end-to-end wedding details.",
            icon: "Sparkles",
          },
          {
            title: "Real Estate",
            href: "/services/real-estate",
            description: "Commercial property operations and management.",
            icon: "Building",
          },
          {
            title: "Auction Houses",
            href: "/services/auction-houses",
            description: "White-glove fine art and asset transport.",
            icon: "Trophy",
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
    href: "/blog",
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
