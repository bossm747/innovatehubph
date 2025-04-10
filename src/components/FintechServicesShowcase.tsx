
import React from 'react';
import { Card } from '@/components/ui/card';

interface ServiceCard {
  icon: string;
  title: string;
  description: string;
}

const FintechServicesShowcase = () => {
  const services: ServiceCard[] = [
    {
      icon: "/lovable-uploads/a5490cb8-0d77-4fa8-bc13-86833f1e82b5.png",
      title: "Digital Wallet",
      description: "Secure mobile wallet for sending money, paying bills, and managing funds with just a few taps."
    },
    {
      icon: "/lovable-uploads/203794f3-d4dd-4331-afe6-652573fd1add.png",
      title: "Bills Payment",
      description: "Convenient payment of utilities, government fees, loans, and other bills through our app."
    },
    {
      icon: "/lovable-uploads/f4926fa8-99b1-4afd-8950-ecfb710f9aaf.png",
      title: "Remittance",
      description: "Fast and secure money transfers to friends and family across the Philippines and internationally."
    },
    {
      icon: "/lovable-uploads/a9344b31-8e05-46b4-957e-85bf7615799d.png",
      title: "E-Loading",
      description: "Quick and easy load service for all major mobile networks at competitive rates."
    },
    {
      icon: "/lovable-uploads/65de4566-b370-45fd-a264-9be308c00a28.png",
      title: "QR Payments",
      description: "Contactless transactions with QR code scanning for fast and secure payments to merchants."
    },
    {
      icon: "/lovable-uploads/9a53fef4-fd04-4280-bcc3-c6dda954ca97.png",
      title: "Agent Network",
      description: "Become a financial agent and earn commissions by offering financial services in your community."
    }
  ];

  return (
    <section id="fintech-services" className="py-20 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="mb-16 text-center fade-up">
          <div className="flex items-center justify-center mb-6">
            <div className="relative mr-3">
              {/* Logo glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-blue-300/20 rounded-full blur-md transition-all duration-300 scale-110"></div>
              <div className="absolute inset-0 bg-white/30 rounded-full filter blur-sm transition-all duration-300"></div>
              <img 
                src="/lovable-uploads/9b23899d-8537-4e7c-996b-5fdc791cbde2.png" 
                alt="PlataPay Logo" 
                className="h-14 w-14 relative z-10"
                style={{ filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))' }}
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Our Digital Finance Services</h2>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our fintech platform offers a comprehensive suite of financial services designed to make everyday transactions 
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
      </div>
    </section>
  );
};

export default FintechServicesShowcase;
