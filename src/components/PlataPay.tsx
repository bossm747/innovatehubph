import React from 'react';
import { ArrowRight, Shield, CheckCircle, Smartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const PlataPay = () => {
  return (
    <section id="platapay" className="py-24 px-6 md:px-12 lg:px-24 bg-innovate-50/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-100/30 to-innovate-100/30 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/20 to-transparent blur-3xl rounded-full -z-10"></div>
      
      <div className="absolute opacity-5 top-0 right-0 w-full h-full">
        <img 
          src="/lovable-uploads/9943e545-fc96-401b-98c2-3cb582ebab57.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6">
              Featured Client Solution
            </span>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/e093393f-ce20-401d-be26-6d54dda3ace1.png" 
                alt="PlataPay Logo" 
                className="h-16 w-16 mr-4"
              />
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
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-innovate-700" />
                </div>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Bills Payment:</span> Electric, water, internet, credit cards, and more
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-innovate-700" />
                </div>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Remittance:</span> Fast and secure money transfers across the Philippines
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mt-1 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-innovate-700" />
                </div>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Agent Network:</span> Earn income by becoming a financial service provider
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                variant="primary" 
                size="lg" 
                width="fixed"
                className="btn-shine group"
                asChild
              >
                <Link to="/platapay" className="flex items-center justify-center">
                  Explore PlataPay 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                width="fixed"
                className="border-innovate-600 text-innovate-600 hover:bg-innovate-50 group"
                asChild
              >
                <a href="https://platapay.ph" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  Official Website
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-innovate-600" />
                <span className="text-gray-700 font-medium">Secure & Reliable Digital Payments</span>
              </div>
              <p className="text-gray-600 italic">
                PlataPay is one of the many innovative solutions developed by InnovateHub Inc., showcasing our expertise in fintech solutions.
              </p>
              <div className="mt-4">
                <Link to="/services" className="text-innovate-600 hover:text-innovate-800 font-medium flex items-center group">
                  Explore our other services
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative fade-up">
            <div className="absolute top-0 -left-10 w-28 h-28 bg-innovate-100/50 rounded-full -z-10 blur-xl"></div>
            <div className="absolute bottom-10 -right-10 w-36 h-36 bg-blue-100/40 rounded-full -z-10 blur-xl"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 card-3d">
              <img 
                src="/lovable-uploads/d06dbf6f-eafc-4d26-97e4-b5ee5dac0416.png" 
                alt="PlataPay Platform" 
                className="w-full h-auto rounded-xl"
              />
              
              <div className="absolute -bottom-6 -right-6 p-3 bg-white rounded-lg shadow-lg transform rotate-3 mobile-device">
                <div className="relative pulse-glow">
                  <Smartphone className="h-16 w-16 text-innovate-600" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">QR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlataPay;
