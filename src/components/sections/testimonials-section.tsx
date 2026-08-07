'use client';

import { useRef, useState, useEffect } from 'react';
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
      const percentage = scrollLeft / maxScrollLeft;
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
    <section className="py-24 bg-surface-1 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-jakarta font-bold mb-4 text-foreground"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="snap-start snap-always shrink-0 w-[85vw] sm:w-[400px] bg-card rounded-xl p-8 border border-border flex flex-col relative group hover:border-primary/50 transition-colors"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 rotate-180 group-hover:text-primary/20 transition-colors" />
                
                <div className="flex gap-1 mb-6 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn("w-4 h-4", i < testimonial.rating ? "fill-primary" : "text-muted")} 
                    />
                  ))}
                </div>
                
                <p className="text-foreground leading-relaxed mb-8 flex-grow">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-surface-2 border border-border flex items-center justify-center font-bold text-lg text-primary overflow-hidden">
                     {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold font-jakarta text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
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
                  activeIndex === idx ? "bg-primary w-6" : "bg-border hover:bg-primary/50"
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
