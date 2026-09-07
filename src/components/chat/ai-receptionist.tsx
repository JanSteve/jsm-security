"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bot, 
  X, 
  Send, 
  MessageCircle, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Calculator, 
  Maximize2, 
  Minimize2,
  ChevronDown,
  Trash2,
  Square,
  CheckCircle,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandData } from "@/data/brand";

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

  // Quote Calculator State
  const [calcService, setCalcService] = useState("Security Guarding (24/7)");
  const [calcUnits, setCalcUnits] = useState(2);
  const [calcShift, setCalcShift] = useState("12-Hour");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `Namaste! I am **Priya**, Senior Operations Officer & Executive Receptionist for **JSM Integrated Services** under Proprietor & MD **Sweety J** and Head of Operations & Audit **Major AR Devadoss (Army-Veteran)**.\n\nHow can I assist you today? I can explain our **step-by-step security deployment process**, **DGR Ex-Servicemen quotas**, **minimum wage breakdowns**, or schedule a **direct appointment with our Managing Director**. You can also reach our 24/7 operations desk on WhatsApp at **+91 90808 63448**.`,
      timestamp: "Just now",
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Speech Mute preference & Language from localStorage / cookies
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check mute preference
    const savedMute = localStorage.getItem("jsm_priya_voice_muted");
    if (savedMute === "true") {
      setIsSpeechEnabled(false);
    }

    // Check language from localStorage or cookie
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

    // Listen to language change events broadcasted across the site
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
  };

  // Toggle voice mute with persistent storage
  const toggleSpeech = () => {
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
  }, [messages, isTyping, showCalculator, isSpeaking]);

  // Natural human voice synthesis (British Female Voice Lily / Multilingual)
  const speakText = async (text: string) => {
    if (!isSpeechEnabled || typeof window === "undefined") return;

    stopSpeaking();
    setIsSpeaking(true);

    try {
      // 1. Primary: Stream studio-quality natural British / Multilingual voice MP3
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text, 
          lang: currentLang,
          voiceId: "pFZP5JQG7iQjIQuC4Bku" // Lily - Best British Female Voice on ElevenLabs
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audioPlayerRef.current = audio;
        
        audio.onended = () => {
          setIsSpeaking(false);
          audioPlayerRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
        };

        await audio.play();
        return;
      }
    } catch (err) {
      console.warn("Server TTS failed, falling back to local speech synthesis:", err);
    }

    // 2. Fallback: Browser Web Speech API with British Female or Native Tamil Voice
    if ("speechSynthesis" in window) {
      try {
        const cleanSpeech = text
          .replace(/[*_#•`~]/g, "")
          .replace(/https?:\/\/\S+/g, "")
          .replace(/\+91\s?/g, "plus nine one ")
          .replace(/\n+/g, ". ");

        const utterance = new SpeechSynthesisUtterance(cleanSpeech);
        utterance.rate = 0.98;
        utterance.pitch = 1.02;

        const voices = window.speechSynthesis.getVoices();
        
        if (currentLang === "ta") {
          // Tamil Voice
          const tamilVoice = voices.find(v => v.lang.startsWith("ta") || v.name.toLowerCase().includes("tamil"));
          if (tamilVoice) {
            utterance.voice = tamilVoice;
            utterance.lang = "ta-IN";
          }
        } else if (currentLang === "hi") {
          // Hindi Voice
          const hindiVoice = voices.find(v => v.lang.startsWith("hi") || v.name.toLowerCase().includes("hindi"));
          if (hindiVoice) {
            utterance.voice = hindiVoice;
            utterance.lang = "hi-IN";
          }
        } else {
          // British Female Voice for Priya in English
          const britishVoice = voices.find(v => 
            (v.lang === "en-GB" || v.lang.startsWith("en-GB")) && v.name.toLowerCase().includes("female")
          ) || voices.find(v =>
            v.name.includes("Google UK English Female") ||
            v.name.includes("Victoria") ||
            v.name.includes("Serena") ||
            v.name.includes("Fiona") ||
            (v.lang.startsWith("en-GB"))
          ) || voices.find(v =>
            v.name.includes("Samantha") || (v.name.toLowerCase().includes("female") && v.lang.startsWith("en"))
          );

          if (britishVoice) {
            utterance.voice = britishVoice;
            utterance.lang = "en-GB";
          }
        }

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn("Local speech synthesis failed:", e);
        setIsSpeaking(false);
      }
    }
  };

  // Toggle voice recognition (Speech to Text)
  const toggleListening = () => {
    if (typeof window === "undefined") return;
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

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Thank you. Our operations team has noted your query.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isLeadCard: data.isLeadCapture || data.isAppointment,
        leadReference: data.appointmentReference || data.leadReference,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      speakText(assistantMsg.content);
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
      { label: "🛡️ பாதுகாப்பு திட்டம்", query: "ஜேஎஸ்எம் பாதுகாப்பு திட்டங்கள் மற்றும் அரசு விதிமுறைகளை விளக்குங்கள்." },
      { label: "⚙️ பாதுகாப்பு பணியமர்த்தும் முறை", query: "பாதுகாப்பு காவலர்களை எவ்வாறு பணியமர்த்துவது? வழிமுறைகளை கூறுங்கள்." },
      { label: "🎖️ முன்னாள் ராணுவ மேற்பார்வை", query: "முன்னாள் ராணுவ வீரர்கள் மேற்பார்வை பற்றி கூறுங்கள்." },
      { label: "📄 விண்ணப்ப படிவம் (Form A/B)", query: "வேலைக்கான Form A / Form B படிவங்களை எவ்வாறு பதிவிறக்குவது?" },
      { label: "💬 நேரடி வாட்ஸ்அப்", query: "வாட்ஸ்அப் மூலம் உடனடியாக தொடர்பு கொள்ள விரும்புகிறேன்." }
    ] : [
      { label: "📅 Book Appointment with MD", query: "I would like to schedule an official appointment with Managing Director Sweety J." },
      { label: "⚙️ How Deployment Works", query: "Explain the complete step-by-step process of hiring and deploying security guards." },
      { label: "🛡️ DGR Security Schemes", query: "Explain your DGR-aligned security schemes and empanelment standards." },
      { label: "🎖️ ESM Supervisors", query: "What are your Ex-Servicemen (ESM) security supervisor deployment options?" },
      { label: "📄 Download Job Form A/B", query: "How do I download and submit Form A or Form B for employment?" },
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
              setIsOpen(true);
              setUnreadCount(0);
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-semibold tracking-tight">
              {currentLang === "ta" ? "பிரியாவிடம் கேளுங்கள் • JSM AI வரவேற்பாளர்" : "Ask Priya • JSM Operations AI"}
            </p>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
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
                : "bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[440px] h-[600px] max-h-[85vh]"
            }`}
          >
            {/* Apple Clean Header */}
            <div className="bg-[#f5f5f7] text-[#1d1d1f] px-4 sm:px-5 py-3.5 flex items-center justify-between border-b border-black/[0.08]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-black border border-black/10 flex items-center justify-center overflow-hidden shadow-2xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/jsm_logo_black.png"
                      alt="Priya"
                      className="w-full h-full object-cover scale-105"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1d1d1f]">Priya</h3>
                    <span className="text-[9px] font-mono font-bold bg-[#0071e3]/10 text-[#0071e3] px-2 py-0.2 rounded-full uppercase tracking-wider">
                      RECEPTIONIST
                    </span>
                  </div>
                  <p className="text-[10px] text-[#86868b] font-medium">
                    {isSpeaking ? "Speaking naturally..." : "Senior Front-Desk Operations Officer"}
                  </p>
                </div>
              </div>

              {/* Action Clusters: Mute Toggle, Language Switcher, Estimator, Close */}
              <div className="flex items-center gap-1.5">
                {/* PROMINENT VOICE MUTE / UNMUTE BUTTON */}
                <button
                  onClick={toggleSpeech}
                  title={isSpeechEnabled ? "Voice Active (Click to Mute)" : "Voice Muted (Click to Enable)"}
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

                {/* Instant Quote Estimator Toggle */}
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  title="Instant Quote Estimator"
                  className="p-1.5 text-[#86868b] hover:text-[#0071e3] rounded-full hover:bg-black/[0.05] transition-colors"
                >
                  <Calculator size={15} />
                </button>

                {/* Clear Conversation */}
                <button
                  onClick={() => {
                    stopSpeaking();
                    setMessages([
                      {
                        id: `welcome-${Date.now()}`,
                        role: "assistant",
                        content: currentLang === "ta"
                          ? `வணக்கம்! நான் **பிரியா**, ஜேஎஸ்எம் இன்டெக்ரேட்டட் சர்வீசஸ் நிறுவனத்தின் மூத்த வரவேற்பாளர். மேனேஜிங் டைரக்டர் **ஸ்வீட்டி ஜே** மற்றும் ஆப்பரேஷன்ஸ் ஹெட் **மேஜர் ஏ.ஆர். தேவதாஸ் (ராணுவ வீரர்)** தலைமையில் இயங்கும் எங்களது பாதுகாப்பு, மனிதவளம் மற்றும் வசதி மேலாண்மை சேவைகளுக்கு தங்களை அன்புடன் வரவேற்கிறேன். தங்களுக்கு எவ்வாறு உதவ முடியும்?`
                          : `Namaste! I am **Priya**, Senior Operations Officer & Executive Receptionist for **JSM Integrated Services** under Proprietor & MD **Sweety J** and Head of Operations & Audit **Major AR Devadoss (Army-Veteran)**.\n\nHow can I assist you today? I can explain our **step-by-step security deployment process**, **DGR Ex-Servicemen quotas**, **minimum wage breakdowns**, or schedule a **direct appointment with our Managing Director**.`,
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

            {/* LIVE ACTIVE SPEAKING BANNER WITH 1-TAP STOP VOICE BUTTON */}
            {isSpeaking && (
              <div className="bg-neutral-950 text-white px-4 py-2 flex items-center justify-between border-b border-emerald-500/40 shadow-inner">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-emerald-300">
                    {currentLang === "ta" ? "பிரியா பேசுகிறார்..." : "Priya is speaking..."}
                  </span>
                </div>
                <button
                  onClick={stopSpeaking}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors press-scale shadow-sm cursor-pointer"
                >
                  <Square size={10} fill="currentColor" />
                  <span>{currentLang === "ta" ? "குரலை நிறுத்து" : "Stop / Mute"}</span>
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
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              <input
                type="text"
                placeholder={isListening ? "Listening..." : currentLang === "ta" ? "உங்கள் தேவையை இங்கே தட்டச்சு செய்யவும்..." : "Type your requirement, city, or question..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className="flex-1 h-10 px-4 bg-white border border-black/[0.08] rounded-full text-xs font-normal focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] text-[#1d1d1f] placeholder:text-[#86868b]"
              />

              <Button
                size="sm"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="h-10 w-10 p-0 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer press-scale disabled:opacity-40"
              >
                <Send size={14} />
              </Button>
            </div>

            {/* Direct Email Quick Contact Strip */}
            <div className="px-4 py-2 bg-[#f5f5f7] border-t border-black/[0.06] text-[#86868b] flex items-center justify-between text-[10px] font-mono">
              <span>Trichy HQ Operations Desk</span>
              <a
                href="mailto:jsmintegratedservices@outlook.com?subject=Executive%20Inquiry"
                className="text-[#0071e3] hover:underline flex items-center gap-1 font-semibold"
              >
                <Mail size={12} /> Email MD Office
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
