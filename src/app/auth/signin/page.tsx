"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Mock Authentication Logic
    setTimeout(() => {
      if (email.endsWith("@jsm.com") && password === "demo123") {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Try any email ending in @jsm.com with password 'demo123'.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white grid grid-cols-1 lg:grid-cols-2 pt-16 lg:pt-0">
      
      {/* Left side: branding/tagline and Portal Image Mockup (Apple style) */}
      <div className="hidden lg:flex flex-col justify-center items-start bg-zinc-50 border-r border-zinc-200 p-12 xl:p-24 space-y-8 relative overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-[#C5A880]/5 blur-3xl -top-10 -left-10" />
        
        <div className="space-y-4 relative z-10">
          <h2 className="text-5xl font-black text-black leading-tight tracking-tight">
            Enterprise Client<br />
            <span className="text-[#C5A880]">Portal</span>
          </h2>
          <p className="text-lg text-zinc-500 font-medium max-w-md leading-relaxed">
            Securely access your integrated services dashboard, manage operational requests, and review auditing documentation.
          </p>
        </div>

        {/* Portal Screen Mockup Image */}
        <div className="w-full max-w-md rounded-2xl overflow-hidden border border-zinc-200 shadow-lg p-1 bg-white relative z-10">
          <img 
            src="/images/portal_laptop.jpg" 
            alt="JSM Client Portal Dashboard Mockup" 
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        <div className="flex gap-4 items-center relative z-10 border-t border-zinc-200 pt-8 w-full max-w-md">
          <div className="p-3 bg-white border border-zinc-200 rounded-xl text-[#C5A880] shadow-sm">
            <Shield size={20} />
          </div>
          <div>
            <h4 className="font-bold text-black text-sm">256-bit SSL Encrypted Connection</h4>
            <p className="text-xs text-zinc-500 font-medium">Your credentials and session are fully isolated and protected.</p>
          </div>
        </div>
      </div>

      {/* Right side: form */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-full max-w-md bg-zinc-50 border border-zinc-200/60 rounded-3xl p-8 space-y-8 shadow-sm"
        >
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-black text-black tracking-tight">Sign In</h1>
            <p className="text-sm text-zinc-500 font-medium">Enter your enterprise credentials to access the portal.</p>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-600 font-semibold">Corporate Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@jsm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-zinc-200 text-black focus-visible:border-[#C5A880] focus-visible:ring-0 pl-12 h-12 rounded-2xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-zinc-600 font-semibold">Portal Password</Label>
                <Link href="#" className="text-xs text-[#3B82F6] hover:underline font-semibold">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border-zinc-200 text-black focus-visible:border-[#C5A880] focus-visible:ring-0 pl-12 h-12 rounded-2xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white hover:bg-zinc-800 font-semibold h-12 rounded-full text-base shadow-md"
            >
              {loading ? "Authenticating..." : "Sign In to Portal"}
            </Button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-zinc-200" />
            <span className="flex-shrink mx-4 text-zinc-400 text-xs font-semibold">OR CONTINUE WITH</span>
            <div className="flex-grow border-t border-zinc-200" />
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full border-zinc-200 text-zinc-700 hover:bg-zinc-50 h-12 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
          >
            {/* Simple Inline Google Logo */}
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </Button>

          <p className="text-center text-sm text-zinc-500 font-medium">
            Don't have a client account?{" "}
            <Link href="/contact" className="text-[#3B82F6] hover:underline font-semibold">Request Access</Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
