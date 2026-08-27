"use client";

import { motion } from "motion/react";
import { Star, Quote, Building2, Users, ShieldCheck } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { TiltCard } from "@/components/3d/tilt-card";

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
    <section className="py-24 bg-[#fbf9f4] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-[#0A1628] mb-4"
          >
            Trusted by Leading Organizations Across Tamil Nadu
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-600 font-medium"
          >
            Real results from real partnerships
          </motion.p>
        </div>

        {/* Stats Counter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
          {stats.map((stat, index) => (
            <TiltCard
              key={index}
              maxTilt={8}
              className="bg-white/95 backdrop-blur-xl border border-zinc-200/90 rounded-2xl p-6 shadow-xl text-center flex flex-col items-center justify-center gap-3"
            >
              <stat.icon className="w-8 h-8 text-[#C5A880]" />
              <div className="text-4xl text-[#0A1628]">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-zinc-600 font-bold uppercase tracking-wider text-sm">{stat.label}</p>
            </TiltCard>
          ))}
        </div>

        {/* Testimonials Grid/Carousel */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {testimonials.map((testimonial, index) => (
            <TiltCard
              key={index}
              maxTilt={6}
              className="min-w-[85vw] md:min-w-0 snap-center shrink-0 bg-white/95 backdrop-blur-xl border border-zinc-200/90 rounded-3xl p-8 shadow-2xl relative flex flex-col"
            >
              <Quote className="w-12 h-12 text-[#C5A880]/20 absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C5A880] text-[#C5A880]" />
                ))}
              </div>

              <p className="text-[#18181b] italic text-lg leading-relaxed flex-grow mb-8">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-[#C5A880] text-white flex items-center justify-center font-black text-lg">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="text-[#0A1628] font-black">{testimonial.name}</h4>
                  <p className="text-sm text-zinc-500 font-medium">
                    {testimonial.role}, <br className="hidden md:block" /> {testimonial.company}
                  </p>
                </div>
              </div>
            </TiltCard>
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
