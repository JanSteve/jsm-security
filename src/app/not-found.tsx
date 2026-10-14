import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center px-4 py-32 relative overflow-hidden selection:bg-cyan-500/30 selection:text-white bg-security-grid">
      <div className="absolute inset-0 bg-radial-cyan-spotlight pointer-events-none" />
      <div className="max-w-xl mx-auto text-center relative z-10 space-y-6 tactical-glass-card rounded-2xl p-8 sm:p-12 border border-cyan-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Error 404 &bull; Route Outside Directory</span>
        </div>

        <h1 className="text-7xl sm:text-9xl font-bold text-white tracking-tight leading-none tabular-nums font-sans">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
          The requested route cannot be located.
        </h2>

        <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-md mx-auto text-pretty">
          The page you requested is outside our operational directory. Return to central command or explore our integrated security, manpower, and facility services.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto btn-tactical-beam text-black font-bold rounded-lg text-xs px-8 h-12 press-scale min-h-[44px]">
            <Link href="/">
              <ArrowLeft size={14} className="mr-2" />
              Return to Central Command
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-[#080C16] hover:bg-cyan-950/30 text-white rounded-lg text-xs font-semibold px-8 h-12 border border-cyan-500/30 hover:border-cyan-400/50 press-scale min-h-[44px]">
            <Link href="/services">
              Explore Services <ArrowRight size={14} className="ml-2 text-cyan-400" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
