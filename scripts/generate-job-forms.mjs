import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle } from "docx";
import fs from "fs";
import path from "path";

const OUT_DIR = path.resolve("public/downloads");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function createFormDoc({ title, subtitle, formCode, sections }) {
  const tableBorders = {
    top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
    left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
    right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  };

  const children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: "JSM INTEGRATED SERVICES",
          bold: true,
          size: 32,
          color: "000000",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: "HEADQUARTERS RECRUITMENT & OPERATIONS WING",
          size: 20,
          color: "666666",
          bold: true,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: "PSARA LICENSED • ISO 9001:2015 CERTIFIED • DGR-ALIGNED ESM WING",
          size: 16,
          color: "0071E3",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: `${formCode} — ${title}`,
          bold: true,
          size: 26,
          underline: {},
          color: "1D1D1F",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: subtitle,
          italics: true,
          size: 18,
          color: "555555",
        }),
      ],
    }),
  ];

  sections.forEach((sec) => {
    children.push(
      new Paragraph({
        spacing: { before: 200, after: 120 },
        children: [
          new TextRun({
            text: sec.title.toUpperCase(),
            bold: true,
            size: 20,
            color: "000000",
          }),
        ],
      })
    );

    const rows = sec.fields.map((f) => {
      return new TableRow({
        children: [
          new TableCell({
            width: { size: 3500, type: WidthType.DXA },
            borders: tableBorders,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: f.label,
                    bold: true,
                    size: 18,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 6000, type: WidthType.DXA },
            borders: tableBorders,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: f.value || "__________________________________________________",
                    size: 18,
                    color: "666666",
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    });

    children.push(
      new Table({
        width: { size: 9500, type: WidthType.DXA },
        rows,
      })
    );
  });

  children.push(
    new Paragraph({
      spacing: { before: 400, after: 120 },
      children: [
        new TextRun({
          text: "DECLARATION & VERIFICATION",
          bold: true,
          size: 20,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: "I hereby declare that all particulars furnished above are true, complete, and correct to the best of my knowledge. I understand that any false statement will result in immediate disqualification and legal action under PSARA regulations.",
          size: 18,
          italics: true,
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 400 },
      children: [
        new TextRun({
          text: "Date: ________________________        Signature of Applicant: ________________________",
          size: 18,
          bold: true,
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 300 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "Submit completed application via WhatsApp to +91 9080863448 or email to hr@jsmintegratedservices.com",
          size: 16,
          color: "0071E3",
          bold: true,
        }),
      ],
    })
  );

  return new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });
}

const forms = [
  {
    fileName: "Form-A-Officer-Recruitment.docx",
    formCode: "FORM A",
    title: "OFFICER & SENIOR SUPERVISOR RECRUITMENT APPLICATION",
    subtitle: "For Commissioned / Gazetted / Corporate Security Officers & Area Managers",
    sections: [
      {
        title: "1. Personal Information",
        fields: [
          { label: "Full Name (In Block Letters)" },
          { label: "Date of Birth & Age" },
          { label: "Father's / Spouse's Name" },
          { label: "Permanent Residential Address" },
          { label: "Mobile Phone (WhatsApp Active)" },
          { label: "Aadhaar Card Number" },
          { label: "PAN Card Number" },
        ],
      },
      {
        title: "2. Military / Defence / Police Background (If Applicable)",
        fields: [
          { label: "Armed Forces Branch (Army/Navy/AirForce/Police/None)" },
          { label: "Rank at Time of Discharge" },
          { label: "Service Number & Corps/Regiment" },
          { label: "Total Length of Service (Years & Months)" },
          { label: "Ex-Servicemen (ESM) Identity Card No." },
          { label: "Character Assessment on Discharge" },
        ],
      },
      {
        title: "3. Professional Qualifications & Licensures",
        fields: [
          { label: "Highest Educational Degree" },
          { label: "Security Management Certifications" },
          { label: "Fire Safety / First Aid Training" },
          { label: "Weapons / Arms License No. (If Applicable)" },
          { label: "Languages Fluent (Speak/Read/Write)" },
          { label: "Preferred Posting Hub (Chennai/Trichy/Coimbatore/Hosur/Madurai)" },
        ],
      },
    ],
  },
  {
    fileName: "Form-B-JCO-Application.docx",
    formCode: "FORM B",
    title: "JUNIOR COMMISSIONED OFFICER (JCO) & SHIFT IN-CHARGE APPLICATION",
    subtitle: "For Subedars, Naib Subedars, Head Guards & Site Supervisors",
    sections: [
      {
        title: "1. Candidate Dossier",
        fields: [
          { label: "Applicant Full Name" },
          { label: "Date of Birth & Age" },
          { label: "Present & Permanent Address" },
          { label: "Contact Phone & WhatsApp" },
          { label: "Height (in cm) & Chest (Normal/Expanded)" },
          { label: "Aadhaar Card Number" },
        ],
      },
      {
        title: "2. Service Credentials",
        fields: [
          { label: "Service Branch & Corps" },
          { label: "Last Rank Held (Subedar/Nb Sub/Havildar/Equal)" },
          { label: "Date of Enrolment & Date of Discharge" },
          { label: "PPO (Pension Payment Order) Number" },
          { label: "Discharge Book Number" },
        ],
      },
      {
        title: "3. Operational Placement",
        fields: [
          { label: "Educational Qualification (10th/12th/Grad)" },
          { label: "Experience in Industrial / Airport Security" },
          { label: "Availability to Join (Immediate / Days)" },
          { label: "Preferred Work Shift (Day / Night / Rotational)" },
        ],
      },
    ],
  },
  {
    fileName: "Form-ESM-1-Ex-Servicemen.docx",
    formCode: "FORM ESM-1",
    title: "EX-SERVICEMEN (ESM) GENERAL ENROLMENT FORM",
    subtitle: "DGR-Aligned Re-Employment Framework for Veterans",
    sections: [
      {
        title: "1. Veteran Particulars",
        fields: [
          { label: "Army / Navy / Air Force No." },
          { label: "Name as per Service Records" },
          { label: "Date of Birth & Date of Discharge" },
          { label: "Corps / Trade / Specialization" },
          { label: "Zila Sainik Board Registration No." },
          { label: "Medical Category at Discharge" },
        ],
      },
      {
        title: "2. Desired Deployment",
        fields: [
          { label: "Role Preferred (Armed Guard / Static Guard / Supervisor)" },
          { label: "District Preference 1" },
          { label: "District Preference 2" },
          { label: "Bank Account No. for Direct Wage Credit" },
          { label: "Bank IFSC Code & Branch" },
        ],
      },
    ],
  },
  {
    fileName: "Form-ESM-2-Jawan.docx",
    formCode: "FORM ESM-2",
    title: "EX-SERVICEMEN JAWAN & ARMED ESCORT RECRUITMENT",
    subtitle: "Direct Re-employment Registration for Ex-Sepoy / Naik / Lance Naik",
    sections: [
      {
        title: "1. Jawan Details",
        fields: [
          { label: "Full Name" },
          { label: "Service Number" },
          { label: "Regiment / Unit" },
          { label: "Mobile Number" },
          { label: "Village / Town & District" },
        ],
      },
      {
        title: "2. Health & Verification",
        fields: [
          { label: "Physical Fitness Declaration (SHAPE-1 Equivalent)" },
          { label: "Police Verification Status" },
          { label: "Discharge Certificate Copy Attached (Yes/No)" },
        ],
      },
    ],
  },
  {
    fileName: "Form-SL-1-Skilled-Labor.docx",
    formCode: "FORM SL-1",
    title: "SKILLED & TECHNICAL WORKFORCE REGISTRATION",
    subtitle: "Electricians, Plumbers, HVAC, Machinists & Facility Technicians",
    sections: [
      {
        title: "1. Candidate Details",
        fields: [
          { label: "Applicant Name" },
          { label: "Trade / Skill Specialization" },
          { label: "ITI / Diploma / Certification Details" },
          { label: "Total Years of Practical Experience" },
          { label: "Previous Factories / Sites Worked" },
          { label: "Mobile & WhatsApp Number" },
        ],
      },
      {
        title: "2. Statutory Compliance",
        fields: [
          { label: "Aadhaar Number" },
          { label: "Universal Account Number (UAN / PF) if existing" },
          { label: "ESIC IP Number (if existing)" },
          { label: "Bank Account Details for Direct Credit" },
        ],
      },
    ],
  },
  {
    fileName: "Form-SL-2-Unskilled-Labor.docx",
    formCode: "FORM SL-2",
    title: "UNSKILLED & INDUSTRIAL HOUSEKEEPING ENROLMENT",
    subtitle: "Factory Helpers, Loading Crew, Housekeeping & Sanitation Staff",
    sections: [
      {
        title: "1. Worker Particulars",
        fields: [
          { label: "Full Name" },
          { label: "Age & Gender" },
          { label: "Contact Phone Number" },
          { label: "Permanent Home Town / District" },
          { label: "Aadhaar Card Number" },
        ],
      },
      {
        title: "2. Placement Preferences",
        fields: [
          { label: "Work Category (Factory Helper / Housekeeping / Sanitation)" },
          { label: "Willingness to Work Shifts (Day/Night)" },
          { label: "Bank Account Details" },
        ],
      },
    ],
  },
  {
    fileName: "JSM-Compliance-Checklist.docx",
    formCode: "CHECKLIST",
    title: "DGR & PSARA STATUTORY COMPLIANCE DOSSIER",
    subtitle: "Mandatory Onboarding Document Verification for Security Personnel",
    sections: [
      {
        title: "Required Documents to Submit with Application",
        fields: [
          { label: "1. Aadhaar Card Copy", value: "[  ] Verified & Self-Attested" },
          { label: "2. PAN Card Copy", value: "[  ] Verified & Self-Attested" },
          { label: "3. Military Discharge Book (For ESM)", value: "[  ] Verified (Original Sighted)" },
          { label: "4. ESM Identity Card (For ESM)", value: "[  ] Verified" },
          { label: "5. Police Verification Certificate", value: "[  ] Current / Applied" },
          { label: "6. Educational Certificates (10th/12th/Degree)", value: "[  ] Copies Attached" },
          { label: "7. Medical Fitness Certificate", value: "[  ] Certified by Registered Practitioner" },
          { label: "8. Bank Passbook / Cancelled Cheque", value: "[  ] With Clear IFSC & Account No." },
          { label: "9. Passport Size Photographs", value: "[  ] 4 Copies in Formal Attire" },
        ],
      },
    ],
  },
];

async function generateAll() {
  for (const form of forms) {
    const doc = createFormDoc(form);
    const buffer = await Packer.toBuffer(doc);
    const target = path.join(OUT_DIR, form.fileName);
    fs.writeFileSync(target, buffer);
    console.log(`Generated: ${target}`);
  }
}

generateAll().catch(console.error);
