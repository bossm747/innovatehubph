import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlatapayHero = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-innovate-900/10 to-innovate-600/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6">
              Powered by InnovateHub
            </span>
            <div className="flex items-center mb-4">
              <div className="relative mr-4">
                <img 
                  src="/lovable-uploads/9b23899d-8537-4e7c-996b-5fdc791cbde2.png" 
                  alt="PlataPay Logo" 
                  className="h-16 w-16 relative z-10"
                  loading="eager" 
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
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white btn-shine" 
                size="lg"
                width="fixed"
                asChild
              >
                <a href="https://platapay.ph/registration" target="_blank" rel="noopener noreferrer">
                  Apply as Agent
                </a>
              </Button>
              <Button 
                variant="purple" 
                size="lg" 
                width="fixed"
                className="text-white"
                asChild
              >
                <a href="https://app.platapay.ph" target="_blank" rel="noopener noreferrer">
                  Agent Portal
                </a>
              </Button>
            </div>
            
            <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-2">
                <img 
                  src="/lovable-uploads/41923896-2fb4-4137-b3b8-78bb35bbd3e5.png" 
                  alt="InnovateHub Logo" 
                  className="h-6 w-auto mr-2"
                  loading="eager"
                />
                <span className="text-gray-700 font-medium">InnovateHub Inc.</span>
              </div>
              <p className="text-sm text-gray-600">
                PlataPay is one of our flagship solutions. We also offer Digital Customizations, 
                E-Commerce Development, AI Solutions, and Global Expansion services.
              </p>
              <Link to="/services" className="mt-2 text-sm text-innovate-600 hover:text-innovate-800 flex items-center">
                View all services
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
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
                loading="eager"
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
