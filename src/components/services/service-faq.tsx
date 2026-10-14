'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

export function ServiceFAQ({ faqs }: { faqs: FAQ[] }) {
  return (
    <Accordion className="w-full max-w-3xl mx-auto">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-cyan-500/20">
          <AccordionTrigger className="text-left text-white hover:text-cyan-300 text-base sm:text-lg font-bold py-5 tracking-tight min-h-[44px] transition-colors">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-neutral-300 text-xs sm:text-sm leading-relaxed pb-5 font-normal">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
