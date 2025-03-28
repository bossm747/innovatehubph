
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const PlataPay = () => {
  return (
    <section id="platapay" className="py-24 px-6 md:px-12 lg:px-24 bg-innovate-50/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-100/30 to-innovate-100/30 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/20 to-transparent blur-3xl rounded-full -z-10"></div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6">
              Our Flagship Product
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
              <h2 className="text-3xl md:text-4xl font-bold hero-text-gradient">
                PlataPay
              </h2>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
              Digital Wallet & Payment Solutions
            </h3>
            <p className="text-gray-600 mb-6">
              PlataPay revolutionizes how communities access financial services with its comprehensive digital wallet platform. Offering bills payment, remittance, e-loading, and QR payments, it provides both convenience for users and income opportunities for agents.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-innovate-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Bills Payment:</span> Electric, water, internet, credit cards, and more
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-innovate-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Remittance:</span> Fast and secure money transfers across the Philippines
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-innovate-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Agent Network:</span> Earn income by becoming a financial service provider
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="group">
                <Link to="/platapay" className="flex items-center">
                  Explore PlataPay 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="group">
                <a href="https://platapay.ph" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Official Website
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative fade-up">
            <div className="absolute top-0 -left-10 w-28 h-28 bg-innovate-100/50 rounded-full -z-10 blur-xl"></div>
            <div className="absolute bottom-10 -right-10 w-36 h-36 bg-blue-100/40 rounded-full -z-10 blur-xl"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <img 
                src="/lovable-uploads/d06dbf6f-eafc-4d26-97e4-b5ee5dac0416.png" 
                alt="PlataPay Platform" 
                className="w-full h-auto rounded-xl"
              />
              
              {/* Floating QR code */}
              <div className="absolute -bottom-6 -right-6 p-3 bg-white rounded-lg shadow-lg transform rotate-3">
                <img 
                  src="/lovable-uploads/4d5b3eaa-0065-48e8-9976-3931a1836f81.png" 
                  alt="QR Code" 
                  className="w-20 h-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlataPay;
