import Link from 'next/link';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#07090E] text-zinc-100 flex flex-col items-center justify-center px-4 py-32 relative overflow-hidden selection:bg-[#C5A880]/30 selection:text-white">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
        <div className="absolute right-1/3 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="max-w-xl mx-auto text-center relative z-10 space-y-6">
        <span className="text-[11px] font-mono font-bold tracking-[0.15em] text-[#C5A880] uppercase">
          Coordinate error • Code 404
        </span>

        <h1 className="text-7xl sm:text-9xl font-black text-white tracking-tight leading-none tabular-nums font-mono">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight text-balance">
          Route parameter not found.
        </h2>

        <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-md mx-auto text-pretty">
          The operational coordinate or page you requested is outside our mapped directory. Please return to the standard navigation or explore our capabilities catalog.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black rounded-full text-xs font-bold px-8 h-12 border border-[#C5A880] shadow-lg press-scale min-h-[44px]">
            <Link href="/">
              <ArrowLeft size={14} className="mr-2" />
              Return to homepage
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-[#0B0F17] hover:bg-[#121824] text-white rounded-full text-xs font-bold px-8 h-12 border border-zinc-800 press-scale min-h-[44px]">
            <Link href="/services">
              Explore capabilities <ArrowRight size={14} className="ml-2 text-[#C5A880]" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
