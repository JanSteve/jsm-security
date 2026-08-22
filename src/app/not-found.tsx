import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-4 text-center pt-24">
      <div className="relative mb-6">
        <h1 className="text-8xl sm:text-9xl font-black text-zinc-100 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-black text-black">Page Not Found</span>
        </div>
      </div>
      
      <p className="text-zinc-500 max-w-md mb-8 text-sm font-medium leading-relaxed">
        The operational page you requested may have been relocated or updated under our reorganized service catalog.
      </p>
      
      <Button asChild size="lg" className="bg-black hover:bg-zinc-800 text-white rounded-full px-6 text-xs font-bold shadow-md">
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to JSM Homepage
        </Link>
      </Button>
    </div>
  );
}
