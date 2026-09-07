"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, Loader2 } from "lucide-react";

interface LeadCaptureFormProps {
  sourcePage: string;
  service: string;
}

export function LeadCaptureForm({ sourcePage, service }: LeadCaptureFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/landing-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source_page: sourcePage,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", requirement: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-[#0B0F17] p-8 rounded-3xl shadow-2xl border border-zinc-800">
      <h3 className="text-2xl font-black text-white mb-6 text-balance">Get a free quote</h3>
      
      {status === "success" ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-950/60 text-emerald-300 p-4 rounded-xl border border-emerald-800/80"
        >
          <p className="font-bold">Thank you!</p>
          <p className="text-sm mt-1 text-emerald-400">We have received your requirement. Our team will contact you shortly.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-zinc-300 mb-1.5">Full name <span className="text-[#C5A880]">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all min-h-[44px]"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-zinc-300 mb-1.5">Phone number <span className="text-[#C5A880]">*</span></label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all tabular-nums min-h-[44px]"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold text-zinc-300 mb-1.5">Email address (optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all min-h-[44px]"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="requirement" className="block text-xs font-bold text-zinc-300 mb-1.5">Requirement details <span className="text-[#C5A880]">*</span></label>
            <textarea
              id="requirement"
              name="requirement"
              required
              value={formData.requirement}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all resize-none"
              placeholder={`Tell us about your ${service.toLowerCase()} needs...`}
            />
          </div>

          {status === "error" && (
            <p className="text-red-400 text-xs">Something went wrong. Please try again or contact us via email.</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-full flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-[#C5A880] shadow-lg min-h-[44px] press-scale"
          >
            {status === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Request quote</span>
                <Send className="w-4 h-4 text-black" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
