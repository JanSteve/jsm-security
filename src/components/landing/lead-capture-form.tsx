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
    <div className="bg-white p-8 rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/[0.08]">
      <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-6 text-balance">Get a free quote</h3>
      
      {status === "success" ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 text-emerald-900 p-4 rounded-2xl border border-emerald-200"
        >
          <p className="font-semibold">Thank you!</p>
          <p className="text-xs mt-1 text-emerald-700">We have received your requirement. Our team will contact you shortly.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-[#515154] mb-1.5">Full name <span className="text-[#0071e3]">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-black/[0.08] bg-[#f5f5f7] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all min-h-[44px] text-xs font-medium"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-[#515154] mb-1.5">Phone number <span className="text-[#0071e3]">*</span></label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-black/[0.08] bg-[#f5f5f7] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all tabular-nums min-h-[44px] text-xs font-medium"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-[#515154] mb-1.5">Email address (optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-black/[0.08] bg-[#f5f5f7] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all min-h-[44px] text-xs font-medium"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="requirement" className="block text-xs font-semibold text-[#515154] mb-1.5">Requirement details <span className="text-[#0071e3]">*</span></label>
            <textarea
              id="requirement"
              name="requirement"
              required
              value={formData.requirement}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border border-black/[0.08] bg-[#f5f5f7] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all resize-none text-xs font-medium leading-relaxed"
              placeholder={`Tell us about your ${service.toLowerCase()} needs...`}
            />
          </div>

          {status === "error" && (
            <p className="text-rose-500 text-xs">Something went wrong. Please try again or contact us via email.</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold py-3.5 rounded-full flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm min-h-[44px] press-scale text-xs"
          >
            {status === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Request quote</span>
                <Send className="w-4 h-4 text-white" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
