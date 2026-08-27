"""
OpenRouter Free Tier API Client
Provides access to zero-cost open models as a reliable backup when primary APIs are busy.
"""
import os
import json
import urllib.request
import urllib.error

def call_openrouter(prompt: str, system_instruction: str = None, model: str = "openrouter/free") -> str:
    """
    Calls OpenRouter with free open-weight models (zero token cost).
    """
    api_key = os.environ.get("OPENROUTER_API_KEY", "")
    if not api_key:
        raise ValueError("OPENROUTER_API_KEY environment variable is not set. Get one at https://openrouter.ai/")

    url = "https://openrouter.ai/api/v1/chat/completions"
    
    messages = []
    if system_instruction:
        messages.append({"role": "system", "content": system_instruction})
    messages.append({"role": "user", "content": prompt})

    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.7
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
            "HTTP-Referer": "https://jsmintegratedservices.in",
            "X-Title": "JSM Integrated Services AI Suite"
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=35) as response:
            result = json.loads(response.read().decode("utf-8"))
            return result["choices"][0]["message"]["content"]
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8")
        raise RuntimeError(f"OpenRouter API error (HTTP {e.code}): {err_msg}")
    except Exception as e:
        raise RuntimeError(f"OpenRouter connection failed: {str(e)}")
