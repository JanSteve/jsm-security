'use client';

import { useRef, useState } from 'react';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/motion';

export function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      const percentage = scrollLeft / (maxScrollLeft || 1);
      const index = Math.round(percentage * (testimonials.length - 1));
      setActiveIndex(Math.min(Math.max(index, 0), testimonials.length - 1));
    }
  };

  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      const targetScrollLeft = (index / (testimonials.length - 1)) * maxScrollLeft;
      scrollContainerRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-black text-black tracking-tight mb-4"
          >
            Endorsed by Industry Leaders
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium"
          >
            Read reviews from JSM corporate account administrators and estate directors.
          </motion.p>
        </div>

        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="snap-start snap-always shrink-0 w-[85vw] sm:w-[420px] bg-zinc-50 rounded-3xl p-8 border border-zinc-200/60 flex flex-col relative group hover:border-[#C5A880]/30 transition-all duration-300 shadow-sm"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-[#C5A880]/10 rotate-180 group-hover:text-[#C5A880]/20 transition-all" />
                
                <div className="flex gap-1 mb-6 text-[#C5A880]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn("w-4 h-4", i < testimonial.rating ? "fill-[#C5A880]" : "text-zinc-300")} 
                    />
                  ))}
                </div>
                
                <p className="text-zinc-700 text-base leading-relaxed mb-8 flex-grow italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto border-t border-zinc-200/40 pt-6">
                  <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center font-bold text-lg text-[#C5A880] overflow-hidden">
                     {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-zinc-500 font-medium">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === idx ? "bg-[#C5A880] w-6" : "bg-zinc-200 hover:bg-zinc-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
