export interface CareerRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  whatWeOffer: string[];
}

export interface InductionDay {
  day: string;
  title: string;
  focus: string;
  details: string[];
}

export const inductionPhilosophy: InductionDay[] = [
  {
    day: 'Day 01',
    title: 'Values, Grooming & Discipline',
    focus: 'Understanding the JSM standard of professional conduct.',
    details: [
      'Company mission, integrity, and client confidentiality standards.',
      'Uniform etiquette, turn-out inspection, and personal grooming codes.',
      'Punctuality norms and shift attendance accountability.'
    ]
  },
  {
    day: 'Day 02',
    title: 'Post Duties & Visitor Logging',
    focus: 'Mastering gatekeeping, access control, and documentation.',
    details: [
      'Visitor register documentation and delivery vehicle inspection.',
      'Material inward/outward gate-pass verification.',
      'Courteous telephone etiquette and visitor greeting standards.'
    ]
  },
  {
    day: 'Day 03',
    title: 'Fire Safety, First Aid & Emergencies',
    focus: 'Equipping staff to handle unexpected premises incidents.',
    details: [
      'Operating fire extinguishers (PASS method) and emergency exit routes.',
      'Basic first aid response and casualty guidance.',
      'Emergency reporting and escalation communication protocol.'
    ]
  },
  {
    day: 'Day 04',
    title: 'Client-Specific SOP & Checklists',
    focus: 'Aligning with the specific environment of deployment.',
    details: [
      'Understanding specific rules for corporate, residential, or industrial premises.',
      'Checklist execution for housekeeping hygiene cycles.',
      'Handling perimeter patrol schedules and clocking points.'
    ]
  },
  {
    day: 'Day 05',
    title: 'Supervised Field Shadowing',
    focus: 'Practical on-site training under an experienced supervisor.',
    details: [
      'Full-shift shadowing with a senior field officer.',
      'Practical shift handover demonstration and logbook entries.',
      'Final assessment and deployment sign-off.'
    ]
  }
];

export const careerProgressionSteps = [
  { rank: 'Step 01', title: 'Security Guard / Facility Staff', timeline: '0 - 12 Months', desc: 'Mastering post duties, attendance reliability, and disciplined checklist execution.' },
  { rank: 'Step 02', title: 'Senior Guard / Shift Lead', timeline: '12 - 24 Months', desc: 'Guiding junior staff, managing shift roll-calls, and resolving routine client queries.' },
  { rank: 'Step 03', title: 'Field Supervisory Officer', timeline: '2 - 3 Years', desc: 'Conducting surprise site checks, training recruits, and auditing daily logbooks across multiple sites.' },
  { rank: 'Step 04', title: 'Operations Coordinator', timeline: '3 - 5 Years', desc: 'Direct client liaison, roster management, emergency mobilization, and service SLA audits.' },
  { rank: 'Step 05', title: 'Regional Operations Manager', timeline: '5+ Years', desc: 'Leading district operations, regional compliance, team leadership, and multi-vertical growth.' }
];

export const openRoles: CareerRole[] = [
  {
    id: 'sec-guard-trichy',
    title: 'Security Guard / Gate Officer',
    department: 'Security Operations',
    location: 'Trichy, Chennai & Coimbatore (Tamil Nadu)',
    type: 'Full-Time / Shifts',
    experience: 'Fresher to 2 Years',
    description: 'We are hiring disciplined, alert security guards for corporate offices, residential communities, and industrial facilities. Full uniform, 5-day induction training, and on-time salary provided.',
    responsibilities: [
      'Maintain alert entry and exit gate surveillance.',
      'Record visitor details and verify vehicle passes accurately.',
      'Conduct perimeter patrolling rounds during assigned shifts.',
      'Coordinate with field supervisors during daily shift handovers.'
    ],
    requirements: [
      'Minimum age 21 years with good physical fitness.',
      'Clear background record with Aadhaar and address verification.',
      'Basic reading and writing ability (Tamil/English).',
      'Disciplined attitude and commitment to shift punctuality.'
    ],
    whatWeOffer: [
      'Guaranteed on-time monthly salary disbursement.',
      'Complete company-provided uniform and safety equipment.',
      '5-Day structured induction training with certification.',
      'Clear promotion pathways to Senior Guard and Supervisor.'
    ]
  },
  {
    id: 'hk-supervisor-tn',
    title: 'Housekeeping & Facility Supervisor',
    department: 'Facility Management',
    location: 'Trichy & Chennai (Tamil Nadu)',
    type: 'Full-Time',
    experience: '1 to 3 Years in Facility/Cleaning Supervision',
    description: 'Seeking an experienced housekeeping supervisor to manage cleaning crews, verify hourly restroom inspection checklists, and coordinate with corporate facility managers.',
    responsibilities: [
      'Oversee daily cleaning teams across commercial or residential client sites.',
      'Inspect hygiene quality against checklists: Clean → Inspect → Report → Correct → Verify.',
      'Manage cleaning consumable inventory and equipment maintenance.',
      'Coordinate shift attendance and arrange timely staff replacements.'
    ],
    requirements: [
      'Prior experience supervising commercial housekeeping or facility operations.',
      'Working knowledge of cleaning chemicals, scrubbing machines, and safety norms.',
      'Good communication skills in Tamil and basic English.',
      'Strong leadership and problem-solving mindset.'
    ],
    whatWeOffer: [
      'Competitive monthly remuneration + travel allowances.',
      'Growth opportunities into Area Operations Coordinator.',
      'Respectful, supportive management culture.'
    ]
  },
  {
    id: 'field-officer-ops',
    title: 'Field Operations Officer',
    department: 'Operations & Compliance',
    location: 'Tiruchirappalli (Trichy), Tamil Nadu',
    type: 'Full-Time (Field/Mobile)',
    experience: '2 to 4 Years',
    description: 'Responsible for conducting unannounced day/night spot-checks across client sites, auditing guard alert status, resolving client operational queries, and training site personnel.',
    responsibilities: [
      'Conduct structured surprise visits to assigned security and facility posts.',
      'Audit logbooks, visitor registers, and attendance registers on-site.',
      'Conduct on-the-job training refreshers for guards and housekeeping staff.',
      'Liaise directly with client estate managers to ensure SLA adherence.'
    ],
    requirements: [
      'Must possess two-wheeler driving license for local site visits.',
      'Prior experience in private security, facility management, or armed forces/police background.',
      'High level of integrity, alertness, and leadership authority.'
    ],
    whatWeOffer: [
      'Competitive salary + vehicle fuel & mobile allowance.',
      'Performance incentives based on site quality audits.',
      'Fast-track leadership development.'
    ]
  },
  {
    id: 'recruitment-exec',
    title: 'Manpower Recruitment Executive',
    department: 'Human Resources',
    location: 'Trichy Hub, Tamil Nadu',
    type: 'Full-Time',
    experience: '1 to 2 Years in Staffing/Recruitment',
    description: 'Help scale JSM\'s workforce network across Tamil Nadu. Responsible for sourcing candidates, managing background check documentation, and coordinating the 5-day induction batches.',
    responsibilities: [
      'Source and screen candidates for security, housekeeping, and industrial staffing roles.',
      'Collect and authenticate candidate verification documents (Aadhaar, address, references).',
      'Coordinate with operations team to schedule training batches.',
      'Maintain digital applicant records and attendance onboarding files.'
    ],
    requirements: [
      'Degree or Diploma with relevant experience in recruitment or HR coordination.',
      'Fluency in Tamil and English with good phone communication skills.',
      'Familiarity with spreadsheet documentation and candidate databases.'
    ],
    whatWeOffer: [
      'Stable corporate role with incentive bonuses on successful hiring targets.',
      'Professional, modern office working environment in Trichy.'
    ]
  }
];
