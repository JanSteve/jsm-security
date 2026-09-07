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
    <section className="py-24 bg-white relative overflow-hidden border-y border-black/[0.08]" id="roi-calculator">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f5f7] border border-black/[0.08] text-[#0071e3] text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Value Assessment</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight leading-tight"
          >
            Calculate Your <span className="text-[#0071e3]">Savings</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#86868b] font-normal"
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
            className="lg:col-span-5 bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] p-8 shadow-sm space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-1.5 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0071e3]" />
                Current Setup
              </h3>
              <p className="text-xs text-[#86868b] mb-6 font-normal">Adjust the sliders to match your current operations</p>
            </div>

            {/* Slider 1: Vendors */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-semibold text-[#515154]">Number of Service Vendors</label>
                <span className="text-xl font-semibold text-[#0071e3] tabular-nums">{vendors}</span>
              </div>
              <input 
                type="range" 
                min="2" max="8" step="1" 
                value={vendors} 
                onChange={(e) => setVendors(Number(e.target.value))}
                className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-[#0071e3] border border-black/[0.08]"
              />
              <div className="flex justify-between text-[11px] text-[#86868b] font-normal">
                <span>2 vendors</span>
                <span>8 vendors</span>
              </div>
            </div>

            {/* Slider 2: Monthly Spend */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-semibold text-[#515154]">Total Monthly Manpower Spend</label>
                <span className="text-xl font-semibold text-[#0071e3] tabular-nums">{formatINR(monthlySpend)}</span>
              </div>
              <input 
                type="range" 
                min="50000" max="1000000" step="10000" 
                value={monthlySpend} 
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-[#0071e3] border border-black/[0.08]"
              />
              <div className="flex justify-between text-[11px] text-[#86868b] font-normal">
                <span>₹50K</span>
                <span>₹10L</span>
              </div>
            </div>

            {/* Slider 3: Personnel */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-semibold text-[#515154]">Deployed Personnel</label>
                <span className="text-xl font-semibold text-[#0071e3] tabular-nums">{personnel}</span>
              </div>
              <input 
                type="range" 
                min="5" max="200" step="1" 
                value={personnel} 
                onChange={(e) => setPersonnel(Number(e.target.value))}
                className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-[#0071e3] border border-black/[0.08]"
              />
              <div className="flex justify-between text-[11px] text-[#86868b] font-normal">
                <span>5 guards</span>
                <span>200 guards</span>
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
            <div className="bg-[#1d1d1f] rounded-[28px] p-8 md:p-10 text-white shadow-xl relative overflow-hidden border border-black/[0.1]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0071e3]/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div>
                  <p className="text-[#0071e3] font-semibold tracking-wider uppercase text-xs mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Projected Annual Savings
                  </p>
                  <h4 className="text-5xl md:text-6xl font-semibold text-white tracking-tight tabular-nums">
                    <AnimatedNumber value={totalAnnualSavings} />
                  </h4>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shrink-0">
                  <p className="text-xs font-normal text-zinc-300 mb-0.5">Equivalent to</p>
                  <p className="text-xl font-semibold text-white">
                    <span className="text-[#0071e3]">{freeMonths} months</span> free
                  </p>
                </div>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              
              <div className="bg-[#f5f5f7] border border-black/[0.06] rounded-2xl p-6 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center mb-4 text-[#0071e3] shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h5 className="text-[#86868b] font-semibold text-[11px] uppercase tracking-wider mb-1">Admin / HR Overhead</h5>
                <p className="text-2xl font-semibold text-[#1d1d1f] tabular-nums">
                  <AnimatedNumber value={adminOverheadSaved * 12} />
                  <span className="text-xs text-[#86868b] font-normal ml-1">/yr</span>
                </p>
              </div>

              <div className="bg-[#f5f5f7] border border-black/[0.06] rounded-2xl p-6 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center mb-4 text-[#0071e3] shadow-xs">
                  <Receipt className="w-5 h-5" />
                </div>
                <h5 className="text-[#86868b] font-semibold text-[11px] uppercase tracking-wider mb-1">Billing Consolidation</h5>
                <p className="text-2xl font-semibold text-[#1d1d1f] tabular-nums">
                  <AnimatedNumber value={billingConsolidationSavings * 12} />
                  <span className="text-xs text-[#86868b] font-normal ml-1">/yr</span>
                </p>
              </div>

              <div className="bg-[#f5f5f7] border border-black/[0.06] rounded-2xl p-6 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center mb-4 text-[#0071e3] shadow-xs">
                  <Users className="w-5 h-5" />
                </div>
                <h5 className="text-[#86868b] font-semibold text-[11px] uppercase tracking-wider mb-1">Supervisor Efficiency</h5>
                <p className="text-2xl font-semibold text-[#1d1d1f] tabular-nums">
                  <AnimatedNumber value={supervisorEfficiencyGain * 12} />
                  <span className="text-xs text-[#86868b] font-normal ml-1">/yr</span>
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
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <Link 
            href="/get-quote"
            className="group inline-flex items-center justify-center gap-2 bg-[#0071e3] hover:bg-[#0077ed] text-white px-8 py-3.5 rounded-full font-semibold text-xs shadow-sm transition-all min-h-[44px]"
          >
            <span>GET INSTANT PROPOSAL (PDF)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f5f5f7] text-[#1d1d1f] px-7 py-3.5 rounded-full font-semibold text-xs border border-black/[0.1] shadow-xs transition-all min-h-[44px]"
          >
            <span>Book On-Site Assessment</span>
            <ArrowRight className="w-4 h-4 text-[#86868b] group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
