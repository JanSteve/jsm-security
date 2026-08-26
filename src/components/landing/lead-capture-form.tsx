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
    <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-zinc-100">
      <h3 className="text-2xl font-black text-[#0A1628] mb-6">Get a Free Quote</h3>
      
      {status === "success" ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200"
        >
          <p className="font-bold">Thank you!</p>
          <p className="text-sm mt-1">We have received your requirement. Our team will contact you shortly.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-zinc-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-zinc-700 mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-zinc-700 mb-1">Email Address (Optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="requirement" className="block text-sm font-bold text-zinc-700 mb-1">Requirement Details</label>
            <textarea
              id="requirement"
              name="requirement"
              required
              value={formData.requirement}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all resize-none"
              placeholder={`Tell us about your ${service.toLowerCase()} needs...`}
            />
          </div>

          {status === "error" && (
            <p className="text-red-500 text-sm">Something went wrong. Please try again or contact us via WhatsApp.</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#0A1628] hover:bg-[#152336] text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Request Quote</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
