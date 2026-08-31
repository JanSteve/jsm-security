import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, lang = "en-IN", voiceId } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Clean text for natural speech synthesis
    const cleanText = text
      .replace(/[*_#•`~]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\+91\s?/g, "plus nine one ")
      .replace(/₹\s?(\d+)/g, "$1 rupees ")
      .replace(/\s+/g, " ")
      .trim();

    // 1. Check ElevenLabs API Key (High-Fidelity Neural Friday/Jarvis Voice)
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
    if (elevenLabsApiKey) {
      try {
        // Default to '21m00Tcm4TlvDq8ikWAM' (Rachel - natural, executive, calm corporate voice)
        const selectedVoice = voiceId || "21m00Tcm4TlvDq8ikWAM";
        const elevenLabsBuffer = await synthesizeElevenLabsAudio(cleanText, elevenLabsApiKey, selectedVoice);
        if (elevenLabsBuffer && elevenLabsBuffer.length > 0) {
          return new Response(new Uint8Array(elevenLabsBuffer), {
            headers: {
              "Content-Type": "audio/mpeg",
              "Content-Length": elevenLabsBuffer.length.toString(),
              "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
            },
          });
        }
      } catch (err) {
        console.warn("ElevenLabs TTS synthesis failed, falling back to natural speech stream:", err);
      }
    }

    // 2. High-speed Natural Speech Streaming Engine (₹0 Fallback)
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

async function synthesizeElevenLabsAudio(text: string, apiKey: string, voiceId: string): Promise<Buffer> {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "audio/mpeg"
    },
    body: JSON.stringify({
      text: text.slice(0, 1000), // Protect token limit per request
      model_id: "eleven_turbo_v2_5",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.8,
        style: 0.0,
        use_speaker_boost: true
      }
    }),
    signal: AbortSignal.timeout(12000)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`ElevenLabs API responded with status ${res.status}: ${errText}`);
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
