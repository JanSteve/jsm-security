import Link from 'next/link';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] flex flex-col items-center justify-center px-4 py-32 relative overflow-hidden selection:bg-[#0071e3]/15 selection:text-black">
      <div className="max-w-xl mx-auto text-center relative z-10 space-y-6">
        <span className="text-[12px] font-semibold tracking-wider text-[#0071e3] uppercase">
          Error 404
        </span>

        <h1 className="text-7xl sm:text-9xl font-bold text-[#1d1d1f] tracking-tight leading-none tabular-nums font-sans">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight text-balance">
          The page you're looking for can't be found.
        </h2>

        <p className="text-sm sm:text-base text-[#86868b] font-normal leading-relaxed max-w-md mx-auto text-pretty">
          The page you requested is outside our directory. Return to the homepage or explore our security and integrated facility services.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold px-8 h-12 shadow-sm press-scale min-h-[44px]">
            <Link href="/">
              <ArrowLeft size={14} className="mr-2" />
              Return to Homepage
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] rounded-full text-xs font-semibold px-8 h-12 border border-black/[0.08] press-scale min-h-[44px]">
            <Link href="/services">
              Explore Services <ArrowRight size={14} className="ml-2 text-[#86868b]" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
