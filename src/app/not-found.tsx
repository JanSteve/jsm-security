import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mb-8">
        <h1 className="text-9xl font-bold font-jakarta text-primary opacity-20 select-none animate-pulse">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold font-jakarta text-foreground">404</span>
        </div>
      </div>
      
      <h2 className="text-2xl font-jakarta font-semibold text-foreground mb-4">
        Page Not Found
      </h2>
      
      <p className="text-muted-foreground max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved to another secure location.
      </p>
      
      <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
