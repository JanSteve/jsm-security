'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield, Mail, Lock, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (res?.error) {
        setError('Invalid credentials. Use demo123 for password.');
      } else {
        router.push('/dashboard');
        onClose();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#121C3B] border border-[#1A264D] text-[#F8F9FA] p-0 overflow-hidden hide-close-button">
        <DialogTitle className="sr-only">Sign In to Client Portal</DialogTitle>
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Shield size={28} />
              <span className="font-bold text-xl tracking-tight text-[#F8F9FA]">JSM Portal</span>
            </div>
            <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F8F9FA] transition-colors">
              <X size={20} />
            </button>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#0A1128] mb-8">
              <TabsTrigger value="signin" className="data-[state=active]:bg-[#1A264D] data-[state=active]:text-[#F8F9FA]">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-[#1A264D] data-[state=active]:text-[#F8F9FA]">Request Access</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-md text-center">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#94A3B8]">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-[#94A3B8]" />
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="client@company.com"
                      required
                      className="pl-10 bg-[#0A1128] border-[#1A264D] text-[#F8F9FA] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-[#94A3B8]">Password</Label>
                    <a href="#" className="text-sm text-[#3B82F6] hover:text-[#D4AF37] transition-colors">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-[#94A3B8]" />
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="pl-10 bg-[#0A1128] border-[#1A264D] text-[#F8F9FA] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#D4AF37] text-[#0A1128] hover:bg-[#C9A227] font-bold text-lg h-12"
                >
                  {loading ? 'Authenticating...' : 'Secure Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="text-center py-6">
              <p className="text-[#94A3B8] mb-6">
                Client portal access is provided exclusively to active JSM Security clients. 
              </p>
              <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 h-12">
                Contact Account Manager
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
