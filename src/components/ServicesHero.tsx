
import React from 'react';

const ServicesHero = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-innovate-900/10 to-innovate-600/10">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 hero-text-gradient">
            What We Do
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-10">
            Smart Solutions for the Digital Economy
          </p>
          
          <div className="flex justify-center">
            <a href="#service-tiles" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-medium animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Hero image with enhanced styling */}
      <div className="mt-16 relative max-w-6xl mx-auto">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-innovate-300/10 to-innovate-500/10 rounded-xl blur-xl transform scale-105"></div>
        <div className="overflow-hidden rounded-xl shadow-medium relative">
          <img 
            src="/lovable-uploads/d51f3d08-0518-4808-af9d-83ddda86ee94.png" 
            alt="InnovateHub Services" 
            className="w-full h-auto relative z-10"
          />
          <div className="absolute inset-0 bg-innovate-900/10 z-20"></div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
