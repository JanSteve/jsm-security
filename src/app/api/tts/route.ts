import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { text, lang = "en", voiceId } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // 1. Rigorous text cleaning for natural human voice delivery
    let cleanText = text
      .replace(/\[APPOINTMENT_REQUEST:[^\]]*\]/gi, "")
      .replace(/\[[A-Z_]+:[^\]]*\]/gi, "")
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // markdown links -> link text
      .replace(/[*_#•`~>]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\+91\s?/g, "plus nine one ")
      .replace(/₹\s?(\d+)/g, "$1 rupees ")
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "") // strip emojis
      .replace(/\s+/g, " ")
      .trim();

    // Limit conversational speech to the primary executive message (~350 chars)
    // so speech starts instantly without reading out long disclaimers or repetitive lists
    if (cleanText.length > 380) {
      const boundary = cleanText.slice(0, 380).lastIndexOf(". ");
      if (boundary > 120) {
        cleanText = cleanText.slice(0, boundary + 1);
      } else {
        cleanText = cleanText.slice(0, 350) + "...";
      }
    }

    if (!cleanText) {
      cleanText = "Hello, this is Priya at JSM Integrated Services. How may I assist you today?";
    }

    // 2. Primary Engine: ElevenLabs (High-Fidelity British Executive Voice / Native Multilingual)
    // Default key fallback ensures production resilience
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY || "sk_524b6dc497f6a9b74340ddcd1298f6b0b101927573fdbbd3";
    const selectedVoice = voiceId || process.env.ELEVENLABS_VOICE_ID || "pFZP5JQG7iQjIQuC4Bku"; // Lily - British Female Voice

    if (elevenLabsApiKey) {
      try {
        const elevenLabsBuffer = await synthesizeElevenLabsAudio(cleanText, elevenLabsApiKey, selectedVoice);
        if (elevenLabsBuffer && elevenLabsBuffer.length > 0) {
          return new Response(new Uint8Array(elevenLabsBuffer), {
            headers: {
              "Content-Type": "audio/mpeg",
              "Content-Length": elevenLabsBuffer.length.toString(),
              "X-TTS-Engine": "ElevenLabs-Multilingual-v2",
              "X-TTS-Voice": selectedVoice,
              "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
            },
          });
        }
      } catch (err) {
        console.warn("ElevenLabs TTS synthesis failed, switching to natural speech stream:", err);
      }
    }

    // 3. Resilient Fallback: High-Speed Neural Speech Stream
    let speechLang = lang;
    if (!speechLang || speechLang === "en" || speechLang === "en-IN" || speechLang === "en-US") {
      speechLang = "en-gb"; // British English accent
    }

    const audioBuffer = await generateNaturalSpeech(cleanText, speechLang);

    return new Response(new Uint8Array(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "X-TTS-Engine": "NaturalStream-Fallback",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("TTS Generation Error:", error);
    return NextResponse.json({ error: "Failed to synthesize speech" }, { status: 500 });
  }
}

async function synthesizeElevenLabsAudio(text: string, apiKey: string, voiceId: string): Promise<Buffer> {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?optimize_streaming_latency=3`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "audio/mpeg"
    },
    body: JSON.stringify({
      text: text.slice(0, 1000),
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.50,
        similarity_boost: 0.85,
        style: 0.15,
        use_speaker_boost: true
      }
    }),
    signal: AbortSignal.timeout(12000)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`ElevenLabs API ${res.status}: ${errText}`);
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
