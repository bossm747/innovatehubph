
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlataPay = () => {
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
    <section id="platapay" className="py-24 px-4 md:px-12 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1 fade-up">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/e093393f-ce20-401d-be26-6d54dda3ace1.png" 
                alt="PlataPay Logo"
                className="h-10 w-10"
                loading="eager"
              />
              <span className="text-sm font-medium text-innovate-600 bg-innovate-50 py-1 px-3 rounded-full">
                Client Spotlight
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              PlataPay: Digital Financial Solutions
            </h2>
            
            <p className="text-lg text-gray-600 mb-6">
              Empowering micropreneurs through accessible digital finance tools. 
              PlataPay offers a secure and income-generating platform for Filipino communities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800">Digital Wallet</h3>
                  <p className="text-sm text-gray-600">Secure funds management</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800">Bills Payment</h3>
                  <p className="text-sm text-gray-600">All utilities and services</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800">Remittance</h3>
                  <p className="text-sm text-gray-600">Fast & affordable transfers</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800">E-Loading</h3>
                  <p className="text-sm text-gray-600">All network providers</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-innovate-600 hover:bg-innovate-700" asChild>
                <Link to="/platapay">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" className="border-innovate-200 text-innovate-700 hover:bg-innovate-50" asChild>
                <a href="https://platapay.ph" target="_blank" rel="noopener noreferrer">
                  Visit PlataPay
                </a>
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2 fade-up" ref={imgContainerRef}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-lg -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-100 rounded-lg -z-10"></div>
              <div className="rounded-xl overflow-hidden shadow-2xl relative">
                <img 
                  src="/lovable-uploads/91dc1ed9-e379-4449-9c47-d3194ea53cfd.png" 
                  alt="PlataPay Digital Payment Solution"
                  className="w-full h-auto rounded-xl"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlataPay;
