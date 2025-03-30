
import React from 'react';
import { Card } from '@/components/ui/card';

interface ServiceCard {
  icon: string;
  title: string;
  description: string;
}

const PlatapayServices = () => {
  const services: ServiceCard[] = [
    {
      icon: "/lovable-uploads/60c28117-5e6a-45ad-ae8f-38d4c7c0240f.png",
      title: "Digital Wallet",
      description: "Secure mobile wallet for sending money, paying bills, and managing funds with just a few taps."
    },
    {
      icon: "/lovable-uploads/8a83083d-1f94-4e7d-98d1-a1e602e39ff6.png",
      title: "Bills Payment",
      description: "Convenient payment of utilities, government fees, loans, and other bills through our app."
    },
    {
      icon: "/lovable-uploads/3f4072eb-1c6d-4923-a9ba-65dec4af9f12.png",
      title: "Remittance",
      description: "Fast and secure money transfers to friends and family across the Philippines and internationally."
    },
    {
      icon: "/lovable-uploads/13d6fdac-7203-4f96-86da-e4730af74b31.png",
      title: "E-Loading",
      description: "Quick and easy load service for all major mobile networks at competitive rates."
    },
    {
      icon: "/lovable-uploads/e631387a-febd-43e4-a620-a6bdc8a4f081.png",
      title: "QR Payments",
      description: "Contactless transactions with QR code scanning for fast and secure payments to merchants."
    },
    {
      icon: "/lovable-uploads/0e79bef6-ea26-4da9-8c17-6bb4bacc118a.png",
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
              className="p-8 hover:shadow-lg transition-all duration-300 border-t-4 border-innovate-500 fade-up h-[360px] flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center mb-6 flex-shrink-0">
                <img 
                  src={service.icon} 
                  alt={service.title} 
                  className="h-32 w-auto mb-4 transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center fade-up">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg max-w-3xl mx-auto shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Demo Walkthrough</h3>
            <p className="text-gray-600 mb-6">Watch a quick demo of how PlataPay works for customers and agents</p>
            
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md bg-gradient-to-r from-blue-100/40 to-purple-100/40 p-1">
              <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded-lg overflow-hidden relative group">
                {/* Overlay with gradient and button */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform transition-transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* Image placeholder for video thumbnail */}
                <img 
                  src="/lovable-uploads/15799531-a866-414e-9145-5edb73c657b0.png"
                  alt="PlataPay Demo Video Thumbnail" 
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatapayServices;
