"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, useSpring, useTransform, animate } from "motion/react";
import { 
  TrendingUp, 
  Calculator, 
  PiggyBank, 
  DollarSign, 
  Building2, 
  Users,
  ArrowRight,
  Receipt,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

const formatINR = (value: number) => 
  new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    maximumFractionDigits: 0 
  }).format(value);

// Animated counter component
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (val) => setDisplayValue(Math.round(val)),
    });
    return controls.stop;
  }, [value, displayValue]);

  return <>{formatINR(displayValue)}</>;
}

export function ROICalculator() {
  const [vendors, setVendors] = useState<number>(3);
  const [monthlySpend, setMonthlySpend] = useState<number>(200000);
  const [personnel, setPersonnel] = useState<number>(20);

  // Computations
  const adminOverheadSaved = useMemo(() => vendors * 15000, [vendors]);
  const billingConsolidationSavings = useMemo(() => vendors * 8000, [vendors]);
  const supervisorEfficiencyGain = useMemo(() => Math.round(monthlySpend * 0.06), [monthlySpend]);
  
  const totalMonthlySavings = adminOverheadSaved + billingConsolidationSavings + supervisorEfficiencyGain;
  const totalAnnualSavings = totalMonthlySavings * 12;
  const freeMonths = (totalAnnualSavings / monthlySpend).toFixed(1);

  return (
    <section className="py-24 bg-[#fbf9f4] relative overflow-hidden" id="roi-calculator">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#C5A880]/10 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#C5A880]/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#C5A880]/30 text-[#C5A880] text-sm font-bold tracking-wide uppercase mb-6 shadow-sm"
          >
            <Calculator className="w-4 h-4" />
            <span>Value Assessment</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-[#0A1628] mb-6"
          >
            Calculate Your <span className="text-[#C5A880]">Savings</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-600 font-medium"
          >
            See how much you save by consolidating from multiple vendors to JSM's unified partnership model.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white/95 backdrop-blur-xl border border-zinc-200/90 rounded-3xl p-8 shadow-2xl space-y-10"
          >
            <div>
              <h3 className="text-xl font-black text-[#0A1628] mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#C5A880]" />
                Current Setup
              </h3>
              <p className="text-sm text-zinc-500 mb-8 font-medium">Adjust the sliders to match your current operations</p>
            </div>

            {/* Slider 1: Vendors */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-zinc-700">Number of Service Vendors</label>
                <span className="text-xl font-black text-[#C5A880]">{vendors}</span>
              </div>
              <input 
                type="range" 
                min="2" max="8" step="1" 
                value={vendors} 
                onChange={(e) => setVendors(Number(e.target.value))}
                className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
              />
              <div className="flex justify-between text-xs text-zinc-400 font-semibold">
                <span>2</span>
                <span>8</span>
              </div>
            </div>

            {/* Slider 2: Monthly Spend */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-zinc-700">Total Monthly Manpower Spend</label>
                <span className="text-xl font-black text-[#C5A880]">{formatINR(monthlySpend)}</span>
              </div>
              <input 
                type="range" 
                min="50000" max="1000000" step="10000" 
                value={monthlySpend} 
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
              />
              <div className="flex justify-between text-xs text-zinc-400 font-semibold">
                <span>₹50K</span>
                <span>₹10L</span>
              </div>
            </div>

            {/* Slider 3: Personnel */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-zinc-700">Deployed Personnel</label>
                <span className="text-xl font-black text-[#C5A880]">{personnel}</span>
              </div>
              <input 
                type="range" 
                min="5" max="200" step="1" 
                value={personnel} 
                onChange={(e) => setPersonnel(Number(e.target.value))}
                className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
              />
              <div className="flex justify-between text-xs text-zinc-400 font-semibold">
                <span>5</span>
                <span>200</span>
              </div>
            </div>
            
          </motion.div>

          {/* Results Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Main Result Card */}
            <div className="bg-[#0A1628] rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden border border-zinc-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A880]/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div>
                  <p className="text-[#C5A880] font-bold tracking-wide uppercase text-sm mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Projected Annual Savings
                  </p>
                  <h4 className="text-5xl md:text-7xl font-black text-white">
                    <AnimatedNumber value={totalAnnualSavings} />
                  </h4>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shrink-0">
                  <p className="text-sm font-medium text-zinc-300 mb-1">Equivalent to</p>
                  <p className="text-2xl font-black text-white">
                    <span className="text-[#C5A880]">{freeMonths} months</span> free
                  </p>
                </div>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              
              <div className="bg-white/95 backdrop-blur-xl border border-zinc-200/90 rounded-2xl p-6 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-[#fbf9f4] border border-[#C5A880]/20 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
                </div>
                <h5 className="text-zinc-500 font-bold text-xs uppercase tracking-wider mb-2">Admin / HR Overhead</h5>
                <p className="text-2xl font-black text-[#0A1628]">
                  <AnimatedNumber value={adminOverheadSaved * 12} />
                  <span className="text-sm text-zinc-400 font-medium ml-1">/yr</span>
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-xl border border-zinc-200/90 rounded-2xl p-6 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-[#fbf9f4] border border-[#C5A880]/20 flex items-center justify-center mb-4">
                  <Receipt className="w-5 h-5 text-[#C5A880]" />
                </div>
                <h5 className="text-zinc-500 font-bold text-xs uppercase tracking-wider mb-2">Billing Consolidation</h5>
                <p className="text-2xl font-black text-[#0A1628]">
                  <AnimatedNumber value={billingConsolidationSavings * 12} />
                  <span className="text-sm text-zinc-400 font-medium ml-1">/yr</span>
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-xl border border-zinc-200/90 rounded-2xl p-6 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-[#fbf9f4] border border-[#C5A880]/20 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-[#C5A880]" />
                </div>
                <h5 className="text-zinc-500 font-bold text-xs uppercase tracking-wider mb-2">Supervisor Efficiency</h5>
                <p className="text-2xl font-black text-[#0A1628]">
                  <AnimatedNumber value={supervisorEfficiencyGain * 12} />
                  <span className="text-sm text-zinc-400 font-medium ml-1">/yr</span>
                </p>
              </div>

            </div>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          <Link 
            href="/get-quote"
            className="group inline-flex items-center justify-center gap-3 bg-black hover:bg-zinc-900 text-white px-8 py-4.5 rounded-full font-black text-sm uppercase tracking-wider border-b-2 border-[#C5A880] shadow-xl hover:shadow-[0_0_30px_rgba(197,168,128,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            <span>GET INSTANT PROPOSAL (PDF)</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-900 px-7 py-4.5 rounded-full font-bold text-sm uppercase tracking-wider border border-zinc-300 shadow-sm hover:border-[#C5A880] hover:scale-105 active:scale-95 transition-all"
          >
            <span>Book On-Site Assessment</span>
            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
