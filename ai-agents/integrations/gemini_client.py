"""
Google Gemini 2.0 API Client
Provides robust calls to Google Gemini models with auto-retry and failover.
"""
import os
import json
import urllib.request
import urllib.error
import time

def call_gemini(prompt: str, system_instruction: str = None, temperature: float = 0.7, max_tokens: int = 2048) -> str:
    """
    Calls Google Gemini API (gemini-2.0-flash / gemini-1.5-flash) using pure Python urllib (no external dependencies required).
    """
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is not set. Get one for free at https://aistudio.google.com/")

    # Primary model endpoint
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    
    contents = []
    if system_instruction:
        contents.append({
            "role": "user",
            "parts": [{"text": f"SYSTEM INSTRUCTIONS:\n{system_instruction}\n\nPlease acknowledge."}]
        })
        contents.append({
            "role": "model",
            "parts": [{"text": "Understood. I will follow these instructions strictly."}]
        })
        
    contents.append({
        "role": "user",
        "parts": [{"text": prompt}]
    })

    payload = {
        "contents": contents,
        "generationConfig": {
            "temperature": temperature,
            "maxOutputTokens": max_tokens
        }
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )

    max_retries = 3
    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                result = json.loads(response.read().decode("utf-8"))
                return result["candidates"][0]["content"]["parts"][0]["text"]
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < max_retries - 1:
                time.sleep(2 ** (attempt + 1))
                continue
            err_msg = e.read().decode("utf-8")
            raise RuntimeError(f"Gemini API error (HTTP {e.code}): {err_msg}")
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(2)
                continue
            raise RuntimeError(f"Failed to call Gemini API: {str(e)}")

if __name__ == "__main__":
    # Quick self-test
    test_key = os.environ.get("GEMINI_API_KEY")
    if test_key:
        resp = call_gemini("Say 'JSM AI Agents are online and ready to conquer South India!' in Tamil and English.")
        print(resp)
    else:
        print("Set GEMINI_API_KEY to test.")
