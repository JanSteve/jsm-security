/**
 * Live Real-Time Knowledge & Grounding Engine for Priya AI Receptionist
 * Equips Priya with live time/date, real-time weather, latest breaking news headlines, and verified factual summaries.
 */

export async function getLiveRealTimeContext(query: string): Promise<string> {
  // 1. Dynamic Temporal Grounding (IST - Indian Standard Time)
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const istTimeStr = new Intl.DateTimeFormat("en-IN", options).format(now);

  const temporalBlock = `[LIVE REAL-TIME SYSTEM TELEMETRY]
Current Live Timestamp: ${istTimeStr} (Indian Standard Time / IST)
Active Year: ${now.getFullYear()}
Headquarters Operations Status: 24/7 Central Command Desk Active & Monitoring
Company: JSM Integrated Services (Trichy Central Command Hub, Tamil Nadu, India)`;

  const lower = query.toLowerCase();

  // 2. Identify information needs
  const isWeather = /weather|temperature|climate|rain|forecast|sunny|hot|cold|celsius|monsoon/i.test(lower);
  const isNews = /news|latest|update|current event|headline|trending|today|yesterday|election|minister|chief minister|stalin|vijay|pm|modi|government order|go|gazette/i.test(lower);
  const isFactualDefinition = /^(who is|who was|what is|tell me about|explain)\s+([a-zA-Z0-9\s]{3,40})/i.test(lower.trim());

  let livePayload = "";

  try {
    // A. Real-Time Live Weather
    if (isWeather) {
      let city = "Trichy";
      if (lower.includes("chennai")) city = "Chennai";
      else if (lower.includes("coimbatore")) city = "Coimbatore";
      else if (lower.includes("madurai")) city = "Madurai";
      else if (lower.includes("salem")) city = "Salem";
      else if (lower.includes("bangalore") || lower.includes("bengaluru")) city = "Bangalore";
      else if (lower.includes("delhi")) city = "Delhi";
      else if (lower.includes("mumbai")) city = "Mumbai";
      else if (lower.includes("hyderabad")) city = "Hyderabad";

      const weatherRes = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=%l:+%C+%t+(Feels+like+%f),+Humidity:+%h,+Wind:+%w`, {
        signal: AbortSignal.timeout(3000),
      });

      if (weatherRes.ok) {
        const text = (await weatherRes.text()).trim();
        if (text && !text.includes("<html")) {
          livePayload += `\n[VERIFIED REAL-TIME LIVE WEATHER FEED]\n${text}\n`;
        }
      }
    }

    // B. Real-Time News & Headlines
    if (isNews) {
      let newsTopic = "Tamil Nadu latest news";
      if (lower.includes("security") || lower.includes("psara") || lower.includes("dgr")) {
        newsTopic = "DGR Ex-Servicemen security agency India";
      } else if (lower.includes("trichy") || lower.includes("tiruchirappalli")) {
        newsTopic = "Tiruchirappalli news";
      } else if (lower.includes("election") || lower.includes("politics")) {
        newsTopic = "Tamil Nadu politics elections";
      } else {
        newsTopic = query.replace(/[^\w\s]/g, " ").trim().slice(0, 60);
      }

      const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(newsTopic)}&hl=en-IN&gl=IN&ceid=IN:en`;
      const rssRes = await fetch(rssUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
        },
        signal: AbortSignal.timeout(3500),
      });

      if (rssRes.ok) {
        const xml = await rssRes.text();
        const titles = (xml.match(/<title>(.*?)<\/title>/g) || [])
          .slice(1, 5)
          .map((t) => t.replace(/<\/?title>/g, "").replace(/&quot;/g, '"').replace(/&amp;/g, "&"))
          .filter((t) => !t.includes("Google News"));

        if (titles.length > 0) {
          livePayload += `\n[VERIFIED REAL-TIME LIVE NEWS HEADLINES]\nTopic: ${newsTopic}\n` +
            titles.map((t) => `• ${t}`).join("\n") + "\n";
        }
      }
    }

    // C. Verified Entity / Factual Definitions
    if (isFactualDefinition && !isNews && !isWeather) {
      const match = lower.trim().match(/^(who is|who was|what is|tell me about|explain)\s+(?:the\s+)?([a-zA-Z0-9\s]{3,35})/i);
      if (match && match[2]) {
        const term = match[2].trim().replace(/\s+/g, "_");
        const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`, {
          signal: AbortSignal.timeout(2500),
        });
        if (wikiRes.ok) {
          const wikiData = await wikiRes.json();
          if (wikiData.extract) {
            livePayload += `\n[VERIFIED FACTUAL SUMMARY: ${wikiData.title}]\n${wikiData.extract}\n`;
          }
        }
      }
    }
  } catch (err) {
    console.warn("Live real-time context retrieval non-critical note:", err);
  }

  return `${temporalBlock}${livePayload ? "\n" + livePayload : ""}`;
}
