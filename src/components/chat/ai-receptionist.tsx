"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bot, 
  X, 
  Send, 
  Phone, 
  Mic, 
  Volume2, 
  VolumeX, 
  Calculator, 
  Maximize2, 
  Minimize2,
  Trash2,
  Square,
  CheckCircle,
  CheckCircle2,
  Mail,
  Play,
  Radio,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  isLeadCard?: boolean;
  leadReference?: string;
  showQuoteCalculator?: boolean;
}

export function AIReceptionist() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [currentLang, setCurrentLang] = useState("en");
  const [showCalculator, setShowCalculator] = useState(false);

  // ElevenLabs Voice & Synchronization State
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentPlayingMsgId, setCurrentPlayingMsgId] = useState<string | null>(null);

  // Quote Calculator State
  const [calcService, setCalcService] = useState("Security Guarding (24/7)");
  const [calcUnits, setCalcUnits] = useState(2);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `Namaste! I am **Priya**, Senior Operations Officer & Executive Receptionist for **JSM Integrated Services** under Proprietor & MD **Sweety J** and Head of Operations & Audit **Major AR Devadoss (Army-Veteran)**.\n\nI can answer **any query**—from real-time weather, current events, and general knowledge to our **4-step security deployment process**, **DGR Ex-Servicemen quotas**, statutory wage compliance, or booking an official appointment with our Managing Director.\n\nOur 24/7 Operations Command Desk is also live on WhatsApp at **+91 90808 63448**. How may I assist you today?`,
      timestamp: "Just now",
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Prime / Unlock browser audio context on user interaction
  const unlockAudio = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        if (audioContextRef.current.state === "suspended") {
          audioContextRef.current.resume();
        }
      }
    } catch {}
  };

  // Initialize Speech Mute preference & Language from localStorage / cookies
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedMute = localStorage.getItem("jsm_priya_voice_muted");
    if (savedMute === "true") {
      setIsSpeechEnabled(false);
    }

    const savedLang = localStorage.getItem("jsm_selected_lang");
    if (savedLang) {
      setCurrentLang(savedLang);
    } else {
      const cookies = document.cookie.split("; ");
      const transCookie = cookies.find((c) => c.startsWith("googtrans="));
      if (transCookie) {
        const code = transCookie.split("/").pop();
        if (code) setCurrentLang(code);
      }
    }

    const handleLangChange = (e: any) => {
      const newLang = e.detail?.lang || "en";
      setCurrentLang(newLang);
    };

    window.addEventListener("jsm-language-change", handleLangChange);
    return () => window.removeEventListener("jsm-language-change", handleLangChange);
  }, []);

  // Update welcome message if language switches to Tamil
  useEffect(() => {
    if (currentLang === "ta" && messages.length === 1 && messages[0].id === "welcome-1") {
      setMessages([
        {
          id: "welcome-1",
          role: "assistant",
          content: `வணக்கம்! நான் **பிரியா**, ஜேஎஸ்எம் இன்டெக்ரேட்டட் சர்வீசஸ் நிறுவனத்தின் மூத்த வரவேற்பாளர். மேனேஜிங் டைரக்டர் **ஸ்வீட்டி ஜே** மற்றும் ஆப்பரேஷன்ஸ் ஹெட் **மேஜர் ஏ.ஆர். தேவதாஸ் (ராணுவ வீரர்)** தலைமையில் இயங்கும் எங்களது பாதுகாப்பு, மனிதவளம் மற்றும் வசதி மேலாண்மை சேவைகளுக்கு தங்களை அன்புடன் வரவேற்கிறேன்.\n\nபாதுகாப்பு ஏற்பாடுகள், அரசு விதிமுறைகள், அல்லது நிர்வாக இயக்குனருடன் (MD) சந்திப்பு பதிவு செய்ய தங்களுக்கு எவ்வாறு உதவ முடியும்?`,
          timestamp: "Just now",
        }
      ]);
    }
  }, [currentLang]);

  // Stop speaking helper function
  const stopSpeaking = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsVoiceLoading(false);
    setCurrentPlayingMsgId(null);
  };

  // Toggle voice mute with persistent storage
  const toggleSpeech = () => {
    unlockAudio();
    const nextState = !isSpeechEnabled;
    setIsSpeechEnabled(nextState);
    if (!nextState) {
      stopSpeaking();
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("jsm_priya_voice_muted", (!nextState).toString());
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showCalculator, isSpeaking, isVoiceLoading]);

  // ElevenLabs Natural Voice Synthesis (British Female Lily / Native Multilingual)
  const speakText = async (text: string, msgId?: string) => {
    if (!isSpeechEnabled || typeof window === "undefined") return;

    unlockAudio();
    stopSpeaking();
    setIsVoiceLoading(true);
    if (msgId) setCurrentPlayingMsgId(msgId);

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text, 
          lang: currentLang,
          voiceId: "pFZP5JQG7iQjIQuC4Bku" // Lily - British Female Voice
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audioPlayerRef.current = audio;
        
        audio.onplay = () => {
          setIsVoiceLoading(false);
          setIsSpeaking(true);
        };
        audio.onended = () => {
          setIsSpeaking(false);
          setCurrentPlayingMsgId(null);
          audioPlayerRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          setIsVoiceLoading(false);
          setCurrentPlayingMsgId(null);
        };
        audio.onpause = () => {
          setIsSpeaking(false);
        };

        await audio.play();
        return;
      }
    } catch (err) {
      console.warn("ElevenLabs TTS stream exception, falling back to local voice:", err);
    } finally {
      setIsVoiceLoading(false);
    }

    // Secondary Fallback: Browser Web Speech API
    if ("speechSynthesis" in window) {
      try {
        const cleanSpeech = text
          .replace(/\[APPOINTMENT_REQUEST:[^\]]*\]/gi, "")
          .replace(/\[[A-Z_]+:[^\]]*\]/gi, "")
          .replace(/[*_#•`~>]/g, "")
          .replace(/https?:\/\/\S+/g, "")
          .replace(/\+91\s?/g, "plus nine one ")
          .replace(/\n+/g, ". ");

        const utterance = new SpeechSynthesisUtterance(cleanSpeech.slice(0, 300));
        utterance.rate = 0.98;
        utterance.pitch = 1.02;

        const voices = window.speechSynthesis.getVoices();
        if (currentLang === "ta") {
          const tamilVoice = voices.find(v => v.lang.startsWith("ta") || v.name.toLowerCase().includes("tamil"));
          if (tamilVoice) {
            utterance.voice = tamilVoice;
            utterance.lang = "ta-IN";
          }
        } else if (currentLang === "hi") {
          const hindiVoice = voices.find(v => v.lang.startsWith("hi") || v.name.toLowerCase().includes("hindi"));
          if (hindiVoice) {
            utterance.voice = hindiVoice;
            utterance.lang = "hi-IN";
          }
        } else {
          const britishVoice = voices.find(v => 
            (v.lang === "en-GB" || v.lang.startsWith("en-GB")) && v.name.toLowerCase().includes("female")
          ) || voices.find(v => v.name.includes("UK") || v.name.includes("British"));
          if (britishVoice) {
            utterance.voice = britishVoice;
            utterance.lang = "en-GB";
          }
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
          setCurrentPlayingMsgId(null);
        };
        utterance.onerror = () => {
          setIsSpeaking(false);
          setCurrentPlayingMsgId(null);
        };

        window.speechSynthesis.speak(utterance);
      } catch {
        setIsSpeaking(false);
        setCurrentPlayingMsgId(null);
      }
    }
  };

  // Toggle voice recognition (Speech to Text)
  const toggleListening = () => {
    if (typeof window === "undefined") return;
    unlockAudio();
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please type your message.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = currentLang === "ta" ? "ta-IN" : currentLang === "hi" ? "hi-IN" : "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputMessage(transcript);
            handleSendMessage(transcript);
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  // Periodic greeting notification popup if chat is closed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setUnreadCount(1);
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    unlockAudio();
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          lang: currentLang
        }),
      });

      const data = await response.json();
      const assistantMsgId = `assistant-${Date.now()}`;

      const assistantMsg: Message = {
        id: assistantMsgId,
        role: "assistant",
        content: data.reply || "Thank you. Our operations team has noted your query.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isLeadCard: data.isLeadCapture || data.isAppointment,
        leadReference: data.appointmentReference || data.leadReference,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      speakText(assistantMsg.content, assistantMsgId);
    } catch {
      const fallbackMsg: Message = {
        id: `assistant-fallback-${Date.now()}`,
        role: "assistant",
        content: "Thank you for reaching out to JSM Integrated Services. Our operations desk is available via email at jsmintegratedservices@outlook.com or WhatsApp at +91 90808 63448 for immediate proposals and appointment bookings.",
        timestamp: "Now",
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Quick prompt chips
  const quickPrompts = currentLang === "ta" ? [
      { label: "📅 நிர்வாக இயக்குனருடன் சந்திப்பு", query: "நிர்வாக இயக்குனர் ஸ்வீட்டி ஜே அவர்களுடன் ஒரு சந்திப்பு பதிவு செய்ய விரும்புகிறேன்." },
      { label: "🌤️ திருச்சி இன்றைய வானிலை", query: "திருச்சியில் இன்றைய வானிலை மற்றும் வெப்பநிலை என்ன?" },
      { label: "⚙️ பாதுகாப்பு பணியமர்த்தும் முறை", query: "பாதுகாப்பு காவலர்களை எவ்வாறு பணியமர்த்துவது? 4-படி வழிமுறைகளை கூறுங்கள்." },
      { label: "🛡️ DGR & PSARA உரிமம்", query: "ஜேஎஸ்எம் நிறுவனத்தின் DGR மற்றும் PSARA 2005 உரிமம் பற்றி விளக்குங்கள்." },
      { label: "📄 விண்ணப்ப படிவம் (Form A/B)", query: "வேலைக்கான Form A / Form B படிவங்களை எவ்வாறு பதிவிறக்குவது?" },
      { label: "💬 நேரடி வாட்ஸ்அப்", query: "வாட்ஸ்அப் மூலம் உடனடியாக தொடர்பு கொள்ள விரும்புகிறேன்." }
    ] : [
      { label: "📅 Book Appointment with MD", query: "I would like to schedule an official appointment with Managing Director Sweety J." },
      { label: "🌤️ Live Weather in Trichy", query: "What is the live weather and temperature in Trichy right now?" },
      { label: "⚙️ How Deployment Works", query: "Explain the complete step-by-step process of hiring and deploying security guards." },
      { label: "🛡️ DGR & PSARA Credentials", query: "Explain your DGR-aligned Ex-Servicemen supervisory platoons and PSARA 2005 license." },
      { label: "📄 Download Job Forms", query: "How do I download and submit Form A or Form B for employment?" },
      { label: "💬 WhatsApp Operations", query: "Connect me directly with the 24/7 Operations Desk on WhatsApp." }
    ];

  // Calculate Instant Estimate
  const calculateEstimatedCost = () => {
    let ratePerUnit = 18000;
    if (calcService.includes("Housekeeping")) ratePerUnit = 14500;
    if (calcService.includes("Manpower")) ratePerUnit = 16000;
    if (calcService.includes("Event")) return `₹${(calcUnits * 1800).toLocaleString("en-IN")} / event day`;

    const monthlyTotal = ratePerUnit * calcUnits;
    return `₹${monthlyTotal.toLocaleString("en-IN")} / month`;
  };

  return (
    <>
      {/* Floating Receptionist Badge Trigger */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3">
        {!isOpen && unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className="hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-xl text-[#1d1d1f] px-4 py-2.5 rounded-full shadow-lg border border-black/[0.08] cursor-pointer press-scale"
            onClick={() => {
              unlockAudio();
              setIsOpen(true);
              setUnreadCount(0);
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-semibold tracking-tight">
              {currentLang === "ta" ? "பிரியாவிடம் கேளுங்கள் • ElevenLabs Voice" : "Ask Priya • ElevenLabs British Voice"}
            </p>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            unlockAudio();
            setIsOpen(!isOpen);
            setUnreadCount(0);
          }}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 relative press-scale cursor-pointer ${
            isOpen 
              ? "bg-[#1d1d1f] text-white" 
              : "bg-white/95 backdrop-blur-xl text-[#1d1d1f] hover:bg-white border border-black/[0.08]"
          }`}
          aria-label="Toggle JSM AI Receptionist"
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <>
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-black border border-white/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/jsm_logo_black.png"
                  alt="JSM AI"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#0071e3] text-white rounded-full text-[9px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                  1
                </span>
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* Main AI Chat Interface Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-50 bg-white border border-black/[0.08] shadow-2xl rounded-[28px] overflow-hidden flex flex-col transition-all duration-300 ${
              isExpanded
                ? "top-6 bottom-6 left-6 right-6 md:left-auto md:w-[680px]"
                : "bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[440px] h-[610px] max-h-[85vh]"
            }`}
          >
            {/* Header */}
            <div className="bg-[#f5f5f7] text-[#1d1d1f] px-4 sm:px-5 py-3 flex items-center justify-between border-b border-black/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-black border border-black/10 flex items-center justify-center overflow-hidden shadow-2xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/jsm_logo_black.png"
                      alt="Priya"
                      className="w-full h-full object-cover scale-105"
                    />
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${isSpeaking ? "bg-emerald-500 animate-ping" : "bg-emerald-500"}`} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1d1d1f]">Priya</h3>
                    <span className="text-[9px] font-mono font-bold bg-[#0071e3]/10 text-[#0071e3] px-2 py-0.2 rounded-full uppercase tracking-wider">
                      RECEPTIONIST
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-purple-500/10 text-purple-700 px-1.5 py-0.2 rounded-full">
                      ElevenLabs
                    </span>
                  </div>
                  <p className="text-[10px] text-[#86868b] font-medium flex items-center gap-1">
                    {isVoiceLoading ? (
                      <span className="text-purple-600 font-semibold animate-pulse">🎙 Generating voice...</span>
                    ) : isSpeaking ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <Radio size={10} className="animate-spin" /> Speaking naturally...
                      </span>
                    ) : (
                      "Senior Front-Desk Operations Officer"
                    )}
                  </p>
                </div>
              </div>

              {/* Action Clusters: Mute Toggle, Language Switcher, Estimator, Close */}
              <div className="flex items-center gap-1.5">
                {/* PROMINENT VOICE MUTE / UNMUTE BUTTON */}
                <button
                  onClick={toggleSpeech}
                  title={isSpeechEnabled ? "Voice Enabled (Click to Mute)" : "Voice Muted (Click to Enable)"}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all press-scale cursor-pointer ${
                    isSpeechEnabled 
                      ? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 hover:bg-emerald-500/25" 
                      : "bg-neutral-200 text-neutral-600 border border-neutral-300 hover:bg-neutral-300"
                  }`}
                >
                  {isSpeechEnabled ? (
                    <>
                      <Volume2 size={13} className="text-emerald-600" />
                      <span className="text-[10px] font-mono">Voice ON</span>
                    </>
                  ) : (
                    <>
                      <VolumeX size={13} className="text-neutral-500" />
                      <span className="text-[10px] font-mono">Muted</span>
                    </>
                  )}
                </button>

                {/* Direct Language Switcher Inside Chat */}
                <button
                  onClick={() => {
                    const next = currentLang === "en" ? "ta" : currentLang === "ta" ? "hi" : "en";
                    setCurrentLang(next);
                    try { localStorage.setItem("jsm_selected_lang", next); } catch {}
                  }}
                  title="Switch Language: EN / தமிழ் / हिन्दी"
                  className="px-2 py-1 rounded-full text-[10px] font-mono font-bold bg-white text-neutral-700 border border-black/10 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  {currentLang === "ta" ? "தமிழ்" : currentLang === "hi" ? "हिन्दी" : "EN"}
                </button>

                {/* Expand / Minimize */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Collapse" : "Expand"}
                  className="hidden md:flex p-1.5 text-[#86868b] hover:text-[#1d1d1f] rounded-full hover:bg-black/[0.05] transition-colors"
                >
                  {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                </button>

                {/* Estimator */}
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  title="Instant Estimator"
                  className="p-1.5 text-[#86868b] hover:text-[#0071e3] rounded-full hover:bg-black/[0.05] transition-colors"
                >
                  <Calculator size={15} />
                </button>

                {/* Clear */}
                <button
                  onClick={() => {
                    stopSpeaking();
                    setMessages([
                      {
                        id: `welcome-${Date.now()}`,
                        role: "assistant",
                        content: currentLang === "ta"
                          ? `வணக்கம்! நான் **பிரியா**, ஜேஎஸ்எம் இன்டெக்ரேட்டட் சர்வீசஸ் நிறுவனத்தின் மூத்த வரவேற்பாளர். மேனேஜிங் டைரக்டர் **ஸ்வீட்டி ஜே** மற்றும் ஆப்பரேஷன்ஸ் ஹெட் **மேஜர் ஏ.ஆர். தேவதாஸ் (ராணுவ வீரர்)** தலைமையில் இயங்கும் எங்களது பாதுகாப்பு, மனிதவளம் மற்றும் வசதி மேலாண்மை சேவைகளுக்கு தங்களை அன்புடன் வரவேற்கிறேன். தங்களுக்கு எவ்வாறு உதவ முடியும்?`
                          : `Namaste! I am **Priya**, Senior Operations Officer & Executive Receptionist for **JSM Integrated Services** under Proprietor & MD **Sweety J** and Head of Operations & Audit **Major AR Devadoss (Army-Veteran)**.\n\nI can answer any query—from real-time weather and news to our step-by-step security deployment process, DGR quotas, or booking an official appointment with our Managing Director.`,
                        timestamp: "Just now",
                      }
                    ]);
                  }}
                  title="Clear Conversation"
                  className="p-1.5 text-[#86868b] hover:text-red-600 rounded-full hover:bg-black/[0.05] transition-colors"
                >
                  <Trash2 size={15} />
                </button>

                {/* Close */}
                <button
                  onClick={() => {
                    stopSpeaking();
                    setIsOpen(false);
                  }}
                  className="p-1.5 text-[#86868b] hover:text-[#1d1d1f] rounded-full hover:bg-black/[0.05] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* LIVE ACTIVE SPEAKING BANNER WITH INSTANT 1-TAP STOP VOICE BUTTON */}
            {isSpeaking && (
              <div className="bg-neutral-950 text-white px-4 py-2 flex items-center justify-between border-b border-emerald-500/40 shadow-inner">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-1 h-4 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                    <span className="w-1 h-4 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-300">
                    {currentLang === "ta" ? "பிரியா பேசுகிறார் (ElevenLabs)..." : "Priya is speaking (ElevenLabs British Voice)..."}
                  </span>
                </div>
                <button
                  onClick={stopSpeaking}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors press-scale shadow-sm cursor-pointer"
                >
                  <Square size={10} fill="currentColor" />
                  <span>{currentLang === "ta" ? "நிறுத்து" : "Stop / Mute"}</span>
                </button>
              </div>
            )}

            {/* In-Chat Instant Calculator Dropdown */}
            {showCalculator && (
              <div className="bg-[#f5f5f7] border-b border-black/[0.08] p-4 space-y-3 text-xs font-semibold text-[#1d1d1f] animate-in slide-in-from-top-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0071e3] flex items-center gap-1.5">
                    <Calculator size={13} /> Instant Commercial Estimator
                  </span>
                  <button onClick={() => setShowCalculator(false)} className="text-[#86868b] hover:text-[#1d1d1f] p-1 rounded-full hover:bg-black/[0.05]">
                    <X size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-[#86868b] font-medium block mb-1">Service Type</label>
                    <select
                      value={calcService}
                      onChange={(e) => setCalcService(e.target.value)}
                      className="w-full h-8 px-2.5 bg-white border border-black/[0.08] rounded-xl text-xs text-[#1d1d1f] outline-none focus:ring-1 focus:ring-[#0071e3]"
                    >
                      <option value="Security Guarding (24/7)">Security Guarding</option>
                      <option value="Commercial Housekeeping">Housekeeping &amp; Hygiene</option>
                      <option value="Contractual Manpower">Contractual Manpower</option>
                      <option value="Event Security Detail">Event Security / Bouncers</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#86868b] font-medium block mb-1">Headcount / Posts</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={calcUnits}
                      onChange={(e) => setCalcUnits(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full h-8 px-2.5 bg-white border border-black/[0.08] rounded-xl text-xs text-[#1d1d1f] outline-none focus:ring-1 focus:ring-[#0071e3]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-black/[0.06] flex items-center justify-between shadow-2xs">
                  <div>
                    <p className="text-[10px] text-[#86868b]">Estimated Budget:</p>
                    <p className="text-sm font-bold text-[#1d1d1f] tabular-nums">{calculateEstimatedCost()}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      setShowCalculator(false);
                      handleSendMessage(`I need a formal quote for ${calcUnits} personnel for ${calcService}.`);
                    }}
                    className="bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-[10px] font-semibold h-7 px-3.5 shadow-2xs"
                  >
                    Request Official RFP →
                  </Button>
                </div>
              </div>
            )}

            {/* Chat Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white text-xs leading-relaxed">
              {messages.map((msg) => {
                const isAppt = msg.leadReference?.startsWith("JSM-APPT-");
                const isPlayingThis = isSpeaking && currentPlayingMsgId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 shadow-2xs ${
                        msg.role === "user"
                          ? "bg-[#0071e3] text-white rounded-br-xs"
                          : "bg-[#f5f5f7] text-[#1d1d1f] border border-black/[0.04] rounded-bl-xs"
                      }`}
                    >
                      <div className="whitespace-pre-line leading-relaxed font-normal">
                        {msg.content}
                      </div>

                      {/* Official Appointment Confirmation Card */}
                      {msg.isLeadCard && isAppt && (
                        <div className="mt-3 p-3.5 bg-neutral-950 border-2 border-emerald-500/50 rounded-2xl space-y-2.5 text-white shadow-xl">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono">
                            <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                            <span>OFFICIAL APPOINTMENT DOSSIER LOGGED</span>
                          </div>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            Your appointment request has been dispatched directly to Managing Director <strong>Sweety J</strong> and Executive Secretariat at <strong>jsmintegratedservices@outlook.com</strong>.
                          </p>
                          <div className="p-2 rounded-xl bg-white/10 text-emerald-300 font-mono text-xs font-bold">
                            Reference: #{msg.leadReference}
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1">
                            <a
                              href={`https://wa.me/919080863448?text=Hello%20JSM%20MD%20Office,%20I%20have%20an%20Appointment%20Ref%20${msg.leadReference}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors press-scale"
                            >
                              <Phone size={13} /> Confirm with MD Office on WhatsApp →
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Verified General Lead Confirmation Card */}
                      {msg.isLeadCard && !isAppt && (
                        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl space-y-2 text-[#1d1d1f]">
                          <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                            <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                            <span>Ticket Reference: {msg.leadReference}</span>
                          </div>
                          <p className="text-[11px] text-emerald-950">
                            Our Operations Desk in Trichy has created your priority file. An Operations Lead will connect with you within 2 business hours.
                          </p>
                          <a
                            href={`mailto:jsmintegratedservices@outlook.com?subject=Chat%20Reference%20${msg.leadReference}&body=Hi%20JSM%20Operations,%20I%20chatted%20with%20Priya%20and%20received%20Reference%20${msg.leadReference}.`}
                            className="mt-2 w-full bg-white hover:bg-emerald-100/50 border border-emerald-200 text-emerald-800 text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
                          >
                            <Mail size={14} className="text-emerald-600" /> Fast-track via Email →
                          </a>
                        </div>
                      )}

                      {/* Per-Message Listen / Replay Voice Button (ElevenLabs) */}
                      {msg.role === "assistant" && (
                        <div className="pt-1.5 flex items-center justify-between border-t border-black/[0.05]">
                          <button
                            onClick={() => {
                              if (isPlayingThis) {
                                stopSpeaking();
                              } else {
                                speakText(msg.content, msg.id);
                              }
                            }}
                            className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                              isPlayingThis
                                ? "bg-emerald-500 text-white animate-pulse"
                                : "text-[#86868b] hover:text-[#0071e3] hover:bg-black/[0.04]"
                            }`}
                            title="Listen with ElevenLabs Voice"
                          >
                            {isPlayingThis ? (
                              <>
                                <Square size={9} fill="currentColor" />
                                <span>Playing voice...</span>
                              </>
                            ) : (
                              <>
                                <Volume2 size={11} />
                                <span>Listen (ElevenLabs)</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-[#86868b] mt-1 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 bg-[#f5f5f7] border border-black/[0.04] rounded-2xl w-fit shadow-2xs">
                  <span className="w-1.5 h-1.5 bg-[#0071e3] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#0071e3] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#0071e3] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestion Chips */}
            <div className="px-3 py-2 bg-white border-t border-black/[0.06] overflow-x-auto flex gap-1.5 no-scrollbar">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.query)}
                  className="text-[10px] font-semibold whitespace-nowrap px-3 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#1d1d1f] hover:text-white border border-black/[0.04] text-[#515154] transition-colors shadow-2xs cursor-pointer press-scale"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Bottom Input Field & Voice Controls */}
            <div className="p-3 bg-[#f5f5f7] border-t border-black/[0.08] flex items-center gap-2">
              <button
                onClick={toggleListening}
                title={isListening ? "Listening... click to stop" : "Speak your message"}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-white text-[#515154] hover:text-[#1d1d1f] border border-black/[0.06]"
                }`}
              >
                <Mic size={16} />
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                onFocus={unlockAudio}
                placeholder={
                  currentLang === "ta"
                    ? "பிரியாவிடம் கேளுங்கள் (எ.கா. இன்றைய வானிலை, பாதுகாப்பு சேவைகள்...)"
                    : "Ask Priya anything (e.g. weather, news, security deployment)..."
                }
                className="flex-1 bg-white border border-black/[0.08] rounded-full px-4 py-2 text-xs text-[#1d1d1f] placeholder:text-[#86868b] outline-none focus:ring-1 focus:ring-[#0071e3] transition-all"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="w-8 h-8 rounded-full bg-[#0071e3] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#0077ed] transition-colors shrink-0 shadow-xs cursor-pointer press-scale"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
