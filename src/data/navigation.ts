export interface NavSubItem {
  title: string;
  href: string;
  description: string;
  badge?: string;
  icon?: string;
}

export interface NavCategory {
  title: string;
  items: NavSubItem[];
}

export interface NavItem {
  title: string;
  href: string;
  isMega?: boolean;
  categories?: NavCategory[];
  children?: { title: string; href: string; description?: string }[];
}

export const navigationData: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
    isMega: true,
    categories: [
      {
        title: "Core Operations (Phase 1)",
        items: [
          {
            title: "Private Security",
            href: "/services/private-security",
            description: "Disciplined guarding, gate management & night patrolling.",
            icon: "Shield"
          },
          {
            title: "Housekeeping & Facility",
            href: "/services/housekeeping",
            description: "Checklist-driven commercial cleaning & hygiene cycles.",
            icon: "Sparkles"
          },
          {
            title: "Manpower & Staffing",
            href: "/services/manpower",
            description: "Skilled, semi-skilled & industrial workforce supply.",
            icon: "Users"
          },
          {
            title: "Cash-in-Transit",
            href: "/services/cash-in-transit",
            description: "Two-person custody transfers & retail cash pickups.",
            icon: "Banknote"
          }
        ]
      },
      {
        title: "Integrated Business Support (Phase 2)",
        items: [
          {
            title: "Events & Weddings",
            href: "/services/event-support",
            description: "Crowd management, VIP handling & wedding coordination.",
            icon: "Ticket"
          },
          {
            title: "Real Estate & Auctions",
            href: "/services/real-estate-support",
            description: "Site material guarding & auction bidder verification.",
            icon: "Building"
          },
          {
            title: "Software & Web Solutions",
            href: "/services/software-solutions",
            description: "Business websites, visitor portals & lead automation.",
            icon: "Monitor"
          },
          {
            title: "Creative Media",
            href: "/services/creative-media",
            description: "Corporate videography, facility shoots & branding.",
            icon: "Palette"
          }
        ]
      }
    ]
  },
  {
    title: "Industries",
    href: "/industries",
    children: [
      { title: "Residential Societies", href: "/industries/residential-societies", description: "Apartment gate vigilance & common area hygiene." },
      { title: "Corporate Offices & IT", href: "/industries/corporate-offices", description: "Front-desk security & workspace sanitization." },
      { title: "Factories & Industrial", href: "/industries/factories-manufacturing", description: "Material gate-pass control & industrial labor." },
      { title: "Warehouses & Logistics", href: "/industries/warehouses-logistics", description: "Dock security & freight handling manpower." },
      { title: "Hospitals & Healthcare", href: "/industries/hospitals-healthcare", description: "Emergency crowd control & medical bio-cleaning." },
      { title: "View All 12 Industries", href: "/industries", description: "Explore sector-specific integrated solutions." }
    ]
  },
  {
    title: "Trust Center",
    href: "/trust-center",
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
    title: "Case Studies",
    href: "/case-studies",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/contact",
  }
];
