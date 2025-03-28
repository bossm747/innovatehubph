
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#1A1F2C] to-[#9F9EA1] text-white">
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
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[70vh] py-12">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Empowering the Future with Digital Innovation
            </h1>
            <p className="text-xl md:text-2xl font-light text-innovate-100 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Customized fintech, AI, and e-commerce solutions for a connected world.
            </p>
            <div className="flex flex-wrap gap-4 mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Button size="lg" className="bg-innovate-600 hover:bg-innovate-700 text-white btn-shine">
                <Link to="/contact" className="flex items-center">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white">
                <Link to="/services" className="flex items-center">
                  Explore Services
                </Link>
              </Button>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
              <a 
                href="#featured-section" 
                className="inline-flex items-center text-innovate-100 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="mr-2">Discover Our Expertise</span>
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </a>
            </div>
          </div>
          
          <div className="relative hidden md:block animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-innovate-400/20 to-innovate-600/20 rounded-lg blur-2xl transform rotate-12 scale-110"></div>
            <img 
              src="/lovable-uploads/5f09f5a6-e6df-47ae-83c4-34a9569a40c5.png" 
              alt="Digital Innovation" 
              className="max-w-full h-auto relative z-10 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-innovate-600/30 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 -left-8 w-16 h-16 bg-innovate-400/40 rounded-full blur-lg"></div>
          </div>
        </div>
        
        <div 
          id="featured-section" 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-4 md:mt-0 pb-8 animate-fade-in"
          style={{ animationDelay: '700ms' }}
        >
          {['PlataPay', 'Digital Customizations', 'E-Commerce', 'AI Solutions'].map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-sm hover:bg-white/15 transition-colors">
                <h3 className="text-white font-medium">{item}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
