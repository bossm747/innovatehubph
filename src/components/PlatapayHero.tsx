
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlatapayHero = () => {
  return (
    <section className="relative py-16 px-6 md:px-8 lg:px-16 bg-gradient-to-r from-innovate-900/10 to-innovate-600/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
              Powered by InnovateHub
            </span>
            <div className="flex items-center mb-3">
              <img 
                src="/lovable-uploads/e093393f-ce20-401d-be26-6d54dda3ace1.png" 
                alt="PlataPay Logo" 
                className="h-14 w-14 mr-3"
                loading="eager" 
              />
              <h1 className="text-3xl md:text-4xl font-bold hero-text-gradient">
                PlataPay
              </h1>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-700">
              Empowering Micropreneurs Through Digital Finance
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              A secure and income-generating platform that revolutionizes financial services for communities across the Philippines and beyond.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white btn-shine" 
                size="default"
                asChild
              >
                <a href="https://platapay.ph/registration" target="_blank" rel="noopener noreferrer">
                  Apply as Agent
                </a>
              </Button>
              <Button 
                variant="purple" 
                size="default" 
                className="text-white"
                asChild
              >
                <a href="https://app.platapay.ph" target="_blank" rel="noopener noreferrer">
                  Agent Portal
                </a>
              </Button>
            </div>
            
            <div className="p-3 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-2">
                <img 
                  src="/lovable-uploads/1d8bd1cd-ee5d-4a31-8a60-ca66f86c0c68.png" 
                  alt="InnovateHub Logo" 
                  className="h-5 w-auto mr-2"
                  loading="eager"
                />
                <span className="text-gray-700 font-medium">InnovateHub Inc.</span>
              </div>
              <p className="text-xs md:text-sm text-gray-600">
                PlataPay is one of our flagship solutions. We also offer Digital Customizations, 
                E-Commerce Development, AI Solutions, and Global Expansion services.
              </p>
              <Link to="/services" className="mt-1 text-xs md:text-sm text-innovate-600 hover:text-innovate-800 flex items-center">
                View all services
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="relative fade-up">
            <div className="absolute -top-3 -left-3 w-20 h-20 bg-innovate-100 rounded-lg -z-10"></div>
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-blue-100 rounded-lg -z-10"></div>
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
      
      <div className="absolute top-16 left-8 w-12 h-12 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-16 right-8 w-20 h-20 bg-innovate-500/10 rounded-full blur-xl"></div>
    </section>
  );
};

export default PlatapayHero;
