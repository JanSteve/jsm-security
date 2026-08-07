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
        <AccordionItem key={i} value={`item-${i}`} className="border-zinc-200">
          <AccordionTrigger className="text-left text-black hover:text-[#C5A880] text-lg font-bold py-6">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-zinc-500 text-base leading-relaxed pb-6">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
