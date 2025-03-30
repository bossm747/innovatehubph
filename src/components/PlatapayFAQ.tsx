
import React from 'react';
import FAQAccordion from './FAQAccordion';

const PlatapayFAQ: React.FC = () => {
  const faqs = [
    {
      question: "What is PlataPay?",
      answer: "PlataPay is a comprehensive digital financial services platform that allows agents to offer e-loading, bills payment, remittance, and other financial services to their communities while earning commissions."
    },
    {
      question: "How do I become a PlataPay agent?",
      answer: "To become a PlataPay agent, you need to submit an application through our website, provide the necessary identification and business documents, complete our verification process, and attend a brief training session."
    },
    {
      question: "What services can I offer as a PlataPay agent?",
      answer: "As a PlataPay agent, you can offer e-loading for all major telecommunication networks, bills payment for utilities and government services, domestic and international remittance, QR payments, and other digital financial services."
    },
    {
      question: "How much capital do I need to start?",
      answer: "The minimum starting capital can vary based on your business plan and location, but typically ranges from PHP 5,000 to PHP 10,000. This serves as your initial e-wallet load which you can use to provide services to customers."
    },
    {
      question: "How do I earn as a PlataPay agent?",
      answer: "PlataPay agents earn through commissions on each transaction processed through their account. Commission rates vary by service type, with additional incentives available for high-performing agents."
    },
    {
      question: "Do I need special equipment or a physical store?",
      answer: "No special equipment is required beyond a smartphone or computer with internet access. While a physical store can be beneficial, you can operate as a mobile agent or from your existing business location."
    },
    {
      question: "How long does the application process take?",
      answer: "The standard application process typically takes 3-5 business days from submission to approval, assuming all required documents are properly submitted."
    },
    {
      question: "Is there a fee to become a PlataPay agent?",
      answer: "There is a minimal one-time registration fee that covers your account setup, initial training, and access to the PlataPay agent portal. This fee may vary based on your selected agent package."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <FAQAccordion 
          faqs={faqs} 
          title="Frequently Asked Questions about PlataPay" 
          subtitle="Find answers to common questions about becoming a PlataPay agent and offering our services."
        />
      </div>
    </section>
  );
};

export default PlatapayFAQ;
