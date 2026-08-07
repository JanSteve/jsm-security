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
    role: 'Airport Operations Director',
    company: 'Southern Aviation Group (Trichy Transit Hub)',
    quote: 'JSM Security transformed our approach to terminal passenger flow safety. Their specialized aviation security protocols and seamless baggage screening coordination match civil aviation requirements perfectly.',
    rating: 5,
    avatar: '/images/testimonials/avatar-1.jpg'
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    role: 'Chief Security Officer',
    company: 'Canary Wharf Financial Tower',
    quote: 'Securing our banking corporate headquarters in London is highly demanding. JSM\'s professional close guarding and manned patrol details are vigilant, disciplined, and represent our brand with absolute premium poise.',
    rating: 5,
    avatar: '/images/testimonials/avatar-2.jpg'
  },
  {
    id: 't3',
    name: 'David Chen',
    role: 'Infrastructure Director',
    company: 'Sovereign Data Solutions',
    quote: 'We engaged JSM to secure and manage facilities across our critical hosting sites. Their zero-trust access control integrations and active CCTV remote room oversight have kept our infrastructure fully compliant.',
    rating: 5,
    avatar: '/images/testimonials/avatar-3.jpg'
  },
  {
    id: 't4',
    name: 'Elena Rostova',
    role: 'Director of Executive Protection',
    company: 'Sovereign Capital Partners',
    quote: 'For international close protection operations, JSM is our exclusive partner. Their elite, discreet close-protection agents deliver absolute safety with total professionalism during high-priority executive travel.',
    rating: 5,
    avatar: '/images/testimonials/avatar-4.jpg'
  }
];
