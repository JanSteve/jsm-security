"""
Agent 7: Recruiter HR — Automated PSARA Guard & Facility Staff Applicant Screener.
Screens incoming guard, housekeeping, and helper candidates against statutory standards.
"""

import os
import sys
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from integrations.ai_engine import call_ai

SYSTEM_PROMPT = """You are "Recruiter HR", the Senior Talent Acquisition & Compliance Officer for JSM Integrated Services (jsmintegratedservices.in).
Screen candidates strictly against the Private Security Agencies Regulation Act (PSARA 2005) and JSM's operational discipline standards.
"""

SAMPLE_CANDIDATES = [
  {
    "name": "M. Senthilkumar",
    "age": 32,
    "location": "Tiruchirappalli (Trichy)",
    "education": "12th Pass",
    "experience": "4 years industrial security guard experience at BHEL vendor facility",
    "police_verification_ready": "Yes (Clean record, Aadhaar linked)",
    "shift_flexibility": "Willing for 12-hour rotational night shifts",
    "languages": "Tamil, basic conversational English"
  },
  {
    "name": "K. Murugan",
    "age": 28,
    "location": "Hosur / Bangalore border",
    "education": "10th Pass",
    "experience": "2 years commercial housekeeping & floor scrubbing at auto plant",
    "police_verification_ready": "Yes",
    "shift_flexibility": "Day & Night rotational",
    "languages": "Tamil, Kannada"
  }
]

def screen_applicants():
    print(f"👥 Recruiter HR Agent is screening {len(SAMPLE_CANDIDATES)} applicant profiles against PSARA standards...")
    
    os.makedirs("output", exist_ok=True)
    today_str = datetime.now().strftime("%Y%m%d_%H%M%S")
    filepath = f"output/candidate_screening_{today_str}.md"
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(f"# 👥 JSM APPLICANT SCREENING & COMPLIANCE EVALUATION\n")
        f.write(f"**Date**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')}\n\n---\n\n")

        for idx, candidate in enumerate(SAMPLE_CANDIDATES, 1):
            prompt = f"""Screen this candidate for deployment at JSM Integrated Services:

- **Name**: {candidate['name']}
- **Age**: {candidate['age']} | **Location**: {candidate['location']}
- **Education**: {candidate['education']} | **Experience**: {candidate['experience']}
- **Police Verification Readiness**: {candidate['police_verification_ready']}
- **Shift Flexibility**: {candidate['shift_flexibility']}
- **Languages**: {candidate['languages']}

Provide:
1. **Compliance Verdict**: [RECOMMENDED FOR HIRE / SECONDARY INTERVIEW / REJECT]
2. **Candidate Score (0-100)** with rationale based on PSARA fitness, age, and shift readiness.
3. **Deployment Matching**: Recommend best vertical (Factory Guarding / Hospital Hygiene / Industrial Logistics).
4. **3 Bilingual Interview Questions (Tamil & English)** for Operations Supervisor round.
"""
            print(f"  [{idx}/{len(SAMPLE_CANDIDATES)}] Screening candidate {candidate['name']} ({candidate['location']})...")
            report = call_ai(prompt, SYSTEM_PROMPT)
            
            f.write(f"## Candidate {idx}: {candidate['name']}\n")
            f.write(f"**Location**: {candidate['location']} | **Target Role**: Industrial Personnel\n\n")
            f.write(report)
            f.write("\n\n---\n\n")

    print(f"✅ Candidate screening complete! Saved to: {filepath}")
    return filepath

if __name__ == "__main__":
    screen_applicants()
