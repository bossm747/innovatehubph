
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#1A1F2C] to-[#9F9EA1] text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-innovate-500 filter blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-white filter blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-innovate-300 filter blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 rounded-full mb-6">
              Empowering the Future with Digital Innovation
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Customized <span className="text-innovate-300">fintech, AI, and e-commerce</span> solutions
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              InnovateHub delivers secure, scalable digital solutions for businesses in the Philippines and beyond, with specialized expertise in financial technology and digital transformation.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-innovate-600 hover:bg-innovate-700 text-white btn-shine"
                asChild
              >
                <Link to="/services">Our Services</Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact" className="flex items-center">
                  Contact Us <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative hidden lg:block fade-up">
            {/* 3D-like layered images */}
            <div className="relative">
              {/* Shadow/backdrop for 3D effect */}
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-innovate-400/20 rounded-xl"></div>
              
              {/* Main image */}
              <div className="relative z-10 overflow-hidden rounded-xl border-2 border-white/20 shadow-xl">
                <img 
                  src="/lovable-uploads/b46a7ef5-5912-4679-bbe1-aafd4ad7d717.png"
                  alt="Digital Innovation" 
                  className="w-full h-auto transform transition-transform hover:scale-105 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-10 -left-10 z-20 p-2 bg-white rounded-lg shadow-lg animate-float">
                <img 
                  src="/lovable-uploads/9b23899d-8537-4e7c-996b-5fdc791cbde2.png"
                  alt="PlataPay Logo" 
                  className="w-16 h-16"
                />
              </div>
              
              <div className="absolute -bottom-8 right-10 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg flex items-center space-x-3 animate-float" style={{animationDelay: '1s'}}>
                <div className="bg-innovate-600 rounded-full p-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-gray-800 font-medium text-sm">Project Completed</p>
                  <p className="text-gray-600 text-xs">Digital Wallet Platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
