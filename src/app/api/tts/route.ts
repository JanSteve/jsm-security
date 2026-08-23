import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import WebSocket from "ws";

// Microsoft Edge ReadAloud Neural Speech Endpoint (Free & Unlimited)
const EDGE_WS_URL = "wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4";

export async function POST(req: NextRequest) {
  try {
    const { text, voice = "en-IN-NeerjaNeural" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Clean text for speech
    const cleanText = text
      .replace(/[*_#•`~]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\+91\s?/g, "plus 91 ")
      .slice(0, 800); // Keep reasonable length per response

    const audioBuffer = await synthesizeEdgeTTS(cleanText, voice);

    return new Response(new Uint8Array(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("TTS API Error:", error);
    return NextResponse.json({ error: "Failed to synthesize audio" }, { status: 500 });
  }
}

function synthesizeEdgeTTS(text: string, voiceName: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(EDGE_WS_URL, {
      headers: {
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
        "Origin": "chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold",
      },
    });

    const audioChunks: Buffer[] = [];
    const requestId = uuidv4().replace(/-/g, "");

    const timeout = setTimeout(() => {
      ws.close();
      if (audioChunks.length > 0) {
        resolve(Buffer.concat(audioChunks));
      } else {
        reject(new Error("TTS synthesis timeout"));
      }
    }, 9000);

    ws.on("open", () => {
      // 1. Send speech config
      const speechConfig = `Content-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`;
      ws.send(speechConfig);

      // 2. Send SSML text
      const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='${voiceName}'><prosody pitch='+0Hz' rate='+0%'>${escapeXml(text)}</prosody></voice></speak>`;
      const ssmlMsg = `X-RequestId:${requestId}\r\nContent-Type:application/ssml+xml\r\nPath:ssml\r\n\r\n${ssml}`;
      ws.send(ssmlMsg);
    });

    ws.on("message", (data: any, isBinary: boolean) => {
      if (isBinary) {
        const buffer = Buffer.from(data);
        const headerEnd = buffer.indexOf(Buffer.from("\r\n\r\n"));
        if (headerEnd !== -1) {
          const header = buffer.slice(0, headerEnd).toString("utf-8");
          if (header.includes("Path:audio")) {
            const audioData = buffer.slice(headerEnd + 4);
            audioChunks.push(audioData);
          }
        }
      } else {
        const textMsg = data.toString("utf-8");
        if (textMsg.includes("Path:turn.end")) {
          clearTimeout(timeout);
          ws.close();
          resolve(Buffer.concat(audioChunks));
        }
      }
    });

    ws.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}
