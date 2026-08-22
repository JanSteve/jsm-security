"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, CheckCircle2, PhoneCall, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandData } from "@/data/brand";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
  isLeadCard?: boolean;
  leadRef?: string;
}

export function AIReceptionist() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Namaste! I'm Priya, your AI Receptionist at **JSM Integrated Services**. We provide disciplined Security Guarding, Housekeeping, and Contractual Manpower across Tamil Nadu. How can I help you today?`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "💼 Request Manpower Quote",
    "🛡️ Schedule Security Assessment",
    "✨ Commercial Housekeeping",
    "✈️ Tell me about Trichy Airport project"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (customText?: string) => {
    const messageToSend = customText || input.trim();
    if (!messageToSend || loading) return;

    const userMessage: ChatMessage = { role: "user", content: messageToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!customText) setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            isLeadCard: data.leadCaptured,
            leadRef: data.leadReference
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Thank you for your message! Our operations team can also be reached directly on WhatsApp at " + brandData.contact.whatsappDisplay + "."
          }
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Thank you! Please connect with us directly at " + brandData.contact.email + " or call " + brandData.contact.phoneDisplay + " for urgent inquiries."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-black hover:bg-zinc-800 text-white p-3 md:px-5 md:py-3.5 rounded-full shadow-2xl border border-zinc-700/50 transition-all duration-200 group"
          aria-label="Open JSM AI Receptionist"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#C5A880] text-black flex items-center justify-center font-bold text-sm">
              <Bot size={18} />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
          </div>
          <span className="hidden md:inline font-semibold text-sm">
            Chat with Receptionist
          </span>
          <span className="text-xs px-2 py-0.5 bg-[#C5A880]/20 text-[#C5A880] rounded-full border border-[#C5A880]/40 font-medium">
            24/7 AI
          </span>
        </motion.button>
      </div>

      {/* Chat Window Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 md:bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-[410px] h-[520px] max-h-[80vh] bg-white border border-zinc-200/80 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-zinc-900 text-white p-4 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C5A880] text-black flex items-center justify-center font-bold">
                  <Bot size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white">JSM Receptionist (Priya)</h4>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-zinc-400">JSM Integrated Services • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sub-header Banner */}
            <div className="bg-zinc-50 border-b border-zinc-200/60 px-4 py-2 flex items-center justify-between text-xs text-zinc-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles size={13} className="text-[#C5A880]" />
                Instant Quotations & Site Bookings
              </span>
              <a
                href={`https://wa.me/${brandData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20JSM%20Integrated%20Services,%20I%20need%20assistance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
              >
                WhatsApp Us <ExternalLink size={11} />
              </a>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white text-sm">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 flex-shrink-0 mt-0.5">
                      <Bot size={15} />
                    </div>
                  )}

                  <div className="max-w-[82%] space-y-2">
                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed text-sm whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-black text-white rounded-br-none shadow-sm"
                          : "bg-zinc-100 text-zinc-800 rounded-bl-none border border-zinc-200/60"
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* Lead Captured Notification Card */}
                    {msg.isLeadCard && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2 text-emerald-900">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                          <CheckCircle2 size={15} className="text-emerald-600" />
                          Lead Ticket Created: {msg.leadRef || "JSM-LEAD-2026"}
                        </div>
                        <p className="text-[11px] text-emerald-700">
                          Our operations manager has been notified. We will reach out to you within 2 hours.
                        </p>
                        <Button
                          asChild
                          size="sm"
                          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl h-8 text-xs font-semibold"
                        >
                          <a
                            href={`https://wa.me/${brandData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20JSM%20Operations,%20my%20lead%20reference%20is%20${msg.leadRef || 'JSM-LEAD'}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <PhoneCall size={12} className="mr-1.5" /> Direct WhatsApp Fast-Track
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5 items-center text-zinc-500 text-xs py-2">
                  <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                    <Bot size={15} />
                  </div>
                  <div className="flex gap-1 items-center bg-zinc-100 px-3 py-2 rounded-2xl border border-zinc-200/60">
                    <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            {messages.length < 5 && (
              <div className="px-3 py-2 bg-zinc-50 border-t border-zinc-200/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 bg-white border border-zinc-200 rounded-full text-zinc-700 hover:border-black hover:text-black transition-colors flex-shrink-0 text-[11px] font-medium"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-zinc-200/80 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about staffing, security, rates..."
                className="flex-1 bg-zinc-100 border border-zinc-200/80 rounded-full px-4 py-2 text-sm text-zinc-800 focus:outline-none focus:border-black placeholder:text-zinc-400"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || loading}
                className="rounded-full bg-black text-white hover:bg-zinc-800 w-9 h-9 flex-shrink-0"
              >
                <Send size={15} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
