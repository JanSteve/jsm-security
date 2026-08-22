import Link from 'next/link';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fbf9f4] text-zinc-900 flex flex-col items-center justify-center px-4 py-32 relative overflow-hidden selection:bg-[#ffdea5] selection:text-black">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-black/5 hidden md:block" />
        <div className="absolute right-1/3 top-0 bottom-0 w-px bg-black/5 hidden md:block" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/5" />
      </div>

      <div className="max-w-xl mx-auto text-center relative z-10 space-y-6">
        <span className="text-[11px] font-bold tracking-[0.15em] text-[#C5A880] uppercase">
          COORDINATE ERROR • CODE 404
        </span>

        <h1 className="text-7xl sm:text-9xl font-black text-black tracking-tight leading-none">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
          Route Parameter Not Found.
        </h2>

        <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed max-w-md mx-auto">
          The operational coordinate or page you requested is outside our mapped directory. Please return to the standard navigation or explore our capabilities catalog.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto bg-black hover:bg-zinc-800 text-white rounded-sm text-xs font-bold uppercase tracking-widest px-8 h-12 border-b-2 border-[#e9c176] shadow-md">
            <Link href="/">
              <ArrowLeft size={14} className="mr-2" />
              Return to Homepage
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-white hover:bg-zinc-100 text-black rounded-sm text-xs font-bold uppercase tracking-widest px-8 h-12 border border-zinc-300">
            <Link href="/services">
              Explore Capabilities <ArrowRight size={14} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
