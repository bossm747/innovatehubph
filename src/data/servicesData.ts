
import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  detailTitle: string;
  detailDesc: string;
}

export const getServicesData = (): ServiceItem[] => [
  {
    id: "platapay",
    title: "PlataPay",
    description: "Digital wallet, bills payment, remittance, e-loading, and QR payments for micropreneurs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
    image: "/lovable-uploads/9b23899d-8537-4e7c-996b-5fdc791cbde2.png",
    detailTitle: "PlataPay – Digital Finance for All",
    detailDesc: "A secure and income-generating platform for communities, enabling digital wallet services, bills payment, remittance, e-loading, and QR payments."
  },
  {
    id: "digital-customizations",
    title: "Digital Customizations",
    description: "Custom software, business model development, and strategic IT consulting services.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    image: "/lovable-uploads/184545ab-3005-4f2b-8b3d-ef576aff4877.png",
    detailTitle: "Tailored Digital Solutions",
    detailDesc: "We develop custom software, business models, and provide strategic IT consulting to help your business thrive in the digital landscape."
  },
  {
    id: "ecommerce",
    title: "E-Commerce Development",
    description: "Online stores, payment integration, and order management systems for modern businesses.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    image: "/lovable-uploads/1ba10581-63f4-48e7-b872-fc97ae9f9f79.png",
    detailTitle: "Complete E-Commerce Solutions",
    detailDesc: "From online store development to payment integration and order management, we build comprehensive e-commerce solutions to help your business sell online."
  },
  {
    id: "ai-solutions",
    title: "AI Solutions",
    description: "Chatbots, predictive analytics, and process automation to enhance your business operations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    image: "/lovable-uploads/67bb969b-4b34-4a3e-af05-aa8eb09b6cd9.png",
    detailTitle: "AI-Powered Business Solutions",
    detailDesc: "Leverage the power of artificial intelligence with our chatbots, predictive analytics, and process automation solutions to enhance your business operations."
  },
  {
    id: "global-expansion",
    title: "Global Expansion",
    description: "Dubai trade license and international fintech reach for businesses looking to expand globally.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    image: "/lovable-uploads/ed1ffe66-3b7c-4957-aa5f-53948529fdee.png",
    detailTitle: "International Business Expansion",
    detailDesc: "Facilitate your company's global growth with our Dubai trade license services and international fintech solutions, helping you expand your business beyond borders."
  }
];
