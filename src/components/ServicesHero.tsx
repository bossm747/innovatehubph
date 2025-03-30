
import React from 'react';
import { ArrowDown } from 'lucide-react';
import HeroBackground from './hero/HeroBackground';

interface ServicesHeroProps {
  title: string;
  subtitle: string;
  imagePath: string;
}

const ServicesHero = ({ title, subtitle, imagePath }: ServicesHeroProps) => {
  return (
    <section className="relative py-12 px-6 md:px-12 lg:px-16 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      <HeroBackground />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 text-blue-200 rounded-full mb-4 animate-fade-in" style={{animationDelay: '100ms'}}>
              Our Comprehensive Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white animate-fade-in" style={{animationDelay: '200ms'}}>
              {title || "What We Do"}
            </h1>
            <p className="text-lg text-blue-100 mb-6 animate-fade-in" style={{animationDelay: '300ms'}}>
              {subtitle || "Smart Solutions for the Digital Economy"}
            </p>
            
            <div className="flex justify-start animate-fade-in" style={{animationDelay: '400ms'}}>
              <a 
                href="#service-tiles" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Explore Services <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-blue-200 animate-fade-in" style={{animationDelay: '500ms'}}>
              <div className="flex items-center">
                <span className="h-5 w-5 mr-2 text-blue-300">•</span>
                Custom Solutions
              </div>
              <div className="flex items-center">
                <span className="h-5 w-5 mr-2 text-blue-300">•</span>
                Expert Support
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/20 rounded-lg blur-xl"></div>
            <img 
              src={imagePath || "/lovable-uploads/d51f3d08-0518-4808-af9d-83ddda86ee94.png"} 
              alt="Services" 
              className="relative z-10 rounded-lg shadow-lg object-cover w-full h-auto transform hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
