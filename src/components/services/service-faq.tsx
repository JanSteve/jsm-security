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
        <AccordionItem key={i} value={`item-${i}`} className="border-black/[0.08]">
          <AccordionTrigger className="text-left text-[#1d1d1f] hover:text-[#0071e3] text-base sm:text-lg font-bold py-5 tracking-tight">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-[#515154] text-xs sm:text-sm leading-relaxed pb-5 font-normal">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
