export interface OperationalStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export const operationalCycleSteps: OperationalStep[] = [
  {
    number: '01',
    title: 'Understand',
    subtitle: 'Deep Requirement Mapping',
    description: 'We listen to your specific operational pain points, shift schedules, vulnerability concerns, and service expectations.',
    icon: 'Ear',
    deliverables: ['Client Expectation Mapping', 'Scope of Work Definition', 'Facility Footprint Analysis']
  },
  {
    number: '02',
    title: 'Assess',
    subtitle: 'On-Site Risk & Flow Audit',
    description: 'Our senior operations officer inspects the physical site to analyze access points, traffic flow, blind spots, and utility zones.',
    icon: 'Search',
    deliverables: ['Site Vulnerability Report', 'Manpower Count Recommendation', 'Equipment & Chemical Sizing']
  },
  {
    number: '03',
    title: 'Plan',
    subtitle: 'Standard Operating Procedure Design',
    description: 'We document clear, site-specific standing orders (SOPs), duty schedules, post assignments, and escalation trees.',
    icon: 'FileSpreadsheet',
    deliverables: ['Site-Specific SOP Manual', 'Duty Rosters & Timelines', 'Emergency Contact Escalation Tree']
  },
  {
    number: '04',
    title: 'Deploy',
    subtitle: 'Vetted & Briefed Personnel Placement',
    description: 'Verified, uniformed staff complete site-specific briefing and are placed under the supervision of a lead coordinator.',
    icon: 'UserCheck',
    deliverables: ['Background Verified Staff', 'Standard Uniform & Equipment Handover', 'Pre-Shift Site Orientation']
  },
  {
    number: '05',
    title: 'Monitor',
    subtitle: 'Supervisory Checks & Digital Logs',
    description: 'Field officers conduct regular spot-checks, review physical registers or digital logs, and audit grooming and alertness.',
    icon: 'Eye',
    deliverables: ['Unannounced Supervisory Rounds', 'Daily Handover Registers', 'Weekly Quality Checklists']
  },
  {
    number: '06',
    title: 'Improve',
    subtitle: 'Continuous Operational Optimization',
    description: 'We review client feedback, resolve logged queries, and proactively adjust deployments to enhance service quality.',
    icon: 'TrendingUp',
    deliverables: ['Monthly Performance Reviews', 'SOP Adjustments Based on Experience', 'Staff Skill Refresher Sessions']
  }
];

export interface SOPPipelineStep {
  stage: string;
  title: string;
  description: string;
}

export const sopPipelineSteps: SOPPipelineStep[] = [
  { stage: 'Stage 01', title: 'Requirement Lead', description: 'Initial inquiry captured with exact location and operational scope.' },
  { stage: 'Stage 02', title: 'Site Assessment', description: 'Field inspection of physical premises, access points, and headcount needs.' },
  { stage: 'Stage 03', title: 'Transparent Quote', description: 'Clear breakdown of personnel, consumables, supervision, and statutory terms.' },
  { stage: 'Stage 04', title: 'Service Agreement', description: 'Structured SLA defining service deliverables, shifts, and escalation norms.' },
  { stage: 'Stage 05', title: 'Background Verification', description: 'Police verification support, Aadhaar/address validation, and reference checks.' },
  { stage: 'Stage 06', title: '5-Day Induction Training', description: 'Discipline, post duties, fire safety, first aid, and site-specific training.' },
  { stage: 'Stage 07', title: 'Structured Deployment', description: 'Uniformed personnel stationed with clear post orders and sign-in sheets.' },
  { stage: 'Stage 08', title: 'Shift & Checklist Reporting', description: 'Daily handover logs, hourly hygiene cycles, and supervisor reports.' },
  { stage: 'Stage 09', title: 'Management Review', description: 'Regular site visits by senior operations team to verify standard adherence.' },
  { stage: 'Stage 10', title: 'Continuous Refinement', description: 'Adapting to evolving client operational needs shift by shift.' }
];
