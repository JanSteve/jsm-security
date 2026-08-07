export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Alexander Sterling',
    role: 'Chief Executive Officer',
    company: 'Apex Global Logistics',
    quote: 'JSM Security transformed our approach to asset protection. Their seamless integration of highly-trained personnel and advanced CCTV AI reduced our security incidents to zero within the first quarter.',
    rating: 5,
    avatar: '/images/testimonials/avatar-1.jpg'
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    role: 'Director of Operations',
    company: 'Lumiere Fine Arts',
    quote: 'When securing multi-million dollar exhibitions, there is no margin for error. JSM\'s operatives are not only incredibly vigilant but also blend perfectly into the luxury environment of our galleries.',
    rating: 5,
    avatar: '/images/testimonials/avatar-2.jpg'
  },
  {
    id: 't3',
    name: 'Marcus Thorne',
    role: 'Head of Global Events',
    company: 'TechFrontier Summit',
    quote: 'Managing a conference with 15,000 attendees requires precision. The JSM event security and crowd management teams handled everything flawlessly, from VIP escorts to entry logistics.',
    rating: 5,
    avatar: '/images/testimonials/avatar-3.jpg'
  },
  {
    id: 't4',
    name: 'Elena Rostova',
    role: 'Estate Manager',
    company: 'The Sovereign Residences',
    quote: 'JSM\'s concierge security approach is unmatched. Our residents feel incredibly safe, yet the security presence is welcoming and deeply professional. They truly understand luxury real estate.',
    rating: 4,
    avatar: '/images/testimonials/avatar-4.jpg'
  },
  {
    id: 't5',
    name: 'David Chen',
    role: 'Chief Technology Officer',
    company: 'Nexus Financial Systems',
    quote: 'The custom software solution JSM developed for our access control was a game-changer. It bridged our legacy hardware with a modern, zero-trust cloud architecture seamlessly.',
    rating: 5,
    avatar: '/images/testimonials/avatar-5.jpg'
  },
  {
    id: 't6',
    name: 'Victoria Hughes',
    role: 'Event Designer',
    company: 'Vanguard Luxury Weddings',
    quote: 'Working with JSM on high-profile celebrity weddings gives me total peace of mind. Their discreet close protection ensures the couple and guests can celebrate without intrusion.',
    rating: 5,
    avatar: '/images/testimonials/avatar-6.jpg'
  },
  {
    id: 't7',
    name: 'Robert Vance',
    role: 'Facilities Director',
    company: 'Meridian Corporate Park',
    quote: 'We engaged JSM for both manpower and housekeeping. Having a single, reliable vendor for vetted staff and facility maintenance has massively streamlined our operational overhead.',
    rating: 4,
    avatar: '/images/testimonials/avatar-7.jpg'
  },
  {
    id: 't8',
    name: 'Jameson Locke',
    role: 'VP of Security',
    company: 'Ironclad Asset Management',
    quote: 'The tactical proficiency of JSM\'s Cash-in-Transit teams is unparalleled. Their dynamic routing and continuous command center oversight provide absolute assurance for our high-value transfers.',
    rating: 5,
    avatar: '/images/testimonials/avatar-8.jpg'
  }
];
