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
        <AccordionItem key={i} value={`item-${i}`} className="border-[#1A264D]">
          <AccordionTrigger className="text-left text-[#F8F9FA] hover:text-[#D4AF37] text-lg font-semibold py-6">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-[#94A3B8] text-base leading-relaxed pb-6">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
