import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: "What are the product specifications?",
    answer:
      "Each product listing includes detailed specifications such as volume, concentration, active ingredients, and recommended usage areas.",
  },
  {
    question: "How should I store cleaning products?",
    answer:
      "Store in a cool, dry place away from direct sunlight. Keep containers tightly closed and away from children and pets. Follow specific storage instructions on product labels.",
  },
  {
    question: "Are these products safe for commercial use?",
    answer:
      "Yes, all our products meet commercial-grade standards and comply with health and safety regulations. Safety Data Sheets (SDS) are available for all chemical products.",
  },
  {
    question: "Do you offer bulk discounts?",
    answer:
      "Yes, we offer competitive bulk pricing for businesses. Contact our sales team or set up a business account for volume discounts and special pricing.",
  },
  {
    question: "What are the shipping options and costs?",
    answer:
      "We offer standard and express shipping. Free shipping on orders over $299. Delivery times vary by location, typically 2-5 business days for standard shipping.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Unopened products can be returned within 30 days of purchase. Due to safety regulations, opened chemical products cannot be returned. See our Returns page for full details.",
  },
];

const FaqContent = () => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Frequently asked questions
      </h3>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;
