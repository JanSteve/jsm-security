'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-3xl font-jakarta font-bold text-foreground mb-4">
          Something went wrong
        </h1>
        <p className="text-muted-foreground max-w-md mb-8">
          {error.message || "An unexpected error occurred while loading this page. Our technical team has been notified."}
        </p>
        <Button 
          onClick={() => reset()}
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Try Again
        </Button>
      </motion.div>
    </div>
  );
}
