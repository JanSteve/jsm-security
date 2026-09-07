"use client";

import { motion } from "motion/react";
import { Star, Quote, Building2, Users, ShieldCheck } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Plant Manager",
    company: "Verizon Auto Components, Hosur",
    quote: "JSM replaced our 3 separate vendors with one unified team. Our factory floor compliance went from 70% to 98% in the first quarter. The 2-hour replacement SLA is not just a promise — they actually deliver.",
    initials: "RK",
  },
  {
    name: "Dr. Meenakshi S.",
    role: "Hospital Administrator",
    company: "Sri Lakshmi Medical Centre, Trichy",
    quote: "Their housekeeping team follows the 5-step hygiene protocol religiously. Our NABH audit scores improved dramatically. Sweety madam personally ensures quality.",
    initials: "MS",
  },
  {
    name: "Aravind Krishnan",
    role: "Warehouse Operations Head",
    company: "Sri Logistics Hub, Chennai",
    quote: "We needed 40 warehouse helpers within 48 hours for peak season. JSM delivered 45 verified workers in 36 hours. Fully EPF/ESI compliant from day one.",
    initials: "AK",
  },
  {
    name: "Priya Natarajan",
    role: "Facility Director",
    company: "TechPark One, Coimbatore",
    quote: "The night audit system is what sets JSM apart. Knowing that a supervisor checks our security at 2 AM gives us complete peace of mind. Zero incidents in 8 months.",
    initials: "PN",
  },
  {
    name: "Mohammed Farook",
    role: "General Manager",
    company: "Grand Palace Hotels, Madurai",
    quote: "From front-desk courtesy to back-of-house hygiene, JSM handles everything. Our guest satisfaction scores are the highest they have ever been.",
    initials: "MF",
  }
];

const stats = [
  { icon: Building2, value: 50, suffix: "+", label: "Facilities" },
  { icon: Users, value: 500, suffix: "+", label: "Personnel" },
  { icon: ShieldCheck, value: 99.2, suffix: "%", label: "SLA Compliance" },
];

function Counter({ end, suffix }: { end: number, suffix: string }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const duration = 2000;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(end * easeOut);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [inView, end]);

  return (
    <span ref={nodeRef} className="font-black">
      {end % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}{suffix}
    </span>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f5f5f7] overflow-hidden text-[#1d1d1f] border-t border-black/[0.08]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold tracking-wide uppercase shadow-sm">
            <ShieldCheck size={14} className="text-[#0071e3]" />
            <span>Real Client Trust</span>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight text-balance"
          >
            Hear from those who rely on JSM to stay protected.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-[#86868b] font-normal text-pretty"
          >
            Real operational results from verified enterprise partnerships across Tamil Nadu &amp; South India.
          </motion.p>
        </div>

        {/* Stats Counter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white border border-black/[0.06] rounded-[28px] p-6 shadow-sm text-center flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-[#0071e3]" />
              <div className="text-4xl text-[#1d1d1f] tabular-nums font-semibold tracking-tight">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[#86868b] font-semibold text-xs tracking-wider uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="min-w-[85vw] md:min-w-0 snap-center shrink-0 bg-white border border-black/[0.06] rounded-[28px] p-8 shadow-sm relative flex flex-col hover:shadow-md transition-all duration-300 group"
            >
              <Quote className="w-10 h-10 text-black/[0.06] absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                ))}
              </div>

              <p className="text-[#515154] italic text-sm sm:text-base leading-relaxed flex-grow mb-8 text-pretty font-normal">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-black/[0.06]">
                <div className="w-10 h-10 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center font-semibold text-xs shadow-sm">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="text-[#1d1d1f] font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-[#86868b] font-normal">
                    {testimonial.role}, <br className="hidden md:block" /> {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
