import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, lang = "en-IN", voiceId } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Clean text for natural speech
    const cleanText = text
      .replace(/[*_#•`~]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\+91\s?/g, "plus nine one ")
      .replace(/\s+/g, " ")
      .trim();

    // 1. Check if Fish Audio API Key is configured for Fish.Audio S2.1-pro-free
    const fishApiKey = process.env.FISH_AUDIO_API_KEY;
    if (fishApiKey) {
      try {
        const fishAudioBuffer = await synthesizeFishAudio(cleanText, fishApiKey, voiceId);
        if (fishAudioBuffer && fishAudioBuffer.length > 0) {
          return new Response(new Uint8Array(fishAudioBuffer), {
            headers: {
              "Content-Type": "audio/mpeg",
              "Content-Length": fishAudioBuffer.length.toString(),
              "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
            },
          });
        }
      } catch (err) {
        console.warn("Fish Audio synthesis failed, falling back to natural speech stream:", err);
      }
    }

    // 2. High-speed Natural Speech Streaming Engine (₹0 Free & Unlimited)
    const audioBuffer = await generateNaturalSpeech(cleanText, lang);

    return new Response(new Uint8Array(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("TTS Generation Error:", error);
    return NextResponse.json({ error: "Failed to synthesize speech" }, { status: 500 });
  }
}

async function synthesizeFishAudio(text: string, apiKey: string, referenceId?: string): Promise<Buffer> {
  const payload: any = {
    text: text.slice(0, 500),
    format: "mp3",
    latency: "normal"
  };

  if (referenceId) {
    payload.reference_id = referenceId;
  }

  const res = await fetch("https://api.fish.audio/v1/tts", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "model": "s2.1-pro-free"
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000)
  });

  if (!res.ok) {
    throw new Error(`Fish Audio API responded with status ${res.status}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function generateNaturalSpeech(text: string, lang: string): Promise<Buffer> {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const audioChunks: Buffer[] = [];

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    const clauses = trimmed.length > 140 
      ? trimmed.match(/.{1,130}(\s+|$)/g) || [trimmed] 
      : [trimmed];

    for (const clause of clauses) {
      const q = encodeURIComponent(clause.trim());
      if (!q) continue;

      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${q}&tl=${lang}&client=tw-ob`;
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        signal: AbortSignal.timeout(6000),
      });

      if (res.ok) {
        const ab = await res.arrayBuffer();
        audioChunks.push(Buffer.from(ab));
      }
    }
  }

  if (audioChunks.length === 0) {
    throw new Error("No audio chunks generated");
  }

  return Buffer.concat(audioChunks);
}
