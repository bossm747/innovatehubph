import React from 'react';
import { Button } from "@/components/ui/button";

const PlatapayHero = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-innovate-900/10 to-innovate-600/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6">
              Client Spotlight
            </span>
            <div className="flex items-center mb-4">
              <div className="relative mr-4">
                {/* Dark circular background */}
                <div className="absolute inset-0 bg-black/80 rounded-full blur-sm transition-all duration-300"></div>
                {/* Logo with dark background */}
                <img 
                  src="/lovable-uploads/9b23899d-8537-4e7c-996b-5fdc791cbde2.png" 
                  alt="PlataPay Logo" 
                  className="h-16 w-16 relative z-10 transition-transform duration-300"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))' }}
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold hero-text-gradient">
                PlataPay
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700">
              Empowering Micropreneurs Through Digital Finance
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              A secure and income-generating platform that revolutionizes financial services for communities across the Philippines and beyond.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-innovate-600 hover:bg-innovate-700 text-white btn-shine" 
                size="lg"
                asChild
              >
                <a href="https://platapay.ph/registration" target="_blank" rel="noopener noreferrer">
                  Apply as Agent
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-innovate-600 text-innovate-600 hover:bg-innovate-50"
                asChild
              >
                <a href="https://app.platapay.ph" target="_blank" rel="noopener noreferrer">
                  Agent Portal
                </a>
              </Button>
            </div>
          </div>
          
          <div className="relative fade-up">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-innovate-100 rounded-lg -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-100 rounded-lg -z-10"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/lovable-uploads/d06dbf6f-eafc-4d26-97e4-b5ee5dac0416.png" 
                alt="PlataPay Digital Wallet" 
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-20 left-10 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-innovate-500/10 rounded-full blur-xl"></div>
    </section>
  );
};

export default PlatapayHero;
