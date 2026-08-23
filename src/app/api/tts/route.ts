import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, lang = "en-IN" } = await req.json();

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

async function generateNaturalSpeech(text: string, lang: string): Promise<Buffer> {
  // Split into natural sentence clauses
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const audioChunks: Buffer[] = [];

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    // Subdivide clauses if longer than 140 chars for optimal audio synthesis
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
