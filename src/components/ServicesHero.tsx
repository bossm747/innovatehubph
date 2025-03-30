
import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ServicesHeroProps {
  title: string;
  subtitle: string;
  imagePath: string;
}

const ServicesHero = ({ title, subtitle, imagePath }: ServicesHeroProps) => {
  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background image with overlay for opacity */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imagePath || "/lovable-uploads/d51f3d08-0518-4808-af9d-83ddda86ee94.png"} 
          alt="Services Background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-innovate-900/10 to-innovate-600/10"></div>
      </div>
      
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4 animate-fade-in shadow-sm">
            Our Comprehensive Services
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 hero-text-gradient animate-fade-in" style={{ animationDelay: '100ms' }}>
            {title || "What We Do"}
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {subtitle || "Smart Solutions for the Digital Economy"}
          </p>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
            <a 
              href="#service-tiles" 
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg animate-bounce hover:shadow-xl transition-shadow"
            >
              <ArrowDown className="h-6 w-6 text-innovate-600" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-innovate-400/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ServicesHero;
