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
  ChevronDown
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
  const [showCalculator, setShowCalculator] = useState(false);

  // Quote Calculator State
  const [calcService, setCalcService] = useState("Security Guarding (24/7)");
  const [calcUnits, setCalcUnits] = useState(2);
  const [calcShift, setCalcShift] = useState("12-Hour");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `Namaste! I am **Priya**, Executive AI Advisor for **JSM Integrated Services** under Managing Director **Sweety R**.\n\nHow can I help you today? You can ask about our **rates**, our **Trichy Airport landmark contract**, **5-day induction training**, or calculate an instant estimate below.`,
      timestamp: "Just now",
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, "");
  const cleanPhone = brandData.contact.phone.replace(/[^0-9+]/g, "");

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showCalculator]);

  // Voice synthesis text-to-speech helper
  const speakText = (text: string) => {
    if (!isSpeechEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Strip markdown formatting for cleaner speech
      const cleanSpeech = text.replace(/[*_#•]/g, "").replace(/\n+/g, " ");
      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      utterance.lang = "en-IN";
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis fallback
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
        recognition.lang = "en-IN";
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
        }),
      });

      const data = await response.json();

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Thank you. Our operations team has noted your query.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isLeadCard: data.isLeadCapture,
        leadReference: data.leadReference,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      speakText(assistantMsg.content);
    } catch {
      const fallbackMsg: Message = {
        id: `assistant-fallback-${Date.now()}`,
        role: "assistant",
        content: "Thank you for reaching out to JSM Integrated Services. Our operations desk is available directly on WhatsApp (+91 94431 52000) or email at jsmintegratedservices@outlook.com for immediate proposals.",
        timestamp: "Now",
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Quick prompt chips
  const quickPrompts = [
    { label: "💰 Guard Pricing", query: "What are your security guard charges per month in Tamil Nadu?" },
    { label: "✈️ Trichy Airport Contract", query: "Tell me about your 2024 Trichy International Airport assignment." },
    { label: "🧹 Housekeeping SOP", query: "What is your 5-step housekeeping facility hygiene framework?" },
    { label: "👷 Manpower Supply", query: "How quickly can you deploy contractual warehouse and factory manpower?" },
    { label: "📅 Free Site Risk Audit", query: "I want to request a free site assessment for my property." },
    { label: "📍 Tamil Nadu Coverage", query: "Which cities in Tamil Nadu do you currently provide service in?" }
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
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className="hidden sm:flex items-center gap-3 bg-white text-zinc-900 px-4 py-2.5 rounded-full shadow-2xl border border-zinc-200/80 cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setUnreadCount(0);
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-bold">
              Ask Priya • JSM AI Receptionist
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
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative ${
            isOpen 
              ? "bg-black text-white" 
              : "bg-black text-white hover:bg-zinc-800 border border-zinc-700"
          }`}
          aria-label="Toggle JSM AI Receptionist"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <>
              <Bot size={26} className="text-[#C5A880]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-white">
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
            className={`fixed z-50 bg-white border border-zinc-200/90 shadow-2xl rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${
              isExpanded
                ? "top-6 bottom-6 left-6 right-6 md:left-auto md:w-[680px]"
                : "bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[85vh]"
            }`}
          >
            {/* Header */}
            <div className="bg-zinc-900 text-white px-5 py-4 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[#C5A880]">
                    <Bot size={22} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-zinc-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white">JSM Priya</h3>
                    <span className="text-[10px] font-extrabold bg-[#C5A880] text-black px-1.5 py-0.2 rounded-md">
                      AI RECEPTIONIST
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-medium">Executive Operations & Solutions Desk</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Text to speech toggle */}
                <button
                  onClick={() => {
                    if (isSpeechEnabled) window?.speechSynthesis?.cancel();
                    setIsSpeechEnabled(!isSpeechEnabled);
                  }}
                  title={isSpeechEnabled ? "Mute voice readouts" : "Enable voice readouts"}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  {isSpeechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>

                {/* Instant Quote Calculator Toggle */}
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  title="Instant Quote Estimator"
                  className="p-1.5 text-zinc-400 hover:text-[#C5A880] rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <Calculator size={16} />
                </button>

                {/* Expand / Minimize Toggle */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Collapse" : "Expand"}
                  className="hidden sm:block p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* In-Chat Instant Calculator Dropdown */}
            {showCalculator && (
              <div className="bg-zinc-50 border-b border-zinc-200 p-4 space-y-3 text-xs font-semibold text-zinc-700 animate-in slide-in-from-top-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A880] flex items-center gap-1">
                    <Calculator size={13} /> Instant Commercial Estimator
                  </span>
                  <button onClick={() => setShowCalculator(false)} className="text-zinc-400 hover:text-black">
                    <X size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-1">Service Type</label>
                    <select
                      value={calcService}
                      onChange={(e) => setCalcService(e.target.value)}
                      className="w-full h-8 px-2 bg-white border border-zinc-200 rounded-lg text-xs"
                    >
                      <option value="Security Guarding (24/7)">Security Guarding</option>
                      <option value="Commercial Housekeeping">Housekeeping & Hygiene</option>
                      <option value="Contractual Manpower">Contractual Manpower</option>
                      <option value="Event Security Detail">Event Security / Bouncers</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-1">Headcount / Posts</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={calcUnits}
                      onChange={(e) => setCalcUnits(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full h-8 px-2 bg-white border border-zinc-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-zinc-200/80 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-zinc-400">Estimated Budget Range:</p>
                    <p className="text-sm font-black text-black">{calculateEstimatedCost()}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      setShowCalculator(false);
                      handleSendMessage(`I need a formal quote for ${calcUnits} personnel for ${calcService}.`);
                    }}
                    className="bg-black hover:bg-zinc-800 text-white rounded-full text-[10px] h-7 px-3"
                  >
                    Request Official RFP →
                  </Button>
                </div>
              </div>
            )}

            {/* Chat Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 text-xs leading-relaxed">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 shadow-xs ${
                      msg.role === "user"
                        ? "bg-black text-white rounded-br-none"
                        : "bg-white text-zinc-800 border border-zinc-200/80 rounded-bl-none"
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed font-medium">
                      {msg.content}
                    </div>

                    {/* Verified Lead Confirmation Card */}
                    {msg.isLeadCard && (
                      <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-zinc-800">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                          <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                          <span>Ticket Reference: {msg.leadReference}</span>
                        </div>
                        <p className="text-[11px] text-emerald-900">
                          Our Operations Desk in Trichy has created your priority file. An Operations Lead will connect with you within 2 business hours.
                        </p>
                        <a
                          href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Operations,%20I%20chatted%20with%20Priya%20and%20received%20Reference%20${msg.leadReference}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline pt-1"
                        >
                          <MessageCircle size={14} className="text-emerald-600" /> Fast-track on WhatsApp →
                        </a>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-zinc-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 bg-white border border-zinc-200 rounded-2xl w-fit shadow-xs">
                  <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestion Chips */}
            <div className="px-3 py-2 bg-white border-t border-zinc-200/60 overflow-x-auto flex gap-1.5 no-scrollbar">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.query)}
                  className="text-[10px] font-bold whitespace-nowrap px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-black hover:text-white border border-zinc-200 text-zinc-700 transition-colors shadow-xs"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Bottom Input Field & Voice Controls */}
            <div className="p-3 bg-white border-t border-zinc-200 flex items-center gap-2">
              <button
                onClick={toggleListening}
                title={isListening ? "Listening... click to stop" : "Speak your message"}
                className={`p-2 rounded-full transition-colors ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              <input
                type="text"
                placeholder={isListening ? "Listening..." : "Type your requirement, city, or question..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className="flex-1 h-10 px-3.5 bg-zinc-100/80 border border-zinc-200 rounded-full text-xs font-medium focus:outline-none focus:border-black text-zinc-900 placeholder:text-zinc-400"
              />

              <Button
                size="sm"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="h-10 w-10 p-0 rounded-full bg-black hover:bg-zinc-800 text-white flex items-center justify-center flex-shrink-0 shadow-md"
              >
                <Send size={15} />
              </Button>
            </div>

            {/* Direct WhatsApp Quick Contact Strip */}
            <div className="px-4 py-2 bg-zinc-900 text-white flex items-center justify-between text-[10px] font-semibold">
              <span className="text-zinc-400">Direct Helpline: +91 94431 52000</span>
              <a
                href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
              >
                <MessageCircle size={12} /> WhatsApp Fast Desk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
