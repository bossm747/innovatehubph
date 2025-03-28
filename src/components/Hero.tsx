
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-28 px-6 md:px-12 lg:px-24 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-white filter blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-blue-300 filter blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 text-blue-200 rounded-full mb-6 animate-fade-in" style={{animationDelay: '100ms'}}>
              Empowering the Future with Digital Innovation
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-fade-in" style={{animationDelay: '200ms'}}>
              Customized Solutions for a <span className="text-blue-300">Connected World</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 animate-fade-in" style={{animationDelay: '300ms'}}>
              InnovateHub delivers cutting-edge fintech, AI, and e-commerce solutions designed to transform your business operations and drive growth in the digital economy.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: '400ms'}}>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white btn-shine shadow-md hover:shadow-lg"
                asChild
              >
                <Link to="/services" className="flex items-center">
                  Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact" className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg blur-xl"></div>
            <img 
              src="/lovable-uploads/60c28117-5e6a-45ad-ae8f-38d4c7c0240f.png" 
              alt="Digital Innovation" 
              className="relative z-10 rounded-lg shadow-lg w-full h-auto transform hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
