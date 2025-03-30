
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const FintechSolutions = () => {
  const imgContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!imgContainerRef.current) return;
      const rect = imgContainerRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        imgContainerRef.current.classList.add('fade-in');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section id="fintech-solutions" className="py-16 px-4 md:px-8 bg-[#1A1F2C]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2 order-2 lg:order-1 fade-up">
            <div className="flex items-center space-x-2 mb-3">
              <img 
                src="/lovable-uploads/e093393f-ce20-401d-be26-6d54dda3ace1.png" 
                alt="Fintech Solutions Logo"
                className="h-8 w-8"
                loading="eager"
              />
              <span className="text-sm font-medium text-innovate-100 bg-innovate-900/50 py-1 px-3 rounded-full">
                Client Spotlight
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Fintech Solutions: Digital Financial Services
            </h2>
            
            <p className="text-base md:text-lg text-gray-300 mb-4">
              Empowering micropreneurs through accessible digital finance tools. 
              Our fintech platform offers a secure and income-generating platform for Filipino communities.
            </p>
            
            {/* New growth highlight section */}
            <div className="bg-gradient-to-r from-blue-900/40 to-green-900/30 p-4 rounded-lg border border-blue-800/30 mb-5">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-green-300">Rapid Market Expansion</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Despite being a young startup, we've gained significant market trust with over 1,100 agents nationwide. 
                    Our inquiries have increased by 215% this quarter, signaling strong and sustainable growth.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">Digital Wallet</h3>
                  <p className="text-sm text-gray-300">Secure funds management</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">Bills Payment</h3>
                  <p className="text-sm text-gray-300">All utilities and services</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">Remittance</h3>
                  <p className="text-sm text-gray-300">Fast & affordable transfers</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">E-Loading</h3>
                  <p className="text-sm text-gray-300">All network providers</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-innovate-500 hover:bg-innovate-600" asChild>
                <Link to="/fintech-solutions">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800" asChild>
                <a href="https://platapay.ph" target="_blank" rel="noopener noreferrer">
                  Visit Fintech Portal
                </a>
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2 fade-up" ref={imgContainerRef}>
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-20 h-20 bg-blue-800/30 rounded-lg -z-10"></div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-amber-600/20 rounded-lg -z-10"></div>
              <div className="rounded-xl overflow-hidden shadow-2xl relative">
                <img 
                  src="/lovable-uploads/51105682-3d95-4413-be73-38763b9478f8.png" 
                  alt="Fintech Digital Payment Solution"
                  className="w-full h-auto max-w-[320px] sm:max-w-[400px] md:max-w-[450px] rounded-xl mx-auto"
                  loading="eager"
                  style={{ 
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))',
                    mixBlendMode: 'normal'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FintechSolutions;
