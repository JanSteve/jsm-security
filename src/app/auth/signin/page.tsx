"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Shield, Lock, BadgeCheck, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [corporateId, setCorporateId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Mock Authentication Logic
    setTimeout(() => {
      if (
        (corporateId.includes("@") || corporateId.startsWith("JSM-") || corporateId.length > 2) &&
        password.length >= 4
      ) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Enter any Corporate ID / Email and password to test the client dashboard.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <main className="bg-[#fbf9f4] text-zinc-900 font-sans min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-24 selection:bg-[#ffdea5] selection:text-black">
      {/* Decorative Architectural Lines (Background from Stitch) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-black/5 hidden md:block" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-black/5 hidden md:block" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-black/5" />
      </div>

      {/* Login Container */}
      <div className="w-full max-w-[480px] relative z-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black text-base shadow-sm">
              JSM
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            JSM Integrated Services
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium">
            Secure Client &amp; Attendance Portal Access
          </p>
        </div>

        {/* Login Card from Stitch */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 sm:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#e9c176]" />

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Email/ID Field */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-600 mb-2 uppercase tracking-widest">
                Corporate ID / Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <BadgeCheck size={18} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. client@corp.in or JSM-9021"
                  value={corporateId}
                  onChange={(e) => setCorporateId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-0 border-b border-zinc-300 bg-zinc-50/60 focus:bg-white focus:ring-0 focus:border-black transition-colors text-xs font-medium text-black placeholder:text-zinc-400 rounded-t-lg"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-600 mb-2 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border-0 border-b border-zinc-300 bg-zinc-50/60 focus:bg-white focus:ring-0 focus:border-black transition-colors text-xs font-medium text-black placeholder:text-zinc-400 rounded-t-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-black"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember session & Forgot link */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-600">
                <input type="checkbox" defaultChecked className="rounded text-black focus:ring-black" />
                <span>Remember session</span>
              </label>
              <a href="mailto:jsmintegratedservices@outlook.com?subject=Portal%20Password%20Reset%20Request" className="text-[#C5A880] hover:underline font-bold">
                Reset Credentials
              </a>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white hover:bg-zinc-800 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 border-b-2 border-[#e9c176]"
            >
              {loading ? "Authenticating Session..." : "Sign In to Portal"}
              {!loading && <ArrowRight size={15} />}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-8 pt-6 border-t border-zinc-100 text-center text-[11px] text-zinc-500">
            <span>Demo credentials: enter </span>
            <strong className="text-black">admin@corp.in</strong>
            <span> and password </span>
            <strong className="text-black">demo123</strong>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="text-center text-[11px] text-zinc-500 flex items-center justify-center gap-1.5 font-medium">
          <Shield size={14} className="text-[#C5A880]" />
          <span>256-Bit SSL Encrypted Enterprise Infrastructure</span>
        </div>
      </div>
    </main>
  );
}
