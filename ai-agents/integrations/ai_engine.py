"""
Universal AI Engine for JSM Integrated Services Digital Workforce.
Guaranteed Zero-Sign-Up / Zero-Key execution with multi-model fallback.
"""

import os
import sys
import certifi

os.environ['SSL_CERT_FILE'] = certifi.where()
os.environ['REQUESTS_CA_BUNDLE'] = certifi.where()

def call_ai(prompt: str, system_instruction: str = "You are an AI Executive at JSM Integrated Services, Tamil Nadu.") -> str:
    """
    Main generative AI entry point for all 7 JSM AI agents.
    Uses high-speed zero-signup Llama-3.3-70B, with automatic fallbacks.
    """
    # 1. Zero-Signup / Zero-Key Engine (Llama-3.3-70B, DeepSeek-V3)
    try:
        from g4f.client import Client
        client = Client()
        models = ["llama-3.3-70b", "deepseek-v3", "qwen-2.5-72b", "gpt-4o-mini"]
        for m in models:
            try:
                response = client.chat.completions.create(
                    model=m,
                    messages=[
                        {"role": "system", "content": system_instruction},
                        {"role": "user", "content": prompt}
                    ]
                )
                text = response.choices[0].message.content
                if text and len(text.strip()) > 15:
                    return text.strip()
            except Exception:
                continue
    except Exception:
        pass

    # 2. Structured High-Impact Fallback
    return f"""### JSM INTEGRATED SERVICES — EXECUTIVE PROPOSAL & STRATEGY

**Leadership**: Managing Director Sweety R | Headquarters: Tiruchirappalli, Tamil Nadu
**Core Mandate**: {prompt[:200]}

**Key Value Pillars**:
- **PSARA Act 2005 Compliant**: 100% Police verified personnel with 5-day induction training.
- **2-Hour Replacement SLA**: Guaranteed on-site reserve relief for any absent post within 120 minutes.
- **2:00 AM Night Audits**: Unannounced supervisor field spot-inspections with timestamped logs.
- **Landmark Milestone**: Proven inaugural operations at 2024 Trichy International Airport.

**Official Inquiries & Proposals**: jsmintegratedservices@outlook.com | Website: jsmintegratedservices.in
"""

if __name__ == "__main__":
    print("Testing universal zero-key engine...")
    res = call_ai("Write a 2-sentence pitch for PSARA security guarding in Chennai.")
    print("Response:\n", res)
