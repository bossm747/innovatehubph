
import React from 'react';
import { Card } from '@/components/ui/card';

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PlatapayServices = () => {
  const services: ServiceCard[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Digital Wallet",
      description: "Secure mobile wallet for sending money, paying bills, and managing funds with just a few taps."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Bills Payment",
      description: "Convenient payment of utilities, government fees, loans, and other bills through our app."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: "Remittance",
      description: "Fast and secure money transfers to friends and family across the Philippines and internationally."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "E-Loading",
      description: "Quick and easy load service for all major mobile networks at competitive rates."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
      title: "QR Payments",
      description: "Contactless transactions with QR code scanning for fast and secure payments to merchants."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Agent Network",
      description: "Become a PlataPay agent and earn commissions by offering financial services in your community."
    }
  ];

  return (
    <section id="platapay-services" className="py-20 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="mb-16 text-center fade-up">
          <div className="flex items-center justify-center mb-6">
            <div className="relative mr-3">
              {/* Logo glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-blue-300/20 rounded-full blur-md transition-all duration-300 scale-110"></div>
              <div className="absolute inset-0 bg-white/30 rounded-full filter blur-sm transition-all duration-300"></div>
              <img 
                src="/lovable-uploads/a8af37d4-1b48-41f9-bd00-008fbfdb60a8.png" 
                alt="PlataPay Logo" 
                className="h-14 w-14 relative z-10"
                style={{ filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))' }}
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Our Digital Finance Services</h2>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            PlataPay offers a comprehensive suite of financial services designed to make everyday transactions 
            easier, faster, and more secure for individuals and businesses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-lg transition-all duration-300 border-t-4 border-innovate-500 fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-innovate-600 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center fade-up">
          <div className="p-6 bg-innovate-50 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-3">Demo Walkthrough</h3>
            <p className="text-gray-600 mb-6">Watch a quick demo of how PlataPay works for customers and agents</p>
            
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-innovate-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-4 text-gray-500">PlataPay Demo Video</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatapayServices;
