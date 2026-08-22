export interface ServiceCommitment {
  id: string;
  pillar: string;
  statement: string;
  context: string;
}

export const clientExperienceCommitments: ServiceCommitment[] = [
  {
    id: 'c1',
    pillar: 'Civil Aviation & Public Transit Standards',
    statement: 'Proven high-density crowd screening and gate vigilance forged during our landmark 2024 Trichy International Airport operations contract.',
    context: 'Aviation Infrastructure & Public Transit Hubs'
  },
  {
    id: 'c2',
    pillar: 'Industrial Gate-Pass & Material Vigilance',
    statement: 'Zero inventory shrinkage at factory gates through dual gate passes, physical worker baggage inspections, and 2:00 AM unannounced supervisory rounds.',
    context: 'Factories, Warehouses & Manufacturing Plants'
  },
  {
    id: 'c3',
    pillar: 'Hospitality-Focused Society & Office Security',
    statement: 'Polite, respectful visitor verification and digital pass logging that keeps residents and corporate tenants safe without causing friction.',
    context: 'Residential Societies & Corporate IT Parks'
  },
  {
    id: 'c4',
    pillar: '5-Step Closed-Loop Hygiene Operations',
    statement: 'Documented hourly restroom inspection logs and structured sanitization checklists: Clean → Inspect → Report → Correct → Verify.',
    context: 'Commercial Facilities & Healthcare Campuses'
  }
];

// Fallback empty array for testimonials until genuine client reviews are uploaded
export const testimonials: any[] = [];
