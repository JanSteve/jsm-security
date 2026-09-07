"use client";

import { motion } from "motion/react";
import { Star, Quote, Building2, Users, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[activeSlide];

  return (
    <section className="py-20 md:py-28 bg-[#f5f5f7] overflow-hidden text-[#1d1d1f] border-t border-black/[0.08]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold tracking-wide uppercase shadow-sm">
            <ShieldCheck size={14} className="text-[#0071e3]" />
            <span>Real Client Trust • Interactive Showcase</span>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight text-balance"
          >
            Hear from leaders who rely on JSM.
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

        {/* Interactive Apple Testimonials Slideshow Stage */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="max-w-4xl mx-auto relative bg-white border border-black/[0.08] rounded-[32px] p-8 sm:p-12 md:p-16 shadow-lg overflow-hidden"
        >
          {/* Top Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/[0.04] overflow-hidden">
            <motion.div 
              key={activeSlide}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: isPaused ? 0 : 5.5, ease: "linear" }}
              className="h-full bg-[#0071e3]"
            />
          </div>

          <Quote className="w-16 h-16 text-black/[0.04] absolute top-8 right-8 pointer-events-none" />

          {/* Slide Content with Smooth Transition */}
          <div className="min-h-[200px] sm:min-h-[170px] flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                ))}
                <span className="ml-2 text-[11px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                  Verified Client Partner
                </span>
              </div>

              <p className="text-[#1d1d1f] text-lg sm:text-2xl font-medium leading-relaxed text-pretty italic tracking-tight">
                "{current.quote}"
              </p>
            </div>

            {/* Author Strip & Slide Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 mt-8 border-t border-black/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                  {current.initials}
                </div>
                <div>
                  <h4 className="text-[#1d1d1f] font-bold text-base">{current.name}</h4>
                  <p className="text-xs text-[#86868b] font-normal">
                    {current.role} • <span className="font-semibold text-[#515154]">{current.company}</span>
                  </p>
                </div>
              </div>

              {/* Navigation Arrows & Counter */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-xs font-mono text-[#86868b] mr-1 tabular-nums">
                  {activeSlide + 1} / {testimonials.length}
                </span>

                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-black/[0.08] bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] flex items-center justify-center transition-all press-scale shadow-2xs"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} strokeWidth={2} />
                </button>

                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-black/[0.08] bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] flex items-center justify-center transition-all press-scale shadow-2xs"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-8 pt-4">
            {testimonials.map((t, idx) => (
              <button
                key={t.name}
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === idx 
                    ? "w-8 bg-[#0071e3]" 
                    : "w-2 bg-black/15 hover:bg-black/30"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
