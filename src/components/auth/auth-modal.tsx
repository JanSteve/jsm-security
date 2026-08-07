'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
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
      <DialogContent className="sm:max-w-md bg-white border border-zinc-200 text-zinc-800 p-0 overflow-hidden hide-close-button rounded-3xl shadow-xl">
        <DialogTitle className="sr-only">Sign In to Client Portal</DialogTitle>
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2 text-[#C5A880]">
              <Shield size={28} />
              <span className="font-bold text-xl tracking-tight text-black">JSM Portal</span>
            </div>
            <button onClick={onClose} className="text-zinc-400 hover:text-black transition-colors">
              <X size={20} />
            </button>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-100 mb-8 rounded-full p-1 h-12">
              <TabsTrigger value="signin" className="data-[state=active]:bg-white data-[state=active]:text-black rounded-full font-semibold">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-black rounded-full font-semibold">Request Access</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 text-sm rounded-xl text-center">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-500 font-semibold">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" />
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="client@company.com"
                      required
                      className="pl-10 bg-white border-zinc-200 text-black focus:border-[#C5A880] focus:ring-[#C5A880] rounded-2xl h-12"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-zinc-500 font-semibold">Password</Label>
                    <a href="#" className="text-sm text-[#3B82F6] hover:text-[#C5A880] transition-colors font-semibold">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" />
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="pl-10 bg-white border-zinc-200 text-black focus:border-[#C5A880] focus:ring-[#C5A880] rounded-2xl h-12"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-black text-white hover:bg-zinc-800 font-bold text-base h-12 rounded-full shadow-md"
                >
                  {loading ? 'Authenticating...' : 'Secure Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="text-center py-6">
              <p className="text-zinc-500 mb-6 text-sm font-medium">
                Client portal access is provided exclusively to active JSM Security clients. 
              </p>
              <Button variant="outline" className="w-full border-zinc-200 text-zinc-800 hover:bg-zinc-50 h-12 rounded-full font-semibold">
                Contact Account Manager
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
